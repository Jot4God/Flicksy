import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
   apiKey: "AIzaSyCkFDJHDfOOVeUzeoVwaeVbpqr83gw7gqM",
  authDomain: "flicksy-db008.firebaseapp.com",
  projectId: "flicksy-db008",
  storageBucket: "flicksy-db008.firebasestorage.app",
  messagingSenderId: "652381369041",
  appId: "1:652381369041:web:1c4edccc51d470b0cf8bf0"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();