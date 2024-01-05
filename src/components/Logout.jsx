import { useNavigate } from "react-router-dom";
import { logout } from "../utils/firebaseAuth";

function Logout() {
  const navigate = useNavigate();

  const goToLoginAfterLogout = async () => {
    await logout()
    navigate(`/`);
 }

  return (
    <button className="logout-btn" onClick={() => goToLoginAfterLogout()}>Log out</button>
  )
}

export default Logout;