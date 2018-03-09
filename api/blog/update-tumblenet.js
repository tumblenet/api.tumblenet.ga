
const getBlog = require('./blog.js');

var info = {
  owner: "tumblenet",
  repo: "beta.tumblenet.cu.cc",
  path: "_data/blog.json"
}
getBlog(function (blog) {
})
