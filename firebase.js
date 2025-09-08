// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";

/*const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);*/

const firebaseConfig = {
  apiKey: "AIzaSyDPtm24veNlKOKHgdwSERv2yL8JttZ3bcw",
  authDomain: "skillflex-admin.firebaseapp.com",
  projectId: "skillflex-admin",
  storageBucket: "skillflex-admin.firebasestorage.app",
  messagingSenderId: "912388334445",
  appId: "1:912388334445:web:4fdbdf469508706b263064",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth(app);