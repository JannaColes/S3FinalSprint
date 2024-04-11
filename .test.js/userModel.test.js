const pool = require('../services/pg_auth_db'); // Database connection pool
const User = require('../services/userModel');

describe('User Model', () => {
  // Optional: Clear the test database before each test
  beforeEach(async () => {
    await pool.query('TRUNCATE TABLE users RESTART IDENTITY CASCADE');
  });

  describe('findOne', () => {
    test('should return user if found by email', async () => {
      // Insert a user into the test database
      const mockEmail = 'test@example.com';
      await pool.query('INSERT INTO users (email, password) VALUES ($1, $2)', [mockEmail, 'hashedPassword']);

      // Find the user by email
      const user = await User.findOne({ email: mockEmail });

      expect(user).not.toBeNull();
      expect(user.email).toBe(mockEmail);
    });

    test('should return null if user not found by email', async () => {
      const mockEmail = 'nonexistent@example.com';
      const user = await User.findOne({ email: mockEmail });

      expect(user).toBeNull();
    });
  });

  describe('create', () => {
    test('should create a new user and return the created user', async () => {
      const mockUserData = {
        email: 'newuser@example.com',
        password: 'password',
      };

      const createdUser = await User.create(mockUserData);

      expect(createdUser).not.toBeNull();
      expect(createdUser.email).toBe(mockUserData.email);
    });
  });

  // Add more tests for other methods like findById, update, delete, etc.
});
