import React from "react";
import "../styles/Login.css";
import logo from "../assets/medisynergy.png";

const Login = () => {
  return (
    <div className="login-container">
      <div className="form-wrapper">
        <form className="login-form">
          <div className="login-header-wrapper">
            <img src={logo} className="logo-img" alt="MedicalSynergy" />
            <span className="login-header">Добре дошли</span>
          </div>
          <div className="input-wrapper">
            <input type="text" className="input" name="username" />
            <label className="username-label">Потребителско име</label>
          </div>
          <div className="input-wrapper">
            <input type="password" className="input" name="password" />
            <label className="password-label">Парола</label>
          </div>
          <div className="login-btn-wrapper">
            <div className="login-btn-div"></div>
            <button className="login-btn">Вход</button>
          </div>
          <div className="register-link-wrapper">
            <span className="register-link">Нямате профил при нас?</span>
            <a href="/" className="register-link">
              Регистрация
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
