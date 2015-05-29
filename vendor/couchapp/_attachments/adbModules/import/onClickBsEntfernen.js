'use strict'

var entferneBeziehungssammlung = require('./entferneBeziehungssammlung')

module.exports = function (event) {
  event.preventDefault ? event.preventDefault() : event.returnValue = false
  entferneBeziehungssammlung()
}
