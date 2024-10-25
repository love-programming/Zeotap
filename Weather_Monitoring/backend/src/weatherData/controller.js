const weatherService = require("./service");

//Controller to handle fetching daily weather summary
const getDailySummary = async (req, res) => {
  const city = req.query.city;
  if (!city) {
    return res.status(400).json({ error: "City is required" });
  }

  try {
    const data = await weatherService.getWeather(city);
    if (!data || data.length === 0) {
      return res.status(404).json({ error: "No weather data found for today" });
    }
    res.json(data); // Return the array of weather data including the time
  } catch (error) {
    console.error("Error fetching weather data:", error);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
};

module.exports = {
  getDailySummary,
};
