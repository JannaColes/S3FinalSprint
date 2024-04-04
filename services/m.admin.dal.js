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

module.exports = {
    getResorts, 
}