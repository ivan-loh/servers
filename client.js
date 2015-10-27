'use strict';


const lodash  = require('lodash');
const request = require('request');


module.exports = function (config, next) {

  config = lodash.defaults(config || {}, {
    port: 3000,
    key: '6d85a905',
    host: 'http://localhost',
    name: 'devServer',
    mode: 'get'
  });


  function set() {
    const param = {
      'url': config.host + ':' + config.port + '/server/update',
      'form': {'name': config.name},
      'auth': {'bearer': config.key}
    };

    request.post(param, function (err, response, body) {
      return next(body);
    });
  }

  function get() {
    const param = {
      'url': config.host + ':' + config.port + '/list',
      'auth': {'bearer': config.key}
    };

    request.get(param, function (err, response, body){
      return next(JSON.parse(body));
    });
  }

  (config.mode === 'get' ? get : set)();

};

if (require.main === module) {
  module.exports();
}
