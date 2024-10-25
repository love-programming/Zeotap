import React, { useState } from "react";

const RainAlerts = () => {
  const [temperature, setTemperature] = useState("");
  const [season, setSeason] = useState("");
  const [alerts, setAlerts] = useState([]);

  const handleCheckAlerts = () => {
    let newAlerts = [];
    const temp = parseFloat(temperature);

    if (season === "summer" && temp > 20) {
      newAlerts.push(
        "Thunderstorm Warning: Severe thunderstorms expected with heavy rainfall."
      );
      newAlerts.push(
        "Flash Flood Warning: Heavy rain likely to cause flash flooding in low-lying areas."
      );
      newAlerts.push(
        "Heat Advisory: High temperatures may lead to increased humidity and storms."
      );
    } else if (season === "winter" && temp < 10) {
      newAlerts.push(
        "Winter Storm Warning: Rain, sleet, and snow expected leading to hazardous conditions."
      );
      newAlerts.push(
        "Freezing Rain Advisory: Rain may freeze upon contact, creating hazardous travel conditions."
      );
      newAlerts.push(
        "Flood Watch: Melting snow combined with rain may lead to rising water levels."
      );
    } else if (season === "transitional" && temp >= 5 && temp <= 20) {
      newAlerts.push(
        "Flood Watch: Increased rain from spring thaw or fall storms may lead to flooding."
      );
      newAlerts.push(
        "Severe Weather Alert: Warm air meeting cooler air may create severe storms."
      );
      newAlerts.push(
        "Wind Advisory: Strong winds accompanying rain storms can cause power outages."
      );
    } else {
      newAlerts.push("No specific alerts for the given conditions.");
    }

    setAlerts(newAlerts);
  };

  return (
    <div className="alert-container">
      <h2>Rain Alerts Checker</h2>
      <div className="form-group">
        <label htmlFor="temperature">Enter Temperature (°C):</label>
        <input
          type="number"
          id="temperature"
          value={temperature}
          onChange={(e) => setTemperature(e.target.value)}
          className="form-control"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="season">Select Season:</label>
        <select
          id="season"
          value={season}
          onChange={(e) => setSeason(e.target.value)}
          className="form-select"
          required
        >
          <option value="">Select a season</option>
          <option value="summer">Summer</option>
          <option value="winter">Winter</option>
          <option value="transitional">Transitional (Spring/Fall)</option>
        </select>
      </div>
      <button onClick={handleCheckAlerts} className="btn btn-primary">
        Check Alerts
      </button>
      <div className="alert-list mt-3">
        {alerts.map((alert, index) => (
          <div key={index} className="alert alert-info">
            {alert}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RainAlerts;
