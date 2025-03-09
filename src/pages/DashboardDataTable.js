import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import LocationDetailsPopup from "./LocationDetailsPopup";
import "./DashboardDataTable.css";

const DashboardDataTable = () => {
  const [locations, setLocations] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null); // State for popup

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const locationsRef = collection(db, "locations");
        const snapshot = await getDocs(locationsRef);
        const loadedLocations = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLocations(loadedLocations);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, []);

  const sortData = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    const sortedLocations = [...locations].sort((a, b) => {
      if (key === "latitude" || key === "longitude") {
        return direction === "asc" ? parseFloat(a[key]) - parseFloat(b[key]) : parseFloat(b[key]) - parseFloat(a[key]);
      }
      if (key === "name") {
        return direction === "asc" ? a[key].localeCompare(b[key]) : b[key].localeCompare(a[key]);
      }
      return 0;
    });

    setSortConfig({ key, direction });
    setLocations(sortedLocations);
  };

  const filteredLocations = locations.filter((loc) =>
    loc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="datatable-container">
      <h3>Location List</h3>
      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by location name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th onClick={() => sortData("name")}>
                Location Name {sortConfig.key === "name" ? (sortConfig.direction === "asc" ? "⬆" : "⬇") : "⬍"}
              </th>
              <th onClick={() => sortData("latitude")}>
                Latitude {sortConfig.key === "latitude" ? (sortConfig.direction === "asc" ? "⬆" : "⬇") : "⬍"}
              </th>
              <th onClick={() => sortData("longitude")}>
                Longitude {sortConfig.key === "longitude" ? (sortConfig.direction === "asc" ? "⬆" : "⬇") : "⬍"}
              </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredLocations.map((loc) => (
              <tr key={loc.id}>
                <td>{loc.name}</td>
                <td>{loc.latitude}</td>
                <td>{loc.longitude}</td>
                <td>
                  <button onClick={() => setSelectedLocation(loc)}>View Data</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Popup Component */}
      {selectedLocation && (
        <LocationDetailsPopup
          location={selectedLocation}
          onClose={() => setSelectedLocation(null)}
        />
      )}
    </div>
  );
};

export default DashboardDataTable;
