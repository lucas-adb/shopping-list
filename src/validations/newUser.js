import { isItAEmptyString } from "./mainValidations";

export const validatePassword = (password) => {
  if (isItAEmptyString(password)) return "item can't be an empty string";
}

// export const validateNewUser = (password) => {
//   if (isItAEmptyString(item)) {
//     return "A new item can't be an empty string";
//   }
// }