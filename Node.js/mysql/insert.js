const { createConnection } = require('mysql');
var pool = require('./dbConnection');

pool.getConnection((err, conn) => {

    //  1. SQL 안에 값들 정의한 채 연산
    var SQL_1 = 'INSERT INTO movies (title, director, year) VALUES ("인셉션", "크리스토퍼 놀란", 2010);';
    conn.query(SQL_1, (err, results) => {
        if(err) {           // 삽입 실패
            console.error('Insert Error : ', err);
        }
        else {              // 삽입 성공
            console.log('Result : ', results);
        }
    });

    //  2. SQL문과 파라미터를 별도로 분리한 후 연산
    var SQL_2 = 'INSERT INTO movies (title, director, year) VALUES (?, ?, ?);';
    conn.query(SQL_2, ['인터스텔라', '크리스토퍼 놀란', 2015],function(err, results) {
       if ( err ) {
          console.error('INSERT Error : ', err);
       }
       else {
          console.log('results : ', results);
       }
    });   
 
    var data = {
        title : '메멘토',
        director : '크리스토퍼 놀란',
        year : 2000
    };
    var SQL_3 = 'INSERT INTO movies SET ?';
    conn.query(SQL_3, data, (err, results) => {
        if ( err ) {
            console.error('INSERT Error : ', err);
         }
         else {
            console.log('results : ', results);
         }  
    });
    conn.release();
});

