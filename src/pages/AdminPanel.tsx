import React, { useEffect, useState } from "react";
import { Link, Outlet, Navigate } from "react-router-dom";
import "../styles/AdminPanel.css";
import { useAuth } from "../context/AuthContext";
import avatar from "../assets/profile-avatar.jpg";

interface UserProfile {
  username: string;
  display: string;
  email: string;
  role: string;
  avatar?: string;
}

const mockProfiles: UserProfile[] = [
  {
    username: "spacheliyska",
    display: "Силвия Пачелийска",
    email: "spacheliyska@example.com",
    role: "admin",
    avatar: avatar,
  },
  {
    username: "user2",
    display: "Петър Иванов",
    email: "user2@example.com",
    role: "user",
    avatar: avatar,
  },
  {
    username: "user3",
    display: "Мария Георгиева",
    email: "user3@example.com",
    role: "user",
    avatar: avatar,
  },
];

const AdminPanel = () => {
  const { username } = useAuth();
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [editProfile, setEditProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    setProfiles(mockProfiles);
  }, []);

  const handleDelete = (username: string) => {
    if (window.confirm("Сигурни ли сте, че искате да изтриете този профил?")) {
      setProfiles((prev) => prev.filter((p) => p.username !== username));
    }
  };

  const handleEdit = (username: string) => {
    const profile = profiles.find((p) => p.username === username);
    if (profile) setEditProfile(profile);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editProfile) return;
    const { name, value } = e.target;
    setEditProfile({ ...editProfile, [name]: value });
  };

  const handleEditSave = () => {
    if (!editProfile) return;
    setProfiles((prev) =>
      prev.map((p) => (p.username === editProfile.username ? editProfile : p))
    );
    setEditProfile(null);
  };

  const handleEditCancel = () => {
    setEditProfile(null);
  };

  const handleAdd = () => {
    alert("Add new profile (тук добавете форма за добавяне)");
  };

  if (username !== "adminsimona") {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="admin-panel">
      <nav className="admin-nav">
        <ul>
          <li>
            <Link to="/">MedicalSynergy</Link>
          </li>
          <li>
            <Link to="/admin">Потребителски профили</Link>
          </li>
        </ul>
      </nav>
      <main className="admin-content">
        <Outlet />
        <div>
          <h2
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            Потребителски профили
            <button className="admin-add-btn" onClick={handleAdd}>
              + Добави
            </button>
          </h2>
          <table className="admin-profiles-table">
            <thead>
              <tr>
                <th>Аватар</th>
                <th>Потребителско име</th>
                <th>Име</th>
                <th>Email</th>
                <th>Роля</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {profiles.map((profile) => (
                <tr key={profile.username}>
                  <td>
                    <img
                      src={profile.avatar}
                      alt={profile.display}
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        objectFit: "cover",
                        border: "2px solid #03bfa5",
                      }}
                    />
                  </td>
                  <td>{profile.username}</td>
                  <td>
                    {editProfile &&
                    editProfile.username === profile.username ? (
                      <input
                        type="text"
                        name="display"
                        value={editProfile.display}
                        onChange={handleEditChange}
                        className="inline-edit-input"
                      />
                    ) : (
                      profile.display
                    )}
                  </td>
                  <td>
                    {editProfile &&
                    editProfile.username === profile.username ? (
                      <input
                        type="email"
                        name="email"
                        value={editProfile.email}
                        onChange={handleEditChange}
                        className="inline-edit-input"
                      />
                    ) : (
                      profile.email
                    )}
                  </td>
                  <td>
                    {editProfile &&
                    editProfile.username === profile.username ? (
                      <input
                        type="text"
                        name="role"
                        value={editProfile.role}
                        onChange={handleEditChange}
                        className="inline-edit-input"
                      />
                    ) : (
                      profile.role
                    )}
                  </td>
                  <td>
                    {editProfile &&
                    editProfile.username === profile.username ? (
                      <>
                        <button
                          className="admin-edit-btn"
                          onClick={handleEditSave}
                        >
                          Запази
                        </button>
                        <button
                          className="admin-delete-btn"
                          onClick={handleEditCancel}
                        >
                          Отказ
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="admin-edit-btn"
                          onClick={() => handleEdit(profile.username)}
                        >
                          Редактирай
                        </button>
                        <button
                          className="admin-delete-btn"
                          onClick={() => handleDelete(profile.username)}
                        >
                          Изтрий
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;
