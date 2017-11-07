var https = require('https');
var fs =    require('fs');
var options = {
      key:    fs.readFileSync('../../key.pem'),
      cert:   fs.readFileSync('../../cert.pem'),
    };
var app = https.createServer(options);
io = require('socket.io').listen(app);
app.listen(3000, "0.0.0.0");


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
