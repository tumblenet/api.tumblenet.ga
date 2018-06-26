const setupServer = require('webserver');
require('./log.js');

const app = require('./app.js');


var server = setupServer(app);

