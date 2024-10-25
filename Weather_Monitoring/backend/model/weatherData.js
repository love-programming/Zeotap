const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig'); 

class weatherData extends Model {}

weatherData.init({
  id: {
    type: DataTypes.INTEGER, // Changed from BIGINT to INTEGER
    autoIncrement: true,
    primaryKey: true,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  time: {
    type: DataTypes.STRING, // Store time as a string (e.g., "14:05:00")
    allowNull: false
},
  temperature: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  feelsLike: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  mainCondition: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dt: {
    type: DataTypes.BIGINT,
    allowNull: false,
  }
}, {
  
    sequelize,
    modelName: 'weatherData',
    tableName: 'weather_data',  
    timestamps: false,
});

module.exports = weatherData;
