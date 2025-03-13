import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDxRaBLYUUOO5kpnnrhyQxXc7XvvQow5rg",
  authDomain: "electron-e147d.firebaseapp.com",
  projectId: "electron-e147d",
  storageBucket: "electron-e147d.firebasestorage.app",
  messagingSenderId: "948662093492",
  appId: "1:948662093492:web:4bc052202ba973ec75b9e1",
  measurementId: "G-4TR9QTMYL0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };
