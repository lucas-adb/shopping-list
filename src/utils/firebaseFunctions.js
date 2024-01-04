// firebaseFunctions.js
import {
  doc,
  updateDoc,
  deleteDoc,
  collection,
  onSnapshot,
  addDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";

import { auth } from "../config/firebase";

const shoppingItemsCollection = collection(db, "items");

export function getShoppingItems(setShoppingItems) {
  // const shoppingItemsCollection = collection(db, "items");

  const stopListeningToShoppingItems = onSnapshot(
    shoppingItemsCollection,
    (snapshot) => {
      const updatedItems = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setShoppingItems(updatedItems);
    }
  );

  return stopListeningToShoppingItems;
}

// CREATE

export async function addNewMovie(newItem) {
  try {
    await addDoc(shoppingItemsCollection, {
      title: newItem,
      completed: false,
      // userId: "01",
      // Todo: create authentication
      userId: auth?.currentUser?.uid,
    })
  } catch (error) {
    console.error(error);
  }
}

export async function toggleItemCompletion(id, previousItemCompletion) {
  const shoppingItemDoc = doc(db, "items", id);
  await updateDoc(shoppingItemDoc, { completed: !previousItemCompletion });
}

export async function deleteItem(id) {
  const shoppingItemDoc = doc(db, "items", id);
  await deleteDoc(shoppingItemDoc);
}

export async function updateItemTitle(id, newTitle) {
  const shoppingItemDoc = doc(db, "items", id);
  await updateDoc(shoppingItemDoc, { title: newTitle });
}
