import { toggleItemCompletion } from "../utils/firebaseFunctions";
import PropTypes from 'prop-types';

function ItemCheckbox({ id, completed, title }) {
  return (
    <label
      htmlFor={id}
      className={
        completed
          ? "show-item-label item-completed"
          : "show-item-label item-incomplete"
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
  );
}

export default ItemCheckbox;

ItemCheckbox.propTypes = {
  id: PropTypes.string,
  completed: PropTypes.bool,
  title: PropTypes.string,
}