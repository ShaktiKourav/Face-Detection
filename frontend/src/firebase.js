// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBMAzTnJtxEeofBkox7eBxYYPWQYNXV7Fk",
  authDomain: "face-detection-913be.firebaseapp.com",
  projectId: "face-detection-913be",
  storageBucket: "face-detection-913be.firebasestorage.app",
  messagingSenderId: "932317130268",
  appId: "1:932317130268:web:1ba1e41f9072c21c2d39d9",
  measurementId: "G-2C9JVVQXSY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();