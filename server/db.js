const Pool = require("pg").Pool;
const pool = new Pool({
    user: "postgres",
    password: "admin1",
    host: "localhost",
    port: 5432,
    database:"gamedb"
});

 module.exports = pool;