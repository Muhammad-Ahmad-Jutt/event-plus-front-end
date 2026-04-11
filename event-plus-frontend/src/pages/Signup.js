import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
    }
  };

  return (
    <div className="sign-up-container">
      <h1 className="sign-up-title">Sign Up</h1>

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

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}