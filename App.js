"use strict";
var express = require('express');
let mustacheExpress = require('mustache-express');
const path = require('path');
var cookieParser = require('cookie-parser')
var config = require('./Config');
const http = require('http');
var app = express();
app.use(express.static('public'))
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);


app.get('/', function (request, response) {
    console.log("Got a GET request for the homepage");
    response.sendFile(path.join(__dirname, '/views/index.html'));
});

app.get('/message', function (request, response) {
    console.log("Got a GET request with new data");
    const pid = request.query.pid;
    const payload = request.query.payload;
    io.emit('message', {pid: payload});
    response.send('Hello GET');
});

app.post('/message', function (request, response) {
    console.log("Got a POST request with new data");
    const payload = request.body;
    response.send('Hello POST');
});

io.on('connection', (socket) => {
    console.log('A socket connection was made by ');
    console.log(socket.id);
});

 server.listen(config.appPort, () => {
    console.log('Velocity Socket is listening on HTTP Port:'+config.appPort);
});