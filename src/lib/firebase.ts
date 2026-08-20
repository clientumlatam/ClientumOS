import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCRajIMl2Nk2ZBdLl76gy2FL8NRdUeMj9Y",
  authDomain: "gothic-presence-nds98.firebaseapp.com",
  projectId: "gothic-presence-nds98",
  storageBucket: "gothic-presence-nds98.firebasestorage.app",
  messagingSenderId: "960057091990",
  appId: "1:960057091990:web:3a0d91bd4ec49dbaa3dfb7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

// Add contacts scope to google provider
googleProvider.addScope('https://www.googleapis.com/auth/contacts');

export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);
export const logout = () => signOut(auth);
