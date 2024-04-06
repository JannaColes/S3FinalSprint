const dal = require('./pg.auth_db');

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
  


  module.exports = {
    getResorts, 
    getResortsByKeyword, 
    getResortsById, 
  }