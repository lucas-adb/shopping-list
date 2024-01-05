import { collection, doc, setDoc } from "firebase/firestore";
// import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";

const shoppingUserCollection = collection(db, "users");

export const addNewUser = async (email, userId, userName, photoUrl) => {
  try {
    const userDocRef = doc(shoppingUserCollection, userId);

    await setDoc(userDocRef, {
      email,
      userId,
      userName,
      // TODO: add feature that adds image to user
      photoUrl,
    });

    console.log("User added successfully");
  } catch (error) {
    console.error(error);
  }
};
