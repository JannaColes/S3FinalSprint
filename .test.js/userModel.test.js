const pool = require('../services/pg_auth_db');
const User = require('../services/userModel');

describe('User Model', () => {
  // Comment out or adjust any cleanup logic here

  describe('create', () => {
    it('should create a new user and return the created user', async () => {
      const mockUserData = {
        first_name: 'John',
        last_name: 'Doe',
        email: 'create_test@example.com',
        password: 'password',
        phone_number: '1234567890',
        date_of_birth: '1990-01-01',
        interests: 'Sports, Travel',
      };

      const createdUser = await User.create(mockUserData);
      console.log('Created user:', createdUser); // Log the created user

      // Manually query the database to check if the user was inserted
      const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [mockUserData.email]);
      console.log('Queried user:', rows[0]); // Log the queried user

      expect(createdUser).not.toBeNull();
      expect(createdUser.email).toBe(mockUserData.email);
      expect(rows[0]).not.toBeNull(); // Check if the user exists in the database
    });
  });

  
});
