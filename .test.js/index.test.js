// .test.js/index.test.js
const request = require('supertest');
const app = require('../index'); // Adjust the path to your index.js file

describe('GET /', () => {
  it('should return status code 200', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });
});