const fs = require('fs');
const http = require('http');
const formidable = require('formidable');
const pathUtil = require('path');

const uploadDir = __dirname + '/upload';
const imageDir =  __dirname + '/image';

var paintList = [];

const server = http.createServer((req, res) => {

    //  루트 경로로 요청이 올 시 (리스트 출력)
    if(req.url == '/' && req.method == 'GET') {
        showList(res);
    }
    //  <img> 태그로 인한 이미지 요청
    else if (req.method == 'GET' && req.url.indexOf('/image') == 0) {
        var path = __dirname + req.url;
        res.writeHead(200, {'Content-Type' : 'image/jpeg'});
        fs.createReadStream(path).pipe(res);
    }
    //  업로드 요청
    else if(req.method == 'POST') {
        addNewPaint(req, res);
    }
});

function showList(res) {
    res.writeHead(200, {'Content-Type' : 'text/html'});
    var body = '<html>';
    body += '<head><meta charset="UTF-8"></head>';
    body += '<body>'

    body += '<h3>Favorite Paint</h3>';

    body += '<ul>';
    paintList.forEach((item, index) => {
        body += '<li>';
        if(item.image) {
            body += '<img src = "' + item.image + '" style="height:100pt" />';
        }
        body += '</li>';
    });
    body += '</ul>';

    body += '<form action = "." enctype="multipart/form-data" method="post">' + 
        '<div><label>작품 이름 : </label><input type="text" name="title"></div>' +
        '<div><label>작품 이미지 : </label><input type="file" name="image"></div>' +
        '<input type="submit" value="upload">' + 
        '</form>';

    body += '</body></html>'
    res.end(body);
}

server.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});

function addNewPaint(req, res) {
    var form = formidable.IncomingForm();
    form.uploadDir = uploadDir;

    form.parse(req, (err, fields, files) => {
        var title = fields.title;
        var image = files.image;

        console.log(image);

        var date = new Date();
        var newImageName = 'image_' + date.getHours() + date.getMinutes() + date.getSeconds();
        var ext = pathUtil.parse(image.name).ext;
        var newPath = __dirname + '/image/' + newImageName + ext;

        fs.renameSync(image.path, newPath);

        var url = "image/" + newImageName + ext;
        var info = {
            title : title,
            image : url
        }

        paintList.push(info);

        res.statusCode = 302;
        res.setHeader('Location', '.');
        res.end('Success');
    });
}
