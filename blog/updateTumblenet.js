const Github = require('github-api');
const path = require('path');
const getBlog = require('./blog.js');

var lastBlog = {};

var github = new Github({
  token: process.env.OAUTH_TOKEN || require('./config/githubOauth.js').token,
  auth: "oauth"
});


var repo = github.getRepo("tumblenet", "beta.tumblenet.cu.cc");

var options = {
  author: {name: 'TumbleNet API', email: 'api@tumblenet.ga'},
  committer: {name: 'TumbleNet Admin', email: 'admin@tumblenet.ga'},
  encode: true // Whether to base64 encode the file. (default: true)
}

function UpdateBlog(cb) {
  var callback = cb || function (err) {
    console.log(err);
  }
  getBlog(function (blog) {
    if (JSON.stringify(lastBlog) == JSON.stringify(blog)) {
      callback({ message: "http://tumblenet.ga/blog is already up to date"})
    } else {
      lastBlog = blog;
      repo.writeFile('master', '_data/blog.json', JSON.stringify(blog), 'Update Blog feed', options,
      function(err) {
        callback(err || { message: "http://tumblenet.ga/blog was updated"});
      });
    }
  });
}

module.exports = UpdateBlog;
