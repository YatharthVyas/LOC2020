var express = require('express');
var app = new express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const uuid = require('uuid');
var port = process.env.PORT || 5000;
let emit = [];
let freeStaff = [];
let emittoid = new Map(); //mapping of  staff sockets to mail

let connections = [];

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.redirect('index.html');
});

io.on('connection', function(socket) {
  socket.on('recv-login', data => {
    emittoid.set(data, socket.id);
    console.log(emittoid);
  });
  socket.on('stream', function(data) {
    if (emittoid.get(data.id)) {
      io.to(emittoid.get(data.id)).emit('stream', data.image);
    }
  });
});

http.listen(port, function() {
  console.log('Server running at port ' + port);
});
