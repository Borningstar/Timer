var express = require('express');
var app = express();

var stamps = require('./routes/stamps');
app.use('/stamps', stamps);

app.use(express.static('public'));

var port = process.env.PORT || 3000;

var server = app.listen(port, function(){
  console.log('Listening on port ' + port);
});

var io = require('socket.io')(server);
var socket = io.listen(server);

var socket = require('./routes/socket')(app, io);

