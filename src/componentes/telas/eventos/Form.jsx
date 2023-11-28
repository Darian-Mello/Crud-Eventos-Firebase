import { useContext } from "react";
import Alerta from "../../comuns/Alerta";
import EventosContext from "./EventosContext";
import CampoEntrada from "../../comuns/CampoEntrada";
import Dialogo from "../../comuns/Dialogo";

function Form() {

    const { objeto, handleChange, acaoCadastrar, alerta, abreDialogo, setAbreDialogo } =
        useContext(EventosContext);

    return (
        <>
            <Dialogo id="modalEdicao" titulo="Evento"
                open={abreDialogo} setOpen={setAbreDialogo}
                acaoCadastrar={acaoCadastrar} idform="formulario"
                maxWidth="sm">
                <Alerta alerta={alerta} />
                <CampoEntrada id="txtID" label="ID"
                    tipo="text" name="id" value={objeto.id}
                    onchange={handleChange} requerido={false}
                    readonly={true} />
                <CampoEntrada id="txtTitulo" label="Nome"
                    tipo="text" name="nome" value={objeto.nome}
                    onchange={handleChange} requerido={true}
                    readonly={false} maxlength={50}
                    msgvalido="Nome OK"
                    msginvalido="Informe o nome" />
                <CampoEntrada id="txtUrl" label="Local"
                    tipo="text" name="local"
                    value={objeto.local}
                    onchange={handleChange} requerido={true}
                    readonly={false} maxlength={100}
                    msgvalido="local OK"
                    msginvalido="Informe o local" />
                <CampoEntrada id="txtUrl"
                    tipo="date" name="data"
                    value={objeto.data}
                    onchange={handleChange} requerido={true}
                    readonly={false} maxlength={100}
                    msgvalido="Data OK"
                    msginvalido="Informe a data" />
                <CampoEntrada id="txtUrl" label="Hora"
                    tipo="text" name="hora"
                    value={objeto.hora}
                    onchange={handleChange} requerido={true}
                    readonly={false} maxlength={100}
                    msgvalido="Hora OK"
                    msginvalido="Informe a hora" />
            </Dialogo>
        </>
    )

}

export default Form;