'use strict'

var entferneDatensammlung = require('./entferneDatensammlung')

module.exports = function (event) {
  event.preventDefault ? event.preventDefault() : event.returnValue = false
  entferneDatensammlung()
}
