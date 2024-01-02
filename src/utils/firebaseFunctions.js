// firebaseFunctions.js
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../config/firebase";

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