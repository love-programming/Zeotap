const axios = require('axios');
const WeatherData = require('../../model/weatherData'); // Your Sequelize model



const cities = ["Delhi", "Mumbai", "Chennai", "Bangalore", "Kolkata", "Hyderabad"];
const API_KEY = '6be7b5b0c578e890ffd31529b2ed2d36';

const fetchAndSaveWeatherData = async () => {
    for (let city of cities) {
        const url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${API_KEY}`;
        try {
            const response = await axios.get(url);
            const forecast = response.data.list[0]; // Get the first forecast

            const weatherData = {
                city: city,
                date: new Date().toISOString().split('T')[0], // Current date
                time: new Date().toLocaleTimeString('en-US', { hour12: false }), // Current time in HH:mm:ss format
                temperature: forecast.main.temp - 273.15, // Convert from Kelvin to Celsius
                feelsLike: forecast.main.feels_like - 273.15,
                mainCondition: forecast.weather[0].main,
                dt: forecast.dt
            };

            // Check if an entry already exists for this city at the same date and time
            const existingRecord = await WeatherData.findOne({
                where: {
                    city: city,
                    date: weatherData.date,
                    time: weatherData.time
                }
            });

            if (existingRecord) {
                // Update the existing record
                await WeatherData.update(weatherData, {
                    where: {
                        city: city,
                        date: weatherData.date,
                        time: weatherData.time
                    }
                });
                console.log(`Updated weather data for ${city} at ${weatherData.time}`);
            } else {
                // Create a new record
                await WeatherData.create(weatherData);
                console.log(`Saved weather data for ${city} at ${weatherData.time}`);
            }
        } catch (error) {
            console.error(`Failed to fetch data for city: ${city}`, error);
        }
    }
};

const getWeather = async (city) => {
    return await WeatherData.findAll({
        where: {
            city: city,
            date: new Date().toISOString().split('T')[0] // Filter by today's date
        },
        order: [['time', 'DESC']] // Order by time to show all entries in the right order
    });
};




// const fetchAndSaveWeatherData = async () => {
//     for (let city of cities) {
//         const url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${API_KEY}`;
//         try {
//             const response = await axios.get(url);
//             const forecast = response.data.list[0]; // Get the first forecast

//             const weatherData = {
//                 city: city,
//                 date: new Date().toISOString().split('T')[0], // Current date
//                 temperature: forecast.main.temp - 273.15, // Convert from Kelvin to Celsius
//                 feelsLike: forecast.main.feels_like - 273.15,
//                 mainCondition: forecast.weather[0].main,
//                 dt: forecast.dt
//             };

//             await WeatherData.create(weatherData); // Save to database
//             console.log(`Saved weather data for ${city}`);
//         } catch (error) {
//             console.error(`Failed to fetch data for city: ${city}`, error);
//         }
//     }
// };

// const getWeather = async (city) => {
//     return await WeatherData.findAll({
//         where: {
//             city: city,
//             date: new Date().toISOString().split('T')[0]
//         }
//     });
// };

module.exports = {
    fetchAndSaveWeatherData,
    getWeather
};
