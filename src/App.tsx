import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Home from "./pages/Home";
import MyMedications from "./pages/MyMedications";

function App() {
  return (
    <Router>
      <Navbar />
      <main className="main-content">
        <Route path="/" exact>
          <Home />
        </Route>

        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/my-medications">
          <MyMedications />
        </Route>
      </main>
    </Router>
  );
}

export default App;
