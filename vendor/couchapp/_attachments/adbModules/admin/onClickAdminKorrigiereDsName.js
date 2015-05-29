'use strict'

var $ = require('jquery'),
  nenneDsUm = require('./nenneDsUm')

module.exports = function (event) {
  // dieser Event wurde bei jedem Laden der Seite ausgelöst!
  if ($('#adminExportierenCollapse').is(':visible')) {
    nenneDsUm()
  } else {
    event.preventDefault ? event.preventDefault() : event.returnValue = false
  }
}
