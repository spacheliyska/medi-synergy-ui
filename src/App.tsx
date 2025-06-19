import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import MyMedications from "./pages/MyMedications";
import Home from "./pages/Home";
import Compare from "./pages/Compare";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-medications"
            element={
              <ProtectedRoute>
                <MyMedications />
              </ProtectedRoute>
            }
          />
          <Route
            path="/compare"
            element={
              <ProtectedRoute>
                <Compare />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
