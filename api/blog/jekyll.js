const getJSON = require('./get-json.js');

function getBloggerJson(url) {
  var feedUrl = url + "/feed/";

  getJSON(feedUrl, function (json) {
  });

  getJSON(feedUrl + "categories.json", function (json) {
  });
}

module.exports = getBloggerJson;
