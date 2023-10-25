import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Login from "./Components/Authentication/Login";
import Signup from "./Components/Authentication/SignUp";
import Dashboard from "./Components/Dashboard/Dashboard";
import SetProfile from "./Components/Dashboard/SetProfile";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path = "/profile" element={<SetProfile/>} />
        <></>
      </Routes>
    </Router>
  );
};

export default App;
