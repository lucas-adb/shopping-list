const isItAEmptyString = (string) => {
  if (string.trim() !== "") return false;
  return true;
};

const isMinLengthValid = (string, minLength) => {
  if (string.length < minLength) return false;
  return true;
};

const isMaxLengthValid = (string, maxLength) => {
  if (string.length > maxLength) return false;
  return true;
};

export const validateNewItem = (item) => {
  if (isItAEmptyString(item)) {
    return "A new item can't be an empty string";
  }

  if (!isMinLengthValid(item, 3)) {
    return "Item must be at least 3 characters long";
  }

  if (!isMaxLengthValid(item, 12)) {
    return "Item  can not exceed 12 characters";
  }
};
