// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "ez-auth-f0e7b.firebaseapp.com",
  projectId: "ez-auth-f0e7b",
  storageBucket: "ez-auth-f0e7b.appspot.com",
  messagingSenderId: "811797865925",
  appId: "1:811797865925:web:f5da30a939456c634197ac"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);