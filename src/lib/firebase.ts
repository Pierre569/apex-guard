import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyD6Kn_gcoFLm6PpdK7hMPAbJ1NDOPnxqiY",
    authDomain: "apex-guard-nc-2026.firebaseapp.com",
    projectId: "apex-guard-nc-2026",
    storageBucket: "apex-guard-nc-2026.firebasestorage.app",
    messagingSenderId: "366001641242",
    appId: "1:366001641242:web:b46ede617c5bce210afea3",
    measurementId: "G-YNE73W3BPB"
};

// Initialize Firebase (Singleton pattern)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const db = getFirestore(app);

// Safe Analytics Initialization (Client-Side Only)
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
