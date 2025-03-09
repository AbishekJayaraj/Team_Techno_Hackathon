import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from "recharts";
import "./LocationDetailsPopup.css";

const LocationDetailsPopup = ({ location, onClose }) => {
  if (!location) return null;

  // Separate numerical and boolean data
  const numericalSensors = {};
  const booleanSensors = {};

  Object.entries(location).forEach(([key, value]) => {
    const keyLower = key.toLowerCase();

    // Ensure IR flame and MQ135 are always boolean and set to false
    if (keyLower.includes("ir flame") || keyLower.includes("mq135")) {
      booleanSensors[key] = false; 
    } else if (Array.isArray(value) && value.length === 100) {
      numericalSensors[key] = value.map((val, index) => ({ index: index + 1, value: val })); // Start index from 1
    } else if (typeof value === "boolean") {
      booleanSensors[key] = value;
    }
  });

  // Calculate averages for numerical sensors
  const averages = {};
  Object.keys(numericalSensors).forEach((sensor) => {
    const values = numericalSensors[sensor].map((item) => item.value);
    const sum = values.reduce((acc, val) => acc + val, 0);
    averages[sensor] = (sum / values.length).toFixed(2); // Round to 2 decimal places
  });

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-btn" onClick={onClose}>✖</button>

        <h2>{location.name} Details</h2>
        <p><strong>Latitude:</strong> {location.latitude}</p>
        <p><strong>Longitude:</strong> {location.longitude}</p>

        <div className="popup-scrollable">
          {/* Numerical Data Graphs */}
          {Object.keys(numericalSensors).map((sensor) => (
            <div key={sensor} className="graph-container">
              <h3>{sensor.toUpperCase()}</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={numericalSensors[sensor]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="index"
                    label={{ value: "Reading Number", position: "insideBottom", offset: -5 }}
                  />
                  <YAxis
                    label={{ value: `${sensor} (units)`, angle: -90, position: "insideLeft" }}
                  />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="value" stroke="#8884d8" dot={{ r: 1 }} />
                </LineChart>
              </ResponsiveContainer>
              {/* Display Average */}
              <div className="average-value">
                <strong>Average:</strong> <span>{averages[sensor]}</span>
              </div>
            </div>
          ))}

          {/* Boolean Data (Yes/No Boxes) */}
          <div className="boolean-sensors">
            {Object.keys(booleanSensors).map((sensor) => (
              <div key={sensor} className="boolean-box">
                <strong>{sensor.toUpperCase()}:</strong> {booleanSensors[sensor] ? "✅ Yes" : "❌ No"}
              </div>
            ))}
          </div>
        </div>

        {/* Extra Space at Bottom to Prevent Cut-off */}
        <div className="popup-bottom-space"></div>
      </div>
    </div>
  );
};

export default LocationDetailsPopup;