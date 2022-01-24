import firebase from "firebase";
import 'firebase/auth';

// export default function handler(req, res) {
//   res.status(200).json({ name: 'John Doe' })
// }

if (!firebase.apps.length) {
    firebase.initializeApp({
        apiKey: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_KEY,
        authDomain: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_AUTHDOMAIN,
        projectId: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_PROJECTID,
        storageBucket: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_STORAGEBUCKET,
        messagingSenderId: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_MASSEAGINGSENDERID,
        appId: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_APPID,
        measurementId: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_MEASUREMENTID
    });
}

// export async function criarContaFB (email, senha){
//         let sucesso = await firebase.auth().createUserWithEmailAndPassword(email, senha).then(() => {
//         //   const user = firebase.auth().currentUser;
    
//         //   user.updateProfile({
//         //     displayName: "User",
//         //     photoURL: "polar"
//         //   })
//         }).then(() => {
//           console.log(sucesso + "Deu certo")
//         }).catch((error) => {
//         //   handleError(error);
//         })
//       }


