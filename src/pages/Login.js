import React from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="login-container">
      <h1>Smart City Management</h1>
      <div className="login-buttons">
        <button onClick={() => navigate("/admin-login")}>Administrator Login</button>
      </div>
    </div>
  );
};

export default Login;
