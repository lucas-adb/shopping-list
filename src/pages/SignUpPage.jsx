import { useState } from "react";
import { login, signUp } from "../utils/firebaseAuth";
import { Link, useNavigate } from "react-router-dom";
import { addNewUser } from "../utils/firebaseUsers";
import { storePhoto } from "../utils/firebaseStorage";
import { validateNewUser } from "../validations/newUser";

function SignUpPage() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [previewFile, setPreviewFile] = useState(null);
  const [previewURL, setPreviewURL] = useState("");

  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const previewPhoto = async (event) => {
    const file = event.target.files[0];
    const src = URL.createObjectURL(file);
    setPreviewURL(src);
    setPreviewFile(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // validates the data
    const newErr = validateNewUser(username, password, email, previewURL);
    if (newErr) {
      // console.log(newErr)
      setErrorMessage(newErr);
      setErrorVisible(true);
      return
    }
    try {
      // authenticate and gets email and password
      const data = await signUp(email, password);
      const newEmail = data.user.email;
      const newUid = data.user.uid;
  
      // login to upload photos and add new user
      await login(email, password);
  
      // gets url from firebase
      const photoURL = await storePhoto(previewFile);
  
      // check if photoURL is not undefined
      if (photoURL) {
        // adds a new user in firebase
        await addNewUser(newEmail, newUid, username, photoURL);
  
        // change page
        navigate(`/mylist`);
      } else {
        throw new Error("Failed to upload photo");
      }
    } catch (error) {
      setErrorMessage("Sign up was not successful 😔");
      setErrorVisible(true);
    }
  };

  return (
    <form className="shopping-list" onSubmit={handleSubmit}>
      <h1>Shopping List</h1>
      <input
        placeholder="Username..."
        onChange={(e) => setUserName(e.target.value)}
        className="new-item-input"
      />
      {previewURL && <img src={previewURL} className="profile-picture" />}
      <input
        placeholder="PhotoUrl..."
        onChange={(e) => previewPhoto(e)}
        className="new-item-input"
        type="file"
        accept="image/png, image/gif, image/jpeg"
      />
      <input
        placeholder="Email..."
        onChange={(e) => setEmail(e.target.value)}
        className="new-item-input"
      />
      <input
        placeholder="Password..."
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        className="new-item-input"
      />
      <button
        className="sign-up-btn"
        type="submit"
      >
        Sign Up
      </button>

      {errorVisible && <p className="input-error-p">{errorMessage}</p>}

      <p>
        Already have an account?{" "}
        <Link to={"/"} className="signup-link">
          Login
        </Link>
      </p>
    </form>
  );
}

export default SignUpPage;
