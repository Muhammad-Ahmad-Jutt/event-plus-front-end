import "./index.css";
import { useNavigate } from "react-router-dom";

export default function Homepage() {
  const navigate = useNavigate();

  return (
    <div className="homepage-container">
      <h1 className="homepage-title">Welcome to Event Plus</h1>

      <div className="homepage-buttons">
        <button onClick={() => navigate("/signin")}>
          Sign In
        </button>

        <button onClick={() => navigate("/signup")}>
          Sign Up
        </button>
      </div>
    </div>
  );
}