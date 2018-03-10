const express = require('express');
const blogRouter = require('./blog/router.js');

var router = express.Router();

router.use(function (req, res, next) {
  res.type('application/json');
  next();
});

router.use('/blog', blogRouter);

router.get('*', function (req, res) {
  var test = {
    message: "Not Found"
  }
  res.json(test);
});

module.exports = router;
