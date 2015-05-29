'use strict'

var importiereBeziehungssammlung = require('./importiereBeziehungssammlung')

module.exports = function (event) {
  event.preventDefault ? event.preventDefault() : event.returnValue = false
  importiereBeziehungssammlung()
}
