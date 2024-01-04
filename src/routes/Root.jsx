import { Link } from "react-router-dom";

function Root() {
  return (
    <div className="shopping-list">
      <h1>Shopping List</h1>
      <input
        placeholder="Email..."
        // onChange={(e) => setEmail(e.target.value)}
        className="new-item-input"
      />
      <input
        placeholder="Password..."
        type="password"
        // onChange={(e) => setPassword(e.target.value)}
        className="new-item-input"
      />
      {/* <button> Sign In</button> */}
      <button className="login-btn">Login</button>
      {/* <button > Logout </button> */}

      <p>Don&apos;t have an account? <Link to={'signup'} className="signup-link">Sign up</Link></p>
    </div>
  );
}

export default Root;
