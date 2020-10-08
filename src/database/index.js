import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyCh9-Z_fgF4MEfUzkbxkLBKEO76fuO62mo",
    authDomain: "mypersonalsite-85fff.firebaseapp.com",
    databaseURL: "https://mypersonalsite-85fff.firebaseio.com",
    projectId: "mypersonalsite-85fff",
    storageBucket: "mypersonalsite-85fff.appspot.com",
    messagingSenderId: "967574386990",
    appId: "1:967574386990:web:29932d949359716ec422bf",
    measurementId: "G-XB98YTVDWL"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebaseConfig