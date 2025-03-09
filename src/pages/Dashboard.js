import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import DashboardData from "./DashboardData";
import DashboardDataTable from "./DashboardDataTable";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Header />
      <main className="dashboard-content">
        <h2>Dashboard</h2>
        <p>Welcome to the Dashboard Page</p>
        <DashboardData />
        
        {/* Add spacing between components */}
        <div style={{ marginBottom: "30px" }}></div>

        <DashboardDataTable />
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
