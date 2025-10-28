import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../../styles/auth.css";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  // Validate form fields
  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 5) {
      newErrors.password = "Password must be at least 5 characters.";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Retrieve existing users
    const existingUsers =
      JSON.parse(localStorage.getItem("ticketapp_users")) || [];

    // Check if email already exists
    const emailExists = existingUsers.some(
      (user) => user.email === formData.email
    );

    if (emailExists) {
      setErrors({ email: "Email is already registered." });
      return;
    }

    // Add new user
    const newUser = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };

    const updatedUsers = [...existingUsers, newUser];
    localStorage.setItem("ticketapp_users", JSON.stringify(updatedUsers));

    // Success message and redirect
    setSuccessMessage("Account created successfully! Redirecting to login...");
    setTimeout(() => navigate("/login"), 2000);
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <p>Create an account</p>

        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
          />
          {errors.name && <p className="error-msg">{errors.name}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
          />
          {errors.email && <p className="error-msg">{errors.email}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter a strong password"
          />
          {errors.password && <p className="error-msg">{errors.password}</p>}
        </div>

        <button type="submit" className="submit-btn">
          Sign Up
        </button>

        {successMessage && <p className="success-msg">{successMessage}</p>}

        <p className="redirect">
          Already have an account? <Link  className="a" to="/login">Log in</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
