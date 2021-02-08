const http = require('http');
const fs = require('fs');
const url = require('url');
const pathUtil = require('path');
const formidable = require('formidable');

var uploadDir = __dirname + '/upload';
var imageDir = __dirname + '/images';

var initialDB = fs.readFileSync(__dirname + '/app1_initialDB.json');
var movieList = JSON.parse(initialDB);

const server = http.createServer((req, res) => {
    //  메인 화면에서 영화 목록 표시
    if(req.url == '/' && req.method.toLowerCase() == 'get')  {
        showList(res);
    }
    //  이미지 태그에 의한 이미지 요청
    else if(req.method.toLowerCase() == 'get') {  
        var path = __dirname + url.parse(req.url).pathname;
        fs.access(path, (err) => {
            if(err) {
                res.statusCode = 404;
                res.end('Not Found');
                return;
            }
            fs.createReadStream(path).pipe(res);
        })
    }
    //  영화 정보 입력
    else if(req.method.toLowerCase() == 'post') {
        addNewList(req, res);
    }
    else {
        res.statusCode = 400;
        res.end('Bad Request');  
    }
});

function showList(res) {

    var body = '<html>';
    body += '<head>';
    body += '<meta charset="UTF8">';
    body += '<style>';
    body += 'form label { width:100px; display:inline-block; }'
    body += 'li img { height:100px }';
    body += '</style>';
    body += '</head>';
    body += '<body>';
    body += '<h1>Favorite Movie</h1>';

    body += '<div><ul>';
    movieList.forEach((item) => {
        body += '<li>';
        if(item.poster) {
            body += '<img src="' + item.poster + '" />';
        }
        body += item.title + '(' + item.director + ', ' + item.year + ')</li>';
    });
    body += '</ul></div>';
    body += '<h3>새 영화 입력</h3>';

    body += '<form method="post" action="." enctype="multipart/form-data">' +
        '<ul>' +
        '<li><label>영화 제목</label><input type="text" name="title"></li>' +
        '<li><label>영화 감독</label><input type="text" name="director"></li>' +
        '<li><label>연도</label><input type="number" name="year"></li>' +
        '<li><label>포스터</label><input type="file" name="poster"></li>' +
        '</ul>' +
        '<input type="submit" value="올리기">' +
        '</form>';

    body += '</body></html>';
    res.writeHeader(200, { 'Content-Type': 'text/html; charset=UTF-8' });
    res.end(body);
}

server.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});

function addNewList(req, res) {
    var form = formidable.IncomingForm();
    form.uploadDir = uploadDir;
    
    form.parse(req, (err, fields, files) => {
        if(err) {
            res.statusCode = 404;
            res.end("Error");
            return;
        }

        var title = fields.title;
        var director = fields.director;
        var year = fields.year;
        var poster = files.poster;
        
        var ext = pathUtil.parse(poster.name).ext;
        var newPosterName = title + ext;
        var newPath = imageDir + pathUtil.sep + newPosterName;
        fs.renameSync(poster.path, newPath);
        var url = '/images/' + newPosterName;

        var info = {
            title : title,
            director : director,
            year : year,
            poster : url
        }
        movieList.push(info);
        
        res.statusCode = 302;
        res.setHeader('Location', '.');        
        res.end('Success');
    });
}