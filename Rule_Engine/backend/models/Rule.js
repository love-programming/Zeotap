// models/Rule.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 

class Rule extends Model {}

Rule.init({
  rule_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rule_string: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  ast: {
    type: DataTypes.JSONB,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Rule',
  tableName: 'rules',  
  timestamps: false,   
});

module.exports = Rule;
