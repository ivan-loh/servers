'use strict';

const app    = require('../index');
const should = require('should');
const async  = require('async');

describe('servers', function () {

  const config = {port: 4444, key: 'testing'};
  const client = app.client(config);


  /**
   * Create a server
   */
  let server;
  before(function (done) {
    async.series([
      function (next) {
        app.server(config, function (err, _server) {
          server = _server;
          next();
        });
      },

      function (next) {
        server.clear(next)
      }
    ], done);
  });



  it('should have a response', function (done) {

    async.series([
      function (next) {
        client.get(function (err, results) {
          if (err) { return next(err); }
          results.should.be.an.Array();
          results.should.be.empty();
          next();
        })
      },

      function (next) {
        client.set(next);
      },

      function (next) {
        client.get(function (err, results){
          if (err) { return next(err); }
          results.should.not.be.empty();
          next();
        });
      }
    ], function (err) {
      should.not.exist(err);
      done();
    });
  });



  /**
   * Remove the testing files
   */
  after(function (done){
    var fs = require('fs');
    fs.unlink('./testing.sqlite', done);
  })

});