'use strict';


var lodash  = require('lodash');
var request = require('request');


module.exports = function (config) {

  config = lodash.defaults(config || {}, {
    port: 3000,
     key: '6d85a905',
    host: 'http://localhost',
    name: 'devServer'
  });

  var setURL = config.host + ':' + config.port + '/server/update';
  var getURL = config.host + ':' + config.port + '/list';
  var auth   = {'bearer': config.key};

  function set(next) {
    var param = {
      'url': setURL,
      'form': {'name': config.name},
      'auth': auth
    };

    request.post(param, function (err, response, body) {
      return next(err, body);
    });
  }

  function get(next) {
    var param = {'url': getURL, 'auth': auth};
    request.get(param, function (err, response, body) {
      return next(err, JSON.parse(body));
    });
  }

  return {set: set, get: get};
};