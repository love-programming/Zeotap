const { parseRule, combineRules,evaluateRule } = require('../utils/astHelper');
const Rule = require('../models/Rule'); // Import your Rule model
const ConditionMetadata = require('../models/ConditionMetadata'); // Import your ConditionMetadata model
const sequelize = require('../config/db'); 

// exports.createRule = async (ruleString, ruleName) => {
//   // Start a transaction
//   const transaction = await sequelize.transaction();

//   try {
//     // Parse the rule string and generate AST
//     const { ast, fields } = parseRule(ruleString);

//     console.log("Fields:", fields);

//     if (!Array.isArray(fields)) {
//       throw new Error('Fields should be an array');
//     }

//     // Save the rule using Sequelize
//     const newRule = await Rule.create({
//       rule_name: ruleName,
//       rule_string: ruleString,
//       ast,
//     }, { transaction });

//     // Prepare conditions with associated rule_id
//     const conditionsToInsert = fields.map(field => ({
//       field_name: field.field_name,
//       field_type: determineFieldType(field.field_name), // Determine the field type
//       valid_operators: [field.operator], // Set the valid operators
//       rule_id: newRule.id, // Associate with the new rule
//     }));

//     // Bulk insert conditions
//     await ConditionMetadata.bulkCreate(conditionsToInsert, { transaction });

//     // Commit the transaction
//     await transaction.commit();

//     return newRule;
//   } catch (error) {
//     // Rollback the transaction in case of error
//     await transaction.rollback();
//     throw error; // Rethrow the error to handle it further up the chain
//   }
// };


exports.createRule = async (ruleString, ruleName) => {
  const transaction = await sequelize.transaction();

  try {
    // Parse the rule string and generate AST
    const { ast, fields } = parseRule(ruleString);

    if (!Array.isArray(fields)) {
      throw new Error('Fields should be an array');
    }

    // Save the rule using Sequelize
    const newRule = await Rule.create({
      rule_name: ruleName,
      rule_string: ruleString,
      ast,
    }, { transaction });

    // Prepare conditions with associated rule_id
    const conditionsToInsert = fields.map(field => ({
      field_name: field.field_name,
      field_type: determineFieldType(field.field_name),
      valid_operators: [field.operator],
      rule_id: newRule.id,
    }));

    await ConditionMetadata.bulkCreate(conditionsToInsert, { transaction });

    await transaction.commit();
    return newRule;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};


function determineFieldType(fieldName) {
  switch (fieldName) {
    case 'age':
    case 'salary':
    case 'experience':
      return 'number';
    case 'department':
      return 'string';
    default:
      return 'unknown';
  }
}




// New Combine rules from the database into a single AST

exports.combineRules = async (rule_ids) => {
  const rules = await Rule.findAll({
    where: { id: rule_ids },
  });

  if (rules.length === 0) {
    throw new Error('No rules found for the provided IDs');
  }

  // Combine the rule strings
  const ruleStrings = rules.map(rule => rule.rule_string);
  const combinedAST = combineRules(ruleStrings); // Call your existing combineRules function

  // Prepare to insert/update conditions into the conditions_metadata table
  const fieldCounts = {}; // Track occurrences of each field

  // Extract fields and their operators from each rule string
  rules.forEach(rule => {
    const { fields } = parseRule(rule.rule_string); // Assuming you have a parseRule function

    fields.forEach(field => {
      // Initialize if the field hasn't been added yet
      if (!fieldCounts[field.field_name]) {
        fieldCounts[field.field_name] = {
          field_name: field.field_name,
          field_type: determineFieldType(field.field_name), // Determine field type
          valid_operators: new Set(), // Use a Set to avoid duplicates
        };
      }
      // Add the operator to the set
      fieldCounts[field.field_name].valid_operators.add(field.operator);
    });
  });

  // Prepare conditions for bulk insert/update
  const conditions = Object.values(fieldCounts).map(({ field_name, field_type, valid_operators }) => ({
    field_name,
    field_type,
    valid_operators: Array.from(valid_operators), // Convert Set to Array
  }));

  // Use a transaction to ensure data consistency
  const transaction = await sequelize.transaction();
  try {
    // Insert new combined rule into the rules table
    const combinedRule = await Rule.create({
      rule_name: `Combined Rule (${rule_ids.join(', ')})`,
      rule_string: ruleStrings.join(' OR '), // Adjust how you want to combine them
      ast: combinedAST,
    }, { transaction });

    // Bulk insert conditions
    await ConditionMetadata.bulkCreate(conditions.map(condition => ({
      ...condition,
      rule_id: combinedRule.id, // Link to the combined rule
    })), { transaction });

    // Commit transaction
    await transaction.commit();
    
    return combinedAST; 
  } catch (error) {
    await transaction.rollback();
    throw new Error(`Error saving combined rule and conditions: ${error.message}`);
  }
};



exports.getRuleById = async (ruleId) => {
  const rule = await Rule.findByPk(ruleId);
  return rule;
};

exports.evaluateRule = async (ast, data) => {
  return evaluateRule(ast, data); // Call the helper function to evaluate the AST
};



// exports.updateRule = async (ruleId, ruleString, ruleName) => {
//   const transaction = await sequelize.transaction();

//   try {
//     const { ast, fields } = parseRule(ruleString);

//     const updatedRule = await Rule.update(
//       { rule_name: ruleName, rule_string: ruleString, ast },
//       { where: { id: ruleId }, transaction }
//     );

//     // Update conditions in ConditionMetadata if needed
//     const conditionsToInsert = fields.map(field => ({
//       field_name: field.field_name,
//       field_type: determineFieldType(field.field_name),
//       valid_operators: [field.operator],
//       rule_id: ruleId,
//     }));

//     await ConditionMetadata.destroy({ where: { rule_id: ruleId }, transaction }); // Clear old conditions
//     await ConditionMetadata.bulkCreate(conditionsToInsert, { transaction }); // Insert new conditions

//     await transaction.commit();
//     return updatedRule;
//   } catch (error) {
//     await transaction.rollback();
//     throw error;
//   }
// };


exports.updateRule = async (ruleId, ruleString, ruleName) => {
  // Start a transaction
  const transaction = await sequelize.transaction();

  try {
    // Update the rule in the database
    await Rule.update(
      {
        rule_string: ruleString,
        rule_name: ruleName,
      },
      {
        where: { id: ruleId },
        transaction,
      }
    );

    // Fetch the updated rule to return
    const updatedRule = await Rule.findByPk(ruleId, { transaction });

    // Commit the transaction
    await transaction.commit();

    return updatedRule; // Return the updated rule
  } catch (error) {
    // Rollback the transaction in case of error
    await transaction.rollback();
    throw error; // Rethrow the error to handle it further up the chain
  }
};
