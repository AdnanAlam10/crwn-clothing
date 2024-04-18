import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";

// Firebase Project Config
const firebaseConfig = {
  apiKey: "AIzaSyD4w-VDUcaPrQ4Slyd14xgk1mRunqyoeBI",
  authDomain: "crwn-clothing-3a460.firebaseapp.com",
  projectId: "crwn-clothing-3a460",
  storageBucket: "crwn-clothing-3a460.appspot.com",
  messagingSenderId: "1056796965807",
  appId: "1:1056796965807:web:9e6bafafe4f12e1eec0d5a",
};

const firebaseApp = initializeApp(firebaseConfig);

// Initializing google authentication provider
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

// Setup google popup
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

// Initialize firestore
export const db = getFirestore();

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd,
  field = "title"
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object[field].toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log("done");
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});

  return categoryMap;
};

// Checks if user has logged in before and stores their data
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  // Reference to users document using uid
  const userDocRef = doc(db, "users", userAuth.uid);

  // Retrieve a document snapshot
  const userSnapshot = await getDoc(userDocRef);

  // Checks if user already exits in the users document
  if (!userSnapshot.exists()) {
    // Recording new user information
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      // Creates new user and stores in users document
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userDocRef;
};

//  Creating a new user using email and password
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

// Sigining in an existing user using email and password
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

// Listens for any updates on the user's auth state
export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
