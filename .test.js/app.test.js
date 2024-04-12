const request = require('supertest');
const app = require('../index'); // Adjust the path to your Express app

describe('Application Routes', () => {
  describe('GET /', () => {
    it('should return the home page', async () => {
      const response = await request(app).get('/');
      expect(response.statusCode).toBe(200);
      // Add more assertions based on the content of your home page
    });
  });

  describe('User Registration and Login', () => {
    let userId;

    it('should register a new user', async () => {
      const response = await request(app)
        .post('/register')
        .send({ username: 'testuser', password: 'testpassword', email: 'test@example.com' });
      expect(response.statusCode).toBe(200); // Adjust the expected status code if different
      // Add more assertions based on your registration logic
    });

    it('should login the registered user', async () => {
      const response = await request(app)
        .post('/userlogin')
        .send({ username: 'testuser', password: 'testpassword' });
      expect(response.statusCode).toBe(200); // Adjust the expected status code if different
      // Add more assertions based on your login logic
    });
  });

  describe('Admin and User Routes', () => {
    it('should access the admin page', async () => {
      const response = await request(app).get('/admin');
      expect(response.statusCode).toBe(200); // Adjust the expected status code if different
      // Add more assertions based on the content of your admin page
    });

    it('should access the user page', async () => {
      const response = await request(app).get('/user');
      expect(response.statusCode).toBe(200); // Adjust the expected status code if different
      // Add more assertions based on the content of your user page
    });
  });

  describe('API Route', () => {
    it('should return API data', async () => {
      const response = await request(app).get('/api');
      expect(response.statusCode).toBe(200); // Adjust the expected status code if different
      // Add more assertions based on the content of your API response
    });
  });
});
