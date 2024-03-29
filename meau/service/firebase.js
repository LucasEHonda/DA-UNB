import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC3-3kfeu8OF4P9C-81iaUTQSd4klUDG7o",
  authDomain: "desenvolvimento-de-aplic-f7594.firebaseapp.com",
  projectId: "desenvolvimento-de-aplic-f7594",
  storageBucket: "desenvolvimento-de-aplic-f7594.appspot.com",
  messagingSenderId: "783139423002",
  appId: "1:783139423002:web:e0701ef7b9eb8fa86d62a3",
  measurementId: "G-YEPF293ZEY",
};

const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
export default firebaseApp;
