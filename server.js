const http = require('http');

var app = require('./app.js');
var port = process.env.PORT || 3000;
var server = http.Server(app);

server.listen(port, function () {
  console.log("Server listening on port " + port);
});
