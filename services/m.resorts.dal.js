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
    return results[0];
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



async function addResort(resortName, city, country, resortType, summary, cost, rate, amenities, isFeatured) {
  if(DEBUG) console.log("resorts.mongo.dal.addResort()");

  let amenArray = amenities.split(","); 

  let amenFinal = "[";

  for (let i = 0; i < amenArray.length; i++) {
    amenFinal += `"${amenArray[i]}"`;
    
    if (i !== amenArray.length - 1) {
      amenFinal += ", ";
    }
  }
  amenFinal += "]";
  if(DEBUG) console.log(amenFinal); 


  let newResort = JSON.parse(`{ "resort_name": "${resortName}", "city": "${city}", "country": "${country}", \
 "resort_type": "${resortType}", "summary": "${summary}", "cost": "${cost}", "current_rate_usd": ${rate}, \
 "amenities": ${amenFinal}, "is_featured": ${isFeatured}}`);
  if(DEBUG) console.log(newResort);
  try {
    await dal.connect();
    const result = await dal.db("FinalSprint-Travel").collection("Resorts").insertOne(newResort);
    return result.insertedId; 
  } catch(error) {
    console.log(error);
    throw error;
  } finally {
    dal.close();
  }
};


async function putResort(id, rName, ci, co, rType, s, rCost, rate, amen, isFeat) {
  if(DEBUG) console.log("resorts.mongo.dal.putResort()");


  let amenArray = amen.split(","); 


  const _id = new ObjectId(id);

  const putResort = {
      _id: _id,
      resort_name: rName,
      city: ci,
      country: co,
      resort_type: rType,
      summary: s,
      cost: rCost,
      current_rate_usd: parseFloat(rate),
      amenities: amenArray,
      is_featured: isFeat
  };

  try {
    await dal.connect();

    const collection = dal.db("FinalSprint-Travel").collection("Resorts");

    if (DEBUG) console.log(putResort);

    const result = await collection.replaceOne({ _id: _id }, putResort);

    return result;

  } catch(error) {
    console.log(error);
    throw error;
  } finally {
    dal.close();
  }
};


async function deleteResort(id){
  if(DEBUG) console.log("resorts.mongo.dal.deleteResort()");

  try {
    await dal.connect();
    const result = await dal.db("FinalSprint-Travel").collection("Resorts").deleteOne({ _id: new ObjectId(id) });
    return result; 
  } catch(error) {
    console.log(error);
    throw error;
  } finally {
    dal.close();
  }

}; 

module.exports = {
    getResorts, 
    getResortsById, 
    getResortsByKeyword, 
    addResort, 
    deleteResort, 
    putResort, 
}