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
      createdAt: Date.now(),
    });
  } catch (error) {
    console.error(error);
  }
}

// READ
export function getItems(setShoppingItems) {
  try {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const shoppingItemsCollection = collection(
          db,
          `users/${user.uid}/items`
        );

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
  } catch (error) {
    console.error(error);
  }
}

export function getUsername(setUsername) {
  try {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const userDoc = doc(db, `users/${user.uid}`);

        return onSnapshot(userDoc, (snapshot) => {
          const userData = snapshot.data();
          const updatedUsername = userData ? userData.username : "";
          setUsername(updatedUsername);
        });
      }
    });

    return () => unsubscribe();
  } catch (error) {
    console.error(error);
  }
}

export function getPhotoURL(setPhotoURL) {
  const defaultPhoto = "https://firebasestorage.googleapis.com/v0/b/shoppinglist-12d68.appspot.com/o/profilePictures%2Fprofile-default-shopping-list.png?alt=media&token=d9f69760-80a9-4b28-84bd-7543e26b7e54";

  try {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const userDoc = doc(db, `users/${user.uid}`);

        return onSnapshot(userDoc, (snapshot) => {
          const userData = snapshot.data();
          const updatedUsername = userData ? userData.photoUrl : defaultPhoto;
          setPhotoURL(updatedUsername);
        });
      }
    });

    return () => unsubscribe();
  } catch (error) {
    console.error(error);
  }
}

// UPDATE
export async function toggleItemCompletion(id, previousItemCompletion) {
  try {
    const shoppingItemDoc = doc(db, `users/${auth.currentUser.uid}/items`, id);
    await updateDoc(shoppingItemDoc, { completed: !previousItemCompletion });
  } catch (error) {
    console.error(error);
  }
}

export async function updateItemTitle(id, newTitle) {
  try {
    const shoppingItemDoc = doc(db, `users/${auth.currentUser.uid}/items`, id);
    await updateDoc(shoppingItemDoc, { title: newTitle });
  } catch (error) {
    console.error(error);
  }
}

// DELETE
export async function deleteItem(id) {
  try {
    const shoppingItemDoc = doc(db, `users/${auth.currentUser.uid}/items`, id);
    await deleteDoc(shoppingItemDoc);
  } catch (error) {
    console.error(error);
  }
}
