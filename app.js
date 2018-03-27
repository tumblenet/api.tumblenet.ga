const express = require('express');

//apps
const netlifyCmsGithubOauthProvider = require('netlify-cms-github-oauth-provider');

//routers
const apiRouter = require('./api.js');

var app = express();


app.use('/api',apiRouter);

app.use('/netlify',netlifyCmsGithubOauthProvider);

app.use(function (req, res) {
  res.send("hello world");
});

module.exports = app;
