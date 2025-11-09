import React, { useState } from "react";
import "./Header.css";
// LOGO RESTORED: Ensure this path is correct for your project
import mindflowLogo from "../assets/mindflow-logo.png";

// --- Inline SVG Icons for Theme Matching ---

// 'New Entry' icon (Pencil)
const PenIcon = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
  </svg>
);

// 'Dashboard' icon (Grid)
const DashboardIcon = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="7" height="9"></rect>
    <rect x="14" y="3" width="7" height="5"></rect>
    <rect x="14" y="12" width="7" height="9"></rect>
    <rect x="3" y="16" width="7" height="5"></rect>
  </svg>
);

// 'Entries' icon (List/Check)
const ListIcon = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 20h9"></path>
    <path d="M12 16h9"></path>
    <path d="M12 12h9"></path>
    <path d="M3 8h1m-1 4h1m-1 4h1"></path>
  </svg>
);

// 'Sentiment Chart' icon (Bar Chart)
const ChartIcon = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="20" x2="12" y2="10"></line>
    <line x1="18" y1="20" x2="18" y2="4"></line>
    <line x1="6" y1="20" x2="6" y2="16"></line>
    <line x1="3" y1="20" x2="21" y2="20"></line>
  </svg>
);

// Small arrow indicators
const ChevronUp = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="18 15 12 9 6 15"></polyline>
  </svg>
);
const ChevronDown = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

function Header({ setActiveComponent }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleNavigation = (componentName) => {
    setActiveComponent(componentName);
    setMenuOpen(false);
    setDropdownOpen(false);
  };

  return (
    <header className="app-header">
      <div className="header-content">
        {/* LOGO: Image Restored */}
        <div
          className="logo-wrapper"
          onClick={() => handleNavigation("landing")}
        >
          <img src={mindflowLogo} alt="MindFlow Logo" className="header-logo" />
          <span className="logo-text">MindFlow Journal.</span>
        </div>

        {/* HAMBURGER ICON */}
        <div
          className={`menu-icon ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </div>

        {/* MAIN NAVIGATION MENU */}
        <nav className={`nav-menu ${menuOpen ? "open" : ""}`}>
          {/* 1. New Entry (Top-Level Link) */}
          <a
            href="#"
            className="nav-link"
            onClick={() => handleNavigation("journal")}
          >
            <PenIcon className="nav-icon primary-icon" /> New Entry
          </a>

          {/* 2. Dashboard Dropdown (Toggle) */}
          <div className="nav-dropdown">
            <button
              className="dropdown-toggle"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <DashboardIcon className="nav-icon primary-icon" /> Dashboard{" "}
              {dropdownOpen ? (
                <ChevronUp className="arrow-icon" />
              ) : (
                <ChevronDown className="arrow-icon" />
              )}
            </button>

            {/* Dropdown Content - Contains sub-components */}
            <div className={`dropdown-content ${dropdownOpen ? "open" : ""}`}>
              {/* 2a. View Entries */}
              <a
                href="#"
                className="dropdown-item"
                onClick={() => handleNavigation("entries")}
              >
                <ListIcon className="dropdown-icon secondary-icon" /> View
                Entries
              </a>

              {/* 2b. Sentiment Chart */}
              <a
                href="#"
                className="dropdown-item"
                onClick={() => handleNavigation("chart")}
              >
                <ChartIcon className="dropdown-icon secondary-icon" /> Sentiment
                Chart
              </a>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
