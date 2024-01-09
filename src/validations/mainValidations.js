export const isItAEmptyString = (string) => {
  if (string.trim() !== "") return false;
  return true;
};

export const isMinLengthValid = (string, minLength) => {
  if (string.length < minLength) return false;
  return true;
};

export const isMaxLengthValid = (string, maxLength) => {
  if (string.length > maxLength) return false;
  return true;
};