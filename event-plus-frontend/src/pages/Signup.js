import { useState } from "react";
import { useNavigate } from "react-router-dom";
import bg from "../images/event-plus-bg.png";

export default function SignUp() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    phone_no: "",
    gender: "",
    dob: "",
  });
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    console.log('set true');

    try {
        // backend logic
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      await response.json();

      // TODO: handle success (redirect/login)
      if (response.ok) {
        navigate("/sign-in");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setTimeout(() => {
        setIsSubmitting(false);
        console.log('set false');
      }, 2000);
    }
  };

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
    <div className="sign-up-container">
      <h1 className="floatingTitle">Sign Up</h1>

      <form onSubmit={handleSubmit} className="sign-up-form">
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          onChange={handleChange}
        />

        <input
          type="text"
          name="phone_no"
          placeholder="Phone Number"
          onChange={handleChange}
        />

        <select name="gender" onChange={handleChange}>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <input
          type="date"
          name="dob"
          onChange={handleChange}
        />

        <button type="submit" className="btnPrimary" disabled={isSubmitting}>Sign Up</button>
      </form>
    </div>
    </div>
    </>
  );
}