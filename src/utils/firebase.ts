import firebase from 'firebase/app';
import 'firebase/database';    // for realtime database

const firebaseConfig = {
    apiKey: "AIzaSyD_ENUiMdHvQHHQVXac_choleElOmg7Uv8",
    authDomain: "singapore-population-3dc7b.firebaseapp.com",
    projectId: "singapore-population-3dc7b",
    storageBucket: "singapore-population-3dc7b.appspot.com",
    messagingSenderId: "740592941650",
    appId: "1:740592941650:web:3b167fd71ac78eb570bd8b"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export default firebase;