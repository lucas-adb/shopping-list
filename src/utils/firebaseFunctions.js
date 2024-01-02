// firebaseFunctions.js
import {
  doc,
  updateDoc,
  deleteDoc,
  collection,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../config/firebase";

export function getShoppingItems(setShoppingItems) {
  const shoppingItemsCollection = collection(db, "items");

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
