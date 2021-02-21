const http = require('http');
const url = require('url');

http.createServer((req, res) => {
    var parsed = url.parse(req.url, true);
    var end = parseInt(parsed.query.end) || 0;
    var sum = 0;

    for(var i = 0; i <= end; i++) {
        sum += i;
    }
    res.end('Result : ' + sum);
}).listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});