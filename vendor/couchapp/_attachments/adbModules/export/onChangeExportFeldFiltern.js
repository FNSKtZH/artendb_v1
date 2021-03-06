// wenn exportFeldFiltern geändert wird
// kontrollieren, ob mehr als eine Beziehungssammlung Filter enthält.
// Wenn ja: reklamieren und rückgängig machen

'use strict'

var $ = require('jquery'),
  _ = require('underscore'),
  exportZuruecksetzen = require('./exportZuruecksetzen')

module.exports = function () {
  var that = this,
    $that = $(this),
    bezDsFiltered = []

  // die Checkboxen sollen drei Werte annehmen können:
  if (that.type === 'checkbox') {
    if (that.readOnly) {
      // so ist es zu Beginn
      // dann soll er auf chedked wechseln
      that.readOnly = that.indeterminate = false
      $that.prop('checked', true)
    } else if (!$that.prop('checked')) {
      that.readOnly = that.indeterminate = false
      $that.prop('checked', false)
    } else {
      $that.prop('checked', false)
      that.indeterminate = that.readOnly = true
    }
  }

  $('#exportObjekteWaehlenDsCollapse')
    .find('.exportFeldFiltern')
    .each(function () {
      if ((this.value || this.value === 0) && $(this).attr('dstyp') === 'Beziehung') {
        bezDsFiltered.push($(this).attr('eigenschaft'))
      }
    })
  // eindeutige Liste der dsTypen erstellen
  bezDsFiltered = _.union(bezDsFiltered)
  if (bezDsFiltered && bezDsFiltered.length > 1) {
    $('#meldungZuvieleBs').modal()
    $(that).val('')
  } else {
    exportZuruecksetzen(that)
  }
}
