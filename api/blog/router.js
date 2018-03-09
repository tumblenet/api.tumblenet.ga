const express = require('express');
const getBlog = require('./blog.js');

var router = express.Router();

/*
categories
tags
posts/yyyy/mm/dd
*/

router.use("/categories/:category",function (req, res) {
  getBlog(function(blog) {
    res.json(blog.posts.filter(function (post) {
      console.log(post.category);
      if (typeof post.category == "string") {
        return post.category === req.param.category;
      } else {
        return post.category.includes(req.param.category);
      }
    }));
  });
});

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

router.use("/:year",function (req, res) {
  getBlog(function(blog) {
    res.json(blog.posts);
  });
});

router.use("/:year/:month",function (req, res) {
  getBlog(function(blog) {
    res.json(blog.posts);
  });
});

router.use("/:year/:month/:day",function (req, res) {
  getBlog(function(blog) {
    res.json(blog.posts);
  });
});

module.exports = router;
