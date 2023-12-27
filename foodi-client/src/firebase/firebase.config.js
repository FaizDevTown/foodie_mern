// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAYc2WmnVuFVLK47lA2KgEKgV8adf_trvc",
  authDomain: "zomato-f18f3.firebaseapp.com",
  projectId: "zomato-f18f3",
  storageBucket: "zomato-f18f3.appspot.com",
  messagingSenderId: "505473674287",
  appId: "1:505473674287:web:09bb12787611e5db7aaada"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;