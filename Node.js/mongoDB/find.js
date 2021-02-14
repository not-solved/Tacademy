var MongoClient = require('mongodb').MongoClient
var url = "mongodb://localhost:27017/tacademy";
var ObjectID = require('mongodb').ObjectID;
var db;

MongoClient.connect(url, (err, database) => {
    if(err) {           // DB 연결 실패
        console.error('MongoDB connection failed : ', err);
        return;
    }

    db = database.db('tacademy');

    //  document 여러개 추가
    var promise = db.collection('movies').insertMany([
        { title: '스타워즈', director: '조지 루카스', year: 1977 },
        { title: '아바타', director: '제임스 카메론' },
        { title: '인터스텔라', director: '크리스토퍼 놀란', year: 2014 },
        { title: '스타워즈7', director: 'JJ 에이브럼스', year: 2015 }
    ]);

    promise.then((results) => {
        console.log('초기 데이터 입력 성공');
        executeFindExample();
    }, (err) => {
        console.error('Error : ', err);
    });
});

function executeFindExample() {
    var movies = db.collection('movies');

    //  1. Find All
    movies.find().toArray((err, docs) => {
        console.log('== Find ALL, toArray');
        console.log(docs);  
    });

    //  2. Projection
    var project = { _id : 0, title : 1};
    movies.find({}, project).toArray((err, docs) => {
        console.log('== Find ALL, with Projection');
        console.log(docs);  
    });

    //  3. Query
    movies.fiind({title : '인터스텔라'}).toArray((err, docs) => {
        console.log('== Find 인터스텔라');
        console.log(docs);    
    });

    //  4. Query - 조건부 탐색
    movies.find({ year: { $gt: 2000 } }).toArray((err, docs) => {
        console.log('== 2000년 이후의 영화');
        console.log(docs);
    });
   
    //   5. Query - 조건부 탐색 (OR)
    movies.find(
        { $or: [{ year: { $gt: 2000 } }, { director: "크리스토퍼 놀란" }]
    }).toArray((err, docs) => {
        console.log('== OR Query');
        console.log(docs);
    });
   
   //   6. limit(5)
   movies.find({}).limit(2).toArray((err, docs) => {
      console.log('== limit');
      console.log(docs);
   });
   
   //   7. ObjecdtID
   movies.findOne({}).then(function(result) {
      var objectIDStr = result._id.toString();
      
      movies.findOne({_id:objectIDStr}).then((result) => {
         console.log('Find By ID Str : \n', result);
      }, (err) => {
         console.log('Find By ID Str Error : ', err);
      });
      
      movies.findOne({_id:new ObjectID(objectIDStr)}).then((result) => {
         console.log('Find By ObjectID : \n', result);
      }, (err) => {
         console.log('Find By ObjectID Error : ', err);
      });
   });

}