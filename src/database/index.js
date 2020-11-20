import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyAHt9HjJQZ7j7CETf54aLD-mjlD0UAd-cA",
  authDomain: "personalagain-8f403.firebaseapp.com",
  databaseURL: "https://personalagain-8f403.firebaseio.com",
  projectId: "personalagain-8f403",
  storageBucket: "personalagain-8f403.appspot.com",
  messagingSenderId: "613165473460",
  appId: "1:613165473460:web:6314b9bfcb49913b2181e1",
  measurementId: "G-B0M38K05RF"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebaseConfig