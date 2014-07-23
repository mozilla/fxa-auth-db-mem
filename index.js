/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

var api = require('fxa-auth-db-server')
var DB = require('./db')(api.errors)

if (require.main === module) {
  var port = +(process.env['HTTPDB_PORT']) || 8000
  var host = process.env['HTTPDB_HOST'] || '127.0.0.1'

  DB.connect().done(
   function (db) {
     var server = api.createServer(db)
     server.listen(port, host)
     server.on('failure', function (d) { console.error(d.err.code, d.url)})
     server.on('success', function (d) { console.log(d.method, d.url)})
   }
  )
}
else {
  module.exports = function () {
    return DB.connect()
      .then(
        function (db) {
          return api.createServer(db)
        }
      )
  }
}
