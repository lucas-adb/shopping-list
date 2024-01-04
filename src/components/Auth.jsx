import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useEffect, useState } from "react";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      if (err.message.includes("auth/email-already-in-use")) {
        alert("Email already in use");
      } else {
        console.error(err);
      }
    }
  };

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (err) {
      console.error(err);
      alert("invalid login");
    }
  }

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log('currentUser', currentUser.email);
    });

    return () => unsubscribe();
  }, []);

  // Testes
  console.log(auth.currentUser?.email);
  console.log(auth.currentUser?.uid);

  return (
    <div>
      <input
        placeholder="Email..."
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Password..."
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={signIn}> Sign In</button>
      <button onClick={login}> Login</button>
      <button onClick={logout}> Logout </button>

      <p>{user.email !== undefined ? user.email : "user not logged in"}</p>
      {/* <p>{auth.currentUser?.email !== undefined ? auth.currentUser.email : "user not logged in"}</p> */}
    </div>
  );
}

export default Auth;