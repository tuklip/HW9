const {Pool} = require("pg")

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database : "movies-database",
    password : "kanagi",
    port : 5432
})

module.exports = pool;