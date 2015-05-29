'use strict'

var $ = require('jquery'),
  Uri = require('Uri'),
  baueTabelleFuerExportAuf = require('./baueTabelleFuerExportAuf')

module.exports = function (gewaehlteFelderObjekt) {
  // Alle Felder abfragen
  var queryParam,
    url,
    list,
    view,
    $exportAltExportUrl = $('#exportAltExportUrl'),
    $db = $.couch.db('artendb'),
    uri = new Uri($(window.location).attr('href'))

  if ($('#exportAltSynonymInfos').prop('checked')) {
    // list
    queryParam = 'export_alt_mit_synonymen'
    list = 'artendb/export_alt_mit_synonymen'
    // view
    queryParam += '/alt_arten_mit_synonymen'
    view = 'alt_arten_mit_synonymen'
  } else {
    // list
    queryParam = 'export_alt'
    list = 'artendb/export_alt'
    // view
    queryParam += '/alt_arten'
    view = 'alt_arten'
  }

  // include docs
  queryParam += '?include_docs=true'
  view += '?include_docs=true'

  // Beziehungen in Zeilen oder in Spalte
  if ($('#exportBezInZeilen').prop('checked')) {
    queryParam += '&bezInZeilen=true'
    view += '&bezInZeilen=true'
  } else {
    queryParam += '&bezInZeilen=false'
    view += '&bezInZeilen=false'
  }

  // Felder
  queryParam += '&felder=' + JSON.stringify(gewaehlteFelderObjekt)
  view += '&felder=' + JSON.stringify(gewaehlteFelderObjekt)

  // URL aus bestehender Verbindung zusammensetzen
  url = uri.protocol() + '://' + uri.host() + ':' + uri.port() + '/artendb/_design/artendb/_list/' + queryParam

  // url anzeigen und markieren
  $exportAltExportUrl
    .val(url)
  // ..aber erst verzögert markieren, sonst springt das Fenster
  setTimeout(function () {
    $exportAltExportUrl
      .focus()
      .select()
  }, 2000)

  // Vorschautabelle generieren
  // limit number of data
  view += '&limit=11'
  $db.list(list, view, {
    success: function (data) {
      // alle Objekte in data window.adb.exportierenObjekte übergeben
      window.adb.exportierenObjekte = data
      baueTabelleFuerExportAuf('Alt')
    },
    error: function () {
      console.log('übergebeFilterFürExportFürAlt: error in $db.list')
    }
  })
}
