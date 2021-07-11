const PORT = process.env.PORT||3000;


const connectionString = process.env.DATABASE_URL|| "postgres://postgres:123@localhost:5432/dba"
module.exports ={
    PORT,
    connectionString
}