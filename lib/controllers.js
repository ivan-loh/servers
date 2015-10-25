'use strict';


var sqlite3 = require('sqlite3').verbose();

module.exports = function (app, config, next) {

  const stmt = 'CREATE TABLE IF NOT EXISTS ' +
               'server(name TEXT PRIMAY KEY, ip TEXT, meta TEXT)';
  const db   = new sqlite3.Database(config.dbPath);
        db.run(stmt, next);


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

    const body = req.body;
    const name = body.name;
    const ip   = req.ip;
    const meta = body.meta || '';


    const stmt     = 'INSERT OR REPLACE INTO server VALUES(?, ?, ?)';
    const prepared = db.prepare(stmt);
          prepared.run(name, ip, meta);


    res.jsonp('ok');
  });


};
