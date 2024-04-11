///admin.test.js
const request = require('supertest');
const app = require('../index'); // Adjust the path according to your file structure

describe('Admin Route', () => {
  it('should return a response from the admin route', async () => {
    const response = await request(app).get('/admin');
    expect(response.statusCode).toBe(200);
  });
});
