const  WeatherData  = require('../../model/weatherData'); 
const  DailyWeatherSummary  = require('../../model/dailyWeatherSummary'); 


class DailyWeatherSummaryService {
    static async calculateDailySummary(date, city) {
        // Fetch weather data for the specified date and city
        const weatherDataForDay = await WeatherData.findAll({
            where: {
                date: date,
                city: city
            },
        });

        if (weatherDataForDay.length === 0) {
            throw new Error('No weather data available for the given date and city');
        }

        // Calculate average, max, and min temperatures
        const avgTemp = weatherDataForDay.reduce((acc, data) => acc + data.temperature, 0) / weatherDataForDay.length;
        const maxTemp = Math.max(...weatherDataForDay.map(data => data.temperature));
        const minTemp = Math.min(...weatherDataForDay.map(data => data.temperature));

        // Calculate the dominant weather condition
        const dominantCondition = this.calculateDominantWeatherCondition(weatherDataForDay);

        // Create and save the daily summary
        const dailySummary = await DailyWeatherSummary.create({
            date: date,
            city: city,
            averageTemperature: avgTemp,
            maxTemperature: maxTemp,
            minTemperature: minTemp,
            dominantWeatherCondition: dominantCondition,
        });

        return dailySummary;
    }

    static calculateDominantWeatherCondition(weatherDataForDay) {
        const conditionCount = {};

        // Count occurrences of each weather condition
        weatherDataForDay.forEach(data => {
            const condition = data.mainCondition;
            conditionCount[condition] = (conditionCount[condition] || 0) + 1;
        });

        // Find the condition with the highest count
        return Object.keys(conditionCount).reduce((a, b) => conditionCount[a] > conditionCount[b] ? a : b);
    }
}


// class DailyWeatherSummaryService {
//     static async calculateDailySummary(date) {
//         // Fetch weather data for the specified date
//         const weatherDataForDay = await WeatherData.findAll({
//             where: { date: date },
//         });

//         if (weatherDataForDay.length === 0) {
//             throw new Error('No weather data available for the given date');
//         }

//         // Calculate average, max, and min temperatures
//         const avgTemp = weatherDataForDay.reduce((acc, data) => acc + data.temperature, 0) / weatherDataForDay.length;
//         const maxTemp = Math.max(...weatherDataForDay.map(data => data.temperature));
//         const minTemp = Math.min(...weatherDataForDay.map(data => data.temperature));

//         // Calculate the dominant weather condition
//         const dominantCondition = this.calculateDominantWeatherCondition(weatherDataForDay);

//         // Create and save the daily summary
//         const dailySummary = await DailyWeatherSummary.create({
//             date: date,
//             averageTemperature: avgTemp,
//             maxTemperature: maxTemp,
//             minTemperature: minTemp,
//             dominantWeatherCondition: dominantCondition,
//         });

//         return dailySummary;
//     }

//     static calculateDominantWeatherCondition(weatherDataForDay) {
//         const conditionCount = {};

//         // Count occurrences of each weather condition
//         weatherDataForDay.forEach(data => {
//             const condition = data.mainCondition;
//             conditionCount[condition] = (conditionCount[condition] || 0) + 1;
//         });

//         // Find the condition with the highest count
//         return Object.keys(conditionCount).reduce((a, b) => conditionCount[a] > conditionCount[b] ? a : b);
//     }
// }

module.exports = DailyWeatherSummaryService;
