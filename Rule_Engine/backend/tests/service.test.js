const ruleService = require('../src/services');
const ConditionMetadata = require('../models/ConditionMetadata');
const { parseRule } = require('../utils/astHelper');

jest.mock('../models/ConditionMetadata');
jest.mock('../utils/astHelper');

describe('Rule Service Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a rule successfully', async () => {
    const ruleString = "age > 30 AND department = 'Sales'";
    const ruleName = "Age and Department Rule";
    
    // Mock the parseRule function
    const mockFields = [
      { field_name: 'age', operator: '>' },
      { field_name: 'department', operator: '=' },
    ];
    
    parseRule.mockReturnValue({ ast: {}, fields: mockFields });
    
    // Mock the ConditionMetadata.bulkCreate method
    ConditionMetadata.bulkCreate.mockResolvedValue(mockFields);
    
    const result = await ruleService.createRule(ruleString, ruleName);

    expect(result).toHaveProperty('rule_name', ruleName);
    expect(ConditionMetadata.bulkCreate).toHaveBeenCalledTimes(1);
    expect(parseRule).toHaveBeenCalledWith(ruleString);
  });

});
