import { useEffect, useState } from "react";
import { db } from "./config/firebase";
import "./App.css";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";

const itemsCollectionRef = collection(db, "items");

async function getShoppingList() {
  try {
    const data = await getDocs(itemsCollectionRef);
    const filteredData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    return filteredData;
  } catch (error) {
    console.error(error);
  }
}

function App() {
  const [shoppingList, setShoppingList] = useState([]);

  useEffect(() => {
    getShoppingList().then(setShoppingList);
  }, []);

  async function updateIsItemCompleted(id, isCompleted) {
    console.log(id);

    const shoppingListDoc = doc(db, "items", id);
    console.log(shoppingListDoc)
    await updateDoc(shoppingListDoc, { completed: !isCompleted})
    getShoppingList().then(setShoppingList);
  }

  return (
    <div>
      <h1>Shopping List</h1>

      {shoppingList?.map((item) => (
        <div key={item.id} className="shopping-list-item">
          <input 
          type="checkbox" 
          checked={item.completed}
          onChange={() => updateIsItemCompleted(item.id, item.completed)}
          />
          <p>{item.title}</p>
        </div>
      ))}
    </ div>
  );
}

export default App;
