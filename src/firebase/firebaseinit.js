import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBIJqL1HDHar-Qb5sWrm1EDzDQH8Ep-KI8",
  authDomain: "vueblog-22895.firebaseapp.com",
  projectId: "vueblog-22895",
  storageBucket: "vueblog-22895.appspot.com",
  messagingSenderId: "1042907256466",
  appId: "1:1042907256466:web:110a00d49df19d313a384b",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);
