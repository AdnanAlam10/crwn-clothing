import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAA-Jjd6c8rBe-k7GrhRHH3KuSCOHWeViM",
  authDomain: "crwn-clothing-db-b3498.firebaseapp.com",
  projectId: "crwn-clothing-db-b3498",
  storageBucket: "crwn-clothing-db-b3498.appspot.com",
  messagingSenderId: "904025600934",
  appId: "1:904025600934:web:780fb9b5170c99289b5567",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;
  //Creates a new user document
  const userDocRef = doc(db, "users", userAuth.uid);

  // Method used for checking if the user is already in the database
  const userSnapshot = await getDoc(userDocRef);

  // Runs when a new user logs in and needs to be created
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      // Sets the information about the user in the document
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  return userDocRef;
};

export const createAuthUserwithEmailandPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};
