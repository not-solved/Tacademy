const mongoose = require('mongoose');
var url = "mongodb://localhost:27017/tacademy";
mongoose.connect(url);

var db = mongoose.connection;   // DB 연결

db.on('error', (err) => {       // 에러 발생시
    console.log('Err : ', err);
});
db.on('open', () => {           // 연결 성공
    console.log('Open event');
});

//  스키마 정의
var MovieScheme = mongoose.Schema({
    title : String,
    director : String,
    year : Number,
    synopsis : String
});

module.exports.Movie = mongoose.model('Movie', MovieScheme);