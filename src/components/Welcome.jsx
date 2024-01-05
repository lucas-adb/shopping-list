import { useEffect, useState } from "react";
import { getPhotoURL, getUsername } from "../utils/firebaseFunctions";

function Welcome() {
  const [username, setUsername] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [isImageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const stopListeningToUsername = getUsername(setUsername);
    const stopListeningToPhotoURL = getPhotoURL(setPhotoURL);

    return () => {
      stopListeningToUsername();
      stopListeningToPhotoURL();
    };
  }, []);

  if (!(username && photoURL)) return <p>Loading...</p>

  return (
    <div className="welcome-wrapper">
      {!isImageLoaded && <p>Loading image...</p>}
      <img 
        src={photoURL} 
        alt="profile-picture" 
        className="profile-picture" 
        onLoad={() => setImageLoaded(true)}
        style={{display: isImageLoaded ? 'block' : 'none'}}
      />
      <div className="welcome-text-wrapper">
        <p className="username">{username}</p>
        <p>Welcome back!</p>
      </div>
    </div>
  );
}

export default Welcome;