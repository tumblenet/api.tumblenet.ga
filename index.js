require('./log.js');

const autoUpdate = require('./autoUpdate.js');
const app = require('./app.js');
const setupServer = require('./server.js');

var server = setupServer(app);



autoUpdate.start(process.env.INTERVAL||1000);
