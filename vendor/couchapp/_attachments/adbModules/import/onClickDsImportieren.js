'use strict'

var importiereDatensammlung = require('./importiereDatensammlung')

module.exports = function (event) {
  event.preventDefault ? event.preventDefault() : event.returnValue = false
  importiereDatensammlung()
}
