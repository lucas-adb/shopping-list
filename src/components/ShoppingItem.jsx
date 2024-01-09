import { useState } from "react";

import { FaRegTrashCan } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import PropTypes from "prop-types";

import { deleteItem } from "../utils/firebaseFunctions";
import ItemCheckbox from "./ItemCheckbox";
import ItemEditInput from "./ItemEditInput";

function ShoppingItem({ item }) {
  const { id, title, completed } = item;

  const [isEditBtnClicked, setIsEditBtnClicked] = useState(false);

  return (
    <div className="shopping-list-item">
      {isEditBtnClicked ? (
        <ItemEditInput id={id} />
      ) : (
        <ItemCheckbox id={id} completed={completed} title={title} />
      )}

      <button
        className="edit-btn"
        onClick={() => setIsEditBtnClicked(!isEditBtnClicked)}
      >
        <FaEdit
          className={isEditBtnClicked ? "edit-icon-clicked" : "edit-icon"}
        />
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
