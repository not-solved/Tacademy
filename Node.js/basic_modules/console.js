//  기본 출력 - console.log
console.log("Hello World");

//  서버에 전송하여 웹에서 출력
var http = require("http");
http.createServer(function(request, response) {
    response.writeHead(200, {'Content-Type' : 'text/html'});
    response.end('<h1>Hello World!</h1>');
}).listen(3000);

//  console.log
var intVal = 3;
var obj = {
    name : 'NodeJS',
    how : 'Interesting'
};

console.log('hello world');
console.log('intVal : ' + intVal);
console.log('obj : ' + obj);
console.log('obj : ', obj);

//  console.timer
console.time('TIMER');  // 타이머 시작

var sum = 0;
for(var i = 1; i < 100000; i++) {
    sum += i;
}
console.log('sum : ' + sum);
console.timeEnd('TIMER');       // 타이머 종료

//  console.custom 
var fs = require('fs');
var output = fs.createWriteStream('stdout.log');
var errorOutput = fs.createWriteStream('error.log');

var Console = require('console').Console;       // 콘솔 선언
var logger = new Console(output, errorOutput);  // 입력부와 에러부 분할

//  stdout.log 에 기록
logger.info('info message');    
logger.log('log message');      

//  error.log 에 기록
logger.warn('warning');         // 경고시 기록
logger.error('error message');  // 에러 발생 시 기록