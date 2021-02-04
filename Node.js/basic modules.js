//  기본 출력 - console.log
console.log("Hello World");

//  서버에 전송하여 웹에서 출력
var http = require("http");
http.createServer(function(request, response) {
    response.writeHead(200, {'Content-Type' : 'text/html'});
    response.end('<h1>Hello World!</h1>');
}).listen(3000);
