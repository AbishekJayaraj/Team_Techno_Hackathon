import React, { useState } from "react";
import Header from "../components/Header"; // Import the Header component
import Footer from "../components/Footer"; // Import the Footer component
import "./Heatmaps.css";

const Heatmaps = () => {
  const [heatmapData1, setHeatmapData1] = useState([]); // Heatmap data for the first location
  const [heatmapData2, setHeatmapData2] = useState([]); // Heatmap data for the second location
  const [locations, setLocations] = useState(
    Array.from({ length: 100 }, (_, i) => `Location ${i + 1}`) // Locations 1 to 100
  );
  const [dataFields, setDataFields] = useState(["Temperature", "Humidity", "Pollution", "Sound"]); // Simulated data fields
  const [selectedLocation1, setSelectedLocation1] = useState(""); // First selected location for comparison
  const [selectedLocation2, setSelectedLocation2] = useState(""); // Second selected location for comparison
  const [selectedDataField, setSelectedDataField] = useState(""); // Selected data field for comparison

  // Function to generate random heatmap data (10x10 grid of values between 1 and 100)
  const generateRandomHeatmapData = () => {
    return Array.from({ length: 10 }, () =>
      Array.from({ length: 10 }, () => Math.floor(Math.random() * 100)) // Simulating 10x10 grid
    );
  };

  // Generate random heatmap data when selections are made
  const handleSelectionChange = () => {
    if (selectedLocation1 && selectedLocation2 && selectedDataField) {
      // Simulate fetching random data for both selected locations and the selected data field
      setHeatmapData1(generateRandomHeatmapData());
      setHeatmapData2(generateRandomHeatmapData());
    }
  };

  // Helper function to map value to a color
  const getColorForValue = (value) => {
    const green = Math.min(value * 2, 255); // Green intensity
    const red = Math.min(255 - value * 2, 255); // Red intensity
    return `rgb(${red}, ${green}, 100)`; // RGB color value
  };

  return (
    <div>
      <Header /> {/* Add the Header component */}
      <div className="heatmaps">
        <h2>Heatmaps & Comparative Reports</h2>
        

        {/* Location and Data Field Selection */}
        <div className="selection-container">
          <div className="selection">
            <label htmlFor="location1">Select Location 1:</label>
            <select
              id="location1"
              value={selectedLocation1}
              onChange={(e) => setSelectedLocation1(e.target.value)}
            >
              <option value="">Select a Location</option>
              {locations.map((location, index) => (
                <option key={index} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>

          <div className="selection">
            <label htmlFor="location2">Select Location 2:</label>
            <select
              id="location2"
              value={selectedLocation2}
              onChange={(e) => setSelectedLocation2(e.target.value)}
            >
              <option value="">Select a Location</option>
              {locations.map((location, index) => (
                <option key={index} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>

          <div className="selection">
            <label htmlFor="dataField">Select Data Field:</label>
            <select
              id="dataField"
              value={selectedDataField}
              onChange={(e) => setSelectedDataField(e.target.value)}
            >
              <option value="">Select a Data Field</option>
              {dataFields.map((field, index) => (
                <option key={index} value={field}>
                  {field}
                </option>
              ))}
            </select>
          </div>

          {/* Button to update heatmap based on selection */}
          <button className="generate-button" onClick={handleSelectionChange}>
            Generate Heatmap
          </button>
        </div>

        {/* Heatmap visualization */}
        <div className="heatmap-visualization">
          <div className="heatmap-container">
            <h3>Heatmap of {selectedDataField} for {selectedLocation1}</h3>
            {heatmapData1.length > 0 ? (
              <div
                className="heatmap-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: `repeat(${heatmapData1.length}, 1fr)`,
                  gridTemplateRows: `repeat(${heatmapData1[0].length}, 1fr)`,
                  gap: "2px",
                }}
              >
                {heatmapData1.flat().map((value, index) => (
                  <div
                    key={index}
                    style={{
                      width: "30px",
                      height: "30px",
                      backgroundColor: getColorForValue(value),
                    }}
                  ></div>
                ))}
              </div>
            ) : (
              <p>Please select a location and data field to generate the heatmap.</p>
            )}
          </div>

          <div className="heatmap-container">
            <h3>Heatmap of {selectedDataField} for {selectedLocation2}</h3>
            {heatmapData2.length > 0 ? (
              <div
                className="heatmap-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: `repeat(${heatmapData2.length}, 1fr)`,
                  gridTemplateRows: `repeat(${heatmapData2[0].length}, 1fr)`,
                  gap: "2px",
                }}
              >
                {heatmapData2.flat().map((value, index) => (
                  <div
                    key={index}
                    style={{
                      width: "30px",
                      height: "30px",
                      backgroundColor: getColorForValue(value),
                    }}
                  ></div>
                ))}
              </div>
            ) : (
              <p>Please select a location and data field to generate the heatmap.</p>
            )}
          </div>
        </div>

        {/* Comparative report example */}
        <div className="comparative-report">
          <h3>Comparative Report: {selectedLocation1} vs {selectedLocation2}</h3>
          <p>
            Compare the {selectedDataField} trends between {selectedLocation1} and {selectedLocation2}.
          </p>
        </div>
      </div>
      <Footer /> {/* Add the Footer component */}
    </div>
  );
};

export default Heatmaps;