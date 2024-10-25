const express = require("express");
const cron = require("node-cron");
const weatherRoutes = require("./src/weatherData/routes");
const weatherService = require("./src/weatherData/service");
const dailyWeatherRoutes = require("./src/DailyWeatherSummary/routes");
const cors = require("cors");

const db = require("./config/dbConfig");

const app = express();
const PORT = 3003;
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());

// Use the weather routes
app.use("/", weatherRoutes);
app.use("/", dailyWeatherRoutes);

// Schedule weather data fetching every 5 minutes
cron.schedule("*/5 * * * *", () => {
  weatherService.fetchAndSaveWeatherData();
});

// Sync the database and start the server
async function startServer() {
  try {
    await db.sync();
    app
      .listen(PORT, () => {
        console.log(`Server is running on : http://localhost:${PORT}`);
      })
      .on("error", (err) => {
        if (err.code === "EADDRINUSE") {
          console.log("Server startup error: address already in use");
        } else {
          console.log(err);
        }
      });
  } catch (error) {
    console.error("Unable to sync the database:", error);
  }
}

startServer();
