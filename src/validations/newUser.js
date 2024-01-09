import { isItAEmptyString, isMinLengthValid } from "./mainValidations";

export const validatePassword = (password) => {
  if (isItAEmptyString(password)) return "password can't be an empty string";
  if (!isMinLengthValid(password, 6))
    return "password must be at least 6 characters long";
};

export const validateUsername = (username) => {
  if (isItAEmptyString(username)) return "username can't be an empty string";
  if (!isMinLengthValid(username, 4))
    return "username must be at least 4 characters long";
};

export const validateEmail = (email) => {
  const emailRegex =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;

  if (!emailRegex.test(email)) return "email invalid";
};

export const validatePhotoUrl = (url) => {
  if (isItAEmptyString(url)) return "please upload an image for your profile";
}

export const validateNewUser = (username, password, email, url) => {
  const usernameValidation = validateUsername(username);
  if (usernameValidation) return usernameValidation;

  const passwordValidation = validatePassword(password);
  if (passwordValidation) return passwordValidation;

  const emailValidation = validateEmail(email);
  if (emailValidation) return emailValidation;

  const photoUrlValidation = validatePhotoUrl(url);
  if (photoUrlValidation) return photoUrlValidation;
};
