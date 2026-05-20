// src/lib/firebase.js
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC3847UTAE_5jUCIDyUtKbjNEOmXtUcFu4",
    authDomain: "labmilanes-f9e5b.firebaseapp.com",
    projectId: "labmilanes-f9e5b",
    storageBucket: "labmilanes-f9e5b.firebasestorage.app",
    messagingSenderId: "966385505308",
    appId: "1:966385505308:web:762c2d1286cce41f113bd9",
    measurementId: "G-08M3WSC6WH"
};

// Initialize Firebase main app
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Firebase Authentication
export const auth = getAuth(app);
