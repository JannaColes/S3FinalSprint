require("dotenv").config();
const pool = require("./services/pg.auth_db.js"); // Adjust the path as per your project structure

pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Connection error", err.stack);
  } else {
    console.log("Connected to the database:", res.rows);
  }
  pool.end(); // Close the connection
});
