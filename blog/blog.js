const retrivers = require('../retrivers');
const sites = require('./sites');

var getJekyll = new sites.Jekyll(retrivers.json);
var getBlogger = new sites.Blogger(retrivers.json);
var getWix = new sites.Wix(retrivers.xml);

function noDuplicates(array) {
  return [...new Set(array)];
}

function SortByDate(a,b) {
  return b.date.getTime() - a.date.getTime();
}

function AddBlog(fullFeed, blogFeed) {
  return {
    categories: fullFeed.categories.concat(blogFeed.categories),
    tags: fullFeed.tags.concat(blogFeed.tags),
    posts: fullFeed.posts.concat(blogFeed.posts)
  };
}

function SortBlog(fullFeed) {
  return {
    categories: noDuplicates(fullFeed.categories),
    tags: noDuplicates(fullFeed.tags),
    posts: noDuplicates(fullFeed.posts).sort(SortByDate)
  };
}

function getBlogJson(callback) {

  var fullFeed = {
    categories: [],
    tags: [],
    posts: []
  };

  getJekyll("http://www.tumblenet.ga", function (feed) {
    var tnBlog = feed;
    fullFeed = AddBlog(fullFeed, tnBlog);

    getBlogger("http://tumblegamer.blog.tumblenet.ga", function (feed) {
      var tgBlog = feed;
      tgBlog.posts.forEach(function (post) {
        post.author = "tumblegamer";
      });
      fullFeed = AddBlog(fullFeed, tgBlog);

      getBlogger("http://doctorbatmanwho.blog.tumblenet.ga", function (feed) {
        var dbwBlog = feed;
        dbwBlog.posts.forEach(function (post) {
          post.author = "doctorbatmanwho";
        });
        fullFeed = AddBlog(fullFeed, dbwBlog)

        getWix("http://tumble1999.wixsite.com/tumblegamer", function (feed) {
          var oldTgBlog = feed
          fullFeed = AddBlog(fullFeed, oldTgBlog);
          fullFeed = SortBlog(fullFeed);

          //console.log(fullFeed);
          callback(fullFeed);
        })
      });
    });
  });
}

module.exports = getBlogJson;
