const getXML = require('./getXml.js');

function getWixJson(url, callback) {
  //get the url of the blog
  //var url = "http://tumble1999.wixsite.com/tumblegamer";

  //add the path to the xml file on the end
  var feedUrl = url + "/feed.xml";

  getXML(feedUrl, function (xml) {
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

module.exports = getWixJson;
