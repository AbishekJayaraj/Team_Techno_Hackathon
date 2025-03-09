import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MapBox from "./MapBox"; // ✅ Ensure correct import
import "./AdminLanding.css";

const AdminLanding = () => {
  return (
    <div className="admin-container">
      <Header />
      <MapBox /> {/* ✅ Ensure it's used properly */}
      <Footer />
    </div>
  );
};

export default AdminLanding;
