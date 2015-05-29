'use strict'

var _ = require('underscore'),
  $ = require('jquery')

module.exports = function (suchObjekte) {
  suchObjekte = _.map(suchObjekte.rows, function (objekt) {
    return objekt.value
  })

  $('#suchfeld' + window.adb.gruppe).typeahead({
    name: window.adb.gruppe,
    valueKey: 'Name',
    local: suchObjekte,
    limit: 20
  }).on('typeahead:selected', function (e, datum) {
    var oeffneBaumZuId = require('./jstree/oeffneBaumZuId')
    oeffneBaumZuId(datum.id)
  })
  $('#suchfeld' + window.adb.gruppe).focus()
}
