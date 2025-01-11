import React from "react";
import "../styles/Card.css";
import { Button } from "react-native";
import { FormButton } from "semantic-ui-react";

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
    <div className="card-footer">
      <button className="remove-btn" onClick={() => alert("Learn More")}>
        Премахни
      </button>
    </div>
  </div>
);

export default Card;
