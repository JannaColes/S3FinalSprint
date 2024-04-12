const dal = require('./pg_auth_db');

const { myEmitter } = require('../logEvents');

// Get all resorts: 
var getResorts = async function() {
    if(DEBUG) console.log("resorts.pg.dal.getResorts()");

    const query = `SELECT * FROM public.resorts
    ORDER BY _id ASC;`; 

    try {
        let results = await dal.query(query); 
        return results.rows; 
    } catch (error) {
        console.log(error); 
    }
  };




async function getResortsById(id) {
    if(DEBUG) console.log("Auth.postgres.dal.getResortsById()");


    const query = `SELECT * FROM public.resorts WHERE _id = $1`; 

    try {
        let results = await dal.query(query, [id]); 
        return results.rows[0]; 
    } catch (error) {
        console.log(error); 
    }
    
  };
  
  
  async function getResortsByKeyword(keyword) {
    if(DEBUG) console.log("Auth.postgres.dal.getResortsByKeyword()");
    if(DEBUG) console.log(keyword);

    const sql = `SELECT _id, resort_name, city, country, resort_type, summary, cost, current_rate_usd, is_featured FROM public.resorts \
    WHERE resort_name iLIKE '%'||$1||'%' \
    OR city iLIKE '%'||$1||'%'
    OR country iLIKE '%'||$1||'%'
    OR summary iLIKE '%'||$1||'%'
  `;

    try {

        let results = await dal.query(sql, [keyword]); 
        return results.rows; 
        
    } catch (error) {
        console.log(error); 
    }
    
  };


  async function putResort(id, rName, ci, co, rType, s, rCost, rate, amen, isFeat) {
    if(DEBUG) console.log("Auth.postgres.dal.putResort()");

    const sql = `UPDATE public.resorts \
    SET resort_name=$1, city=$2, country=$3, resort_type=$4, summary=$5, cost=$6, current_rate_usd=$7, amenities=$8, is_featured=$9 \
    WHERE _id = $10`; 

    try {

      let addAmenities = formatHobbyArray(amen); 

      let result = await dal.query(sql, [rName, ci, co, rType, s, rCost, rate, addAmenities, isFeat, id]); 
      return result; 
      
    } catch (error) {
      console.log(error); 
    }


  };


  async function deleteResort(id) {
    if(DEBUG) console.log("Auth.postgres.dal.deleteResort()");


    const sql = `DELETE FROM public.resorts WHERE _id=$1;`;

    try {

      let result = await dal.query(sql, [id]); 
      return result; 
      
    } catch (error) {
      console.log(error); 
    }


  }; 

  // For amenities (array) - values must be entered as an array (they are entered by the user as a string)
  function formatHobbyArray(hobbies){
    let divideHobbies = hobbies.split(","); 
    if(DEBUG) console.log(divideHobbies); 
  
    return divideHobbies; 
  }
  


  module.exports = {
    getResorts, 
    getResortsByKeyword, 
    getResortsById, 
    putResort, 
    deleteResort, 
  }