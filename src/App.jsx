import { useEffect, useState } from "react";
import ShoppingItem from "./components/ShoppingItem";
import { getShoppingItems } from "./utils/firebaseFunctions";
import "./App.css";
import NewItemForm from "./components/NewItemForm";
import Auth from "./components/Auth";

function ShoppingListApp() {
  const [shoppingItems, setShoppingItems] = useState([]);

  useEffect(() => {
    const stopListeningToShoppingItems = getShoppingItems(setShoppingItems);

    return () => stopListeningToShoppingItems();
  }, []);

  return (
    <div className="shopping-list">

      <Auth />

      <h1>Shopping List</h1>

      <NewItemForm />

      {shoppingItems?.map((item) => (
        <ShoppingItem key={item.id} item={item} />
      ))}
    </div>
  );
}

export default ShoppingListApp;
