// Description: Testing the index route.

const request = require('supertest');
const app = require('../index'); 
describe('GET /', () => {
  it('should return status code 200', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });
});