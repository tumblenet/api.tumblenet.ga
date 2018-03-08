const absorb = require('absorb');

const getBlogger = require('./json/blogger.js');
const getJekyll = require('./json/jekyll.js');

function getBlogs() {

  getJekyll("http://www.tumblenet.ga", function (feed) {
    var tnBlog = feed;
    getBlogger("http://tumblegamer.blog.tumblenet.ga", function (feed) {
      var tgBlog = feed;
      getBlogger("http://doctorbatmanwho.blog.tumblenet.ga", function (feed) {
        var dbwBlog = feed;

        var test = absorb(tnBlog, absorb(tgBlog,dbwBlog,true),true);

        console.log(test);
      });
    });
  });
}

module.exports = getBlogs;
