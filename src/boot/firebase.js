import  firebase from "firebase/app";
import "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyDmCNOI-iob1KYxNltrgjA1bjDziCSKElk",
  authDomain: "awesome-todo-c33c0.firebaseapp.com",
  databaseURL: "https://awesome-todo-c33c0-default-rtdb.firebaseio.com",
  projectId: "awesome-todo-c33c0",
  storageBucket: "awesome-todo-c33c0.appspot.com",
  messagingSenderId: "647739822906",
  appId: "1:647739822906:web:4ba1c31200ead4abedf603",
  measurementId: "G-05L3F4D5PC"
}
// Initialize Firebase
let firebaseApp = firebase.initializeApp(firebaseConfig);
let firebaseAuth = firebase.auth();

export {firebaseAuth}