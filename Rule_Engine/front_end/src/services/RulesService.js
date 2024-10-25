// src/services/RulesService.js
import AxiosService from './AxiosService';

const axiosService = new AxiosService();
const config = require('../configrations/Configration');

export default class RulesService {
    // Method to create a new rule
    async createRule(ruleName, ruleString) {
        const response = await axiosService.post(config.createURL, {
            rule_name: ruleName,
            rule_string: ruleString,
        });
        return response; // Directly return the response as it's already formatted
    }

    // Method to combine rules
    async combineRules(ruleIds) {
        const response = await axiosService.post1(config.combineURL, {
            rule_ids: ruleIds,
        });
        return response; // Return combined rules response
    }

    // Method to evaluate a rule
    async evaluateRule(ruleId, data) {
        const response = await axiosService.post2(config.evluteURL, {
            rule_id: ruleId,
            data,
        });
        return response; // Return evaluation result response
    }
    async updaterules(ruleId, ruleName, ruleString) {
        try {
          const response = await axiosService.put(config.updateURL, {
            rule_id: ruleId,
            rule_name: ruleName,
            rule_string: ruleString, // Sending updated data
          });
          return response; // Return the updated rules response
        } catch (error) {
          console.error('Error while updating rules:', error);
          throw error; // Re-throw error to handle it outside this method
        }
      }
    
    
}
