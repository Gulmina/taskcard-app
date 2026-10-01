import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAGZTJDjuQKDtrfdWCG8xU2kwEMwbDeQcA",
  authDomain: "taskcard-abe70.firebaseapp.com",
  projectId: "taskcard-abe70",
  storageBucket: "taskcard-abe70.firebasestorage.app",
  messagingSenderId: "313755595456",
  appId: "1:313755595456:web:1de397dd5f88480b58b325",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
