/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

module.exports = function (fs, path, url, convict) {

  var conf = convict({
    env: {
      doc: 'The current node.js environment',
      default: 'prod',
      format: [ 'dev', 'test', 'stage', 'prod' ],
      env: 'NODE_ENV',
    },
    logLevel: {
      default: 'trace',
      env: 'LOG_LEVEL',
    },
    host: {
      doc: 'The IP address the server should bind to',
      default: '127.0.0.1',
      env: 'HOST',
    },
    port: {
      doc: 'The port the server should bind to',
      default: 8000,
      format: 'nat',
      env: 'PORT',
    },
  })

  // handle configuration files. you can specify a CSV list of configuration
  // files to process, which will be overlayed in order, in the CONFIG_FILES
  // environment variable. By default, the ./config/<env>.json file is loaded.

  var envConfig = path.join(__dirname, conf.get('env') + '.json')
  envConfig = envConfig + ',' + process.env.CONFIG_FILES

  var files = envConfig.split(',').filter(fs.existsSync)
  conf.loadFile(files)
  conf.validate()

  return conf.root()
}
