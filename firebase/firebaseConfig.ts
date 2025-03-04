// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "REDACTED_FIREBASE_API_KEY",
  authDomain: "licence-server-682e3.firebaseapp.com",
  projectId: "licence-server-682e3",
  storageBucket: "licence-server-682e3.firebasestorage.app",
  messagingSenderId: "REDACTED_FIREBASE_MESSAGING_SENDER_ID",
  appId: "1:REDACTED_FIREBASE_MESSAGING_SENDER_ID:web:REDACTED_FIREBASE_APP_HASH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
auth.tenantId = process.env.NEXT_PUBLIC_FIREBASE_TENANT_ID as string;
// connectAuthEmulator(auth, "http://127.0.0.1:9099");
// connectFirestoreEmulator(firestore, "127.0.0.1", 8080)

export { auth, firestore }