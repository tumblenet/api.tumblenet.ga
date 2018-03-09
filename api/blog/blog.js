const getBlogger = require('./json/blogger.js');
const getJekyll = require('./json/jekyll.js');

function NoDuplicates(array) {
  return [...new Set(array)];
}

function SortByDate(a,b) {
  return b.date.getTime() - a.date.getTime();
}

function getBlogJson(callback) {

  getJekyll("http://www.tumblenet.ga", function (feed) {
    var tnBlog = feed;
    getBlogger("http://tumblegamer.blog.tumblenet.ga", function (feed) {
      var tgBlog = feed;
      tgBlog.posts.forEach(function (post) {
        post.author = "tumblegamer";
      })
      getBlogger("http://doctorbatmanwho.blog.tumblenet.ga", function (feed) {
        var dbwBlog = feed;
        dbwBlog.posts.forEach(function (post) {
          post.author = "doctorbatmanwho";
        })

        var fullFeed = {
          categories: NoDuplicates(tnBlog.categories.concat(tgBlog.categories.concat(dbwBlog.categories))),
          tags: NoDuplicates(tnBlog.tags.concat(tgBlog.tags.concat(dbwBlog.tags))),
          posts: NoDuplicates(tnBlog.posts.concat(tgBlog.posts.concat(dbwBlog.posts))).sort(SortByDate)
        };

        //console.log(fullFeed);
        callback(fullFeed);
      });
    });
  });
}

module.exports = getBlogJson;
