import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "../styles/AdminPanel.css";

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
    avatar: "/avatars/spacheliyska.png",
  },
  {
    username: "user2",
    display: "Петър Иванов",
    email: "user2@example.com",
    role: "user",
    avatar: "/avatars/user2.png",
  },
  {
    username: "user3",
    display: "Мария Георгиева",
    email: "user3@example.com",
    role: "user",
    avatar: "/avatars/user3.png",
  },
];

const AdminPanel = () => {
  const [profiles, setProfiles] = useState<UserProfile[]>([]);

  useEffect(() => {
    setProfiles(mockProfiles);
  }, []);

  const handleDelete = (username: string) => {
    if (window.confirm("Сигурни ли сте, че искате да изтриете този профил?")) {
      setProfiles((prev) => prev.filter((p) => p.username !== username));
    }
  };

  const handleEdit = (username: string) => {
    alert(`Edit profile: ${username} (тук добавете форма за редакция)`);
  };

  const handleAdd = () => {
    alert("Add new profile (тук добавете форма за добавяне)");
  };

  return (
    <div className="admin-panel">
      <nav className="admin-nav">
        <ul>
          <li>
            <Link to="/admin">Табло</Link>
          </li>
          <li>
            <Link to="/admin/profiles">Потребителски профили</Link>
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
                      src={profile.avatar || "/avatars/default.png"}
                      alt={profile.display}
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        objectFit: "cover",
                        border: "2px solid #03bfa5",
                      }}
                      onError={(e) =>
                        (e.currentTarget.src = "/avatars/default.png")
                      }
                    />
                  </td>
                  <td>{profile.username}</td>
                  <td>{profile.display}</td>
                  <td>{profile.email}</td>
                  <td>{profile.role}</td>
                  <td>
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
