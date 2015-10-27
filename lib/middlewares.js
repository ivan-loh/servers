'use strict';

var morgan         = require('morgan');
var passport       = require('passport');
var bodyParser     = require('body-parser');
var BearerStrategy = require('passport-http-bearer').Strategy;

module.exports = function (app, config) {

  var key = config.key;

  passport.use(new BearerStrategy(
    function (token, done) {
      done(null, token === key, {scope: 'all'});
    }
  ));

  app.disable('x-powered-by');
  app.disable('etag');
  app.set('trust proxy', 'loopback');

  //IP Logging
  //app.use(function (req, res, next) {
  //  console.log('ipAddr', req.ip, req.ips);
  //  next();
  //});

  app.use(morgan('combined'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(passport.initialize());
  app.use(passport.authenticate('bearer', {session: false}));

};
