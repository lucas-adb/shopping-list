import { useState } from "react";
import { signUp } from "../utils/firebaseAuth";
import { Link } from "react-router-dom";

function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="shopping-list">
    <h1>Shopping List</h1>
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
      onClick={() => signUp(email, password)}
      disabled={!(email && password)}
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