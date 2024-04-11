const dal = require('./pg_auth_db');


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
    getResortsByKeyword, 
  }
  