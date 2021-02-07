var http = require('http');
var fs = require('fs');

//  파일 접근 여부에 따른 서버의 response
var server = http.createServer((req, res) => {
    fs.access('./ca11.jpg', (err) => {
        if(err) {
            res.statusCode = 404;    // 상태 : 404 error
            res.end();
            return;
        }
        fs.readFile('./cat.jpg', (err, data) => {
            res.end(data);
        })
    })
}).listen(3000);