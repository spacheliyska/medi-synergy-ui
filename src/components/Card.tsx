import React from "react";
import "../styles/Card.css";

interface CardProps {
  avatar: string;
  title: string;
  description: string;
}

const Card: React.FC<CardProps> = ({ avatar, title, description }) => (
  <div className="card">
    <img src={avatar} alt="Avatar" className="avatar" />
    <div className="container">
      <h4>
        <b>{title}</b>
      </h4>
      <p>{description}</p>
    </div>
  </div>
);

export default Card;
