var MongoClient = require('mongodb').MongoClient
var url = "mongodb://localhost:27017/tacademy";
var db;

MongoClient.connect(url, (err, database) => {
    if(err) {           // DB 연결 실패
        console.error('MongoDB connection failed : ', err);
        return;
    }

    db = database.db('tacademy');

    var promise = db.collection('movies').insertMany([
        { title: '스타워즈', director: '조지 루카스', year: 1977 },
        { title: '아바타', director: '제임스 카메론' },
        { title: '다크 나이트', director: '크리스토퍼 놀란', year: 2008 },
        { title: '인터스텔라', director: '크리스토퍼 놀란', year: 2014 },
        { title: '스타워즈7', director: 'JJ 에이브럼스', year: 2015 }   
    ]);

    promise.then((results) => {
        console.log('초기 데이터 입력 성공');
        executeUpdateExample();
    }, (err) => {
        console.error('Error : ', err);
    });
});

function executeUpdateExample() {
    var movies = db.collection('movies');

    //  하나 갱신
    movies.updateOne(
        { title: '스타워즈' },               // 조건
        { $set: { title: 'StarWars' } },    // 수정 내용
        (err, result) => {
        if (err) {
           console.error('UpdateOne Error : ', err);
           return;
        }
        console.log('UpdateOne complete : ', result);
    });
    
    //  여러개 갱신 (Promise 기반)
    movies.update(
        { director: '크리스토퍼 놀란' },
        { $set: { director: 'Christopher Nolan' } }, { multi: true }
    ).then(
        function resolved(results) {
           console.log('Update Success. Promise Based Result : ', results);
        },
        function rejected(err) {
           console.error('Update Error. Rejected : ', err);
    });
}