//  http 서버를 통해 Hello World 출력
var http = require('http');
var server = http.createServer(function(req, res) {
	res.write('Hello World');
	res.end();
});

server.listen(3000);