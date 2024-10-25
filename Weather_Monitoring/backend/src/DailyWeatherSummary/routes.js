const express = require('express');
const router = express.Router();
const DailyWeatherSummaryController = require('./controller');



router.get('/daily_weather_summary', DailyWeatherSummaryController.calculateDailySummary);

module.exports = router;
