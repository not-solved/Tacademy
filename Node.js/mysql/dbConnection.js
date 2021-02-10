const mysql = require('mysql');

//  DB 접속정보 정의
var dbConfig = {
    host : 'localhost',
    user : 'root',
    password : 'root',
    port : 3306,
    database : 'tacademy'
};

//  커넥션 풀
var pool = mysql.createPool(dbConfig);

module.exports = pool;