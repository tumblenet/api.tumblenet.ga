const updateTumblenet = require('./blog/updateTumblenet.js');
const archiveTumblenet = require('./archive.js');

var updateloop = [];

function start(timeBetween) {
  var interval = updateloop.length * (timeBetween || 10);
  console.log({timeBetween: timeBetween, interval: interval});

  var i = 0;

  updateloop.forEach(function (action) {
    setTimeout(() => {
      setInterval(action, interval);
    }, i*(timeBetween || 10));
    i++;
  });
};

updateloop.push(updateTumblenet);
updateloop.push(archiveTumblenet)

exports.start = start
