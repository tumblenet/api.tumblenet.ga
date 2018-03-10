function Wix(retriever) {
  this.retrieve = retriever;
}

Wix.prototype.getJson = function(url, callback) {
  var feedUrl = url + "/feed.xml";

  this.retrieve(feedUrl, function (xml) {
    //get the blog feed out of the xml
    var blog = xml.rss.channel[0].item;

    //feed template
    var feed = {
      categories:[],
      tags: [],
      posts: []
    }

    //go through each post
    blog.forEach(function (postObj) {
      var post = {
        title: postObj.title[0],
        author: postObj["dc:creator"][0],
        category: [],
        tags: [],
        date: new Date(postObj.pubDate[0]),
        excerpt: postObj.description[0],
        url: postObj.link[0],
        content: postObj["content:encoded"][0]
      }

      //add the post to the list of posts
      feed.posts.push(post);
    });

    //console.log(feed);

    callback(feed)
  });
}

module.exports = Wix;
