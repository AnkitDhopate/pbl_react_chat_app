import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBmLsllD7L0uI-gtrt5US5OXzeYvEc0ZCg",
  authDomain: "pbl-chat-app.firebaseapp.com",
  projectId: "pbl-chat-app",
  storageBucket: "pbl-chat-app.appspot.com",
  messagingSenderId: "334229552938",
  appId: "1:334229552938:web:318592b570e72da78c6853",
  measurementId: "G-H5G6VT5H40",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const provider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();

export { auth, provider };
export default db;
