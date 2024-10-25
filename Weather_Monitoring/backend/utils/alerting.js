// const moment = require('moment');

// // Format weather data timestamp
// function formatWeatherData(data) {
//     return {
//         main: data.weather[0].main,
//         temp: data.main.temp,
//         feels_like: data.main.feels_like,
//         time: moment.unix(data.dt).format('YYYY-MM-DD HH:mm:ss')
//     };
// }

// // Rollup and aggregate weather data
// function calculateAggregates(weatherLogs) {
//     const totalTemp = weatherLogs.reduce((sum, log) => sum + log.temp, 0);
//     const totalFeelsLike = weatherLogs.reduce((sum, log) => sum + log.feels_like, 0);

//     const averageTemp = totalTemp / weatherLogs.length;
//     const averageFeelsLike = totalFeelsLike / weatherLogs.length;

//     const conditionFrequency = weatherLogs.reduce((acc, log) => {
//         acc[log.main] = (acc[log.main] || 0) + 1;
//         return acc;
//     }, {});

//     return {
//         averageTemp: averageTemp.toFixed(2),
//         averageFeelsLike: averageFeelsLike.toFixed(2),
//         conditionFrequency
//     };
// }

// module.exports = {
//     formatWeatherData,
//     calculateAggregates
// };
