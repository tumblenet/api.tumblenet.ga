function Wayback(retriever,getRetriever) {
  this.retrieve = retriever;
  this.getRetrieve = getRetriever;
  this.pageList = [];
  this.pageID = 0;
  this.savePageUrl = "http://web.archive.org/save/";
}

Wayback.prototype = {
}

function normaliseUrl(url) {
  if (!url.startsWith("http://") & !url.startsWith("https://")) {
    return "http://" + url;
  }
  return url;
}

Wayback.prototype.savePageList = function (sites,callback) {
  sites.forEach(site => {
    if (!site.startsWith("http://") & !site.startsWith("https://")) {
      site = "http://" + site;
    }
    this.retrieve(site + "/sitemap.xml",xml => {
      if (!xml || !xml.urlset || !xml.urlset.url) {
        return;
      }

      var sitemap = xml.urlset.url;

      //console.log(sitemap);
      sitemap.forEach(page => {
        var pageUrl = page.loc[0];
        //console.log(pageUrl);
        this.pageList.push(pageUrl);
      });

      if (site == normaliseUrl(sites[sites.length-1])) {
        callback();
      }
    });
  });
}

Wayback.prototype.archive = function () {
  var page = this.pageList[this.pageID];
  console.log("Archiving " + page + " to " + this.savePageUrl + "...");
  this.getRetrieve(this.savePageUrl + page, function (response, url) {
    if (true) {
      console.log("Archived " + page + ": " + url);
    }
  });
  this.pageID++;
  this.pageID %= this.pageList.length;
}

module.exports = Wayback;
