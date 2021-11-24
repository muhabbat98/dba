const PORT = process.env.PORT||5000;


const connectionString = process.env.DATABASE_URL|| "postgres://vldpdyhg:xJ6nACWbKQJ3n38ZZmhK_FJbYOCHYY2R@satao.db.elephantsql.com/vldpdyhg"
module.exports ={
    PORT,
    connectionString
}