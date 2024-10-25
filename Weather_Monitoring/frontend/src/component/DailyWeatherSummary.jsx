import React, { useState } from "react";
import axios from "axios";
// import { Weather } from "./Weather";

export const DailyWeatherSummary = () => {
  const [date, setDate] = useState("");
  const [city, setCity] = useState(null); // Default city selected
  const [summaryData, setSummaryData] = useState(null);
  const [error, setError] = useState("");

  // Predefined list of cities
  const cities = ["Delhi", "Mumbai", "Kolkata", "Chennai", "Bangalore"];

  const fetchSummaryData = async () => {
    setError("");
    try {
      const response = await axios.get(
        `http://localhost:3003/daily_weather_summary`,
        {
          params: { date, city },
        }
      );
      setSummaryData(response.data);
    } catch (err) {
      setError("Error fetching weather summary");
      console.error(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchSummaryData();
  };

  return (
    <>
      {/* <Weather /> */}
      <div className="daily-weather-background d-flex flex-column align-items-center mt-5">
        <h2 className="text-center mb-4">
          Daily Weather Summary <i className="bi bi-cloud-sun"></i>
        </h2>

        <form onSubmit={handleSubmit} className="form-inline mb-4">
          <div className="form-group mb-3 mr-2">
            <label htmlFor="date" className="sr-only">
              Enter Date:
            </label>
            <div className="input-group" style={{ width: "100px" }}>
              {/* <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="bi bi-calendar"></i>
                </span>
              </div> */}
              <input
                type="date"
                className="card-title text-center mb-4"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group mb-3 mr-2">
            <label htmlFor="city" className="sr-only">
              Select City:
            </label>
            <div className="input-group">
              {/* <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="bi bi-building"></i>
                </span>
              </div> */}
              <select
                className="form-select form-select-lg"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              >
                <option value="">Select a city</option>
                {cities.map((cityOption) => (
                  <option key={cityOption} value={cityOption}>
                    {cityOption}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button type="submit" className="btn btn-primary mb-3">
            <i className="bi bi-search"></i> Get Summary
          </button>
        </form>

        {error && (
          <div className="alert alert-danger mt-3" role="alert">
            {error}
          </div>
        )}

        {summaryData && (
          <div className="card mt-4 bg-secondary text-light w-50">
            <div className="card-body">
              <h3 className="card-title text-center">
                Weather Summary for {summaryData.date} in {summaryData.city}
              </h3>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <i className="bi bi-thermometer-half"></i> Average
                  Temperature: {summaryData.averageTemperature.toFixed(2)} °C
                </li>
                <li className="list-group-item">
                  <i className="bi bi-thermometer-sun"></i> Max Temperature:{" "}
                  {summaryData.maxTemperature.toFixed(2)} °C
                </li>
                <li className="list-group-item">
                  <i className="bi bi-thermometer-snow"></i> Min Temperature:{" "}
                  {summaryData.minTemperature.toFixed(2)} °C
                </li>
                <li className="list-group-item">
                  <i className="bi bi-cloud"></i> Dominant Condition:{" "}
                  {summaryData.dominantWeatherCondition}
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
