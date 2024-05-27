// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain: "mk-tech-blog.firebaseapp.com",
  projectId: "mk-tech-blog",
  storageBucket: "mk-tech-blog.appspot.com",
  messagingSenderId: "1092831282400",
  appId: "1:1092831282400:web:96e09f9e9a07d665f7fc85",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
