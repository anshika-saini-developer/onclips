import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace these placeholders with your actual Firebase project config.
// The user noted they will provide the keys later.


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
