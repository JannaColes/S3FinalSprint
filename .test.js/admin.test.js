const app = require('../index');
const request = require('supertest').agent(app);
let createdResortId;

describe('Admin CRUD Operations', () => {
  it('should render the admin dashboard with resorts data', async () => {
    const response = await request
      .get('/admin/dashboard')
      .redirects(1); 

    expect(response.status).toBe(200);
  });

  it('should create a resort and render confirmation', async () => {
    const newResort = { name: 'New Resort', is_featured: true };
    const response = await request
      .post('/admin/add')
      .send(newResort)
      .redirects(1);

    expect(response.status).toBe(200);
    createdResortId = response.body.id; 
  });

  it('should retrieve the created resort', async () => {
    const response = await request
      .get(`/admin/searchPostgres?id=${createdResortId}`)
      .redirects(1); 

    expect(response.status).toBe(200);
  });

  it('should update a resort and render confirmation', async () => {
    const updatedResort = { name: 'Updated Resort', is_featured: false };
    const response = await request
      .put(`/admin/${createdResortId}/update`)
      .send(updatedResort)
      .redirects(1); 

    expect(response.status).toBe(200);
  });

  it('should delete a resort and render confirmation', async () => {
    const response = await request
      .delete(`/admin/${createdResortId}/delete`)
      .redirects(1); 

    expect(response.status).toBe(200);
  });
});
