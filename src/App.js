import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import ForgetPassword from "./components/ForgetPassword";
import Home from "./components/Home";
import Login from "./components/Login";
import ResetPassword from "./components/ResetPassword";
import Signup from "./components/Signup";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route exact path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
