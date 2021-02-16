const dgram = require('dgram');
const socket = dgram.createSocket('udp4');
socket.bind(3000);      // 소켓을 포트 3000번에 할당

socket.on('listening', () => {
    console.log('listening event');
});
socket.on('message', (msg, rinfo) => {
    console.log('Message received : ', rinfo.address, msg.toString());
});
socket.on('close', () => {
    console.log('close event');
})