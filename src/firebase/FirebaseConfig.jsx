import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD3TRW50j5-1g62WYO7m4EBBq75PwuFcTA",
    authDomain: "e-commerce-ead26.firebaseapp.com",
    projectId: "e-commerce-ead26",
    storageBucket: "e-commerce-ead26.firebasestorage.app",
    messagingSenderId: "296685902997",
    appId: "1:296685902997:web:8b2104baef6d484ffe0f9c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app)
export { fireDB, auth };