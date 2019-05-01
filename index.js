const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

let name = '';
let users = [];

app.get('/', function (req, res) {
    res.render('index', {users:users});
});

app.post('/', function (req, res) {
  name = req.body.name;
  res.redirect('/chat');
});

app.get('/chat', function (req, res) {
    res.render('chat', {users:users, name:name});
});

io.on('connection', function (socket) {
  users.push(name);
  socket.name = name;
  io.emit('user connected', { name: socket.name });

  socket.on('disconnect', function (msg) {
    for (var i = 0; i < users.length; i++) {
      if (users[i] === socket.name) {
        users.splice(i, 1);
      }
    }
    io.emit('user disconnected', { name: socket.name });
  });

  socket.on('chat message', function (msg) {
    io.emit('chat message', { msg: msg, name: socket.name });
  });

});

http.listen(3000, function () {
    console.log('Chat app listening on port 3000!')
});