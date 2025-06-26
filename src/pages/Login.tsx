import React, { use, useState } from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/Login.css";
import logo from "../assets/medisynergy.png";

const Login = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (username && password) {
      login(username, password);
    } else {
      setError("Невалидно потребителско име или парола.");
    }
  };

  return (
    <div className="login-container">
      <div className="form-wrapper">
        <form className="login-form" onSubmit={handleLogin}>
          <div className="login-header-wrapper">
            <img src={logo} className="logo-img" alt="MedicalSynergy" />
            <span className="login-header">Добре дошли</span>
          </div>
          {error && <div className="error-message">{error}</div>}
          <div className="input-wrapper">
            <input
              type="text"
              className="input"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label className="username-label">Потребителско име</label>
          </div>
          <div className="input-wrapper">
            <input
              type="password"
              className="input"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className="password-label">Парола</label>
          </div>
          <div className="login-actions">
            <div className="login-links">
              <a className="reg-link-btn" href="/register">
                Регистрация
              </a>
              <a className="forgot-link" href="/forgot-password">
                Забравена парола?
              </a>
            </div>
            <div className="login-btn-wrapper">
              <button className="login-btn" type="submit" onClick={handleLogin}>
                Вход
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
