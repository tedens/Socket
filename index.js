var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(https);


http.listen(3000, function(){
  console.log('listening on *:3000');
});

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

});
