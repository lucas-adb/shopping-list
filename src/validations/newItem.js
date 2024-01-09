import { isItAEmptyString, isMaxLengthValid, isMinLengthValid } from "./mainValidations";

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
