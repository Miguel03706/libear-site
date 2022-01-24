import firebase from "firebase";
import 'firebase/auth';

// export default function handler(req, res) {
//   res.status(200).json({ name: 'John Doe' })
// }

if (!firebase.apps.length) {
    firebase.initializeApp({
        apiKey: process.env.REACT_APP_FIREBASE_KEY,
        authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
        projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
        storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
        messagingSenderId: process.env.REACT_APP_FIREBASE_MASSEAGINGSENDERID,
        appId: process.env.REACT_APP_FIREBASE_APPID,
        measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID
    });
}

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
    criarContaFB: async (email, senha) => {
        let sucesso = await firebase.auth().createUserWithEmailAndPassword(email, senha).then(() => {
          const user = firebase.auth().currentUser;
    
          user.updateProfile({
            displayName: "User",
            photoURL: "polar"
          })
        }).then(() => {
          console.log(sucesso + "Deu certo")
        }).catch((error) => {
          handleError(error);
        })
      },
};


