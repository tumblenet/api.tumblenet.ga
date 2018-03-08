const getJSON = require('./get-json.js');

function getBloggerJson(url) {
  var feedUrl = url + "/feeds/posts/default?alt=json";

  getJSON(feedUrl, function (feed) {
    console.log(feed);
  });
}

module.exports = getBloggerJson;
