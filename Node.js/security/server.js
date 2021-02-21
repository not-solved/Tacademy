const https = require('https');
const http = require('http');
const fs = require('fs');

var options = {
    key : fs.readFile('./key.pem'),
    cert : fs.readFile('cert.pem')
}

http.createServer((req, res) => {
    res.end('Hello Server');
}).listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

https.createServer(options, (req, res) => {
    res.end('Hello Secure Server');
}).listen(3001, () => {
    console.log('Server is running on http://localhost:3001');
});

/***
 * 준비사항 : openssl 설치, openssl windows 로 검색 후 바이너리 설치
 * 
 * 1. 개인키 발급
 * openssl genrsa -out key.pem 2048
 * 
 * 2. 인증서 발급 요청 만들기
 * openssl req -new -key key.pem -out req.csr
 * 
 * 3. 인증서 발급
 * openssl x509 -req -in req.csr -signkey key.pem -out cert.pem
 * 
 */