// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBmTULwyqiklreyvo-o6wSvWQXIiHozWLs",
  authDomain: "assignment-cf13c.firebaseapp.com",
  projectId: "assignment-cf13c",
  storageBucket: "assignment-cf13c.appspot.com",
  messagingSenderId: "852314877832",
  appId: "1:852314877832:web:cea8f937247c509f42543d",
  measurementId: "G-FEWWFZSEYY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { app, auth };
