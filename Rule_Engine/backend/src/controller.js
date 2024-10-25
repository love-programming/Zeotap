const ruleService = require('./services')
const { evaluateRule } = require('./services');

exports.createRule = async (req, res) => {
  const { rule_string, rule_name } = req.body;

  // Validate that rule_string and rule_name exist
  if (!rule_string || !rule_name) {
    return res.status(400).json({ error: 'rule_name and rule_string are required' });
  }

  try {
    // Use the service to create the rule
    const newRule = await ruleService.createRule(rule_string, rule_name);
    res.status(200).json({ message: 'Rule created successfully', rule: newRule });
  } catch (error) {
    console.error('Error processing the rule:', error);
    res.status(500).json({ error: 'Error processing the rule', details: error.message });
  }
};


exports.combineRules = async (req, res) => {
  const { rule_ids } = req.body;

  if (!Array.isArray(rule_ids) || rule_ids.length === 0) {
    return res.status(400).json({ error: 'An array of rule_ids is required' });
  }

  try {
    const combinedAST = await ruleService.combineRules(rule_ids);
    res.status(200).json({ message: 'Rules combined successfully', ast: combinedAST });
  } catch (error) {
    console.error('Error combining rules:', error);
    res.status(500).json({ error: 'Error combining rules', details: error.message });
  }
};


exports.evaluateRule = async (req, res) => {
  const { rule_id, data } = req.body;

  // Validate the inputs
  if (!rule_id || !data) {
    return res.status(400).json({ error: 'rule_id and data are required' });
  }

  try {
    // Fetch the rule from the database
    const rule = await ruleService.getRuleById(rule_id);
    if (!rule) {
      return res.status(404).json({ error: 'Rule not found' });
    }

    // Evaluate the rule's AST against the provided data
    const result = await evaluateRule(rule.ast, data);
    res.status(200).json({ message: 'Rule evaluated successfully', result });
  } catch (error) {
    console.error('Error evaluating the rule:', error);
    res.status(500).json({ error: 'Error evaluating the rule', details: error.message });
  }
};


exports.updateRule = async (req, res) => {
  const { rule_id, rule_string, rule_name } = req.body;

  // Validate that rule_id, rule_string, and rule_name exist
  if (!rule_id || !rule_string || !rule_name) {
    return res.status(400).json({ error: 'rule_id, rule_name, and rule_string are required' });
  }

  try {
    const updatedRule = await ruleService.updateRule(rule_id, rule_string, rule_name);
    res.status(200).json({ message: 'Rule updated successfully', rule: updatedRule });
  } catch (error) {
    console.error('Error updating the rule:', error);
    res.status(500).json({ error: 'Error updating the rule', details: error.message });
  }
};


