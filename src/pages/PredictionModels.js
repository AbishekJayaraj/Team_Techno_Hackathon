import React from "react";
import Header from "../components/Header";  // Import the Header component
import Footer from "../components/Footer";  // Import the Footer component
import "./PredictionModels.css"; 

const PredictionModels = () => {
  return (
    <div>
      <Header />  {/* Add the Header component */}
      <div className="prediction-models">
        <h2>Prediction Models</h2>
        <p>
          Explore advanced prediction models to forecast trends and outcomes based on historical data.
        </p>
        {/* Add more content related to prediction models */}
      </div>
      <Footer />  {/* Add the Footer component */}
    </div>
  );
};

export default PredictionModels;
