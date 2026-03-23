import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

export interface ClipData {
  text: string;
  createdAt: any;
}

const EXPIRY_TIME_MS = 15 * 60 * 1000; // 15 minutes

const generateId = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const saveClip = async (text: string): Promise<string> => {
  let id = generateId();
  let unique = false;
  
  // Basic collision check (in a real high-traffic app, we'd do a transaction)
  while (!unique) {
    const docRef = doc(db, 'clips', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      id = generateId();
    } else {
      unique = true;
    }
  }

  const docRef = doc(db, 'clips', id);
  await setDoc(docRef, {
    text,
    createdAt: serverTimestamp(),
  });

  return id;
};

export const getClip = async (id: string): Promise<string | null> => {
  const docRef = doc(db, 'clips', id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return null;
  }

  const data = docSnap.data() as ClipData;
  if (!data.createdAt) return data.text; // Just in case timestamp hasn't settled yet locally

  const now = Date.now();
  // Handle Firestore TIMESTAMP which has seconds and nanoseconds
  const createdAtMs = data.createdAt.toMillis ? data.createdAt.toMillis() : Date.now();

  // Check if expired
  if (now - createdAtMs > EXPIRY_TIME_MS) {
    // Too old
    return null;
  }

  return data.text;
};
