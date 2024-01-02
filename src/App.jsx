import { useEffect, useState } from "react";
import { db } from "./config/firebase";
import "./App.css";
import { collection, doc, updateDoc, onSnapshot } from "firebase/firestore";

import { FaRegTrashCan } from "react-icons/fa6";

const shoppingItemsCollection = collection(db, "items");

function ShoppingListApp() {
  const [shoppingItems, setShoppingItems] = useState([]);

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
            {item.title}
          </label>
          <button className="delete-btn" onClick={(event) => console.log(event.target)}>
            <FaRegTrashCan className="trash-can" />
          </button>
        </div>
      ))}
    </div>
  );
}

export default ShoppingListApp;
