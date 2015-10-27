'use strict';

var app    = require('../index');
var should = require('should');

describe('servers', function () {

  var Server = app.Server;
  var Client = app.Client;

  Server({port: 4444, key: 'testing'});


  it('should have an empty response', function (done) {
    Client({port: 4444, key: 'testing', mode: 'get'}, function (servers) {
      servers.should.be.an.Array();
      servers.should.be.empty();
      done();
    });
  });


});