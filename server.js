'use strict';


const http    = require('http');
const lodash  = require('lodash');
const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const app     = express();



module.exports = function (config, next) {

  config = lodash.defaults(config || {}, {
    port: 3000,
    key: '6d85a905'
  });

  const stmt = 'CREATE TABLE IF NOT EXISTS ' +
               'server(name TEXT PRIMAY KEY, ip TEXT, meta TEXT)';
  const db   = new sqlite3.Database('./' + config.key + '.sqlite');

  db.run(stmt, function (err) {

    if (err) { return next(err); }

    config.db = db;
    require('./lib/middlewares')(app, config);
    require('./lib/controllers')(app, config);

    http
      .createServer(app)
      .listen(config.port);

    var master = {
      clear: function clear(next) {
        const stmt = 'DELETE FROM server';
        db.run(stmt, next);
      }
    };

    next(null, master);
  });
};
