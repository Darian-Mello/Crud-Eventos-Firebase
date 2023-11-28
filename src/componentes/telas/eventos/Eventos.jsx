import { useState, useEffect } from "react";
import EventosContext from "./EventosContext";
import Tabela from "./Tabela";
import Form from "./Form";
import Carregando from "../../comuns/Carregando";
import { auth } from "../../../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { deleteEventoFirebase, addEventoFirebase, updateEventoFirebase, getEventosUIDFirebase } from "../../servicos/EventoService";


function Eventos() {

    const [user, loading, error] = useAuthState(auth);

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({
        id: '',
        nome: '',
        local: '',
        data: '',
        hora: '',
        usuario: '',
        contato: '',
        uid: ''
    });
    const [carregando, setCarregando] = useState(true);
    const [abreDialogo, setAbreDialogo] = useState(false);

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status: "", message: "" });
        setObjeto({
            id: '',
            nome: '',
            local: '',
            data: '',
            hora: '',
            usuario: user?.displayName,
            contato: user?.email,
            uid: user?.uid
        });
        setAbreDialogo(true)
    }

    const editarObjeto = async (objeto) => {
        setObjeto(objeto);
        setAbreDialogo(true);
        setEditar(true);
        setAlerta({ status: "", message: "" });
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        if (editar) {

            try {
                await updateEventoFirebase(objeto);
                setAlerta({ status: "success", message: "Evento atualizado com sucesso" });
            } catch (err) {
                setAlerta({ status: "error", message: "Erro ao atualizar o Evento:" + err });
            }
        } else { // novo 
            try {
                setObjeto(await addEventoFirebase(objeto));
                setEditar(true);
                setAlerta({ status: "success", message: "Evento criado com sucesso" });
            } catch (err) {
                setAlerta({ status: "error", message: "Erro ao criar o Evento:" + err });
            }
        }
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value });
    }

    const remover = async (objeto) => {
        if (window.confirm("Remover este objeto?")) {
            try {
                deleteEventoFirebase(objeto);
                setAlerta({ status: "success", message: "Evento removido com sucesso!" });
            } catch (err) {
                setAlerta({ status: "error", message: "Erro ao  remover: " + err });
            }
        }
    }

    useEffect(() => {
        setCarregando(true);
        if(user?.uid != null) {
            const uid = user?.uid;
            getEventosUIDFirebase(uid, setListaObjetos);
        }
        setCarregando(false);
    }, [user]);

    return (
        <EventosContext.Provider value={{
            alerta, setAlerta,
            listaObjetos, setListaObjetos,
            remover,
            objeto, setObjeto,
            editarObjeto, novoObjeto, acaoCadastrar,
            handleChange, abreDialogo, setAbreDialogo
        }}>
            <Carregando carregando={carregando}>
                <Tabela />
            </Carregando>
            <Form />
        </EventosContext.Provider>
    )

}

export default Eventos;