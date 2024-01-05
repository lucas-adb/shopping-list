import { useEffect, useState } from "react";
import ShoppingItem from "../components/ShoppingItem";
import { getItems } from "../utils/firebaseFunctions";
import NewItemForm from "../components/NewItemForm";
import Logout from "../components/Logout";
import Welcome from "../components/Welcome";

function ListPage() {
  const [shoppingItems, setShoppingItems] = useState([]);

  useEffect(() => {
    const stopListeningToShoppingItems = getItems(setShoppingItems);

    return () => stopListeningToShoppingItems();
  }, []);

  return (
    <div className="shopping-list">

      <Welcome />

      <h1>Shopping List</h1>

      <NewItemForm />

      {shoppingItems?.map((item) => (
        <ShoppingItem key={item.id} item={item} />
      ))}

      <Logout />
    </div>
  );
}

export default ListPage;
