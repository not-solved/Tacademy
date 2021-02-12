const pool = require('./app3_dbConnect');
const express = require('express');
const router = express.Router();

router.get('/movies', showList);
router.get('/movies/:movieId', showDetail);
router.post('/movies', addMovie);
router.post('/movies/:movieId', addReview);
router.delete('/movies/:movieId', deleteMovie);
router.put('/movies/:movieId', updateMovie);

//  영화 전체 목록 출력
function showList (req, res, next) {
    pool.getConnection((error, conn) => {
        if(error) {
            error.code = 500;
            return next(error);
        }

        conn.beginTransaction((err) => {
            var SQL = "select movie_Id, title from movies";
            conn.query(SQL, (err, result) => {
                if (err) {
                    err.code = 500;
                    conn.release();
                    return next(err);
                }
                var list = {
                    count : result.length,
                    data : result
                }
                conn.release();
                res.send(list);
            });
        });
    });
}

//  특정 영화의 세부내용 출력
function showDetail (req, res, next) {
    var id = req.params.movieId;
    pool.getConnection((error, conn) => {
        if(error) {
            error.code = 500;
            return next(error);
        }

        conn.beginTransaction((err) => {
            var SQL = "select * from movies where movie_id = ?";
            conn.query(SQL, id, (err, result) => {
                if(err) {                   // 연결 에러
                    err.code = 500;
                    conn.release();
                    return next(err);
                }
                if(result.length == 0) {    // 결과 없음
                    res.status(404).send({ msg: 'Not Found' });
                    conn.release();
                    return;
                }

                var movieInfo = result[0];
                var SQL_r = "select * from reviews where movie_id = ?";
                conn.query(SQL_r, id, (err, results) => {
                    if(err) {                   // 연결 에러
                        err.code = 500;
                        conn.release();
                        return next(err);
                    }
                    movieInfo.reviews = results;
                    res.send(result);
                    conn.release();    
                });
            });
        });
    });
}

//  영화 정보 추가
function addMovie (req, res, next) {
    pool.getConnection((error, conn) => {
        if(error) {
            console.error('Error : ' + error);
            return next(error);
        }
        conn.beginTransaction((err) => {
            var SQL = "insert into movies set ?";
            var data = {
                movie_id : null,
                title : req.body.title,
                director : req.body.director,
                year : parseInt(req.body.year)
            }
            conn.query(SQL, data, (err, result) => {
                if (err) {
                    err.code = 500;
                    conn.release();
                    return next(err);
                 }
                var movieId = result.insertId;
                res.send({ msg: 'success', movieId: movieId });
                conn.release();
            });
        });
    });
}

//  특정 영화에 리뷰 추가
function addReview (req, res, next) {
    pool.getConnection((error, conn) => {
        if(error) {
            console.error('Error : ' + error);
            return next(error);
        }

        conn.beginTransaction((err) => {
            var SQL = "insert into reviews set ?";
            var data = {
                movie_id :  req.params.movieId,
                review : req.body.review
            }
            conn.query(SQL, data, (err, result) => {
                if (err) {
                    err.code = 500;
                    conn.release();
                    return next(err);
                 }
                 res.send({ msg: 'success' });
                 conn.release();
            });
        });
    });
}

//  특정 영화 삭제
function deleteMovie (req, res, next) {
    var id = req.params.movieId;
    pool.getConnection((error, conn) => {
        if(error) {
            console.error('Error : ' + error);
            return next(error);
        }
        conn.beginTransaction((err) => {
            //  리뷰 삭제
            var SQL1 = "delete from reviews where movie_id = ?";
            conn.query(SQL1, id, (err, result) => {
                if(err) {
                    err.code = 500;
                    return next(err);
                }
                //  영화정보 삭제. 리뷰 삭제 이후 수행해야 한다.
                var SQL2 = "delete from movies where movie_id = ?";
                conn.query(SQL2, id, (err, result) => {
                    if(err) {
                        conn.rollback();
                        conn.release();
                        err.code = 500;
                        return next(err);
                    }
                    res.send({ msg: 'success' });

                    conn.commit();
                    conn.release();
                });
            });
        });
    });
}

//  특정 영화의 정보 갱신
function updateMovie (req, res, next) {
    pool.getConnection((err, conn) => {
        if(err) {
            console.error('Error : ' + err);
            return next(err);
        }
        conn.beginTransaction((err) => {
            var SQL = "update movies set ? where movie_id = ?";
            var data = {}
            if(req.body.title)  data.title = req.body.title;
            if(req.body.director)   data.director = req.body.director;
            if(req.body.year)   data.year = parseInt(req.body.year);
            var movie_id = req.params.movieId;

            conn.query(SQL, [data, movie_id], (err, result) => {
                if (err) {
                    err.code = 500;
                    conn.release();
                    return next(err);
                 }
        
                 res.send({ msg: 'success' });
                 conn.release();
            });
        });
    });
}

module.exports = router;