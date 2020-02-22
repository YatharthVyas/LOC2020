var express = require('express');
var app = new express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const uuid = require('uuid');
var port = process.env.PORT || 5000;
let emittoid = new Map(); //mapping of  staff sockets to mail

app.use(require('cors')());
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.redirect('index.html');
});

io.on('connection', function(socket) {
  socket.on('recv-login', data => {
    try {
      emittoid.get(data).append(socket.id);
    } catch (error) {
      emittoid.set(data, [socket.id]);
    }
    console.log(emittoid);
  });
  socket.on('stream', function(data) {
    if (emittoid.get(data.id)) {
      emittoid.get(data.id).forEach(id => {
        io.to(id).emit('stream', data.image);
      });
    }
  });
  socket.on('recv-logout', function(id) {
    if (emittoid.get(id)) {
      emittoid.set(
        id,
        Array.from(emittoid.get(id).filter(elem => elem != socket.id))
      );
    }
  });
});

http.listen(port, function() {
  console.log('Server running at port ' + port);
});
