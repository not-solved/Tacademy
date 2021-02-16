const net = require('net');

//  소켓을 이용한 서버 생성
const server = net.createServer((socket) => {
    console.log('클라이언트 접속');
    socket.write('Welconme to Socekt Server');

    socket.on('data', (chunk) => {
        console.log('From client : ', chunk.toString());
    });
    socket.on('end', () => {
        console.log('Client connect terminated');
    });
});

server.on('listening', () => {
    console.log('Server is listening');
});
server.on('close', () => {
    console.log('Server closed');
});

server.listen(3000);