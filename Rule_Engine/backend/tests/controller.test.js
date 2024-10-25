const request = require('supertest');
const express = require('express');
const ruleRoutes = require('../src/routes'); 

const app = express();
app.use(express.json());
app.use('/', ruleRoutes);

describe('Rule Controller Tests', () => {
  it('should create a rule successfully', async () => {
    const response = await request(app)
      .post('/create_rule')
      .send({
        rule_string: "age > 30 AND department = 'Sales'",
        rule_name: 'Test Rule'
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Rule created successfully');
    expect(response.body.rule).toHaveProperty('rule_name', 'Test Rule');
  });

  it('should combine rules successfully', async () => {
    const response = await request(app)
      .post('/combine_rules')
      .send({ rule_ids: [1, 2] }); 

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Rules combined successfully');
    expect(response.body).toHaveProperty('ast');
  });

  it('should evaluate a rule successfully', async () => {
    const response = await request(app)
      .post('/evaluate_rule')
      .send({ rule_id: 1, data: { age: 35, department: 'Sales' } }); 

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Rule evaluated successfully');
    expect(response.body).toHaveProperty('result');
  });

  it('should return error for missing rule_string', async () => {
    const response = await request(app)
      .post('/create_rule')
      .send({ rule_name: 'Test Rule' });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'rule_name and rule_string are required');
  });

});
