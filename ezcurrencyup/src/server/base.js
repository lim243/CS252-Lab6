import firebase from "firebase/app";
import "firebase/database";

import Rebase from "re-base";

// Initialize Firebase
const config = {
  apiKey: "AIzaSyBZkz9lqvu2bOJPE2Bw1ca1S17wICpxJOs",
  authDomain: "ezcurrencyup-546ab.firebaseapp.com",
  databaseURL: "https://ezcurrencyup-546ab.firebaseio.com",
  projectId: "ezcurrencyup-546ab",
  storageBucket: "ezcurrencyup-546ab.appspot.com",
  messagingSenderId: "723445216970"
};

const app = firebase.initializeApp(config);

const database = app.database();
const base = Rebase.createClass(database);

export default base;
