const express = require('express');

var router = express.Router();

router.use(function (req, res, next) {
  res.type('application/json');
  next();
});

router.get('*', function (req, res) {
  var test = {
    message: "Not Found"
  }
  res.json(test);
});

module.exports = router;
