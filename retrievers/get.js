const request = require('request');

function getGet(url, callback) {
  //var url = "https://www.tumblenet.ga/feed/categories.json";

  request({
    url: url,
    followAllRedirects: true
  }, function (error, response, body) {

    if (!error && response.statusCode === 200) {
      //console.log(body) // Print the json response
      var requestPath = response.request.uri.path;
      var root = response.request.uri.href.replace(requestPath,"");
      var responseUrl = root + response.headers["content-location"];
      callback(body, responseUrl);
    }
  });
}

module.exports = getGet;
