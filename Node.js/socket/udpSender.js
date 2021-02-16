const dgram = require('dgram');
const socket = dgram.createSocket('udp4');

var msg = new Buffer('Hello UDP Receiver');
socket.end(msg, 0, msg.length, 3000, '127.0.0.1', (err) => {
    if(err) {
        console.log('UDP message sned error : ', err);
        return;
    }
    console.log('Message send complete');
    socket.close();
})