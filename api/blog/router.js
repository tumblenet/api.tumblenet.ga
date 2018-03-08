const express = require('express');

var router = express.Router();

/*
categories
tags
posts/yyyy/mm/dd
*/

router.use("/",function (req, res) {
  res.send("hello");
});

module.exports = router;
