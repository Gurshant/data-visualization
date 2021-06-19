import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDukqWkCJLpJO-LWR78YOq0NaUaRiLbxUM",
    authDomain: "singapore-population.firebaseapp.com",
    projectId: "singapore-population",
    storageBucket: "singapore-population.appspot.com",
    messagingSenderId: "684783672839",
    appId: "1:684783672839:web:44585a445d9d72b00194a2"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export default firebase;