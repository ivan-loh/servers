'use strict';


var sqlite3 = require('sqlite3').verbose();

module.exports = function (app, config) {

  var db = config.db;

  app.all('/ping', function (req, res) {
    res.jsonp('pong');
  });

  app.all('/list', function (req, res, next) {
    db.all('SELECT * FROM server', function (err, rows) {
      if (err) { return next(err); }
      res.jsonp(rows);
    });
  });

  app.post('/server/update', function (req, res) {

    var body = req.body;
    var name = body.name;
    var ip   = req.ip;
    var meta = body.meta || '';


    var stmt     = 'INSERT OR REPLACE INTO server VALUES(?, ?, ?)';
    var prepared = db.prepare(stmt);
        prepared.run(name, ip, meta);


    res.jsonp('ok');
  });


};
