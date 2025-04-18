// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCYrRP_WCPYEGw1Bc4KUF_3WkwD9pxwLkI",
  authDomain: "reapir-pos.firebaseapp.com",
  projectId: "reapir-pos",
  storageBucket: "reapir-pos.firebasestorage.app",
  messagingSenderId: "191552802807",
  appId: "1:191552802807:web:486564f125f277eedc68f2",
  measurementId: "G-S31BY37MGN"
};

// Inicializar Firebase y Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
