import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBy6nVKppWk7Qib9PEOAxoukzjPtUeDQFg",
    authDomain: "trello-auth-c0da5.firebaseapp.com",
    projectId: "trello-auth-c0da5",
    storageBucket: "trello-auth-c0da5.appspot.com",
    messagingSenderId: "564829346299",
    appId: "1:564829346299:web:3d67254c551ed97842135e",
    measurementId: "G-KMBX90KFYN",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

export { auth };
export default firebase;
