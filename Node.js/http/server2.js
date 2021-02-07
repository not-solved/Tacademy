const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    var parsed = url.parse(req.url, true);
    var query = parsed.query;

    var start = parseInt(query.start);
    var end = parseInt(query.end);

    if( !start || end) {
        res.statusCode = 404;
        res.end('Wrong Parameter');
    }
    else {
        var result = 0;
        for(var i = start; i < end; i++) {
            result += i;
        }
        res.statusCode = 200;
        res.end('Result : ' + result);
    }
}).listen(3000);