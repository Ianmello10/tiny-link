import { getApp, initializeApp } from "firebase/app";
import "firebase/firestore";
import { getFirestore, initializeFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

function initializeAppIfNotExists() {
  try {
    return getApp();
  } catch (any) {
    const firebaseConfig = {
      apiKey: import.meta.env.VITE_API_KEY,
      authDomain: import.meta.env.VITE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_APP_ID,
    };

    return initializeApp(firebaseConfig);
  }
}
// Initialize Firebase
const app = initializeAppIfNotExists();
//const db = getFirestore(app)
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

export default db;
