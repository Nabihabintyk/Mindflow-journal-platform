import React from "react";
import "./LandingPage.css";

function LandingPage() {
  return (
    <div className="landing-page">
      {/* NEW: Neural Network Animated Background Element */}
      <div className="animated-neural-network"></div>

      <h1>Welcome to MindFlow.</h1>
      <p>Ready to capture your thoughts?</p>
      <p className="instruction">
        Tap the menu icon (☰) to begin a new entry or view your dashboard.
      </p>
    </div>
  );
}

export default LandingPage;
