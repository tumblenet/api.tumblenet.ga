const http = require('http');

var app = function (req, res) {
  res.end("hello")
}
var port = 3000;
var server = new http.Server(app);

console.log("Hello World");


server.listen(port, function () {
  console.log("Server listening on port " + port);
});
