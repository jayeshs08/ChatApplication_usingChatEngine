import firebase from "firebase/app";
import "firebase/auth";

export const auth = firebase.initializeApp(
    {
  apiKey: "AIzaSyAnoeQ2J1osaylvUoD2pAyoXFBtPXRhz9o",
  authDomain: "arcchat-jayesh.firebaseapp.com",
  projectId: "arcchat-jayesh",
  storageBucket: "arcchat-jayesh.appspot.com",
  messagingSenderId: "619249364709",
  appId: "1:619249364709:web:a50b54fe3ecec267036e0c"
    }).auth();