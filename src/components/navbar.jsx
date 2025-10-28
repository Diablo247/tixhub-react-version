import React, { useState, useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import "../styles/navbar.css";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navRef = useRef(null);

  useEffect(() => {
    // check localStorage for session
    const session = localStorage.getItem("ticketapp_session");
    setIsLoggedIn(!!session);
  }, []);

  // 👇 Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => document.removeEventListener("click", handleClickOutside);
  }, [menuOpen]);

  // 👇 Close menu when navigating to a new page
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("ticketapp_session");
    setIsLoggedIn(false);
    window.location.href = "/login";
  };

  return (
    <nav className="navbar" ref={navRef}>
      <div className="nav-container">
        <div className="nav-logo">
          <img src={logo} alt="TixHub Logo" />
        </div>

        <div className={`nav-links ${menuOpen ? "active-m" : ""}`}>
          <Link
            to="/dashboard"
            className={`nav-item ${location.pathname === "/dashboard" ? "active" : ""}`}
          >
            Dashboard
          </Link>

          <Link
            to="/tickets"
            className={`nav-item ${
              location.pathname === "/tickets" ? "active" : ""
            }`}
          >
            Tickets
          </Link>

          <Link
            to="/about"
            className={`nav-item ${
              location.pathname === "/about" ? "active" : ""
            }`}
          >
            About
          </Link>

          <div className="nav-actions mobile">
            {isLoggedIn ? (
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <Link to="/login" className="login-btn">
                Login
              </Link>
            )}
          </div>
        </div>

        <div className="nav-actions desktop">
          {isLoggedIn ? (
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <Link to="/login" className="login-btn">
              Login
            </Link>
          )}
        </div>

        <div
          className={`menu-toggle ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
