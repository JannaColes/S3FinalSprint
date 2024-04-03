const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb+srv://amydalziel:mdb2021lat@clustersemester3.ks4jtmh.mongodb.net/'; // Replace 'your_connection_string' with your actual connection string

// Database Name
const dbName = 'FinalSprint-Travel'; // Replace 'your_database_name' with your actual database name

// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  if (err) {
    console.error("Failed to connect to MongoDB Atlas:", err);
    return;
  }
  
  console.log("Connected successfully to MongoDB Atlas");

  const db = client.db(dbName);

  // Perform operations on the database here

  // Close the connection
  client.close();
});

