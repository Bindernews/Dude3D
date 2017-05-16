
var fs = require('fs'),
    path = require('path'),
    express = require('express'),
    config = require('./config');

var app = express();
var server = require('http').Server(app);

app.use('/static/', express.static('static', {
    index: false
}));

// respond with the index file
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

server.listen(config.PORT, function () {
    console.log('Server listening on *:' + config.PORT);
});

