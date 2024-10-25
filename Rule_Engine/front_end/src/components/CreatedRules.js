import React, { useState } from 'react';
import RulesService from '../services/RulesService';
import './CreatedRules.css'

const rulesService = new RulesService();

const CreatedRule = () => {
    const [ruleName, setRuleName] = useState('');
    const [ruleString, setRuleString] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await rulesService.createRule(ruleName, ruleString);
            setMessage(response.message);
            setRuleName('');  
            setRuleString(''); 
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        }
    };

    return (
        <div className="rule-form-container">
            <h2>Create a Rule</h2>
            <form className="rule-form" onSubmit={handleSubmit}>
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
                        rows="5"
                        required
                    ></textarea>
                </div>
                <button type="submit" className="submit-btn">Create Rule</button>
            </form>
            {message && <p className="success-message">{message}</p>}
        </div>
    );

};


export default CreatedRule;
