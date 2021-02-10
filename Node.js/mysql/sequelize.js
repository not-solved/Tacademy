const Sequelize = require('sequelize');
var sequelize = new Sequelize('tacademy', 'root', 'root', {});

//  Sequelize를 이용한 모델 정의
var Movie = sequelize.define('movie', {
    title : { type : Sequelize.STRING },
    director : { type : Sequelize.STRING },
    year : { type : Sequelize.INTEGER },
    synopsis : { type : Sequelize.STRING(1024) }
});

//  sync() ==> 데이터베이스의 테이블에 반영 
//              동작 결과가 Promise이므로 then 이후에 성공(fulfilled), 실패(rejected) 시 동작으로 나눠 콜백 작동
function fulfilled(result) {
    console.log('Resolved : ', result);
}
 function rejected(err) {
    console.log('Rejected ; ', err);
}
 
Movie.sync().then(fulfilled, rejected);

insertMovie();
selectMovie();
updateMovie();
deleteMovie();

function insertMovie() {
    Movie.create({
        title:'아바타',
        director:'제임스 카메론',
        year:2010   
     }).then(resolved, rejected);
     
     Movie.create({
        title:'스타워즈4',
        director:'제임스 카메론',
        year:1977,
        synopsis:'머나먼 옛날..'
     });
  }

function selectMovie() {
    Movie.findAll({
        //  select title, director from movies
        attriute : ['title', 'director'],
        //  where director = '제임스 카메론' and year > 2000
        where : {
            director : '제임스 카메론',
            year : { $gt : 2000 }
        }
    }).then((results) => {
        for(var i = 0 ; i < results.length ; i++) {
            var item = results[i];
            console.log('id : ', item.id, ' title : ', item.title, ' director : ', item.director);
         }
    }, rejected);
}

function updateMovie() {
    //  update(values, options)
    Movie.update({
        //  update movies set synopsis = '...'
        synopsis:'인류의 마지막 희망, 행성 판도라! 이 곳을 정복하기 위한 ‘아바타 프로젝트’가 시작된다!'
    }, {
        //  where title = '아바타'
        where : { title: '아바타' }
    }).then((result) => {
        console.log(result);
    });
}

function deleteMovie() {
    //  destroy(options)
    Movie.destroy({
        //  delete from movies where year > 2000
        where : {
            year : {$lt : 2000 }
        }
    }).then(fulfilled, rejected);
}