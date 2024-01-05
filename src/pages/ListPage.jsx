import { useEffect, useState } from "react";
import { auth } from "../config/firebase"; // Import your Firebase auth object
import ShoppingItem from "../components/ShoppingItem";
import { getItems } from "../utils/firebaseFunctions";
import "../App.css";
import NewItemForm from "../components/NewItemForm";

function ListPage() {
  const [shoppingItems, setShoppingItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setLoading(false);
      if (user) {
        const stopListeningToShoppingItems = getItems(setShoppingItems);
        return () => stopListeningToShoppingItems();
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Or your custom loading component
  }

  return (
    <div className="shopping-list">
      <h1>Shopping List</h1>

      <NewItemForm />

      {shoppingItems?.map((item) => (
        <ShoppingItem key={item.id} item={item} />
      ))}
    </div>
  )
}

export default ListPage;