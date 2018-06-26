const autoUpdate = require('./autoUpdate.js');
autoUpdate.start(process.env.INTERVAL||1000);

const tumblenetdiscord = require('tumblenet-discord-node');
