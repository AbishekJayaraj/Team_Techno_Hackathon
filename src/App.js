import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AdminLogin from "./pages/AdminLogin";
import AdminLanding from "./pages/AdminLanding";
import Dashboard from "./pages/Dashboard";
import AnalyticsLanding from "./pages/AnalyticsLanding"; // ✅ Import AnalyticsLanding
import PredictionModels from "./pages/PredictionModels"; // Import PredictionModels page
import Heatmaps from "./pages/Heatmaps"; // Import Heatmaps page
import AnomalyDetection from "./pages/AnomalyDetection"; // Import AnomalyDetection page

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminLanding />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/analytics-landing" element={<AnalyticsLanding />} /> {/* ✅ Ensure route matches */}
        <Route path="/prediction-models" element={<PredictionModels />} /> {/* Route for Prediction Models */}
        <Route path="/heatmaps" element={<Heatmaps />} /> {/* Route for Heatmaps & Comparative Reports */}
        <Route path="/anomaly-detection" element={<AnomalyDetection />} /> {/* Route for Anomaly Detection */}
      </Routes>
    </Router>
  );
};

export default App;
