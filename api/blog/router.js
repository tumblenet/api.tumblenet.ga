const express = require('express');
const getBlog = require('./blog.js');

var router = express.Router();

/*
categories
tags
posts/yyyy/mm/dd
*/

router.get("/tags/:tag",function (req, res) {
  getBlog(function(blog) {
    res.json(blog.posts.filter(post => post.tags.includes(req.params.tag)));
  });
});

router.get("/tags",function (req, res) {
  getBlog(function(blog) {
    res.json(blog.tags);
  });
});

router.get("/categories/:category",function (req, res) {
  getBlog(function(blog) {
    res.json(blog.posts.filter(function (post) {
      if (typeof post.category == "string") {
        return post.category === req.params.category;
      } else {
        return post.category.includes(req.params.category)
      }
    }));
  });
});

router.get("/categories",function (req, res) {
  getBlog(function(blog) {
    res.json(blog.categories);
  });
});

router.get("/:year/:month?/:day?", function (req, res) {
  var query = req.params;
  res.send(query);
  getBlog(function (blog) {
    //res.json(
      blog.posts.filter(function (post) {
      var testDate = post.date;
      testDate.setDate(query.day);
      testDate.setMonth(query.month);
      testDate.setFullYear(query.year);
      console.log(testDate.toJSON());
      return true;
    })
  //);
  });
});


router.get("/",function (req, res) {
  getBlog(function(blog) {
    res.json(blog.posts);
  });
});

module.exports = router;
