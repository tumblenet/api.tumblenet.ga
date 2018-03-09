const express = require('express');
const getBlog = require('./blog.js');

var router = express.Router();

/*
categories
tags
posts/yyyy/mm/dd
*/

router.use("/tags/:tag",function (req, res) {
  getBlog(function(blog) {
    res.json(blog.posts.filter(post => post.tags.includes(req.param.tags)));
  });
});

router.use("/categories",function (req, res) {
  getBlog(function(blog) {
    res.json(blog.categories);
  });
});

router.use("/tags",function (req, res) {
  getBlog(function(blog) {
    res.json(blog.tags);
  });
});


router.use("/",function (req, res) {
  getBlog(function(blog) {
    res.json(blog.posts);
  });
});

module.exports = router;
