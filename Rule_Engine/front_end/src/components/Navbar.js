import React from "react";
import './Navbar.css'; // Import the CSS file

const Navbar = ({ onPageChange }) => { // Ensure this prop is destructured
  return (
    <nav className="navbar">
      <div className="logo">Rule Engine</div>
      <ul className="nav-links">
        <li onClick={() => onPageChange('home')}><a href="#">Home</a></li>
        <li onClick={() => onPageChange('createdRules')}><a href="#">Created Rules</a></li>
        <li onClick={() => onPageChange('combineRules')}><a href="#">Combine Rules</a></li>
        <li onClick={() => onPageChange('evaluateRules')}><a href="#">Evaluate Rules</a></li>
        <li onClick={() => onPageChange('UpdateRules')}><a href="#">Update Rules</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
