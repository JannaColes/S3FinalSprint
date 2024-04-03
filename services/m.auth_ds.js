const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb+srv://amydalziel:mdb2021lat@clustersemester3.ks4jtmh.mongodb.net'; // replace with your friend's connection string

// Database Name
const dbName = ''; // replace with the database name you want to connect to

// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  console.log("Connected successfully to server");

  const db = client.db(dbName);

  client.close();
});