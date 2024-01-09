import { useEffect, useState } from "react";

import { FaRegTrashCan } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import PropTypes from "prop-types";

import {
  toggleItemCompletion,
  deleteItem,
  updateItemTitle,
} from "../utils/firebaseFunctions";

function ShoppingItem({ item }) {
  const { id, title, completed } = item;

  const [isEditBtnClicked, setIsEditBtnClicked] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  useEffect(() => {
    if (newTitle && newTitle.trim() !== "") {
      updateItemTitle(id, newTitle);
    }
  }, [newTitle, id]);

  return (
    <div className="shopping-list-item">
      {/* TODO: CREATE NEW COMPONENT FOR THE DYNAMIC LABEL/INPUTS */}
      {!isEditBtnClicked && (
        <label
          htmlFor={id}
          className={
            completed
              ? "show-item-label item-completed"
              : "show-item-label item-uncompleted"
          }
        >
          <input
            type="checkbox"
            name="checkbox"
            id={id}
            checked={completed}
            onChange={() => toggleItemCompletion(id, completed)}
          />
          {title}
        </label>
      )}

      {isEditBtnClicked && (
        <label htmlFor={id} className={"edit-item-label"}>
          <input
            type="text"
            placeholder="Edit..."
            className="edit-input"
            onChange={(event) => setNewTitle(event.target.value)}
          />
        </label>
      )}

      <button
        className="edit-btn"
        onClick={() => setIsEditBtnClicked(!isEditBtnClicked)}
      >
        <FaEdit className={isEditBtnClicked ? "edit-icon-clicked" : "edit-icon"}/>
        {/* <FaEdit className="edit" /> */}
      </button>
      <button className="delete-btn" onClick={() => deleteItem(id)}>
        <FaRegTrashCan className="trash-can" />
      </button>
    </div>
  );
}

export default ShoppingItem;

ShoppingItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
};
