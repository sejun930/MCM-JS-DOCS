// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_KEY,
  authDomain: "mcm-js.firebaseapp.com",
  projectId: "mcm-js",
  storageBucket: "mcm-js.appspot.com",
  messagingSenderId: "526957034744",
  appId: "1:526957034744:web:f2dde9e0325535afe18f0d",
  measurementId: "G-B6KWZ1B1D8",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(firebaseApp);
