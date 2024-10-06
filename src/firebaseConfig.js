// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";  // Add this

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBmTULwyqiklreyvo-o6wSvWQXIiHozWLs",
  authDomain: "assignment-cf13c.firebaseapp.com",
  projectId: "assignment-cf13c",
  storageBucket: "assignment-cf13c.appspot.com",  // Make sure this is defined
  messagingSenderId: "852314877832",
  appId: "1:852314877832:web:cea8f937247c509f42543d",
  measurementId: "G-FEWWFZSEYY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);  // Add this

// Export the necessary Firebase modules
export { app, auth, db, storage };
