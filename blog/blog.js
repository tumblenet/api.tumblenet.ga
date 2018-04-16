const retrievers = require('../retrievers');
const sites = require('./sites');

var jekyll = new sites.Jekyll(retrievers.json);
var blogger = new sites.Blogger(retrievers.json);
var wix = new sites.Wix(retrievers.xml);

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

  jekyll.getJson("http://www.tumblenet.ga", function (feed) {
    var tnBlog = feed;
    fullFeed = AddBlog(fullFeed, tnBlog);
    jekyll.getJson("http://tumblecraft.tumblenet.ga", function (feed) {
        var tcBlog = feed;
        fullFeed = AddBlog(fullFeed, tcBlog);

      blogger.getJson("http://tumblegamer.blog.tumblenet.ga", function (feed) {
        var tgBlog = feed;
        tgBlog.posts.forEach(function (post) {
          post.author = "tumblegamer";
        });
        fullFeed = AddBlog(fullFeed, tgBlog);

        blogger.getJson("http://doctorbatmanwho.blog.tumblenet.ga", function (feed) {
          var dbwBlog = feed;
          dbwBlog.posts.forEach(function (post) {
            post.author = "doctorbatmanwho";
          });
          fullFeed = AddBlog(fullFeed, dbwBlog)

          wix.getJson("http://tumble1999.wixsite.com/tumblegamer", function (feed) {
            var oldTgBlog = feed
            fullFeed = AddBlog(fullFeed, oldTgBlog);
            fullFeed = SortBlog(fullFeed);

            //console.log(fullFeed);
            callback(fullFeed);
          })
        });
      });
    });
  });
}

module.exports = getBlogJson;
