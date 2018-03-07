const http = require('http');

var app = function (req, res) {
  res.end("Hello World")
}
var port = 3000;
var server = new http.Server(app);

server.listen(port, function () {
  console.log("Server listening on port " + port);
});
