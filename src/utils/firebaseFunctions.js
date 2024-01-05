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

// Read

export function getItems(setShoppingItems) {
  const unsubscribe = auth.onAuthStateChanged((user) => {
    if (user) {
      const shoppingItemsCollection = collection(db, `users/${user.uid}/items`);

      return onSnapshot(shoppingItemsCollection, (snapshot) => {
        const updatedItems = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setShoppingItems(updatedItems || []);
      });
    }
  });

  return () => unsubscribe();
}

// CREATE

export async function addNewItem(newItem) {
  const shoppingItemsCollection = collection(
    db,
    `users/${auth.currentUser.uid}/items`
  );

  try {
    await addDoc(shoppingItemsCollection, {
      title: newItem,
      completed: false,
      // TODO: do i really need that here now?
      userId: auth?.currentUser?.uid,
    });
  } catch (error) {
    console.error(error);
  }
}

// UPDATE

export async function toggleItemCompletion(id, previousItemCompletion) {
  const shoppingItemDoc = doc(db, `users/${auth.currentUser.uid}/items`, id);
  await updateDoc(shoppingItemDoc, { completed: !previousItemCompletion });
}

export async function updateItemTitle(id, newTitle) {
  const shoppingItemDoc = doc(db, `users/${auth.currentUser.uid}/items`, id);
  await updateDoc(shoppingItemDoc, { title: newTitle });
}

// DELETE

export async function deleteItem(id) {
  const shoppingItemDoc = doc(db, `users/${auth.currentUser.uid}/items`, id);
  await deleteDoc(shoppingItemDoc);
}
