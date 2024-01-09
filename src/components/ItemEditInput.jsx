import { useEffect, useState } from "react";
import { updateItemTitle } from "../utils/firebaseFunctions";

import PropTypes from 'prop-types';

function ItemEditInput({id}) {
  const [newTitle, setNewTitle] = useState("");

  useEffect(() => {
    if (newTitle && newTitle.trim() !== "") {
      updateItemTitle(id, newTitle);
    }
  }, [newTitle, id]);

  return (
    <label htmlFor={id} className={"edit-item-label"}>
      <input
        type="text"
        placeholder="Edit..."
        className="edit-input"
        onChange={(event) => setNewTitle(event.target.value)}
      />
    </label>
  )
}

export default ItemEditInput;

ItemEditInput.propTypes = {
  id: PropTypes.string,
}