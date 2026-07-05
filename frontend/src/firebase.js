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
  apiKey: "AIzaSyCFJiaDAL_8DEOM-cPlj4Qw4YhW-8LkqRk",
  authDomain: "face-detection-ec20a.firebaseapp.com",
  projectId: "face-detection-ec20a",
  storageBucket: "face-detection-ec20a.firebasestorage.app",
  messagingSenderId: "495824602646",
  appId: "1:495824602646:web:efe86e67d698bca0a55737",
  measurementId: "G-0JZW1T8YS6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();