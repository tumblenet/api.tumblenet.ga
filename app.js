const express = require('express');

//routers
const apiRouter = require('./api.js');

var app = express();


app.use('/api',apiRouter);

app.use(function (req, res) {
  res.send("hello world");
});

module.exports = app;
