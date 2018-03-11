const request = require('request');
const xml2js = require('xml2js');

function getXML(url, callback) {
  request({
    url: url,
    headers: {'Content-Type': 'text/xml'},
    followAllRedirects: true
  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      xml2js.parseString(body,(err, result) => { // covert the xml to js
        //console.log(result); //print out the js var
        callback(result, response.location);
      });
    }
  });
}

module.exports = getXML;
