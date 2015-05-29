// wenn .linkZuArtGleicherGruppe geklickt wird

'use strict'

var $ = require('jquery')

module.exports = function (event) {
  var id = $(this).attr('artid')

  event.preventDefault ? event.preventDefault() : event.returnValue = false

  $('.suchen').val('')
  $('#tree' + window.adb.gruppe)
    .jstree('clear_search')
    .jstree('deselect_all')
    .jstree('close_all', -1)
    .jstree('select_node', '#' + id)
}
