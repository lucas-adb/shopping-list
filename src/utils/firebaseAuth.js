import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
  }
};
