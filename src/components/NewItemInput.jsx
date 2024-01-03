import { useState } from "react";
import { addNewMovie } from "../utils/firebaseFunctions";

import { FaCirclePlus } from "react-icons/fa6";

function NewItemInput() {
  const [newItem, setNewItem] = useState("");

  return (
    <div className="new-item-input-wrapper">
      <input
        type="text"
        className="new-item-input"
        placeholder="Add a new Item..."
        onChange={(event) => setNewItem(event.target.value)}
      />
      <button
        onClick={() => addNewMovie(newItem)}
        disabled={!(newItem && newItem.trim() !== "")}
        className="add-new-item-btn"
      >
        <FaCirclePlus />
      </button>
    </div>
  );
}

export default NewItemInput;
