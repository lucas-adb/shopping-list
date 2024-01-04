// firebaseFunctions.js
import {
  doc,
  updateDoc,
  deleteDoc,
  collection,
  onSnapshot,
  addDoc,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "../config/firebase";

import { auth } from "../config/firebase";

const shoppingItemsCollection = collection(db, "items");

// Read

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

export function getShoppingItemsByUserId(setShoppingItems) {
  const unsubscribe = auth.onAuthStateChanged((user) => {
    if (user) {
      const userQuery = query(
        shoppingItemsCollection,
        where("userId", "==", user.uid),
        orderBy("title")
      );

      const stopListeningToShoppingItems = onSnapshot(
        userQuery,
        (snapshot) => {
          const updatedItems = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setShoppingItems(updatedItems);
        }
      );

      return stopListeningToShoppingItems;
    } else {
      console.log("User is not authenticated");
      return () => {};
    }
  });

  return () => unsubscribe();
}

// export function getShoppingItemsByUserId(setShoppingItems) {
//   const userQuery = query(
//     shoppingItemsCollection,
//     where("userId", "==", auth.currentUser.uid),
//     orderBy("title")
//   );

//   const stopListeningToShoppingItems = onSnapshot(
//     userQuery,
//     (snapshot) => {
//       const updatedItems = snapshot.docs.map((doc) => ({
//         ...doc.data(),
//         id: doc.id,
//       }));
//       setShoppingItems(updatedItems);
//     }
//   );

//   return stopListeningToShoppingItems;
// }

// CREATE

// TODO: rename to addNewItem
export async function addNewItem(newItem) {
  try {
    await addDoc(shoppingItemsCollection, {
      title: newItem,
      completed: false,
      // userId: "01",
      // Todo: create authentication
      userId: auth?.currentUser?.uid,
    });
  } catch (error) {
    console.error(error);
  }
}

// UPDATE

export async function toggleItemCompletion(id, previousItemCompletion) {
  const shoppingItemDoc = doc(db, "items", id);
  await updateDoc(shoppingItemDoc, { completed: !previousItemCompletion });
}

export async function updateItemTitle(id, newTitle) {
  const shoppingItemDoc = doc(db, "items", id);
  await updateDoc(shoppingItemDoc, { title: newTitle });
}

// DELETE

export async function deleteItem(id) {
  const shoppingItemDoc = doc(db, "items", id);
  await deleteDoc(shoppingItemDoc);
}
