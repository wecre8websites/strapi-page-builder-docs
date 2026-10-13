import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Read from the environment (see .env.example). Next.js only inlines NEXT_PUBLIC_ variables that are referenced literally.
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const missing = Object.entries(firebaseConfig).filter(([, value]) => !value).map(([key]) => key);
if (missing.length) {
  throw new Error(`Missing Firebase settings (${missing.join(", ")}). Copy .env.example to .env.local and fill in the NEXT_PUBLIC_FIREBASE_* values.`);
}

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
auth.tenantId = process.env.NEXT_PUBLIC_FIREBASE_TENANT_ID as string;
// connectAuthEmulator(auth, "http://127.0.0.1:9099");
// connectFirestoreEmulator(firestore, "127.0.0.1", 8080)

export { auth, firestore }
