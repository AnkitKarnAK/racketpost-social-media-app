import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCYLcj2NgSX1BsS8o3kRHYZYGTH0MIqXnc",
  authDomain: "racketpost-ak.firebaseapp.com",
  projectId: "racketpost-ak",
  storageBucket: "racketpost-ak.appspot.com",
  messagingSenderId: "1064720992119",
  appId: "1:1064720992119:web:71986297e772908bd1c372",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { auth, db, storage };
