import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../utils/firebaseAuth";
import { MotionWomanCart } from "../components/MotionWomanCart";

function Root() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const goToItemsAfterLogin = async (email, password) => {
    try {
      await login(email, password);
      navigate(`/mylist`);
    } catch (error) {
      setErrorMessage("login was not successful 😔");
      setErrorVisible(true);
    }
  };

  return (
    <div className="shopping-list">
      <MotionWomanCart />
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

      {errorVisible && <p className="input-error-p">{errorMessage}</p>}

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
