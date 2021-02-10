const pool = require('./dbConnection');

console.log('커넥션 풀 ', pool);
pool.getConnection((err, conn) => {
    if(err) {
        console.error('error connecting : ', err);
        return;
    }
    console.log('Connection established');

    conn.release();     //  커넥션 풀 반환 (커넥션 사용 종료시 반납하는 과정)
});