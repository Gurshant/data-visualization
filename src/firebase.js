import firebase from 'firebase/app';
import 'firebase/firestore';
var firebaseConfig = {
    apiKey: "AIzaSyCLg4328QHELe1Ptjs73EVK8L45Q_rRgRo",
    authDomain: "react-db-visualization.firebaseapp.com",
    databaseURL: "https://react-db-visualization-default-rtdb.firebaseio.com",
    projectId: "react-db-visualization",
    storageBucket: "react-db-visualization.appspot.com",
    messagingSenderId: "258580541523",
    appId: "1:258580541523:web:20a71fae674eadd3f9d6a6"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase;