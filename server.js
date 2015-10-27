'use strict';


const http    = require('http');
const lodash  = require('lodash');
const express = require('express');
const app     = express();


module.exports = function (config) {

  config = lodash.defaults(config || {}, {
    port: 3000,
    key: '6d85a905',
    dbPath: './servers.sqlite'
  });

  require('./lib/middlewares')(app, config);
  require('./lib/controllers')(app, config);

  http
    .createServer(app)
    .listen(config.port);
};

if (require.main === module) {
  module.exports();
}
