const mongoose = require('mongoose');
const { Pool } = require('pg');

describe('Database Connections', () => {
  let pool;

  beforeAll(() => {
    // Set up PostgreSQL connection
    pool = new Pool({
      connectionString: 'postgres://postgres:Charlie1986!@localhost:5432/travel'
      ,
    });
  });

  afterAll(async () => {
    // Close MongoDB connection
    await mongoose.disconnect();
    // Close PostgreSQL connection
    await pool.end();
  });

  it('should connect to MongoDB', async () => {
    await mongoose.connect('mongodb+srv://amydalziel:mdb2021lat@clustersemester3.ks4jtmh.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true });
    expect(mongoose.connection.readyState).toBe(1); 
  });

  it('should connect to PostgreSQL', async () => {
    const client = await pool.connect();
    const res = await client.query('SELECT NOW()');
    expect(res).toBeDefined();
    client.release();
  });
});
