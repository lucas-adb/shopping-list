import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../config/firebase";

export const storePhoto = async (file) => {
  // const file = event.target.files[0];
  const storageRef = ref(storage, `profilePictures/${file.name}`);

  try {
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    console.log('File available at', downloadURL);
    return downloadURL;
  } catch (error) {
    console.error(error);
  }
};