import { auth } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    throw err
  }
};

export const signUp = async (email, password) => {
  try {
    const data = await createUserWithEmailAndPassword(auth, email, password);
    return data;
  } catch (err) {
    if (err.message.includes("auth/email-already-in-use")) {
      alert("Email already in use");
    } else {
      console.error(err);
      throw err
    }
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (err) {
    console.error(err);
  }
};
