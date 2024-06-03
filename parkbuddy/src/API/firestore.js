// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC087O7xgFqfES-bdswNCttRcCbRFOXFlc",
  authDomain: "parkbuddy-31f23.firebaseapp.com",
  projectId: "parkbuddy-31f23",
  storageBucket: "parkbuddy-31f23.appspot.com",
  messagingSenderId: "226964192727",
  appId: "1:226964192727:web:05c1d32fd2befb8ffc9f92"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db=getFirestore(app);