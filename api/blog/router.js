const express = require('express');
const getBlog = require('./blog.js');

var router = express.Router();

/*
categories
tags
posts/yyyy/mm/dd
*/

router.use("/",function (req, res) {
  getBlog(function (blog) {
    res.json(blog.posts);
  })
});

module.exports = router;
