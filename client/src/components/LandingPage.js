import React from "react";
import "./LandingPage.css";
import mindflowLogo from "../assets/mindflow-logo.png";

function LandingPage() {
  return (
    <div className="landing-page">
      {/* Background animation */}
      <div className="animated-neural-network"></div>

      {/* Logo Section */}
      <div className="logo-section">
        <img src={mindflowLogo} alt="MindFlow Logo" className="landing-logo" />
        <h1 className="landing-title">Welcome To MindFlow</h1>
      </div>

      <p className="landing-subtitle">
        Capture your thoughts. Discover your flow.
      </p>
    </div>
  );
}

export default LandingPage;
