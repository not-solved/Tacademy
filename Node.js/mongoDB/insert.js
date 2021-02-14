var MongoClient = require('mongodb').MongoClient
var url = "mongodb://localhost:27017/tacademy";

MongoClient.connect(url, (err, db) => {
    if(err) {           // DB 연결 실패
        console.error('MongoDB connection failed : ', err);
        return;
    }

    var movies = db.collection('movies');

    //  document 하나 추가
    movies.insert({ title: '인터스텔라', director: '크리스토퍼 놀란', year: 2014 },
    (err, result) => {
       if (err) {       // 삽입 오류
          console.error('Insert Error', err);
          return;
       }
       console.log('INERT 성공');
       // console.log(result);
       console.log('새로 추가한 항목의 ObjectID : ',result.insertedIds[0]);
    });

    //  document 여러개 추가    ==> [](리스트) 이용
    movies.insertMany([
        { title:'스타워즈', director:'조지 루카스', year:1977},
        { title:'아바타', director:'제임스 카메론'}],
        (err, results) => {
           if (err) {
              console.error('Insert Error', err);
              return;
           }
           console.log('INERT Many 성공');
           console.log('새로 추가한 항목들 ObjectID : ', results.insertedIds);      
     });

    // Promise 기반
    movies.insert({
        title:'스타워즈7',
        director:'JJ 에이브럼스',
        year:2015
    }).then((results) => {
        console.log('Promise Based Insert Result : ', results);
    }, (err) => {
        console.log('== Rejected\n', err);      
    });
});