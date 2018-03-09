const Github = require('github-api');
const path = require('path');

var github = new Github({
  token: require('./config/oauth.js').token || process.env.OAUTH_TOKEN,
  auth: "oauth"
});


var repo = github.getRepo("tumblenet", "beta.tumblenet.cu.cc");

var options = {
  author: {name: 'TumbleNet API', email: 'admin@tumblenet.ga'},
  committer: {name: 'TumbleNet Admin', email: 'admin@tumblenet.ga'},
  encode: true // Whether to base64 encode the file. (default: true)
}
repo.writeFile('master', '_data/blog.ga', '[]', 'Update Blog feed', options,
function(err) {

});
