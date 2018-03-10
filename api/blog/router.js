const express = require('express');
const getBlog = require('./blog.js');
const updateBlog = require('./updateTumblenet.js');

var router = express.Router();

/*
categories
tags
posts/yyyy/mm/dd
*/

router.get("/wix", function (req,res) {
  require('./xml/wix')("http://tumble1999.wixsite.com/tumblegamer", function (feed) {
    res.json(feed);
  });
});

router.get("/update",function (req, res) {
  updateBlog(function (error) {
    res.json(error || { message: "http://tumblenet.ga/blog was updated"});
  });
});

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
  //res.send(query);
  getBlog(function (blog) {
    res.json(blog.posts.filter(function (post) {
      var testDate = new Date(post.date);
      testDate.setDate(query.day || testDate.getDate());
      testDate.setMonth(query.month !== undefined ? query.month -1 : testDate.getMonth());
      testDate.setYear(query.year || testDate.getFullYear());

      var include = post.date.getTime() == testDate.getTime();
      console.log(testDate.toDateString() + " - " + post.date.toDateString() + ": " + include);

      return include;
    }));
  });
});


router.get("/",function (req, res) {
  getBlog(function(blog) {
    res.json(blog.posts);
  });
});

module.exports = router;
