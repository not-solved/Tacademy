const http = require('http');
const fs = require('fs');

var data = fs.readFileSync('./movieData.json');
var movieList = JSON.parse(data);

const  server = http.createServer((req, res) => {
    var method = req.method.toLowerCase();
    switch(method) {
        case 'get' :
            handleGetRequest(req, res);
            return;
        case 'post' :
            handlePostRequest(req, res);
            return;
        case 'put' :
            handlePutRequest(req, res);
            return;
        case 'delete' :
            handleDeleteRequest(req, res);
            return;
        default :
            res.statusCode = 404;
            res.end("잘못된 요청입니다.");
            return;
    }
}).listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});

//  Get 메소드 처리 -> select 연산
handleGetRequest = (req,res) => {
    var url = req.url;
    if(url == '/movies') {      // 영화 목록 생성
        var list = [];
        for(var i = 0; i < movieList.length; i++) {
            var movie = movieList[i];
            list.push({
                id : movie.id,
                title : movie.title
            });
        }
        var result = {
            count : list.length,
            data : list
        }
        res.writeHead(200, {'Content-Type' : 'application/json; charset=utf-8'});
        res.end(JSON.stringify(result));
    }
    else {

        // 영화 id 찾기 (/movies/?)
        var id = url.split('/')[2];
        var movie = null;
        for(var i = 0; i < movieList.length; i++) {
            var item = movieList[i];
            if(id == item.id) {
                movie = item;
                break;
            }
        }

        // 검색된 영화 정보 제공
        if(movie) {     // 영화 검색에 성공
            res.writeHead(200, {'Content-Type' : 'application/json; charset=utf-8'});
            res.end(JSON.stringify(movie));
        }
        else {          // 영화 검색에 실패
            res.writeHead(404, {'Content-Type' : 'application/json; charset=utf-8'});
            var message = {
                error : {
                    code : 404,
                    message : '영화 정보가 없습니다.'
                }
            }
            res.end(JSON.stringify(message));
        }
    }
};
//  Post 메소드 처리 -> insert 연산
handlePostRequest = (req,res) => {

};
//  Put 메소드 처리 -> update 연산
handlePutRequest = (req,res) => {

};
//  Delete 메소드 처리 -> delete 연산
handleDeleteRequest = (req,res) => {

};