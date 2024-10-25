import React from "react";
import "./Navbar.css"; // Import the CSS file

const Navbar = ({ onPageChange }) => {
  // Ensure this prop is destructured
  return (
    <nav className="navbar">
      <div className="logo">Weather Monitoring</div>
      <ul className="nav-links">
        <li onClick={() => onPageChange("weather")}>
          <a href="#" className="daily">
            Weather
          </a>
        </li>
        <li onClick={() => onPageChange("dailyWeatherSummary")}>
          <a href="#" className="daily">
            Daily Summary
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
