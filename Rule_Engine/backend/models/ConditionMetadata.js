// models/ConditionMetadata.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class ConditionMetadata extends Model {}

ConditionMetadata.init({

  rule_id: { 
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'rules', 
      key: 'id',
    },
  },

  field_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  field_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  valid_operators: {
    type: DataTypes.ARRAY(DataTypes.TEXT),
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'ConditionMetadata',
  tableName: 'conditions_metadata', 
  timestamps: false,                
});

module.exports = ConditionMetadata;

