const{ Pool }= require('pg');
const { connectionString} = require('../settings')

const pool = new Pool({connectionString})

const modelAll  = async (SQL, ...params)=>{
    const client  = await pool.connect()
    try{
        const {rows} = await client.query(SQL, params.length ? params :null)
        return rows
        
    }
    finally{
        client.release()
    }
}
const modelSingle  = async (SQL, ...params)=>{
    const client  = await pool.connect()
    try{
        const {rows:[single]} = await client.query(SQL, params.length ? params :null)
        return single
        
    }
    finally{
        client.release()
    }
}

module.exports = {
    modelAll,
    modelSingle
}

