var express = require('express');
var http = require('http');
var server = require('socket.io');

var httpserv;
var port = 2000;

var app = express();
app.get('/zombie', function(req, res) {
    res.sendfile(__dirname + '/public/wetty/index.html');
});
app.use('/', express.static(path.join(__dirname, 'public')));

/*
 * if (runhttps) {
    httpserv = https.createServer(opts.ssl, app).listen(opts.port, function() {
        console.log('https on port ' + opts.port);
    });
} else {
*/

httpserv = http.createServer(app).listen(port, function() {
    console.log('http on port ' + port);
});
/*
}
*/
var zombie = [];
var MrRobot = [];

var io = server(httpserv,{path: '/wetty/socket.io'});
io.on('connection', function(socket) {
    var userUseZombie = {};
    socket.on('zombieInLogin', function(data) {
        zombie.push({'hostname' : data.hostname, socket});
    });
    socket.on('mrRobotWantZombie', function(data) {
        for ( var i = 0; i < zombie.len; i++ ) {
            if (zombie[i].hostname === data.hostname) {
                userUseZombie = zombie[i];
                MrRobot.push({'zombie' : zombie[i], 'user' : data});
                break;
            }
        };
    });
    socket.on('dataz', function(data) {
        socket.emit('output', data);
    });
    term.on('exit', function(code) {
        console.log((new Date()) + " PID=" + term.pid + " ENDED")
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
