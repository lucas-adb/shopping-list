import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../utils/firebaseAuth";

import shoppingCart from '../assets/shopping-cart.png'

function Root() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const goToItemsAfterLogin = async (email, password) => {
    try {
      await login(email, password);
      navigate(`/mylist`);
    } catch (error) {
      console.error(error);
      alert("login was not successful")
    }
  }

  return (
    <div className="shopping-list">
      <img src={shoppingCart} alt="shopping-cart-3d-illustration" />
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
        onClick={() => goToItemsAfterLogin(email, password)}
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
