/**
 * Hier werden zentral alle Konfigurationsparameter gesammelt
 */

'use strict'

var config,
  couchPassfile = require('../../../../couchpass.json')

config = {}
config.dev = true  // für lokale Entwicklung: true. Für Produktion: false
config.couch = {}
config.couch.dbUrl = '127.0.0.1:5984'
config.couch.dbName = 'evab'
config.couch.userName = couchPassfile.user
config.couch.passWord = couchPassfile.pass

module.exports = config
