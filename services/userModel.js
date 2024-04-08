// userModel.js
// Description: This file contains the User model which is used to interact with the users table in the database.
const pool = require("./pg_auth_db");
const bcrypt = require("bcrypt");

class User {
  constructor(email, password, id) {
    this.email = email;
    this.password = password; // This should be a hashed password
    this.id = id;
  }

  // finding a user by email
  static async findOne({ email }) {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (result.rows.length > 0) {
      return result.rows[0];
    } else {
      return null;
    }
  }

  // finding a user by ID
  static async findById(user_id) {
    try {
      const result = await pool.query(
        "SELECT * FROM users WHERE user_id = $1",
        [user_id]
      );
      if (result.rows.length > 0) {
        return result.rows[0]; // This should return a user object with an 'id' property
      } else {
        return null;
      }
    } catch (err) {
      throw err; // Or handle the error as needed
    }
  }

  // Method to create a new user
  static async create({
    first_name,
    last_name,
    email,
    password,
    phone_number,
    date_of_birth,
    interests,
  }) {
    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10); // The number 10 here is the salt rounds

    // Assuming interests is a string of comma-separated values and should be stored as an array in the database
    const interestArray = interests
      ? interests.split(",").map((interest) => interest.trim())
      : [];

    const result = await pool.query(
      `INSERT INTO users (first_name, last_name, email, password, phone_number, date_of_birth, interests, FALSE) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [
        first_name,
        last_name,
        email,
        hashedPassword,
        phone_number,
        date_of_birth,
        interestArray,
      ]
    );
    return result.rows[0];
  }
}

module.exports = User;
