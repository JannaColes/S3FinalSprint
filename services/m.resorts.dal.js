const { ObjectId } = require("mongodb");
const dal = require("./m.auth_db.js");

async function getResorts() {
  if(DEBUG) console.log("Auth.mongo.dal.getResorts()");
  try {
    await dal.connect();
    const cursor = dal.db("FinalSprint-Travel").collection("Resorts").find();
    const results = await cursor.toArray();
    return results;
  } catch(error) {
    console.log(error);
  } finally {
    dal.close();
  }
};

async function getResortsById(id) {
  if(DEBUG) console.log("Auth.mongo.dal.getResortsById()");
  try {
    await dal.connect();
    const cursor = dal.db("FinalSprint-Travel").collection("Resorts").find({ _id: new ObjectId(id) });
    const results = await cursor.toArray();
    return results;
  } catch(error) {
    console.log(error);
  } finally {
    dal.close();
  }
};


async function getResortsByKeyword(keyword) {
  if(DEBUG) console.log("Auth.mongo.dal.getResortsByKeyword()");
  try {
    await dal.connect();
    const cursor = dal.db("FinalSprint-Travel").collection("Resorts").find({$text: {$search: keyword}});
    const results = await cursor.toArray();
    return results;
  } catch(error) {
    console.log(error);
  } finally {
    dal.close();
  }
};

module.exports = {
    getResorts, 
    getResortsById, 
    getResortsByKeyword, 
}