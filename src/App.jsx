import { useEffect, useState } from "react";
import { db } from "./config/firebase";
import "./App.css";
import {
  collection,
  doc,
  updateDoc,
  onSnapshot,
  deleteDoc,
} from "firebase/firestore";

import { FaRegTrashCan } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";

const shoppingItemsCollection = collection(db, "items");

function ShoppingListApp() {
  const [shoppingItems, setShoppingItems] = useState([]);
  const [isEditBtnClicked, setIsEditBtnClicked] = useState(false);

  useEffect(() => {
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

    return () => stopListeningToShoppingItems();
  }, []);

  async function toggleItemCompletion(id, previousItemCompletion) {
    const shoppingItemDoc = doc(db, "items", id);
    await updateDoc(shoppingItemDoc, { completed: !previousItemCompletion });
  }

  async function deleteItem(id) {
    const shoppingItemDoc = doc(db, "items", id);
    await deleteDoc(shoppingItemDoc);
  }

  return (
    <div className="shopping-list">
      <h1>Shopping List</h1>

      {shoppingItems?.map((item) => (
        <div key={item.id} className="shopping-list-item">
          <label
            htmlFor={item.id}
            className={item.completed ? "item-completed" : "item-uncompleted"}
          >
            <input
              type="checkbox"
              name="checkbox"
              id={item.id}
              checked={item.completed}
              onChange={() => toggleItemCompletion(item.id, item.completed)}
            />
            {/* {item.title} */}
            {isEditBtnClicked ? (
              <input type="text" placeholder="Edit..." className="edit-input"/>
            ) : (
              item.title
            )}
          </label>
          <button
            className="edit-btn"
            onClick={() => setIsEditBtnClicked(!isEditBtnClicked)}
          >
            <FaEdit className="edit" />
          </button>
          <button className="delete-btn" onClick={() => deleteItem(item.id)}>
            <FaRegTrashCan className="trash-can" />
          </button>
        </div>
      ))}
    </div>
  );
}

export default ShoppingListApp;
