import { useState } from "react";
import { FaSave } from "react-icons/fa";
import PropTypes from "prop-types";

function ItemEditInput({ id, editTitle }) {
  const [newTitle, setNewTitle] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    editTitle(newTitle);
    setNewTitle("");
  
  };


  return (
      <form onSubmit={handleSubmit} className="edit-title-form">
        <label htmlFor={id} className={"edit-item-label"}>
          <input
            type="text"
            placeholder="Edit..."
            className="edit-input"
            onChange={(event) => setNewTitle(event.target.value)}
          />
        </label>
        <button className="save-btn" type="submit">
          <FaSave className="save-icon" />
        </button>
      </form>
  );
}

export default ItemEditInput;

ItemEditInput.propTypes = {
  id: PropTypes.string,
  editTitle: PropTypes.func,
};
