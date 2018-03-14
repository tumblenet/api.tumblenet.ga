const express = require('express');

//routers
const apiRouter = require('./api.js');

var app = express();

app.get('/log', function (req,res,next) {
  res.append("<script>setTimeout(location.reload,3000)</script");
  res.sendFile(__dirname + '/log.txt');
});

app.use('/api',apiRouter);

app.use(function (req, res) {
  res.send("hello world");
});

module.exports = app;
