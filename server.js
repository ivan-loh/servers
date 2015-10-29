'use strict';


var http    = require('http');
var lodash  = require('lodash');
var sqlite3 = require('sqlite3').verbose();
var express = require('express');
var app     = express();



module.exports = function (config, next) {

  config = lodash.defaults(config || {}, {
    port: 3000,
    key: '6d85a905'
  });

  var stmt = 'CREATE TABLE IF NOT EXISTS ' +
             'server(name TEXT PRIMARY KEY, ip TEXT, meta TEXT)';
  var db   = new sqlite3.Database('./' + config.key + '.sqlite');

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
        var stmt = 'DELETE FROM server';
        db.run(stmt, next);
      }
    };

    next(null, master);
  });
};
