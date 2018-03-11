function Jekyll(retriever) {
  this.retrieve = retriever;
}

Jekyll.prototype.getJson = function(url, callback) {
  var feedUrl = url + "/feed/";

  var feed = {
    categories:[],
    tags: [],
    posts: []
  };
  var _this = this;

  //categories
  this.retrieve(feedUrl + "categories.json", function (json) {
    //console.log(json);
    var categories = Object.keys(json);
    feed.categories = categories;

    //tags
    _this.retrieve(feedUrl + "tags.json", function (json) {
      var tags = Object.keys(json);
      feed.tags = tags;
      //posts
      _this.retrieve(feedUrl + "posts.json", function (json) {
        var posts = json;

        posts.forEach(function (postObj) {
          var post = {
            title: postObj.title,
            author: postObj.author,
            category: postObj.categories,
            tags: postObj.tags,
            date: new Date(postObj.date),
            excerpt: postObj.excerpt,
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

module.exports = Jekyll;
