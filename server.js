const http = require('http');

var app = require('./app.js');
var port = process.env.PORT || 3000;
var server = http.Server(app);

function listenAction() {
  console.log("Server listening on port " + port);
}

server.listen(port, listenAction);
