import React, { useState } from 'react';
import RulesService from '../services/RulesService'; // Ensure this path is correct for your service file
import './UpdateRules.css'
const rulesService = new RulesService();

const UpdateRules = () => {
  const [ruleId, setRuleId] = useState('');
  const [ruleName, setRuleName] = useState('');
  const [ruleString, setRuleString] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send PUT request to update the rule
      const response = await rulesService.updaterules(ruleId, ruleName, ruleString);

      // Handle success response
      console.log('Response:', response);

    // Check if the response contains the message
    if (response && response.message) {
      setMessage(response.message);
      setError(''); // Clear error if successful
      setRuleId('');
      setRuleName('');
      setRuleString('');
    } else {
      setMessage(''); // Clear message if no success message
      setError('Update successful but no message provided.');
    }
  } catch (error) {
    // Handle error response
    setError(`Error: ${error.message || 'Unknown error occurred'}`);
    setMessage(''); // Clear success message if there's an error
  }
};

  return (
    <div className="update-rule-container">
    <h1>Update Rule</h1>
    <form className="update-rule-form" onSubmit={handleSubmit}>
        <div className="form-group">
            <label htmlFor="ruleId">Rule ID:</label>
            <input
                type="text"
                id="ruleId"
                value={ruleId}
                onChange={(e) => setRuleId(e.target.value)}
                required
            />
        </div>
        <div className="form-group">
            <label htmlFor="ruleName">Rule Name:</label>
            <input
                type="text"
                id="ruleName"
                value={ruleName}
                onChange={(e) => setRuleName(e.target.value)}
                required
            />
        </div>
        <div className="form-group">
            <label htmlFor="ruleString">Rule String:</label>
            <textarea
                id="ruleString"
                value={ruleString}
                onChange={(e) => setRuleString(e.target.value)}
                rows="4"
                required
            />
        </div>
        <button type="submit" className="submit-btn">Update Rule</button>
    </form>

    {message && <p className="success-message">{message}</p>}
    {error && <p className="error-message">{error}</p>}
</div>
  );
};

export default UpdateRules;
