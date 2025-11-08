import React, { useState } from "react";
import "./Header.css";

function Header({ setActiveComponent }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavigation = (componentName) => {
    setActiveComponent(componentName);
    setMenuOpen(false); // Close menu after selection
  };

  return (
    <header className="app-header">
      <div className="header-content">
        {/* LOGO - Now Clickable to return to Landing Page */}
        <div
          className="logo-wrapper"
          onClick={() => handleNavigation("landing")}
        >
          <span className="logo-text">MindFlow Journal</span>
        </div>

        {/* Hamburger Menu Icon */}
        <div
          className={`menu-icon ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </div>

        {/* Sliding Navigation Menu */}
        <nav className={`nav-menu ${menuOpen ? "open" : ""}`}>
          <a
            href="#"
            className="nav-link"
            onClick={() => handleNavigation("journal")}
          >
            New Entry
          </a>
          <a
            href="#"
            className="nav-link"
            onClick={() => handleNavigation("dashboard")}
          >
            Dashboard (Entries & Chart)
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
