import firebase from "firebase/app";
import { initializeApp } from "firebase/app";
import "firebase/auth";

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

// export default firebase;
export default {
    criarContaFB: async (email, senha) => {
       console.log("teste")
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


