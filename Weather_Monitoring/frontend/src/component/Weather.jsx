import React, { useState } from "react";
import axios from "axios";
import { DailyWeatherSummary } from "./DailyWeatherSummary";
import Navbar from "./Navbar"; // Make sure this component is imported

export const Weather = () => {
  const cities = ["Delhi", "Mumbai", "Kolkata", "Chennai", "Bangalore"];
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [selectedPage, setSelectedPage] = useState("weather");
  const [message, setMessage] = useState("");

  const handlePageChange = (page) => {
    setSelectedPage(page);
  };

  const fetchWeatherData = async () => {
    setError(null);
    try {
      const response = await axios.get(
        `http://localhost:3003/weather_summary?city=${city}`
      );
      setWeatherData(response.data);
      if (Array.isArray(response.data) && response.data.length > 0) {
        const { temperature, mainCondition, feelsLike } = response.data[0]; // Access the first item in the array
        checkTemperatureAlert(temperature, mainCondition, feelsLike); // Function to check temperature conditions
      } else {
        setError("Unexpected data format");
      }
    } catch (err) {
      setError("Error fetching weather data");
      console.error(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData();
    // checkTemperatureAlert(temperature, mainCondition, feelsLike);
  };
  const checkTemperatureAlert = (temperature, mainCondition, feelsLike) => {
    // Temperature checking logic here...
    const cloudRange = { min: 22.03000000000003, max: 24.19000000000004 };
    const cloudRanges = { min: 27.0, max: 32.43000000000004 };
    const clearRange = { min: 24.200000000000045, max: 24.010000000000048 };
    const rainRange = { min: 25.840000000000032, max: 26.99000000000001 };
    const summerRange = { min: 32.44, max: 40 };
    let message = "";

    if (mainCondition === "Clouds") {
      if (temperature >= cloudRange.min && feelsLike <= cloudRange.max) {
        message = "ALERT: Cloudy with comfortable temperatures.";
      }
    }
    if (mainCondition === "Clouds") {
      if (temperature >= cloudRanges.min && feelsLike <= cloudRanges.max) {
        message = "ALERT: Cloudy with comfortable temperatures.";
      }
    } else if (mainCondition === "Clear") {
      if (temperature >= clearRange.min && feelsLike <= clearRange.max) {
        message = "ALERT: Clear and pleasant weather today.";
      }
    } else if (mainCondition === "Rain") {
      if (temperature >= rainRange.min && feelsLike <= rainRange.max) {
        message = "ALERT: Rain likely today. Plan accordingly.";
      }
    } else if (temperature >= summerRange.min && feelsLike <= summerRange.max) {
      message = "ALERT: High temperatures today. Stay hydrated.";
    }
    setMessage(message);

    // Display the message if it's not em
  };

  // Function to render the weather form and weather result
  const renderWeatherForm = () => (
    <div className="card shadow-lg h-75 w-25">
      <div className="card-body bg-light bg-gradient">
        <h1
          className="card-title text-center mb-4"
          style={{ fontFamily: "cursive" }}
        >
          Weather App
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
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
          <div className="d-grid">
            <button type="submit" className="btn btn-secondary btn-lg">
              Get Weather
            </button>
          </div>
        </form>

        {error && (
          <div className="alert alert-danger mt-3" role="alert">
            {error}
          </div>
        )}

        {weatherData && weatherData.length > 0 && (
          <div className="mt-4">
            <h2 className="text-center mb-3 text-secondary">
              {weatherData[0]?.city}
            </h2>
            <div className="text-center mb-3">
              <i
                className={`bi bi-${getWeatherIcon(
                  weatherData[0]?.mainCondition
                )} display-1`}
              ></i>
            </div>
            <div className="row text-center">
              <div className="col-6">
                <p className="mb-0 text-info">Temperature</p>
                <h3>{weatherData[0]?.temperature.toFixed(1)}°C</h3>
              </div>
              <div className="col-6">
                <p className="mb-0 text-info">Feels Like</p>
                <h3>{weatherData[0]?.feelsLike.toFixed(1)}°C</h3>
              </div>
            </div>
            <p className="text-center mt-3 text-info">
              <strong>{weatherData[0]?.mainCondition}</strong>
            </p>
            <p className="text-center text-muted">
              {new Date(weatherData[0]?.date).toLocaleDateString()}
            </p>
            <div>
              {" "}
              {message && (
                <p
                  className="text-center"
                  style={{ fontWeight: "bold", color: "red" }}
                >
                  {message}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Function to render the page based on selectedPage state
  const renderContent = () => {
    switch (selectedPage) {
      case "weather":
        return renderWeatherForm();
      case "dailyWeatherSummary":
        return <DailyWeatherSummary />;
      default:
        return renderWeatherForm();
    }
  };

  return (
    <div>
      <Navbar onPageChange={handlePageChange} />
      <div className="weather-background d-flex align-items-center justify-content-center">
        {renderContent()}
      </div>
    </div>
  );
};

// Helper function to map weather conditions to Bootstrap icons
const getWeatherIcon = (mainCondition) => {
  switch (mainCondition?.toLowerCase()) {
    case "clear":
      return "sun";
    case "clouds":
      return "cloud";
    case "rain":
      return "cloud-rain";
    case "snow":
      return "snow";
    default:
      return "cloud";
  }
};
