import React, { useEffect, useState } from "react";
import "../styles/Profile.css";
import Navbar from "./Navbar";

interface Medicine {
  title: string;
  composition: string;
  sideEffects: string[];
}

interface ProfileProps {
  username: string;
}

const Profile: React.FC<ProfileProps> = ({ username }) => {
  const [medications, setMedications] = useState<Medicine[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("myMedications");
    if (stored) {
      setMedications(JSON.parse(stored));
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="profile-container">
        <h2 className="profile-title">Профил на потребителя</h2>
        <div className="profile-info">
          <div className="profile-row">
            <span className="profile-label">Потребителско име:</span>
            <span className="profile-value">{username}</span>
          </div>
          <div className="profile-row">
            <span className="profile-label">Парола:</span>
            <span className="profile-value">******</span>
          </div>
        </div>
        <div className="profile-meds">
          <h3 className="profile-meds-title">Моите лекарства</h3>
          {medications.length > 0 ? (
            <ul className="profile-meds-list">
              {medications.map((med, idx) => (
                <li className="profile-meds-item" key={med.title + idx}>
                  <span className="med-title">{med.title}</span>
                  <span className="med-comp">{med.composition}</span>
                  {med.sideEffects.length > 0 && (
                    <span className="med-side">
                      Странични ефекти: {med.sideEffects.join(", ")}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="profile-empty">Нямате добавени лекарства.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
