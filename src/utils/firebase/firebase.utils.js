import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  writeBatch,
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAA-Jjd6c8rBe-k7GrhRHH3KuSCOHWeViM",
  authDomain: "crwn-clothing-db-b3498.firebaseapp.com",
  projectId: "crwn-clothing-db-b3498",
  storageBucket: "crwn-clothing-db-b3498.appspot.com",
  messagingSenderId: "904025600934",
  appId: "1:904025600934:web:780fb9b5170c99289b5567",
};

const firebaseApp = initializeApp(firebaseConfig);

// Creating and initializing a new google auth provider instance
const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

// Creating and initializing a new google sign in instance
export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

// Creating and initializing firestore
export const db = getFirestore();

// Adds a whole collection with the documents to firestore
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  // Creating a collection in the db
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  // Adds all documents in the collection as a batch
  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  // Commits the batch to firestore
  await batch.commit();
  console.log("done");
};

// Gets the categories collection with the documents within
export const getCategoriesAndDocuments = async () => {
  // Calls the categories collection and reads it
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  // Checks whether categories collection is present in firestore
  const querySnapshot = await getDocs(q);

  // Forming a category map from all the documents
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});

  return categoryMap;
};

// Creates a new user document after signing up
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  // Calls the user category with user auth id
  const userDocRef = doc(db, "users", userAuth.uid);

  // Checks whether user document exists in firestore
  const userSnapshot = await getDoc(userDocRef);

  // Creates a new user document if it doesn't exist
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      // Saves the document in the user collection in firestore
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

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

// Listener that tracks when user state changes
export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
