const http = require('http');

//  httpRequest => 해당 페이지로 접근을 요청(request)
const server = http.createServer((req, res) => {
	console.log('Method : ', req.method);
	console.log('url : ', req.url);
	console.log('headers : ', req.headers['user-agent']);
			
	res.write('Hello Server');
	res.end();
}).listen(3000);