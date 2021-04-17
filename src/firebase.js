import firebase from "firebase/app";

import "firebase/firestore";
import "firebase/auth";
import "firebase/functions";
import "firebase/database";


firebase.initializeApp({
    apiKey: "AIzaSyC4A4ODrrgFQVgUT8WvKmqXvdSzHB9f2Mw",
    authDomain: "my-firebase-todo-app-ba6d8.firebaseapp.com",
    projectId: "my-firebase-todo-app-ba6d8",
    storageBucket: "my-firebase-todo-app-ba6d8.appspot.com",
    messagingSenderId: "531160584107",
    appId: "1:531160584107:web:7e18bf471ea54747c94cee"
});

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const functions = firebase.functions();

if (window.location.hostname.includes("localhost")) {
  auth.useEmulator("http://localhost:3000");
  firestore.useEmulator("localhost", 8080);
  functions.useEmulator("localhost", 5001);
}

export default firebase;
