const setupServer = require('webserver');
require('./log.js');

const autoUpdate = require('./autoUpdate.js');
const app = require('./app.js');


var server = setupServer(app);

autoUpdate.start(process.env.INTERVAL||1000);

const tumblenetdiscord = require('tumblenet-discord-node');
