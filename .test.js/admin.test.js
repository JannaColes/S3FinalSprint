const request = require('supertest');
const app = require('../index'); // Adjust the path to your Express app

let cookie;

// Simulate admin login function
async function simulateAdminLogin() {
  // Create an admin user
  await request(app)
    .post('/adminsignup') // Adjust this to your admin signup route
    .send({
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@example.com',
      password: 'adminpassword',
      // Add any other required fields for admin signup
    })
    .expect(200);

  // Log in as the admin user
  const loginResponse = await request(app)
    .post('/adminlogin') // Update this to your admin login route
    .send({ email: 'admin@example.com', password: 'adminpassword' }) // Update with correct credentials
    .expect(200);

  // Extract the cookie from the login response
  return loginResponse.headers['set-cookie'][0];
}

describe('Admin CRUD Operations', () => {
  beforeAll(async () => {
    // Simulate admin login before all tests
    cookie = await simulateAdminLogin();
  });

  it('should create a new resort', async () => {
    const response = await request(app)
      .post('/admin')
      .set('Cookie', cookie)
      .send({
        name: 'Test Resort',
        city: 'Test City',
        country: 'Test Country',
        type: 'Ski Resort',
        summary: 'A test resort summary',
        cost: 'Medium',
        rate: 300,
        amenities: ['Pool', 'Spa', 'Restaurant'],
        isFeatured: true,
      });
    expect(response.statusCode).toBe(200);
    // Store the created resort ID for later tests
    createdResortId = response.body.id;
  });

  it('should retrieve the created resort', async () => {
    const response = await request(app)
      .get(`/admin/${createdResortId}`) // Update this to the correct route for retrieving a resort
      .set('Cookie', cookie);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('name', 'Test Resort');
  });

  it('should update the created resort', async () => {
    const response = await request(app)
      .put(`/admin/${createdResortId}`) // Update this to the correct route for updating a resort
      .set('Cookie', cookie)
      .send({
        name: 'Updated Resort',
        city: 'Updated City',
        country: 'Updated Country',
        type: 'Beach Resort',
        summary: 'An updated resort summary',
        cost: 'High',
        rate: 500,
        amenities: ['Pool', 'Gym', 'Spa'],
        isFeatured: false,
      });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('name', 'Updated Resort');
  });

  it('should delete the created resort', async () => {
    const response = await request(app)
      .delete(`/admin/${createdResortId}`) // Update this to the correct route for deleting a resort
      .set('Cookie', cookie);
    expect(response.statusCode).toBe(200);
  });
});
