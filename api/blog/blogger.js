const getJSON = require('./get-json.js');

function getBloggerJson(url) {
  var feedUrl = url + "/feeds/posts/default?alt=json";

  getJSON(feedUrl, function (json) {
    var feed = {
      categories = [],
      tags = [],
      posts = [];
    }

    json.feed.category.forEach(function (catObj) {
      console.log(catObj);
    });

    //console.log(json);
  });
}

module.exports = getBloggerJson;
