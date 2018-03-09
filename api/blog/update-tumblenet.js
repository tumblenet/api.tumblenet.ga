const octokit = require('@octokit/rest')();
const getBlog = require('./blog.js');

var result = octokit.repos.updateFile({
  owner: "tumblenet",
  repo: "beta.tumblenet.cu.cc",
  path: "_data/blog.json",
  message,
  content: getBlog(),
  sha,
  branch: master,
  committer: "TumbleNet API",
  author
});
console.log(result);
