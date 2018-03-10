const http = require('http');
const autoUpdate = require('./autoUpdate.js');

var app = require('./app.js');
var port = process.env.PORT || 3000;
var server = http.Server(app);

function listenAction() {
  console.log("Server listening on port " + port);
}

server.listen(port, listenAction);

autoUpdate.start(1000*60);
