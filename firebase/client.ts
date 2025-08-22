// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC1TYgBe7Le7fYxzcaSdYJkoCta8PxuhpE",
  authDomain: "ipreach-f9eaa.firebaseapp.com",
  projectId: "ipreach-f9eaa",
  storageBucket: "ipreach-f9eaa.firebasestorage.app",
  messagingSenderId: "311268603654",
  appId: "1:311268603654:web:fcc598f3a1588831695087",
  measurementId: "G-W7ZSTL46WM"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
