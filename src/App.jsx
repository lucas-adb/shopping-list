import { useEffect, useState } from "react";
import { db } from "./config/firebase";
import "./App.css";
import { collection, doc, updateDoc, onSnapshot } from "firebase/firestore";

const shoppingItemsCollection = collection(db, "items");

function ShoppingListApp() {
  const [shoppingItems, setShoppingItems] = useState([]);

  useEffect(() => {
    const stopListeningToShoppingItems = onSnapshot(shoppingItemsCollection, (snapshot) => {
      const updatedItems = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setShoppingItems(updatedItems);
    });

    return () => stopListeningToShoppingItems();
  }, []);

  async function toggleItemCompletion(id, previousItemCompletion) {
    const shoppingItemDoc = doc(db, "items", id);
    await updateDoc(shoppingItemDoc, { completed: !previousItemCompletion });
  }

  return (
    <div>
      <h1>Shopping List</h1>

      {shoppingItems?.map((item) => (
        <div key={item.id} className="shopping-list-item">
          <input 
          type="checkbox" 
          checked={item.completed}
          onChange={() => toggleItemCompletion(item.id, item.completed)}
          />
          <p>{item.title}</p>
        </div>
      ))}
    </ div>
  );
}

export default ShoppingListApp;