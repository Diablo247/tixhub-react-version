import React from "react";
import "../styles/about.css";

const About = () => {
  return (
    <div className="about">
      <div className="about-container">
        <h1 className="title">About TixHub</h1>

        <p className="about-desc">
          <span className="start">TixHub</span> is a modern ticket management
          platform built to simplify how teams handle issues and support
          requests.
          <br /> With a clean, intuitive interface, it helps users create,
          track, and resolve tickets efficiently—all in one place.
          <br />
          Whether it’s a small team or a large organization, TixHub ensures
          seamless collaboration, clear communication, and real-time visibility
          into project progress.
        </p>

        <span className="ender">
          Our goal is simple: make issue tracking less stressful and more
          productive.
        </span>
      </div>
    </div>
  );
};

export default About;
