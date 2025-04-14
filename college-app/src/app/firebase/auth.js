import { auth } from "./firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updatePassword,
} from "firebase/auth";

export const doSignInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    // You can access the user and token if needed:
    const user = result.user;
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;

    return { user, token };
  } catch (error) {
    console.error("Google sign-in error:", error);
    throw error;
  }
};

export const doCreateUserWithEmailAndPassword = async (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const doSignInWithEmailAndPassword = async (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const doSignOut = async () => {
  return signOut(auth);
};

export const doPasswordReset = async (email) => {
  return sendPasswordResetEmail(auth, email);
};

export const doPasswordUpdate = async (password) => {
  return updatePassword(auth.currentUser, password);
};

export const doSendEmailVerification = async () => {
  return sendEmailVerification(auth.currentUser, {
    // url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
    url: "http://localhost:3000/verify-email",
  });
};
