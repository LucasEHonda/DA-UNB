// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


// Initialize Firebase


const firebaseConfig = {
  apiKey: "AIzaSyC3-3kfeu8OF4P9C-81iaUTQSd4klUDG7o",
  authDomain: "desenvolvimento-de-aplic-f7594.firebaseapp.com",
  projectId: "desenvolvimento-de-aplic-f7594",
  storageBucket: "desenvolvimento-de-aplic-f7594.appspot.com",
  messagingSenderId: "783139423002",
  appId: "1:783139423002:web:e0701ef7b9eb8fa86d62a3",
  measurementId: "G-YEPF293ZEY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export  const auth = getAuth();
export default app;




