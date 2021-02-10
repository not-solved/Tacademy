const pool = require('./dbConnection');

pool.getConnection((err, conn) => {
    if(err) {           // 연결 에러
        console.error('Error : ', err);
        return;
    }

    var SQL = 'SELECT * FROM movies';
    conn.query(SQL, (err, results) => {
        if(err) {       // select 연산 에러
            console.error('Select Error : ', err);
            return;
        }
        for(var i = 0; i < results.length; i++) {
            var movieInfo = results[i];
            console.log('제목 : ' + movieInfo.title + 
                        '감독 : ' + movieInfo.director);
        }
        conn.release();
    });
});