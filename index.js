var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync('privkey.pem', 'utf8');
var certificate = fs.readFileSync('cert.pem', 'utf8');
var bundle = fs.readFileSync('ca.pem', 'utf8');
var socketIO = require('socket.io');

var credentials = {ca: bundle,  requestCert: true, key: privateKey, cert: certificate,   rejectUnauthorized: false };
var express = require('express');
var app = express();
var cors = require('cors')
app.use(cors())
// your express configuration here

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(8080);
httpsServer.listen(3000);
                          



var io = socketIO.listen(httpsServer);

io.on('connection', function(socket) {

  socket.on('marco', function(data) {
    io.emit('polo', 'You got stuff');
  });

  // Receives a emit from the app when DM updates a character
  socket.on('updateParty', function() {
    io.emit('getParty');
  });

  socket.on('resetInit', function() {
    io.emit('resetInit');
  });

  socket.on('newLog', function(data) {
    io.emit('newLog', data);
  });

  socket.on('notify', function(data) {
    io.emit('notify', data);
  });

  socket.on('init', function(data) {
    io.emit('init', data);
  });

  socket.on('dm', function(data) {
    io.emit('dm', data);
  });

  socket.on('action', function(data) {
    io.emit(data.action, data);
  });



});
