import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA49VmTMBr8w3BARosxXTtwzgF61qeZjcU",
  authDomain: "cafe-doan3.firebaseapp.com",
  projectId: "cafe-doan3",
  storageBucket: "cafe-doan3.appspot.com",
  messagingSenderId: "902466562684",
  appId: "1:902466562684:web:9a4d34a4f9c5fce088f7f9",
  measurementId: "G-N59HR463P3",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const fs = firebase.firestore();
const storage = firebase.storage();

export { auth, fs, storage };
