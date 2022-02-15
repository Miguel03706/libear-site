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
import {
    getFirestore,
    collection,
    doc,
    setDoc,
    updateDoc,
    query,
    where,
    getDocs,
    addDoc,
    orderBy,
    increment
} from "firebase/firestore";
import { Missoes, Compras, Progresso } from "../../lib/user";

const firebaseConfig = {
    apiKey: `${process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_KEY}`,
    authDomain: `${process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_AUTHDOMAIN}`,
    databaseURL: `${process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_DATABASE_URL}`,
    projectId: `${process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_PROJECTID}`,
    storageBucket: `${process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_STORAGEBUCKET}`,
    messagingSenderId: `${process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_MASSEAGINGSENDERID}`,
    appId: `${process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_APPID}`,
    measurementId: `${process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_MEASUREMENTID}`,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();


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
        const auth = await getAuth();
        await createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                updateProfile(auth.currentUser, {
                    displayName: "User",
                    photoURL: "polar"
                })
                    .then(async () => {
                        const id = await auth.currentUser.uid;
                        const userName = await auth.currentUser.displayName;
                        //TODO: TRANSFORMAR EM CONST E IMPORTAR PARA CÁ
                        await setDoc(doc(db, "userRef", `${id}`), {
                            id: `${id}`,
                            dinheiro: 0,
                            pontos: 0,
                            atividades_concluidas: "",
                            compras: Compras,
                            missoes: Missoes,
                            progresso: Progresso,
                            username: `${userName}`,
                        })
                            .then(() => {
                                setPersistence(auth, browserSessionPersistence)
                                    .then(() => {
                                        return signInWithEmailAndPassword(auth, email, password);
                                    })
                            })
                            .then(() => {
                                location.href = "https://libear-site.vercel.app/entrar";
                            })
                            .catch((error) => {
                                handleError(error)
                            })
                    })
            }).catch((error) => {
                handleError(error);
            })
    },
    loginUser: async (email, password) => {
        const auth = getAuth();

        await setPersistence(auth, browserSessionPersistence).then(() => {
            signInWithEmailAndPassword(auth, email, password).then(() => {
                location.href = "https://libear-site.vercel.app/inicio";
            }) .catch((error) => {
                handleError(error)
            });
        })
           
    },
    readActivity: async () => {
        const auth = getAuth();

        const ref = collection(db, "ActivityRef");

        // Create a query against the collection.
        const q = query(ref, orderBy("id"));
        const querySnapshot = await getDocs(q);
        const res = [];

        querySnapshot.forEach((doc) => {
            res.push(doc.data())
        });
        return res;
    },
    getOrientation: async (id) => {
        const auth = getAuth();
        const ref = collection(db, "ActivityRef");
        const q = query(ref, where("id", "==", parseInt(id)));
        const querySnapshot = await getDocs(q);
        const res = [];

        querySnapshot.forEach((doc) => {
            res.push(doc.data())
        });
        return res;
    },
    getMissions: async () => {
        const auth = await getAuth();

        const ref = collection(db, "missions");
        const q = query(ref, orderBy("org"));
        const querySnapshot = await getDocs(q);
        const res = [];

        querySnapshot.forEach((doc) => {
            res.push(doc.data())
        });

        return res;
    },
    getMissionsComplete: async () => {
        const auth = await getAuth();
        const id = auth.currentUser.uid;

        const res = [];

        const refComplete = collection(db, "userRef");
        const queryMissions = query(refComplete, where("id", "==", id));
        const queryComplete = await getDocs(queryMissions);
        queryComplete.forEach((doc) => {
            res.push(JSON.parse(doc.data().missoes))
        });

        return res;
    },
    completeMission: async (missionId) => {
        const auth = await getAuth();
        const id = await auth.currentUser.uid;
        const res = [];

        const refComplete = collection(db, "userRef");
        const queryMissions = query(refComplete, where("id", "==", id));
        const queryComplete = await getDocs(queryMissions);
        queryComplete.forEach((doc) => {
            res.push(JSON.parse(doc.data().missoes))
        });

        res.map(mission => {

            const newMission = JSON.stringify(mission);

            const missionRef = doc(db, "userRef", id);
            updateDoc(missionRef, {
                missoes: `${newMission}`
            });
        })

    },
    listPurchases: async () => {
        const auth = await getAuth();
        const res = [];

        const refComplete = collection(db, "shop");
        const queryMissions = query(refComplete, orderBy("org"));
        const queryComplete = await getDocs(queryMissions);
        queryComplete.forEach((doc) => {
            res.push(doc.data())
        });

        return res;
    },
    setMoney: async () => {
        const auth = await getAuth();
        const id = auth.currentUser.uid;
        const res = [];
        const response = 0;

        const refMoney = collection(db, "userRef");
        const queryMoney = query(refMoney, where("id", "==", id));
        const qMoney = await getDocs(queryMoney);
        qMoney.forEach((doc) => {
            res.push(doc.data().dinheiro);
        });
        res.map(({dinheiro}) => {
            response = dinheiro;
        } )
        return response;
    },
    setBuy: async () => {
        const auth = await getAuth();
        const id = auth.currentUser.uid;
        const res = [];

        const refMoney = collection(db, "userRef");
        const queryMoney = query(refMoney, where("id", "==", id));
        const qMoney = await getDocs(queryMoney);
        qMoney.forEach((doc) => {
            res.push(doc.data().compras);
        });
        const response = [];

         await res.map(itens => { response.push(itens)}) 
        
        return response;
    },
    buyItens: async (id, price) => {
        console.log("tem dinheiro")

    },
}



