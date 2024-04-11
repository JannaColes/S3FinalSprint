const { Pool } = require('pg');
const passport = require('passport');

let pool;

beforeAll(() => {
  pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'travel',
    password: 'Charlie1986!',
    port: 5432, // Adjust the port if necessary
  });
});

afterAll(async () => {
  await pool.end();
});

describe('PostgreSQL Connection', () => {
  test('should connect to the PostgreSQL database', async () => {
    const client = await pool.connect();
    const result = await client.query('SELECT 1');
    client.release();
    expect(result.rows[0]['?column?']).toBe(1);
  });
  test('Fail authentication with incorrect password', async () => {
    await passport.authenticate('local', async (err, user, info) => {
      expect(err).toBeNull();
      expect(user).toBe(false); // Update expectation to check for false
      expect(info.message).toBe('Incorrect password.');
    })({ body: { email: 'test@example.com', password: 'invalidpassword' } }, {}, jest.fn());
  });
});