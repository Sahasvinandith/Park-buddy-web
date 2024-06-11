// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAB8V1VvFmESz-SPtwh6RzX3w70-N_3yx4",
  authDomain: "authentication-bb294.firebaseapp.com",
  projectId: "authentication-bb294",
  storageBucket: "authentication-bb294.appspot.com",
  messagingSenderId: "570365762486",
  appId: "1:570365762486:web:c714f635efb0156d7c3f17"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export {auth}
//export default app;