import { initializeApp } from "firebase/app";
import { GithubAuthProvider, getAuth, signInWithPopup, signOut } from
"firebase/auth";
import { getFirestore, query, getDocs, collection, where, addDoc } from
"firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBv4WpQ4ukC24wndNhS1mt_s_fisIzmYIU",
    authDomain: "lpeeventos.firebaseapp.com",
    projectId: "lpeeventos",
    storageBucket: "lpeeventos.appspot.com",
    messagingSenderId: "687762209166",
    appId: "1:687762209166:web:88ba7851316aa57fa9ccdf"
  };

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
//export default firebaseApp;
const githubProvider = new GithubAuthProvider();
const signInWithGithub = async () => {
try {
    const res = await signInWithPopup(auth, githubProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name: user.displayName,
            authProvider: "github",
            email: user.email,
            });
        }
    } catch (err) {
        console.error(err);
        console.error(err.code);
        alert(err.message);
    }
};
const logout = () => {
    signOut(auth);
};
export {
    auth,
    db,
    signInWithGithub,
    logout,
};