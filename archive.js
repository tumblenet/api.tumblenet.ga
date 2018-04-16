const retrievers = require('./retrievers');
const Wayback = require('./archive/wayback.js');

var testWayback = new Wayback(retrievers.xml,retrievers.get);
var sitesToArchive = [
  "tumblecraft.tumblenet.ga",
  "archive.tumblenet.ga",//
  "blog.tumblenet.ga",
  "css.tumblenet.ga",//
  "doctorbatmanwho.blog.tumblenet.ga",//
  "doctorbatmanwho.downloads.tumblenet.ga",
  "doctorbatmanwho.github.tumblenet.ga",
  "downloads.tumblenet.ga",
  "github.tumblenet.ga",//
  "go.tumblenet.ga",
  "help.tumblenet.ga",
  "live.tumblenet.ga",
  "old.tumblegamer.blog.tumblenet.ga",
  "outro.tumblenet.ga",
  "resources.tumblenet.ga",
  "search.tumblenet.ga",
  "status.tumblenet.ga",
  "tumblegamer.blog.tumblenet.ga",//
  "tumblegamer.downloads.tumblenet.ga",
  "tumblegamer.github.tumblenet.ga",
  "en.tumblenet.shoutwiki.com",
  //"wiki.tumblenet.ga",
  "www.tumblenet.ga",//
]

function archive() {
  testWayback.savePageList(sitesToArchive,function () {
    testWayback.archive();
  });
}

module.exports = archive;
