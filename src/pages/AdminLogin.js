import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CustomerLogin.css";

const AdminLogin = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [rfid, setRfid] = useState(""); // To store the RFID value
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Hardcoded credentials
  const ADMIN_ID = "abishek";
  const ADMIN_PASS = "abcd1234";

  let rfidTimeout;

  // Function to start the serial connection with the Arduino and read the RFID
  const readRfidFromArduino = async () => {
    try {
      // Request access to the serial port
      const port = await navigator.serial.requestPort();
      await port.open({ baudRate: 9600 });

      // Create a readable stream from the serial port
      const reader = port.readable.getReader();
      const decoder = new TextDecoder();
      let rfidData = '';

      // Reset the RFID timeout before starting the reading process
      clearTimeout(rfidTimeout);

      // Timeout to auto authenticate after 5 seconds if RFID is not detected
      rfidTimeout = setTimeout(() => {
        console.log("No RFID detected, proceeding with auto authentication.");
        handleLogin();
      }, 5000);

      // Continuously read from the Arduino
      while (true) {
        const { value, done } = await reader.read();
        rfidData += decoder.decode(value, { stream: true });

        // As soon as any character is detected, treat it as an RFID
        if (rfidData.length > 0) {
          setRfid(rfidData);  // Update RFID state with the detected value
          clearTimeout(rfidTimeout);  // Clear timeout if RFID is detected early
          handleLogin(); // Proceed with login as soon as any data is detected
          break;
        }

        // If the reader is done, break the loop
        if (done) break;
      }

      // Close the connection once done
      reader.releaseLock();
      port.close();
    } catch (error) {
      console.error("Error reading from serial port:", error);
      setError("Failed to read RFID. Ensure the Arduino is connected.");
    }
  };

  // Handle login
  const handleLogin = () => {
    if (userId === ADMIN_ID && password === ADMIN_PASS && rfid) {
      console.log("Login Successful");
      navigate("/admin-dashboard"); // Redirect to the admin dashboard
    } else {
      setError("Invalid Admin ID, Password, or RFID!");
    }
  };

  return (
    <div className="login-container">
      <h1>Admin Login</h1>
      {error && <p className="error-message">{error}</p>}
      <input
        type="text"
        placeholder="Enter Admin ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="text"
        placeholder="Scan RFID"
        value={rfid} // Display RFID
        readOnly
      />
      <button onClick={handleLogin}>Login</button>
      <button className="back-button" onClick={() => navigate("/")}>
        Back
      </button>
      <button className="scan-rfid-button" onClick={readRfidFromArduino}>
        Scan RFID
      </button>
    </div>
  );
};

export default AdminLogin;
