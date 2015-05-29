// wenn .anmeldenBtn geklickt wird

'use strict'

var meldeUserAn = require('./meldeUserAn')

module.exports = function (event) {
  event.preventDefault ? event.preventDefault() : event.returnValue = false

  // es muss mitgegeben werden, woher die Anmeldung kam, damit die email aus dem richtigen Feld geholt werden kann
  var bsDs = this.id.substring(this.id.length - 2)
  if (bsDs === 'rt') {
    bsDs = 'art'
  }
  meldeUserAn(bsDs)
}
