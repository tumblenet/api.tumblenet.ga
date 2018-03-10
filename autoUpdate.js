const updateTumblenet = require('./api/blog/updateTumblenet.js');

var updateloop = [];

function start(i) {
  var interval = i || 10;
  updateloop.forEach(function (action) {
    setInterval(action, interval);
  });
};

updateloop.push(updateTumblenet);

exports.start = start
