const http = require('http');

//	httpResponse => 요청(request)에 대한 응답(response)
const server = http.createServer((req, res) => {
    res.statusCode = 200;       // 성공
    res.statusMessage = "OK, success";
    res.setHeader('content-type', 'text/html');

    res.write('<html><body><h1>Hello Server</h1></body></html>');
    res.end();
}).listen(3000);