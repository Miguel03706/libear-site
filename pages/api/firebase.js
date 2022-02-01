import firebase from "firebase/app";
import { initializeApp } from "firebase/app";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    setPersistence,
    browserSessionPersistence,
    updateProfile
} from "firebase/auth";

// export default function handler(req, res) {
//   res.status(200).json({ name: 'John Doe' })
// }

const firebaseConfig = {
    apiKey: "AIzaSyBkvx5bs1Y3wL-cXtjQNuYHYZGeK6HCoxo",
    authDomain: "libear-85621.firebaseapp.com",
    databaseURL: "https://libear-85621-default-rtdb.firebaseio.com",
    projectId: "libear-85621",
    storageBucket: "libear-85621.appspot.com",
    messagingSenderId: "877452629797",
    appId: "1:877452629797:web:547f4ed6539598ab586ccc",
    measurementId: "G-SG7V7ZDZVB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const handleError = (error) => {
    if (error.code) {
        switch (error.code) {
            case 'auth/weak-password':
                alert('Senha muito fraca: Sua senha deve conter no minimo 6 caracteres');
                break;
            case 'auth/wrong-password':
                alert('Senha incorreta');
                break
            case 'auth/email-already-in-use':
                alert('Email já está em uso, coloque outro e tente novamente');
                break
            case "auth/invalid-email":
                alert('Insira um email válido!');
                break
            case "auth/requires-recent-login":
                alert('Para realizar essa ação é necessário relogar');
                break
            case "auth/user-not-found":
                alert('Usuário não encontrado, tente usar outro email')
                break
        }
    }
}

export default {
    createAccountFB: async (email, password) => {
        const auth = getAuth();
        await createUserWithEmailAndPassword(auth, email, password).then(() => {
            updateProfile(auth.currentUser, {
                displayName: "User",
                photoURL: "polar"
            }).then(() => {
                setPersistence(auth, browserSessionPersistence).then(() => {
                    return signInWithEmailAndPassword(auth, email, password);
                })
            }).then(() => {
                location.href = "https://libear-site.vercel.app/entrar";
            }).catch((error) => {
                handleError(error)
            })
        }).catch((error) => {
            handleError(error);
        })
    },
    loginUser: async (email, password) => {
        const auth = getAuth();

        setPersistence(auth, browserSessionPersistence).then(() => {
            return signInWithEmailAndPassword(auth, email, password);
        }).then(() => {
            location.href = "https://libear-site.vercel.app/inicio";

        })
            .catch((error) => {
               handleError(error)
            });
    }
}