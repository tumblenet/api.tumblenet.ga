const Git = require("nodegit");
const path = require('path');
const getBlog = require('./blog.js');
const promisify = require("promisify-node");
const fse = promisify(require("fs-extra"));


fse.ensureDir = promisify(fse.ensureDir);

var info = {
  owner: "tumblenet",
  repo: "beta.tumblenet.cu.cc",
  file: "blog.json", //filename
  dirName: "_data",
  repoPath: "tmp" //dirname
}

var repo;
var index;
var oid;

getBlog(function (blog) {
  Git.Clone("https://github.com/" + info.owner + "/" + info.repo, info.repoPath)
  .then(function(repository) {
    // Work with the repository object here.
    repo = repository;
    return fse.ensureDir(path.join(repo.workdir(), info.dirName));
  }).then(function(){
    return fse.writeFile(path.join(repo.workdir(), info.dirName), blog);
  }).then(function () {
    return fse.writeFile(
      path.join(repo.workdir(), info.dirName, info.path),
      JSON.stringify(blog)
    );
  }).then(function() {
  return repo.refreshIndex();
  })
  .then(function(indexResult) {
  index = indexResult;
  })
  .then(function() {
    // this file is in the root of the directory and doesn't need a full path
    return index.addByPath(info.path);
  })
  .then(function() {
    // this file is in a subdirectory and can use a relative path
    return index.addByPath(path.posix.join(info.dirName, info.path));
  })
  .then(function() {
    // this will write both files to the index
    return index.write();
  })
  .then(function() {
    return index.writeTree();
  })
  .then(function(oidResult) {
    oid = oidResult;
    return Git.Reference.nameToId(repo, "HEAD");
  })
  .then(function(head) {
    return repo.getCommit(head);
  })
  .then(function(parent) {
    var author = Git.Signature.create("TumbleNet API",
      "admin@tumblenet.ga", 123456789, 60);
    var committer = Git.Signature.create("TumbleNet-Admin",
      "TumbleNet-Admin@github.com", 987654321, 90);

    return repo.createCommit("HEAD", author, committer, "message", oid, [parent]);
  })
  .done(function(commitId) {
    console.log("New Commit: ", commitId);
  });

});
