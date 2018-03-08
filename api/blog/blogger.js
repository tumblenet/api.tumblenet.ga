const getJSON = require('./get-json.js');

function getBloggerJson(url) {
  var feedUrl = url + "/feeds/posts/default?alt=json";

  getJSON(feedUrl, function (json) {
    var feed = {
      categories:[],
      tags: [],
      posts: []
    }

    json.feed.category.forEach(function (catObj) {
      feed.categories.push(catObj.term);
    });

    console.log(feed);
  });
}

module.exports = getBloggerJson;
