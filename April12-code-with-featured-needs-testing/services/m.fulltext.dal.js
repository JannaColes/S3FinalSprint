const dal = require("./m.auth_db.js");

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
    getResortsByKeyword, 
  }