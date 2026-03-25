import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace these placeholders with your actual Firebase project config.
// The user noted they will provide the keys later.
const firebaseConfig = {
  apiKey: "AIzaSyBPtN3QUReKau7EZu2_LuB81CA1z-vEUGA",
  authDomain: "onclip-264d0.firebaseapp.com",
  projectId: "onclip-264d0",
  storageBucket: "onclip-264d0.firebasestorage.app",
  messagingSenderId: "221352887778",
  appId: "1:221352887778:web:14604f9f3dbcb83a0565bb",
  measurementId: "G-D7ZZB18GZE"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
