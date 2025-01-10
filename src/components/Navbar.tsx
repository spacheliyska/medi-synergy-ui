import React from "react";
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <a href="/" className="logo">
          Medical Synergy
        </a>
      </div>
      <div className="navbar-right">
        <ul className="nav-links">
          <a href="/my-medications">My medications</a>
          <a href="/profile">Profile</a>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
