// src/config/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyCynFPL0YPmaOLauZYa50znI_jo5GfYEt0",
  authDomain: "social-media-feed-3bc40.firebaseapp.com",
  projectId: "social-media-feed-3bc40",
  storageBucket: "social-media-feed-3bc40.firebasestorage.app",
  messagingSenderId: "308572611962",
  appId: "1:308572611962:web:461b708388123dd76ca2c3",
  measurementId: "G-1X88DZWSFF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth and Firestore
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
