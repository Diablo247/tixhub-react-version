import React from "react";
import logo from "../assets/logo.png";
import "../styles/footer.css";
const footer = () => {
  return (
    <div className="footer">
      <div className="footer-container">
        <img src={logo} alt="logo" />
        <div className="left-side">
          {" "}
          <p className="builtby"> Built by Holy.dev </p>
          <p className="copyrights">&copy; 2025, All Rights Reserved</p>{" "}
        </div>
      </div>
    </div>
  );
};

export default footer;
