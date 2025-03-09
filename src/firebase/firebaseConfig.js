import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // ✅ Use Firestore, not Realtime Database

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB7BCxjVsqxxxxxxxxxiU24dbE",
  authDomain: "team-txxxxxxxxxxp.com",
  projectId: "team-texxxxxxxxxxxhon",
  storageBucket: "team-txxxxxxxxxxxxot.com",
  messagingSenderId: "894xxxxxxxx67",
  appId: "1:8948729xxxxxxxxxxxx4eca9a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // ✅ Use Firestore

export { db }; // ✅ Make sure to export `db`, not `database`
