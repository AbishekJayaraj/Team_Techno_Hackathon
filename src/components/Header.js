import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/"); // Redirect to login page
  };

  return (
    <header className="header">
      <h1>Smart City Management</h1>
      <nav>
        <ul>
          <li><button onClick={() => navigate("/admin-dashboard")}>Home</button></li> 
          <li><button onClick={() => navigate("/dashboard")}>Dashboard</button></li> 
          <li><button onClick={() => navigate("/analytics-landing")}>Analytics</button></li> {/* 🔄 Navigate to AnalyticsLanding */}
          <li><button className="logout-btn" onClick={handleLogout}>Logout</button></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
