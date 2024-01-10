import { useState } from "react";

import { FaRegTrashCan } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import PropTypes from "prop-types";

import { deleteItem, updateItemTitle } from "../utils/firebaseFunctions";
import ItemCheckbox from "./ItemCheckbox";
import ItemEditInput from "./ItemEditInput";
import { validateNewItem } from "../validations/newItem";

function ShoppingItem({ item }) {
  const { id, title, completed } = item;

  const [isEditBtnClicked, setIsEditBtnClicked] = useState(false);

  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const editTitle = (newTitle) => {
    const newErr = validateNewItem(newTitle);

    if (!newErr) {
      updateItemTitle(id, newTitle);
      setErrorVisible(false);

      setIsEditBtnClicked(false);
      setErrorMessage("");
    } else {
      setErrorMessage(newErr);
      setErrorVisible(true);
    }
  };

  const handleEditBtn = () => {
    if (errorMessage) {
      setErrorMessage("");
    }

    setIsEditBtnClicked(!isEditBtnClicked);
  };

  return (
    <div className="shopping-list-wrapper">
      <div className="shopping-list-item">
        {isEditBtnClicked ? (
          <ItemEditInput id={id} editTitle={editTitle} />
        ) : (
          <ItemCheckbox id={id} completed={completed} title={title} />
        )}

        <button
          className="edit-btn"
          onClick={() => handleEditBtn()}
        >
          <FaEdit
            className="edit-icon"
          />
        </button>
        <button className="delete-btn" onClick={() => deleteItem(id)}>
          <FaRegTrashCan className="trash-can" />
        </button>
      </div>

      <div className="shopping-list-item-error">
        {errorVisible && <p className="input-error-p">{errorMessage}</p>}
      </div>
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
