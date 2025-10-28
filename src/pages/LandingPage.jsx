import React from "react";
import "../styles/LandingPage.css";
import image from "../assets/preview-img.png";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="landing-container">
      <img className="landing-img" src={image} />
      <img className="landing-imgtwo" src={image} />
      <div className="landing-content">
        <h1 className="landing-title">Tix-Hub</h1>

        <p className="landing-tagline">
          <span className="landing-highlight">
            “Simplifying ticket management, one at a time.”
          </span>
          <br />
          <span className="landing-subtext">
            Manage your tickets with ease and efficiency.
            <br />
            Track and resolve issues seamlessly.
          </span>
        </p>

        <Link to="/signup" className="landing-button">
          Get Started →
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
