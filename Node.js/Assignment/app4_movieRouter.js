const express = require('express');
const router = express.Router();
const Movie = require('./app4_model');

router.get('/movies', showMovieList);
router.get('/movies/:movieId', showMovieDetail);
router.post('/movies', addMovie);
router.post('/movies/:movieId', addMovieReview);
router.put('/movies/:movieId', updateMovie);
router.delete('/movies/:movieId', deleteMovie);

//  전체 영화 목록 출력
function showMovieList(req, res, next) {
    Movie.find({},{_id:1, title:1}).then((result) => {
        var List = {
            count : result.length,
            data : result
        }
        res.send(List);
    }, (err) => {
        console.error('Error on show List', err);
        err.code = 500;
        return next(err);
    });
}

//  특정 영화의 세부내용 출력
function showMovieDetail(req, res, next) {
    var id = req.params.movieId;
    Movie.findById(id).exec((err, result) => {
        if(err) {
            console.error('Error on read detail : ', err);
            err.code = 500;
            return next(err);
        }
        res.send(result);
    });
}

//  영화정보 입력
function addMovie(req, res, next) {
    var title = req.body.title;
    var director = req.body.director;
    var year = parseInt(req.body.year);

    var movie = new Movie({title: title, director: director, year: year});
    movie.save().then((result) => {
        console.log(result);
        res.send({msg:'success', id: result._id});
    },(err) =>{
        console.error('Error on insert : ', err);
        err.code = 500;
        return next(err);
    });
    res.send({mesg : 'success'});
}

//  특정 영화에 리뷰 정보 입력
function addMovieReview(req, res, next) {
    //  1. ID로 특정 영화를 찾는다.
    //  2. 해당 영화에 review 입력
    var id = req.params.movieId;
    var review = req.body.review;
    Movie.findById(id, (err, doc) => {
        if(err) {
            console.error('Error in insert review : ', err);
            err.code = 500;
            return next(err);
        }
        doc.addReview(review).then(function fulfilled(result) {
            res.send({msg: 'success', result: result});
        }, function rejected(err) {
            err.code = 500;
            next(err);
        });
    });
}

//  특정 영화정보 수정
function updateMovie(req, res, next) {
    var id = req.params.movieId; 
    
    Movie.findById(id, (err, doc) => {
        if(err) {
            console.error('Error on update : ', err);
            err.code = 500;
            return next(err);
        }
        if(req.body.title)
            doc.title = req.body.title;
        if(req.body.director)
            doc.director = req.body.director;
        if(req.body.year)
            doc.year = parseInt(req.body.year);

        doc.save().then((result) => {
            res.send({msg : 'success', result: result});
        }, (err) => {
            console.error('Error on update : ', err);
            err.code = 500;
            return next(err);    
        });
    });
    
}

//  특정 영화 삭제
function deleteMovie(req, res, next) {
    var id = req.params.movieId;
    Movie.findOneAndRemove({_id : id}).then( (result) => {
        console.log('Delete complete : ', result);
        res.send({msg : 'success', result : result});
    }, (err) => {
        console.error('Error on delete : ', err);
        err.code = 500;
        return next(err);
    });

}

module.exports = router;