const Github = require('github-api');
const path = require('path');
const getBlog = require('./blog.js');

var github = new Github({
  token: process.env.OAUTH_TOKEN || require('./config/oauth.js').token
  auth: "oauth"
});


var repo = github.getRepo("tumblenet", "beta.tumblenet.cu.cc");

var options = {
  author: {name: 'TumbleNet API', email: 'admin@tumblenet.ga'},
  committer: {name: 'TumbleNet Admin', email: 'admin@tumblenet.ga'},
  encode: true // Whether to base64 encode the file. (default: true)
}

function UpdateBlog(callback) {
  getBlog(function (blog) {
    repo.writeFile('master', '_data/blog.js', JSON.stringify(blog), 'Update Blog feed', options,
    function(err) {
      callback(err);
    });
  });
}

module.exports = UpdateBlog;
