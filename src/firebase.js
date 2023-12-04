import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "lottokeeper-33fbe.firebaseapp.com",
  projectId: "lottokeeper-33fbe",
  storageBucket: "lottokeeper-33fbe.appspot.com",
  messagingSenderId: "1059665947361",
  appId: "1:1059665947361:web:3d2e3c49b9340e35cda5a0"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);