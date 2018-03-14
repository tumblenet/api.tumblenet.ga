const express = require('express');

//routers
const apiRouter = require('./api.js');

var app = express();

console.log("<script>window.setTimeout(function(){location.reload()},3000)</script>");
app.get('/log', function (req,res,next) {
  res.sendFile(__dirname + '/log.html');
});

app.use('/api',apiRouter);

app.use(function (req, res) {
  res.send("hello world");
});

module.exports = app;
