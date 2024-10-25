import React, { useState } from 'react';
import axios from 'axios';
import RulesService from '../services/RulesService';
import './CombineRules.css';

const rulesService = new RulesService();
const CombineRules = () => {
  const [ruleIds, setRuleIds] = useState('');
  const [message, setMessage] = useState('');
  const [combinedAST, setCombinedAST] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ids = ruleIds.split(',').map(id => id.trim());
    
    try {
      const response = await rulesService.combineRules(ids);
      setMessage(response.message); // Ensure this matches the structure of your response
      setCombinedAST(response.ast); // Ensure this matches the structure of your response
      setRuleIds('');
    } catch (error) {
      // Handle error safely
      const errorMsg = error.response?.data?.error || 'An error occurred';
      setMessage(`Error: ${errorMsg}`);
    }
  };

  return (
    <div className="combine-rules-container">
    <h2>Combine Rules</h2>
    <form className="combine-rules-form" onSubmit={handleSubmit}>
        <div className="form-group">
            <label htmlFor="ruleIds">Rule IDs (comma-separated):</label>
            <input
                type="text"
                id="ruleIds"
                value={ruleIds}
                onChange={(e) => setRuleIds(e.target.value)}
                required
            />
        </div>
        <button type="submit" className="submit-btn">Combine Rules</button>
    </form>
    {message && <p className="success-message">{message}</p>}
</div>
  );
};

export default CombineRules;
