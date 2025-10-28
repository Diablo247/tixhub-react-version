import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/auth.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "", general: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formData;
    let newErrors = {};

    if (!email.trim()) newErrors.email = "Email is required";
    if (!password.trim()) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      return setErrors({ ...errors, ...newErrors });
    }

    const users = JSON.parse(localStorage.getItem("ticketapp_users")) || [];
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      return setErrors({
        ...errors,
        general: "Invalid email or password",
      });
    }

    // ✅ store the full user object in the session
    localStorage.setItem(
      "ticketapp_session",
      JSON.stringify({ user, loggedIn: true })
    );

    navigate("/dashboard");
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <p>Welcome back</p>

        {errors.general && <p className="error-text">{errors.general}</p>}

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            tabIndex="1"
          />
          {errors.email && <p className="error-msg">{errors.email}</p>}
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            tabIndex="2"
          />
          {errors.password && <p className="error-msg">{errors.password}</p>}
        </div>

        <button type="submit" className="submit-btn" tabIndex="3">
          Login
        </button>

        <p className="redirect">
          Don’t have an account? <a href="/signup">Sign up</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
