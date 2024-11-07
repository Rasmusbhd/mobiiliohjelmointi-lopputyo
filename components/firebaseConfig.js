import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCoA9myUs4kcwSyubQ2NnOGElPifWEZUMY",
  authDomain: "songlyricsapp-d6627.firebaseapp.com",
  databaseURL: "https://songlyricsapp-d6627-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "songlyricsapp-d6627",
  storageBucket: "songlyricsapp-d6627.appspot.com",
  messagingSenderId: "199360320829",
  appId: "1:199360320829:web:c23671efa473db4c8b6154",
  measurementId: "G-X54X6FNWYF"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);


