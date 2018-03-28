const express = require('express');

//apps
const netlifyCmsGithubOauthProvider = require('netlify-cms-github-oauth-provider');
//const netlifyCmsGithubOauthProvider = require('./netlify');

//routers
const apiRouter = require('./api.js');

var app = express();

//console.log("<script>window.setTimeout(function(){location.reload()},1000)</script>");
app.get('/log', function (req,res,next) {
  res.sendFile(__dirname + '/log.html');
});

app.use('/api',apiRouter);

app.use(netlifyCmsGithubOauthProvider);

app.use(function (req, res) {
  res.send("hello world");
});

module.exports = app;
