const express = require('express');
const app = new express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const User = require('./models/User');
const mongoose = require('mongoose');
var port = process.env.PORT || 5000;
let emittoid = new Map(); //mapping of  staff sockets to mail

app.use(require('cors')());
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/loc2020', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
let db = mongoose.connection;

db.on('error', err => {
  console.error('Error in Connecting to Databse...');
  console.error(err);
  console.log('DB Connecrtion Error... Exiting');
  process.exit(1);
});

db.once('open', () => {
  console.log('Connected to Databse...');
});

app.post('/register', async (req, res) => {
  try {
    let temp = await User.create(req.body);
    res.status(201).send(temp);
  } catch (e) {
    res.status(500).send({ error: e });
  }
});

app.post('/signin', async (req, res) => {
  try {
    let temp = await User.findOne({ email: req.body.email });
    if (temp === null || temp === undefined) {
      return res.status(404).send({ error: 'User Not Found' });
    }
    if (temp.password !== req.body.password) {
      return res.status(404).send({ error: 'Incorrect Password' });
    }
    return res.status(200).send(temp);
  } catch (e) {
    return res.status(500).send({ error: e });
  }
});

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
