'use strict';


const lodash  = require('lodash');
const request = require('request');


module.exports = function (config) {

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
      console.log(body);
    });
  }

  function get() {
    const param = {
      'url': config.host + ':' + config.port + '/list',
      'auth': {'bearer': config.key}
    };

    request.get(param, function (err, response, body){
      console.log(body);
    });
  }

  (config.mode === 'get' ? get : set)();

};

if (require.main === module) {
  module.exports();
}
