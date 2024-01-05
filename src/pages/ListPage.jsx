import { useEffect, useState } from "react";
import ShoppingItem from "../components/ShoppingItem";
import { getItems } from "../utils/firebaseFunctions";
import "../App.css";
import NewItemForm from "../components/NewItemForm";

function ListPage() {
  const [shoppingItems, setShoppingItems] = useState([]);

  useEffect(() => {
    const stopListeningToShoppingItems = getItems(setShoppingItems);

    return () => stopListeningToShoppingItems();
  }, []);

  return (
    <div className="shopping-list">
      <h1>Shopping List</h1>

      <NewItemForm />

      {shoppingItems?.map((item) => (
        <ShoppingItem key={item.id} item={item} />
      ))}
    </div>
  );
}

export default ListPage;
