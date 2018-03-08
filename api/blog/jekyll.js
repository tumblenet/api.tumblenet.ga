const getJSON = require('./get-json.js');

function getJekyllJson(url) {
  var feedUrl = url + "/feed/";

  var feed = {
    categories:[],
    tags: [],
    posts: []
  }


  //categories
  getJSON(feedUrl + "categories.json", function (json) {
    var categories = Object.keys(json);
    feed.categories = categories;
  });

  //tags
  getJSON(feedUrl + "tags.json", function (json) {
  });

  //posts
  getJSON(feedUrl + "posts.json", function (json) {
  });

  console.log(feed);
}

module.exports = getBloggerJson;
