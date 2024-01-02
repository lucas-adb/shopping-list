import { useEffect, useState } from "react";
import { db } from "./config/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import ShoppingItem from "./components/ShoppingItem";
import "./App.css";


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

  return (
    <div className="shopping-list">
      <h1>Shopping List</h1>

      {shoppingItems?.map((item) => (
        <ShoppingItem key={item.id} item={item} />
      ))}
    </div>
  );
}

export default ShoppingListApp;
