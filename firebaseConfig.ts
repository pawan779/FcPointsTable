// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBdziz8l--ZJW55yc4wWzffgoMx9MkOx1Q",
  authDomain: "fcmobile-3934c.firebaseapp.com",
  databaseURL: "https://fcmobile-3934c-default-rtdb.firebaseio.com",
  projectId: "fcmobile-3934c",
  storageBucket: "fcmobile-3934c.appspot.com",
  messagingSenderId: "278484997119",
  appId: "1:278484997119:web:a3d63694f7d28b830e0dca",
  measurementId: "G-G79S97HBME",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

export { database };
