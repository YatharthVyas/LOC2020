const express = require('express');
const app = new express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const User = require('./models/User');
const Forum = require('./models/Forum');
const Event = require('./models/Event');
const mongoose = require('mongoose');
const uuid = require('uuid/v4');
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
app.post('/events', async (req, res) => {
  try {
    let temp = await Event.create(req.body);
    res.status(201).send(temp);
  } catch (e) {
    res.status(500).send({ error: e });
  }
});
app.get('/events', async (req, res) => {
  try {
    let temp = await Event.find({});
    res.status(201).send(temp);
  } catch (e) {
    res.status(500).send({ error: e });
  }
});
app.post('/forumQ', async (req, res) => {
  try {
    req.body.ID = uuid();
    req.body.topic = JSON.parse(req.body.test);
    let temp = await Forum.create(req.body);
    res.status(201).send(temp);
  } catch (e) {
    res.status(500).send({ error: e });
  }
});

app.post('/forumA', async (req, res) => {
  console.log(req.body);
  try {
    let temp = await Forum.findOne({ ID: req.body.ID });
    console.log(temp);
    if (temp === null || temp === undefined) {
      return res.status(404).send();
    }
    temp = await Forum.updateOne(
      { ID: req.body.ID },
      {
        $push: {
          Ans: {
            text: req.body.Ans,
            user: req.body.user,
            institute: req.body.ins,
          },
        },
      }
    );

    res.status(201).send();
  } catch (e) {
    res.status(500).send({ error: e });
  }
});

app.get('/getQTopic', async (req, res) => {
  try {
    let temp = await Forum.find({ topic: req.query.val });
    if (temp === null || temp === undefined) {
      return res.status(200).send([]);
    } else {
      return res.status(200).send(temp);
    }
  } catch (e) {
    return res.status(500).send({ error: e });
  }
});

app.get('/getQSubj', async (req, res) => {
  try {
    let temp = await Forum.find({ subject: req.query.val });
    if (temp === null || temp === undefined) {
      return res.status(200).send([]);
    } else {
      return res.status(200).send(temp);
    }
  } catch (e) {
    return res.status(500).send({ error: e });
  }
});

app.get('/getQ', async (req, res) => {
  let arr = [];
  let filt = [];
  let ret = [];
  try {
    let words = req.query.val.split(' ');
    for (let i = 0; i < words.length; ++i) {
      let temp = await Forum.find({
        Q: { $regex: words[i], $options: 'i' },
      });

      if (temp === null || temp === undefined) {
      } else {
        //console.log(temp);
        arr = [].concat(arr, temp);
        //console.log(arr);
      }
    }
    for (let i = 0; i < arr.length; ++i) {
      if (filt.includes(arr[i].Q)) {
        continue;
      } else {
        filt.push(arr[i].Q);
        ret.push(arr[i]);
      }
    }

    return res.status(200).send(ret);
  } catch (e) {
    console.log(e);
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
  socket.on('join-req', id => {
    console.log(id);
    socket.join(id);
  });
  socket.on('msg-sent', data => {
    socket.to(data.ID).emit('msg-rcv', data);
  });
});

http.listen(port, function() {
  console.log('Server running at port ' + port);
});
