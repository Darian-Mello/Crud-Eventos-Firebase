import { auth, db } from '../../firebaseConfig';
import { doc, addDoc, collection, query, onSnapshot, updateDoc, deleteDoc, where } from "firebase/firestore";

export const getEventosFirebase = async (setListaObjetos) => {
    try {
        const q = query(collection(db, 'eventos'))
        onSnapshot(q, (querySnapshot) => {
            setListaObjetos(querySnapshot.docs.map(doc => ({
                id: doc.id,
                nome: doc.data().nome,
                local: doc.data().local,
                data: doc.data().data,
                hora: doc.data().hora,
                usuario: doc.data().usuario,
                contato: doc.data().contato,
                uid: doc.data().uid
            })))
        })
    } catch (err) {
        throw err;
    }
}

export const getEventosUIDFirebase = async (uid, setListaObjetos) => {
    try {
        const colRef = collection(db, "eventos");
        const q = query(colRef, where("uid", "==", uid))
        onSnapshot(q, (querySnapshot) => {
            setListaObjetos(querySnapshot.docs.map(doc => ({
                id: doc.id,
                nome: doc.data().nome,
                local: doc.data().local,
                data: doc.data().data,
                hora: doc.data().hora,
                usuario: doc.data().usuario,
                contato: doc.data().contato,
                uid: doc.data().uid
            })))
        })
    } catch (err) {
        throw err;
    }
}

export const deleteEventoFirebase = async objeto => {
    try {
        const postDocRef = doc(db, 'eventos', objeto.id)
        await deleteDoc(postDocRef);
    } catch (err) {
        throw err;
    }
}

export const addEventoFirebase = async objeto => {
    try {
        let ret = await addDoc(collection(db, 'eventos'),
            {
                nome: objeto.nome,
                local: objeto.local,
                data: objeto.data,
                hora: objeto.hora,
                uid: objeto.uid,
                usuario: objeto.usuario,
                contato: objeto.contato
            }).then(function (docRef) {
                objeto = { ...objeto, id: docRef.id };
                return objeto;
            });
        return ret;
    } catch (err) {
        throw err;
    }
}

export const updateEventoFirebase = async objeto => {
    try {
        const postDocRef = doc(db, 'eventos', objeto.id)
        await updateDoc(postDocRef, {
            nome: objeto.nome,
            local: objeto.local,
            data: objeto.data,
            hora: objeto.hora,
            uid: objeto.uid,
            usuario: objeto.usuario,
            contato: objeto.contato
        })
    } catch (err) {
        throw err;
    }
}



