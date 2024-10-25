const { parseRule } = require('../../utils/astHelper');

describe('AST Helper Tests', () => {
  it('should parse rules correctly', () => {
    const ruleString = "age > 30 AND department = 'Sales'";
    const result = parseRule(ruleString);
    
    // Add your expectations based on the expected result of parseRule
    expect(result).toBeDefined();
  });
});
