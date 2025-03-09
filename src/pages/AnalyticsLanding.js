import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./AnalyticsLanding.css";

const AnalyticsLanding = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Header />
      <main className="analytics-landing">
        <h2>Analytics Dashboard</h2>
        <div className="button-container">
          {/* Prediction Models Button */}
          <div className="button-card">
            <button onClick={() => navigate("/prediction-models")}>Prediction Models</button>
            <p className="button-info">
              Explore advanced prediction models to forecast trends and outcomes based on historical data.
            </p>
          </div>

          {/* Heatmaps & Comparative Reports Button */}
          <div className="button-card">
            <button onClick={() => navigate("/heatmaps")}>Heatmaps & Comparative Reports</button>
            <p className="button-info">
              Visualize data trends and compare metrics across different regions or time periods using interactive heatmaps.
            </p>
          </div>

          {/* Real-time Anomaly Detection Button */}
          <div className="button-card">
            <button onClick={() => navigate("/anomaly-detection")}>Real-time Anomaly Detection</button>
            <p className="button-info">
              Detect and analyze anomalies in real-time data streams to ensure system integrity and performance.
            </p>
          </div>
        </div>

        {/* Additional Information Section */}
        <div className="additional-info">
          <h3>Types of Representation</h3>
          <p>
            Our analytics dashboard provides multiple ways to represent and analyze data, including:
          </p>
          <ul>
            <li><strong>Graphs:</strong> Line charts, bar charts, and scatter plots for trend analysis.</li>
            <li><strong>Heatmaps:</strong> Visualize data density and patterns across regions or time.</li>
            <li><strong>Tables:</strong> Detailed tabular data for precise analysis.</li>
            <li><strong>Maps:</strong> Geospatial representations for location-based insights.</li>
          </ul>

          <h3>General Information</h3>
          <p>
            The analytics dashboard is designed to help you make data-driven decisions by providing:
          </p>
          <ul>
            <li><strong>Real-time Monitoring:</strong> Track live data streams and detect anomalies instantly.</li>
            <li><strong>Historical Analysis:</strong> Analyze past data to identify trends and patterns.</li>
            <li><strong>Predictive Insights:</strong> Use machine learning models to forecast future outcomes.</li>
            <li><strong>Custom Reports:</strong> Generate and download reports tailored to your needs.</li>
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AnalyticsLanding;