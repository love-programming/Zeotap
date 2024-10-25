const DailyWeatherSummaryService = require('./service');

class DailyWeatherSummaryController {
    static async calculateDailySummary(req, res) {
        const { date, city } = req.query;

        // Use today's date if no date is provided
        const queryDate = date ? new Date(date) : new Date();

        if (!city) {
            return res.status(400).send('City parameter is required.');
        }

        try {
            const summary = await DailyWeatherSummaryService.calculateDailySummary(queryDate, city);
            res.json(summary);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
}

// class DailyWeatherSummaryController {
//     static async calculateDailySummary(req, res) {
//         const { date } = req.query;

//         if (!date) {
//             return res.status(400).send('Date parameter is required.');
//         }

//         try {
//             const summary = await DailyWeatherSummaryService.calculateDailySummary(new Date(date));
//             res.json(summary);
//         } catch (error) {
//             res.status(500).send(error.message);
//         }
//     }
// }

module.exports = DailyWeatherSummaryController;
