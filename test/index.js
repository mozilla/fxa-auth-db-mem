var api = require('fxa-auth-db-server')
var config = require('../config')
var error = api.error
var log = api.log(config.logLevel, 'db-api')
var DB = require('../db')(log, error)

var tests = require('fxa-auth-db-server/test/')

tests.forEach(function(test) {
  test(config, DB)
})
