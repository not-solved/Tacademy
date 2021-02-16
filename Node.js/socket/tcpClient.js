const net = require('net');
const IP = '127.0.0.1';     // localhost
const port = 3000;

var socket = new net.Socket();

//  서버 소켓에 연결
socket.connect({host: IP, port: port}, () => {
    console.log('서버와 연결 성공');

    socket.write('Hello Socket server\n');
    socket.end();

    socket.on('data', (chunk) => {
        console.log('From Server : ', chunk.toString());
    });
    socket.on('end', () => {
        console.log('Server cononection terminated');
    });
});