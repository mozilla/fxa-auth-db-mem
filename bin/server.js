
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

var api = require('fxa-auth-db-server')
var config = require('../config')
var error = api.error
var log = api.log(config.logLevel, 'db-api')
var DB = require('../db')(log, error)
var pkg = require('../package.json')

function shutdown() {
  process.nextTick(process.exit)
}

if (require.main === module) {
  // defer to allow ass code coverage results to complete processing
  if (process.env.ASS_CODE_COVERAGE) {
    process.on('SIGINT', shutdown)
  }

  DB.connect(config).done(
   function (db) {
     var server = api.createServer(pkg.version, db, log, config.port, config.host)
     server.listen(config.port, config.host)
     server.on('failure', function (d) { console.error(d.err.code, d.url)})
     server.on('success', function (d) { console.log(d.method, d.url)})
   }
  )
}
else {
  module.exports = function () {
    return DB.connect(config)
      .then(
        function (db) {
          return api.createServer(pkg.version, db, log, config.port, config.host)
        }
      )
  }
}
