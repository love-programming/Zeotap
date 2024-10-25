const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig'); 

class DailyWeatherSummary extends Model {}

DailyWeatherSummary.init({
    id: {
        type: DataTypes.INTEGER, // Integer type for ID
        autoIncrement: true,
        primaryKey: true,
    },
    date: {
        type: DataTypes.DATEONLY, // Only date without time
        allowNull: false,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    averageTemperature: {
        type: DataTypes.DOUBLE, // Store average temperature
        allowNull: false,
    },
    maxTemperature: {
        type: DataTypes.DOUBLE, // Store max temperature
        allowNull: false,
    },
    minTemperature: {
        type: DataTypes.DOUBLE, // Store min temperature
        allowNull: false,
    },
    dominantWeatherCondition: {
        type: DataTypes.STRING, // Store dominant weather condition
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'DailyWeatherSummary',
    tableName: 'daily_weather_summary', // Adjust the table name if necessary
    timestamps: false, // Disable timestamps if not needed
});

module.exports = DailyWeatherSummary;
