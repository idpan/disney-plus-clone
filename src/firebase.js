// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBw3V3Ln_-8C2SK2l-H6iaKaqhSnYSClcE",
  authDomain: "disney-plus-clone-e04b9.firebaseapp.com",
  projectId: "disney-plus-clone-e04b9",
  storageBucket: "disney-plus-clone-e04b9.appspot.com",
  messagingSenderId: "558382099754",
  appId: "1:558382099754:web:57468d8e51b34d19320253",
  measurementId: "G-BJE2VQ9LGX",
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth();

const provider = new GoogleAuthProvider();

export { auth, provider };
export default db;
