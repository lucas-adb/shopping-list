import { useState } from "react";
import { addNewItem } from "../utils/firebaseFunctions";

import { validateNewItem } from "../validations/newItem";
import { MotionNewItemBtn } from "./MotionNewItemBtn";

function NewItemForm() {
  const [newItem, setNewItem] = useState("");
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const newErr = validateNewItem(newItem);

    if (!newErr) {
      addNewItem(newItem);
      setNewItem("");
      setErrorVisible(false);
    } else {
      setErrorMessage(newErr);
      setErrorVisible(true);
    }
  };

  return (
      <form onSubmit={handleSubmit} className="new-item-form">
        <div className="new-item-input-wrapper">
          <input
            type="text"
            className="new-item-input"
            placeholder="Add a new Item..."
            value={newItem}
            onChange={(event) => setNewItem(event.target.value)}
          />
          <MotionNewItemBtn />
        </div>
        {errorVisible && <p className="input-error-p">{errorMessage}</p>}
      </form>
  );
}

export default NewItemForm;
