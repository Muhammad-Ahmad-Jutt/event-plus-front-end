import "./index.css";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
export default function Homepage() {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  console.log("Current User:", user);
  const logout_user = () => {
  logout();         
    setTimeout(() => {
    navigate("/signin"); // defer navigation until after state update
  }, 0);
};
  return (
    <div className="homepage-container">
      <h1 className="homepage-title">Welcome to Event Plus, {user || "Guest"}!</h1>

      <div className="homepage-buttons">
        <button onClick={() => navigate("/signin")}>
          Sign In
        </button>

        <button onClick={() => navigate("/signup")}>
          Sign Up
        </button>
            <button className="logoutButton" onClick={logout_user}>

              Logout
            </button>
      </div>
    </div>
  );
}