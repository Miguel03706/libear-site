import firebase from "firebase/app";
import 'firebase/auth';

// export default function handler(req, res) {
//   res.status(200).json({ name: 'John Doe' })
// }

if (!firebase.apps.length) {
    firebase.initializeApp({
        apiKey: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_KEY,
        authDomain: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_AUTHDOMAIN,
        projectId: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_PROJECTID,
    });
}

// export default firebase;
export default {
    criarContaFB: async (email, senha) => {
        let sucesso = await firebase.auth().createUserWithEmailAndPassword(email, senha).then(() => {
           const user = firebase.auth().currentUser
                 //   user.updateProfile({
                 //     displayName: "User",
                 //     photoURL: "polar"
                 //   })
        }).then(() => {
            console.log(sucesso + "Deu certo")
        }).catch((error) => {
         //   handleError(error);
        })
    }
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


