import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Check if config is likely valid
const requiredKeys = [
    'apiKey', 'authDomain', 'databaseURL', 'projectId',
    'storageBucket', 'messagingSenderId', 'appId'
];
const missingKeys = requiredKeys.filter(key => !firebaseConfig[key] || firebaseConfig[key] === 'your_' + key.replace(/([A-Z])/g, '_$1').toLowerCase() + '_here');

const isConfigValid = missingKeys.length === 0;

let app;
let auth = null;
let db = null;
let initializationError = null;

if (isConfigValid) {
    try {
        app = initializeApp(firebaseConfig);
        auth = getAuth(app);
        db = getDatabase(app);
    } catch (error) {
        console.error("Firebase Initialization Error:", error);
        initializationError = new Error("Failed to initialize Firebase: " + error.message);
    }
} else {
    console.error("Firebase Configuration Missing. Missing Keys:", missingKeys);
    console.log("Current Config State:", Object.fromEntries(Object.entries(firebaseConfig).map(([k, v]) => [k, v ? 'SET' : 'MISSING'])));
    // We do NOT throw here to avoid crashing the module loader.
    // Instead we record the error to throw inside the React Component.
    initializationError = new Error(`Firebase Configuration Missing. Missing keys: ${missingKeys.join(', ')}. Please check your .env file and GitHub Secrets.`);
}

const storage = app ? getStorage(app) : null;
export { auth, db, storage, initializationError };
