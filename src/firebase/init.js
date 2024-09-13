// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAdPJUOYJJ-v47NurlRze0DKyXqoW3g7P8",
  authDomain: "week7-lab-e8c5d.firebaseapp.com",
  projectId: "week7-lab-e8c5d",
  storageBucket: "week7-lab-e8c5d.appspot.com",
  messagingSenderId: "519193383886",
  appId: "1:519193383886:web:92343dce5123233a71919f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db
