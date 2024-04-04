const { MongoClient } = require('mongodb');

// const uri = "mongodb://127.0.0.1:27017/";
const atlas = "mongodb+srv://amydalziel:mdb2021lat@clustersemester3.ks4jtmh.mongodb.net/"; 

// const pool = new MongoClient(uri);
const pool = new MongoClient(atlas);

if(DEBUG) console.log("connected to MongoDB...");

module.exports = pool;
