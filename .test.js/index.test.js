const request = require('supertest');
const app = require('../index'); 

let server;

beforeAll(() => {
  server = app.listen(3000);
});

afterAll(() => {
  server.close();
});
describe('Server', () => {
  it('should start and return a response on the root route', async () => {
    const response = await request(server).get('/');
    expect(response.statusCode).toBe(200);
  });

  it('should return a response from the /user route', async () => {
    const response = await request(server).get('/user');
    expect(response.statusCode).toBe(200);
  });
});
