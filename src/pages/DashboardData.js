import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig"; // ✅ Ensure correct Firebase config path
import "./DashboardData.css"; // ✅ Add styles

const DashboardData = () => {
  const [locationCount, setLocationCount] = useState(0);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const locationsRef = collection(db, "locations");
        const snapshot = await getDocs(locationsRef);
        setLocationCount(snapshot.size); // ✅ Get total number of documents
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, []);

  return (
    <div className="dashboard-data">
      <h3>Statistics</h3>
      <p>Total Locations: {locationCount}</p>
    </div>
  );
};

export default DashboardData;
