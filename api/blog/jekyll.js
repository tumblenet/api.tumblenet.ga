const getJSON = require('./get-json.js');

function getJekyllJson(url) {
  var feedUrl = url + "/feed/";


  var feed = {
    categories:[],
    tags: [],
    posts: []
  };


  //categories
  getJSON(feedUrl + "categories.json", function (json) {
    //console.log(json);
    var categories = Object.keys(json);
    feed.categories = categories;

    //tags
    getJSON(feedUrl + "tags.json", function (json) {
      var tags = Object.keys(json);
      feed.tags = tags;
      //posts
      getJSON(feedUrl + "posts.json", function (json) {
        var posts = json;

        posts.forEach(function (postObj) {
          var post = {
            title: postObj.title,
            content: postObj.content,
            author: postObj.author,
            category: postObj.categories,
            date: postObj.date,
            url: url + postObj.id,
          }
        })

        console.log(feed);
      });
    });
  });
}

module.exports = getJekyllJson;
