const getBlogger = require('./json/blogger.js');
const getJekyll = require('./json/jekyll.js');

function NoDupes(array) {
  return [...new Set(array)];
}

function getBlogs(callback) {

  getJekyll("http://www.tumblenet.ga", function (feed) {
    var tnBlog = feed;
    getBlogger("http://tumblegamer.blog.tumblenet.ga", function (feed) {
      var tgBlog = feed;
      getBlogger("http://doctorbatmanwho.blog.tumblenet.ga", function (feed) {
        var dbwBlog = feed;

        var fullFeed = {
          categories: NoDupes(tnBlog.categories.concat(tgBlog.categories.concat(dbwBlog.categories))),
          tags: NoDupes(tnBlog.tags.concat(tgBlog.tags.concat(dbwBlog.tags))),
          posts: NoDupes(tnBlog.posts.concat(tgBlog.posts.concat(dbwBlog.posts)))
        };
        //console.log(test);
        callback(fullFeed);
      });
    });
  });
}

module.exports = getBlogs;
