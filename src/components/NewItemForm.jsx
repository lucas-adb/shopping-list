import { useState } from "react";
import { addNewMovie } from "../utils/firebaseFunctions";

import { FaCirclePlus } from "react-icons/fa6";

function NewItemForm() {
  const [newItem, setNewItem] = useState("");

  const isTextInputValid = (value) => {
    return (value && value.trim() !== "")
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if(isTextInputValid(newItem)) {
      addNewMovie(newItem);
      setNewItem("");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="new-item-input-wrapper">
      <input
        type="text"
        className="new-item-input"
        placeholder="Add a new Item..."
        value={newItem}
        onChange={(event) => setNewItem(event.target.value)}
      />
      <button
        disabled={!(isTextInputValid(newItem))}
        className="add-new-item-btn"
        type="submit"
      >
        <FaCirclePlus />
      </button>
    </form>
  );
}

export default NewItemForm;
