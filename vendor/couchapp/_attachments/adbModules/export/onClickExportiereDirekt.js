'use strict'

var filtereFuerExport = require('./filtereFuerExport')

module.exports = function (event) {
  event.preventDefault ? event.preventDefault() : event.returnValue = false
  filtereFuerExport('direkt')
}
