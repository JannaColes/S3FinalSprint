
const pool = require("./pg_auth_db"); // adjust the path if necessary to point to the correct location of pg_auth_db.js

const { v4: uuidv4 } = require("uuid");

async function logUserLogin(userId) {
  try {
    const loginGuid = uuidv4(); // Generate a new UUID
    const loginTime = new Date();
    await pool.query(
      "INSERT INTO logins (user_id, login_time, login_guid) VALUES ($1, $2, $3)",
      [userId, loginTime, loginGuid]
    );
    console.log(
      `Login for user ${userId} logged at ${loginTime} with GUID ${loginGuid}`
    );
  } catch (error) {
    console.error("Error logging user login:", error);
  }
}
module.exports = logUserLogin;
