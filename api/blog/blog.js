const getBlogger = require('./json/blogger.js');
const getJekyll = require('./json/jekyll.js');

function getBlogs() {

  getJekyll("http://www.tumblenet.ga", function (feed) {
    var tnBlog = feed;
    getBlogger("http://tumblegamer.blog.tumblenet.ga", function (feed) {
      var tgBlog = feed;
      getBlogger("http://doctorbatmanwho.blog.tumblenet.ga", function (feed) {
        var dbwBlog = feed;
        var test = Object.assign(tbBlog,tgBlog,dbwBlog);
        console.log(test);
      });
    });
  });
}

module.exports = getBlogs;
