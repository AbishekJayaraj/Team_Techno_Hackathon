import React, { useState, useEffect } from "react";
import Header from "../components/Header";  // Import the Header component
import Footer from "../components/Footer";  // Import the Footer component
import "./AnomalyDetection.css";

// Function to generate random sensor data for different fields
const generateRandomData = (numFields = 5, numEntries = 500, threshold = 80) => {
  const fields = ["Humidity", "Temperature", "Pollution", "Sound", "Water Flow"];
  const data = {};

  // Generate random data for each field
  fields.forEach((field) => {
    const fieldData = [];
    for (let i = 0; i < numEntries; i++) {
      const value = Math.random() * 100; // Random value between 0 and 100
      const isAnomaly = value > threshold; // Anomaly if value exceeds threshold
      fieldData.push({ value, isAnomaly });
    }
    data[field] = fieldData;
  });

  return data;
};

const AnomalyDetection = () => {
  const [anomalyMap, setAnomalyMap] = useState([]);
  const [threshold, setThreshold] = useState(80);

  useEffect(() => {
    // Generate random anomaly data on threshold change
    const randomData = generateRandomData();
    setAnomalyMap(randomData);
  }, [threshold]);

  // Prepare SVG scatter plot data
  const generateScatterData = () => {
    const scatterData = [];

    Object.keys(anomalyMap).forEach((field) => {
      anomalyMap[field].forEach((sensorData, idx) => {
        scatterData.push({
          field,
          x: idx * 5, // X-axis (sensor index)
          y: sensorData.value, // Y-axis (sensor value)
          anomaly: sensorData.isAnomaly,
        });
      });
    });

    return scatterData;
  };

  // Generate separate scatter plot data for each field
  const generateFieldScatterData = (field) => {
    const fieldData = anomalyMap[field] || [];
    return fieldData.map((sensorData, idx) => ({
      x: idx * 5,
      y: sensorData.value,
      anomaly: sensorData.isAnomaly,
    }));
  };

  return (
    <div>
      <Header /> {/* Add the Header component */}
      <div className="anomaly-detection">
        <h2>Real-time Anomaly Map</h2>
        <p>
          Visualize and detect anomalies in real-time sensor data from different data fields.
        </p>

        {/* Loop through the fields and generate separate scatter plots */}
        <div className="scatter-plot-container">
          {Object.keys(anomalyMap).map((field, index) => (
            <div key={index} className="field-plot">
              <h3>{field} Data</h3>
              <svg width="90%" height="500">
                {/* X and Y axis labels */}
                <text x="50%" y="20" textAnchor="middle" fontSize="16">
                  Sensor Index
                </text>
                <text
                  transform="rotate(-90)"
                  x="-250"
                  y="50"
                  textAnchor="middle"
                  fontSize="16"
                >
                  Sensor Value
                </text>

                {/* Scatter plot data points */}
                {generateFieldScatterData(field).map((dataPoint, idx) => (
                  <circle
                    key={idx}
                    cx={dataPoint.x}
                    cy={500 - dataPoint.y * 3} // Invert Y-axis for proper scaling
                    r="4"
                    fill={dataPoint.anomaly ? "red" : "green"}
                    title={`${dataPoint.field} - ${dataPoint.y.toFixed(2)} ${dataPoint.anomaly ? "(Anomaly)" : "(Normal)"}`}
                  />
                ))}

                {/* X-axis ticks */}
                {Array.from({ length: 10 }, (_, i) => i * 50).map((tick, idx) => (
                  <text key={idx} x={tick} y="480" fontSize="12" textAnchor="middle">
                    {tick}
                  </text>
                ))}

                {/* Y-axis ticks */}
                {Array.from({ length: 10 }, (_, i) => i * 10).map((tick, idx) => (
                  <text key={idx} x="-30" y={500 - tick * 3} fontSize="12">
                    {tick}
                  </text>
                ))}
              </svg>
            </div>
          ))}
        </div>

        {/* Anomaly Threshold Control */}
        <div className="threshold-control">
          <label htmlFor="threshold">Set Anomaly Threshold:</label>
          <input
            type="number"
            id="threshold"
            value={threshold}
            onChange={(e) => setThreshold(Number(e.target.value))}
            min={0}
            max={100}
          />
        </div>
      </div>
      <Footer /> {/* Add the Footer component */}
    </div>
  );
};

export default AnomalyDetection;
