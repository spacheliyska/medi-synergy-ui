import React from "react";
import "../styles/Card.css";

interface CardProps {
  avatar: string;
  title: string;
  composition: string;
  sideEffects: string[];
  btnText: string;
  onRemove?: () => void;
  onClick?: () => void; // Add this prop
}

const Card: React.FC<CardProps> = ({
  avatar,
  title,
  composition,
  btnText,
  sideEffects,
  onRemove,
  onClick,
}) => (
  <div className="card">
    <img src={avatar} alt="Avatar" className="avatar" />
    <div className="container">
      <h4>
        <b>{title}</b>
      </h4>
      <div className="section-wrapper">
        <span className="section-header">Състав:</span>
        <p className="chemical-composition">{composition}</p>
      </div>
      <div className="section-wrapper">
        <span className="section-header">Странични ефекти:</span>
        <ul className="side-effect-list">
          {sideEffects.map((sideEffect) => (
            <li>{sideEffect}</li>
          ))}
        </ul>
      </div>
    </div>
    <div className="card-footer">
      <button
        className={btnText === "Премахни" ? "remove-btn" : "add-btn"}
        onClick={
          btnText === "Премахни"
            ? onRemove
            : onClick // Use onClick for "Добави"
        }
      >
        {btnText}
      </button>
    </div>
  </div>
);

export default Card;
