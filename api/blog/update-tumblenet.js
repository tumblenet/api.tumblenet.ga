const rimraf = require('rimraf');
const Git = require("nodegit");
const path = require("path");
const promisify = require("promisify-node");
const fse = promisify(require("fs-extra"));

var fileName = "newfile.txt";
var fileContent = "hello world";
var directoryName = "salad/toast/strangerinastrangeland/theresnowaythisexists";
// ensureDir is an alias to mkdirp, which has the callback with a weird name
// and in the 3rd position of 4 (the 4th being used for recursion). We have to
// force promisify it, because promisify-node won't detect it on its
// own and assumes sync
fse.ensureDir = promisify(fse.ensureDir);

/**
 * This example creates a certain file `newfile.txt`, adds it to the git
 * index and commits it to head. Similar to a `git add newfile.txt`
 * followed by a `git commit`
**/

var repo;
var index;
var oid;
Git.Clone("https://github.com/tumblenet/beta.tumblenet.cu.cc", path.resolve(__dirname, "tmp"))
.then(function () {
  Git.Repository.open(path.resolve(__dirname, "tmp/.git"))
  .then(function(repoResult) {
    repo = repoResult;
    return fse.ensureDir(path.join(repo.workdir(), directoryName));
  }).then(function(){
    return fse.writeFile(path.join(repo.workdir(), fileName), fileContent);
  })
  .then(function() {
    return fse.writeFile(
      path.join(repo.workdir(), directoryName, fileName),
      fileContent
    );
  })
  .then(function() {
    return repo.refreshIndex();
  })
  .then(function(indexResult) {
    index = indexResult;
  })
  .then(function() {
    // this file is in the root of the directory and doesn't need a full path
    return index.addByPath(fileName);
  })
  .then(function() {
    // this file is in a subdirectory and can use a relative path
    return index.addByPath(path.posix.join(directoryName, fileName));
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
    var author = Git.Signature.create("Scott Chacon",
    "schacon@gmail.com", 123456789, 60);
    var committer = Git.Signature.create("Scott A Chacon",
    "scott@github.com", 987654321, 90);

    return repo.createCommit("HEAD", author, committer, "message", oid, [parent]);
  })
  .done(function(commitId) {
    console.log("New Commit: ", commitId);
    rimraf(path.resolve(__dirname, "tmp"), function () { 
      console.log('done');
    });

  });

});
