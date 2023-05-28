
import { initializeApp } from "firebase/app";
import {getFirestore,collection} from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKUq_SgA9i-e3leCE_rPwbY42HWKz_7z8",
  authDomain: "react-notes-22904.firebaseapp.com",
  databaseURL: "https://react-notes-22904-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "react-notes-22904",
  storageBucket: "react-notes-22904.appspot.com",
  messagingSenderId: "545960529309",
  appId: "1:545960529309:web:12bed6f70aeb420b17b374"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const notesDB = getFirestore(app) ;
export const notesCollection = collection(notesDB, "notes") ;

