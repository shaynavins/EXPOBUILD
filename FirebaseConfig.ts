// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDW6JgcnSlzXuA8iWglr9GhqJblJIzl6W4",
  authDomain: "doubtapp-3857a.firebaseapp.com",
  projectId: "doubtapp-3857a",
  storageBucket: "doubtapp-3857a.firebasestorage.app",
  messagingSenderId: "33600781409",
  appId: "1:33600781409:web:80d4006386705bf8f9fe20",
  measurementId: "G-QELKRQ78XL"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);

export const db = getFirestore(FIREBASE_APP);

export default FIREBASE_APP;
