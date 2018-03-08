const getJSON = require('./get-json.js');

function getBloggerJson(url) {
  var feedUrl = url + "/feeds/posts/default?alt=json";

  getJSON(feedUrl, function (json) {
    var blog = json.feed;

    var feed = {
      categories:[],
      tags: [],
      posts: []
    }

    //Sort Categories
    blog.category.forEach(function (categoryObj) {
      feed.categories.push(categoryObj.term);
    });

    //posts
    blog.entry.forEach(function (postObj) {
      var post = {
        title: postObj.title.$t,
        content: "",
        author: "",
        category: "",
        date: "",
        url: "",
      }
    })

    console.log(feed);
  });
}

module.exports = getBloggerJson;
