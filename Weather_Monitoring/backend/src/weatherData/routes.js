const express = require("express");
const router = express.Router();
const weatherController = require("./controller");

// Define the route for getting weather summarynp stat
router.get("/weather_summary", weatherController.getDailySummary);

module.exports = router;
