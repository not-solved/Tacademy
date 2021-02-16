const express = require('express');
const http = require('http');
const app = express();

const server = http.createServer(app);
server.listen(3000);

app.get('/', (req, res) => {
    res.sendfile(__dirname + '/client.html');
});

var io = require('socket.io')(server);
io.on('connect', (socket) => {
    console.log('client connect');

    socket.on('disconnect', () => {
        console.log('client disconnected');
    });
    setInterval(() => {
        socket.emit('message', '메세지');
    }, 3000);
});