import React from "react";
import "../styles/Card.css";

interface CardProps {
  avatar: string;
  title: string;
  description: string;
  btnText: string;
}

const Card: React.FC<CardProps> = ({ avatar, title, description, btnText }) => (
  <div className="card">
    <img src={avatar} alt="Avatar" className="avatar" />
    <div className="container">
      <h4>
        <b>{title}</b>
      </h4>
      <p>{description}</p>
    </div>
    <div className="card-footer">
      <button
        className={btnText === "Премахни" ? "remove-btn" : "add-btn"}
        onClick={() => alert("Learn More")}
      >
        {btnText}
      </button>
    </div>
  </div>
);

export default Card;
