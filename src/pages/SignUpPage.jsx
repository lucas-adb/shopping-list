import { useState } from "react";
import { signUp } from "../utils/firebaseAuth";
import { Link, useNavigate } from "react-router-dom";
import { addNewUser } from "../utils/firebaseUsers";

function SignUpPage() {
  const [username, setUserName] = useState("");
  const [photoURL, setPhotoUrl] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const goToItemsAfterSignUp = async () => {
     const data = await signUp(email, password);
     const newEmail = data.user.email;
     const newUid = data.user.uid;

     await addNewUser(newEmail, newUid, username, photoURL)

     navigate(`/mylist`);
  }

  return (
    <div className="shopping-list">
    <h1>Shopping List</h1>
    <input
      placeholder="Username..."
      onChange={(e) => setUserName(e.target.value)}
      className="new-item-input"
    />
    <input
      placeholder="PhotoUrl..."
      onChange={(e) => setPhotoUrl(e.target.value)}
      className="new-item-input"
      // type="file"
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
      onClick={() => goToItemsAfterSignUp(email, password)}
      // onClick={() => signUp(email, password)}
      // TODO: create a folder with better validations
      disabled={!(email && password && username && photoURL)}
    >
      Sign Up
    </button>

    <p>
      Already have an account?{" "}
      <Link to={"/"} className="signup-link">
        Login
      </Link>
    </p>
  </div>
  )
}

export default SignUpPage;