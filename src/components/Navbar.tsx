import React from "react";
import "../styles/Navbar.css";
import { CiLogout } from "react-icons/ci";
import medisynergy from "../assets/medicalsynergy.png";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <img src={medisynergy} className="app-logo" alt="logo" />
        <a href="/" className="logo">
          Medical Synergy
        </a>
      </div>
      <div className="navbar-container">
        <ul className="nav-links">
          <a href="/my-medications">Моите лекарства</a>
          <a href="/profile">Профил</a>
          <a href="/login">
            <CiLogout />
          </a>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
