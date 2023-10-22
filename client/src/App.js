import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Login from "./Components/Authentication/Login";
import Signup from "./Components/Authentication/SignUp";
import Dashboard from "./Components/Dashboard/Dashboard";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
