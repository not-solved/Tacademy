const mysql = require('mysql');
const dbConfig = {
    host : 'localhost',
    user : 'root',
    password : 'root',
    port : 3306,
    database : 'tacademy'
};

var pool = mysql.createPool(dbConfig);
module.exports = pool;