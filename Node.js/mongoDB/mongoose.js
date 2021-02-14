var Movie = require('./model').Movie;

// saveInitialData();
findData();
// modifyData();
// removeData();

function resolved(result) {
    console.log('Resolved : ', result);
}
function rejected(err) {
    console.log('Rejected : ', err);
}

function saveInitialData() {
    //  1. Callback based
    var avata = new Movie({
        title:'인터스텔라',
        director:'크리스토퍼 놀란',
    year:2014});
    avata.save((err, product, numAffected) => {
        if(err) {
            console.error('Document save error : ', err);
            return;
        }
        console.log('Document save success : ', product, numAffected);
    });

    //  2. Promise based
    var starwars = new Movie({
        title:'스타워즈7',
        director:'JJ 에이브럼스',
        year:2015,
        notDefined:true // 스키마에 정의된 항목이 아니라 저장되지 않음
    });
    starwars.save().then((product) => {
       console.log('Save Resolved : ', product);
    }, (err) => {
       console.log('Save Rejected : ', err);
    });   
 
    Movie.create({
        title:'아바타',
        director:'제임스 카메론',
        year:2010})
    .then(resolved, rejected);
    Movie.create({
        title: '다크 나이트',
        director: '크리스토퍼 놀란',
        year: 2008
    }).then(resolved, rejected);
 }

 function findData() {
    //  1. Callback을 이용한 검색
    Movie.find({year:{$gt:2000}}, (err, docs) => {
        console.log(docs);
    });

    //  2. 쿼리 객체 - exec를 이용한 방법
    Movie.findOne({title: '인터스텔라'}).exec((err, docs) => {
        console.log(docs);
    });

    Movie.where('year').gt(2010).exec((err, docs) => {
        console.log('year > 2010 : ', docs);
    });
 }

 function modifyData() {
    //  document 수정 후 저장
    Movie.findOne({title: '아바타'}).exec((err, doc) => {
        if(doc) {
            doc.title = 'Avata',
            doc.save((err, product) => {
                console.log('Modify and Save : ', err, product);
            });
        }
    });

    Movie.update(
        {director:'크리스토퍼 놀란'},
        {$set:{director:'Christopher Nolan'}}
    ).then(resolved, rejected);
}

function removeData() {
    //  document 삭제
    Movie.findOne({title: '아바타'}).exec((err, doc) => {
        if(doc) {
            doc.title = 'Avata',
            doc.remove((err, product) => {
                console.log('Find and Remove : ', err, product);
            });
        }
    });

    Movie.remove({director:'크리스토퍼 놀란'}).then(resolved, rejected);
}