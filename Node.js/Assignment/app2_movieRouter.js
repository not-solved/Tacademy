const express = require('express');
const router = express.Router();

const fs = require('fs');
var initialData = fs.readFileSync(__dirname + '/app2_initialDB.json');
var movieList = JSON.parse(initialData);

//  전체 목록 표시
router.get('/movies', (req, res) => {
    var data = [];
    movieList.forEach((movie) => {
        var info = {
            movieId : movie.movieId,
            title : movie.title
        };
        data.push(info);
    });
    var result = {
        count : data.length,
        data :  data
    }
    res.render('movieList', result);
});

//  특정 영화 세부내용 표시
router.get('/movies/:movieId', (req, res, next) => {
    var movieId = req.params.movieId;
    var movie = findMovie(movieId);
    if( !movie ) {
        var error = new Error('Not Found');
        error.code = 404;
        return next(error);
    }
    res.render('movieDetail', {movieDetail: movie});
});

//  특정 영화에 리뷰 입력
router.post('/movies/:movieId', (req, res, next) => {
    var movieId = req.params.movieId;
    var movie = findMovie(movieId);
    if(!movie) {
        var error = new Error('Not Found');
        error.code = 404;
        return next(error);
    }
    var review = req.body.review;
    movie.reviews.push(review);
    res.redirect('/movies/' + movieId);
});

function findMovie (id) {
    for(var i = 0; i < movieList.length; i++) {
        var movie = movieList[i];
        if(movie.movieId == id) {
            return movie;
        }
    }
    return null;
}

module.exports = router;