import { useState } from "react";
import { Link } from "react-router-dom";
import { login } from "../utils/firebaseAuth";

function Root() {
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
        className="login-btn"
        onClick={() => login(email, password)}
        disabled={!(email && password)}
      >
        Login
      </button>

      <p>
        Don&apos;t have an account?{" "}
        <Link to={"signup"} className="signup-link">
          Sign up
        </Link>
      </p>
    </div>
  );
}

export default Root;
