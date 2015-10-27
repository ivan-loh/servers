'use strict';


const lodash  = require('lodash');
const request = require('request');


module.exports = function (config) {

  config = lodash.defaults(config || {}, {
    port: 3000,
     key: '6d85a905',
    host: 'http://localhost',
    name: 'devServer'
  });

  const setURL = config.host + ':' + config.port + '/server/update';
  const getURL = config.host + ':' + config.port + '/list';
  const auth   = {'bearer': config.key};

  function set(next) {
    const param = {
      'url': setURL,
      'form': {'name': config.name},
      'auth': auth
    };

    request.post(param, function (err, response, body) {
      return next(err, body);
    });
  }

  function get(next) {
    const param = {'url': getURL, 'auth': auth};
    request.get(param, function (err, response, body) {
      return next(err, JSON.parse(body));
    });
  }

  return {set: set, get: get};
};

if (require.main === module) {
  module.exports();
}
