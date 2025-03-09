import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // ✅ Use Firestore, not Realtime Database

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB7BCxjVsqRLKqs8hhy9E4E9xBLiU24dbE",
  authDomain: "team-techno-hackathon.firebaseapp.com",
  projectId: "team-techno-hackathon",
  storageBucket: "team-techno-hackathon.appspot.com",
  messagingSenderId: "89487296367",
  appId: "1:89487296367:web:16badd675b28587d4eca9a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // ✅ Use Firestore

export { db }; // ✅ Make sure to export `db`, not `database`
