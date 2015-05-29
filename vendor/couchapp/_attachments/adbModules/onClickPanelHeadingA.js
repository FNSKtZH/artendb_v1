// verhindern, dass bootstrap ganz nach oben scrollt

'use strict'

module.exports = function (event) {
  event.preventDefault ? event.preventDefault() : event.returnValue = false
}
