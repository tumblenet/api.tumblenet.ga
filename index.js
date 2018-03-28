require('./log.js');

const autoUpdate = require('./autoUpdate.js');



autoUpdate.start(process.env.INTERVAL||1000);
