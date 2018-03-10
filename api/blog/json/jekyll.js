const getJSON = require('./getJson.js');

function getJekyllJson(url, callback) {
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
            author: postObj.author,
            category: postObj.categories,
            tags: postObj.tags,
            date: new Date(postObj.date),
            url: url + postObj.id,
            content: postObj.content
          }

          feed.posts.push(post);
        })

        //console.log(feed);
        callback(feed);
      });
    });
  });
}

module.exports = getJekyllJson;
