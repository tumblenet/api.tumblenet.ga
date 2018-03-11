const request = require('request');
const xml2js = require('xml2js');

function getXML(url, callback) {
  //var url = "http://tumble1999.wixsite.com/tumblegamer/feed.xml";

  request({
    url: url,
    headers: {'Content-Type': 'text/xml'}
  }, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      xml2js.parseString(body,function (err, result) { // covert the xml to js
        //console.log(result); //print out the js var
        callback(result);
      });;
    }
  });
}

module.exports = getXML;
