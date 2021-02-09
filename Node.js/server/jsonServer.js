var http = require('http');

//  json 데이터
var movieList = [{
    title : '아바타',
    director : '제임스 카메론'
}];

http.createServer((req, res) => {
    //  POST 요청일 경우
    if(req.method.toLowerCase() == 'post') {
        var buffer = '';
        req.on('data', (chunk) => {     // data 이벤트가 발생할 경우 => 데이터를 요청하는 이벤트가 발생할 경우
            buffer += chunk;            // 그 데이터를 버퍼에 추가
        });
        req.on('end', () => {           // end 이벤트가 발생할 경우 => 모든 이벤트가 끝나면
            var parsed = JSON.parse(buffer);
            var titleData = parsed.title;
            var directorData = parsed.director;

            movieList.push({            // 리스트에 해당 데이터를 추가하고
                title:titleData,
                director:directorData
            });
                                        // response로 리스트를 JSON 형식으로 넘긴다.
            res.writeHead(200, {'Content-Type' : 'application/json'});
            res.end(JSON.stringify({result:'success'}));
        })
    }
    //  GET 요청일 경우
    else {
        var result = {
            count : movieList.length,
            data : movieList
        };
        res.writeHead(200, {'Content-Type' : 'application/json'});
        res.end(JSON.stringify(result));
    }

}).listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
})