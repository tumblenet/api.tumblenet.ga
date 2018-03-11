function Wayback(retriever,getRetriever) {
  this.savePageUrl = "http://web.archive.org/save/"
  this.retrieve = retriever;
  this.getRetrieve = getRetriever;
  this.pageList = [];
}

Wayback.prototype.savePageList = function (sites,callback) {
  sites.forEach(site => {
    if (!site.startsWith("http://") & !site.startsWith("https://")) {
      site = "http://" + site;
    }
    this.retrieve(site + "/sitemap.xml",function (xml) {
      if (!xml || !xml.urlset || !xml.urlset.url) {
        return;
      }

      var sitemap = xml.urlset.url;

      //console.log(sitemap);
      sitemap.forEach(page => {
        var pageUrl = page.loc[0];
        console.log(pageUrl);
        this.pageList.push(pageUrl);

      });
    });
  });
}


module.exports = Wayback;
