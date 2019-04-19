import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBZkz9lqvu2bOJPE2Bw1ca1S17wICpxJOs",
  authDomain: "ezcurrencyup-546ab.firebaseapp.com",
  databaseURL: "https://ezcurrencyup-546ab.firebaseio.com",
  projectId: "ezcurrencyup-546ab",
  storageBucket: "ezcurrencyup-546ab.appspot.com",
  messagingSenderId: "723445216970"
};

//Initialize firebase
const app = firebase.initializeApp(config);

// Configure Authentication
export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();

export default app;
