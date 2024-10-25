import React, { useState } from 'react';
import RulesService from '../services/RulesService';
import './EvulateRules.css'

const rulesService = new RulesService();

const EvaluateRule = () => {
  const [ruleId, setRuleId] = useState('');
  const [data, setData] = useState('');
  const [message, setMessage] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const parsedData = JSON.parse(data); // Parse the input data
      const response = await rulesService.evaluateRule(ruleId, parsedData); // Call API
      setMessage(response.message); // Set the success message
      setResult(response.result); // Set the result (true/false)
      setData('');
      setRuleId('');
    } catch (error) {
      if (error instanceof SyntaxError) {
        setMessage('Error: Invalid JSON format'); // Handle invalid JSON
      } else {
        setMessage(`Error: ${error.response?.data?.error || 'An error occurred'}`); // Handle API errors
      }
    }
  };

  return (
    <div className="evaluate-rule-container">
            <h2>Evaluate Rule</h2>
            <form className="evaluate-rule-form" onSubmit={handleSubmit}>
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
                    <label htmlFor="data">Data (JSON format):</label>
                    <textarea
                        id="data"
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                        rows="4"
                        required
                    />
                </div>
                <button type="submit" className="submit-btn">Evaluate Rule</button>
            </form>
            {message && <p className="message">{message}</p>}
            {result !== null && (
                <p className={`result ${result ? 'true' : 'false'}`}>
                    Result: {result ? 'true' : 'false'}
                </p>
            )}
        </div>
  );
};

export default EvaluateRule;
