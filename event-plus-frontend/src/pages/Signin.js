import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import bg from "../images/event-plus-bg.png";

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { login, logout } = useContext(AuthContext);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    console.log('setIsSubmitting - true');
    
    try {
        // backend logic
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();

      // TODO: handle success (redirect/login)
      if (data.success === true) {
        
        toast.success(data.message);
        login(data.access_token, data.user);
        navigate("/");
      } else {
        toast.error(data.message);
        logout();
      }

    } catch (error) {
      console.error("Error:", error);
    } finally {
      setTimeout(() => {
        setIsSubmitting(false);
        console.log('setIsSubmitting - false');
      }, 2000);
    }
  }
    //backend api logic

  return (
    <>
    <style>{`
    .pageImg {
      padding: 24px;
      min-height: 100vh;
      display: flex;
      justify-content: center;
      font-family: Arial, sans-serif;
    }

    .btnPrimary {
      background: #3b82f6;
      color: white;
      padding: 8px 16px;
      border-radius: 6px;
      border: none;
      cursor: pointer;
      height: 40px;
    }

    .btnPrimary:hover {
      background: #ccc;
      color: white;
      padding: 8px 16px;
      border-radius: 6px;
      border: none;
      cursor: pointer;
      height: 40px;
    }

    .btnPrimary:disabled {
      background: #ccc;
      cursor: not-allowed;
      opacity: 0.7;
    }
      
    `}</style>
    <div className="pageImg"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "calc(100vh - 60px)",
          display: "flex",
          justifyContent: "center",
          fontFamily: "Arial, sans-serif",
          marginTop: "-20px",
          marginBottom: "-40px",
        }}>
    <div className="sign-in-container">
      <h1 className="floatingTitle">Sign In</h1>

      <form onSubmit={handleSubmit} className="sign-in-form">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit" className="btnPrimary" disabled={isSubmitting}>Sign In</button>
      </form>
    </div>
    </div>
    </>
  );
}