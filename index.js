var express = require('express');
var app = express();
var socketIO = require('socket.io');
var LEX = require('letsencrypt-express').testing();
var https = require('http2');

var lex = LEX.create({
  configDir: '/etc/letsencrypt'
, letsencrypt: null
, approveRegistration: function (hostname, cb) {
    cb(null, {
      domains: ['socket.imightybigman.com']
    , email: 'junnobaka@gmail.com'
    , agreeTos: true
    });
  }
});

var server = https.createServer(lex.httpsOptions, LEX.createAcmeResponder(lex, app));

server.listen(3000, "0.0.0.0");
var io = socketIO.listen(server);

io.on('connection', function(socket) {

  socket.on('marco', function(data) {
    io.emit('polo', 'You got stuff');
  });

  // Receives a emit from the app when DM updates a character
  socket.on('updateParty', function(data) {
    io.emit('getParty');
  });

  socket.on('newLog', function(data) {
    io.emit('newLog', data);
  });

  socket.on('notify', function(data) {
    io.emit('notify', data);
  });

});
