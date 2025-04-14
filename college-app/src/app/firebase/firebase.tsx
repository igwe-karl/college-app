// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCoZJI_EF94jP6epCjeORkxaoZzCUaAq5g",
  authDomain: "college-road-trip-app.firebaseapp.com",
  projectId: "college-road-trip-app",
  storageBucket: "college-road-trip-app.firebasestorage.app",
  messagingSenderId: "669625918897",
  appId: "1:669625918897:web:e889d145b31ae6e2d74990",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
