import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyD3-iOmfpfnMjfhckS_P3Rv3uveW5malog",
  authDomain: "samantha-admin.firebaseapp.com",
  databaseURL: "https://samantha-admin-default-rtdb.firebaseio.com",
  projectId: "samantha-admin",
  storageBucket: "samantha-admin.appspot.com",
  messagingSenderId: "707568383762",
  appId: "1:707568383762:web:15aabe3829260be74f65cb",
  measurementId: "G-BHRJR5NPFG"
};
// Initialize Firebase
// firebase.initializeApp(firebaseConfig);

export const app = firebase.initializeApp(firebaseConfig);
