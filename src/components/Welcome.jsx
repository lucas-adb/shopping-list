import { useEffect, useState } from "react";
import { getUsername } from "../utils/firebaseFunctions";

function Welcome() {
  const [username, setUsername] = useState([]);

  useEffect(() => {
    const stopListeningToUsername = getUsername(setUsername);

    return () => stopListeningToUsername();
  }, []);

  return (
    <div className="welcome-wrapper">
      <p className="username">{username}</p>
      <p>Welcome back!</p>
    </div>
  );
}

export default Welcome;
