import { useEffect, useState } from "react";
import { db } from "./config/firebase";
import "./App.css";
import { collection, getDocs } from "firebase/firestore";

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
  }, [shoppingList]);

  return (
    <>
      <h1>Shopping List</h1>

      {shoppingList.map((item) => (
        <div key={item.id}>
          <input 
          type="checkbox" 
          checked={item.completed}
          // TODO: change value of docs when input is checked or unchecked
          // onChange={}
          />
          <p>{item.title}</p>
        </div>
      ))}
    </>
  );
}

export default App;
