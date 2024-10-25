const express = require('express');
const ruleController = require('./controller');

const router = express.Router();

// Define the route
router.post('/create_rule', ruleController.createRule);
router.post('/combine_rules', ruleController.combineRules);
router.post('/evaluate_rule', ruleController.evaluateRule);
router.put('/update_rule', ruleController.updateRule);


module.exports = router;
