// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAkg5VrEHfZ8aUFMqYNV2kM4iSq5pYVeBE",
  authDomain: "mi-plaza-norte.firebaseapp.com",
  projectId: "mi-plaza-norte",
  storageBucket: "mi-plaza-norte.firebasestorage.app",
  messagingSenderId: "992238393239",
  appId: "1:992238393239:web:244e8b918bb606148016d2",
  measurementId: "G-37C6327PEQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);