// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBaNknTXrBWF8mweoWdFnrcmjvzDwWe-5I",
  authDomain: "yumi-clone.firebaseapp.com",
  projectId: "yumi-clone",
  storageBucket: "yumi-clone.appspot.com",
  messagingSenderId: "441717903937",
  appId: "1:441717903937:web:285c71b4e95b4025806cc0",
  measurementId: "G-92CWFX54BC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);