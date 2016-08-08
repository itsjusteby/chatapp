var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var totalUser = 0;

http.listen(1000, function () {
    console.log('listening on *:1000');
});


io.on('connection', function (socket) {
    console.log('connected');
    totalUser += 1;
    var obj = {
        sender: 'server',
        message: 'There are ' + totalUser + ' participant(s)'
    }
    io.sockets.emit('receiveMessage', obj);

    socket.on('disconnect', function () {
        console.log('disconnected');
        totalUser -= 1;
        var obj = {
            sender: 'server',
            message: 'There are ' + totalUser + ' participant(s)'
        }
        socket.broadcast.emit('receiveMessage', obj);
    });
    
    socket.on('sendMessage', function (data) {
        console.log('sendMessage');
        
        socket.broadcast.emit('receiveMessage', data);
    });
});