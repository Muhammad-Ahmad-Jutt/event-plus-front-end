import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Header() {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    setTimeout(() => {
      navigate("/signin");
    }, 0);
  };

  return (
    <div className="header">
        
      <h2 className="logo" onClick={() => navigate("/")}>
        Event Plus
      </h2>

      <div className="nav-buttons">
        {!user ? (
          <>
            {/* ✅ Show ONLY if NOT logged in */}
            <button onClick={() => navigate("/signin")}>Sign In</button>
            <button onClick={() => navigate("/signup")}>Sign Up</button>
          </>
        ) : (
          <>
            {/* ✅ Show ONLY if logged in */}
            <span>Welcome, {user}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </div>
  );
}