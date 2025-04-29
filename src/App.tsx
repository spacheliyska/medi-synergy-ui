import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import MyMedications from "./pages/MyMedications";
import Home from "./pages/Home";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/my-medications" element={<MyMedications />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
