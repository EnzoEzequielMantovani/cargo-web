import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAXRzX45OQLbykznjXg-lGsqtWf_rZc2M0",
  authDomain: "cargo-66a18.firebaseapp.com",
  projectId: "cargo-66a18",
  storageBucket: "cargo-66a18.firebasestorage.app",
  messagingSenderId: "466641854890",
  appId: "1:466641854890:web:db26174dd795db2bc94bd3"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
