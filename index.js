var https = require('https');
var fs =    require('fs');
var options = {
      key:    fs.readFileSync('key.pem'),
      cert:   fs.readFileSync('cert.pem'),
      ca:     fs.readFileSync('ca.pem'),
    };
var app = https.createServer(options);
io = require('socket.io').listen(app);
app.listen(3000);


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



});
