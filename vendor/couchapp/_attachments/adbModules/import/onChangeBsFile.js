// wenn bsFile geändert wird

'use strict'

var $ = require('jquery'),
  XLSX = require('XLSX'),
  erstelleTabelle = require('../erstelleTabelle')

module.exports = function (event) {
  var file,
    filename,
    filetype,
    reader

  event.preventDefault ? event.preventDefault() : event.returnValue = false

  if (event.target.files[0] === undefined) {
    // vorhandene Datei wurde entfernt
    $('#bsTabelleEigenschaften').hide()
    $('#importBsIdsIdentifizierenHinweisText').hide()
    $('#bsImportieren').hide()
    $('#bsEntfernen').hide()
  } else {
    file = event.target.files[0]
    filename = file.name
    filetype = filename.split('.').pop()
    reader = new window.FileReader()

    if (filetype === 'csv') {
      reader.onload = function (event) {
        var data = event.target.result

        window.adb.bsDatensaetze = $.csv.toObjects(data)
        erstelleTabelle(window.adb.bsDatensaetze, 'bsFelderDiv', 'bsTabelleEigenschaften')
      }
      reader.readAsText(file)
    }
    if (filetype === 'xlsx') {
      reader.onload = function (event) {
        var data = event.target.result,
          workbook = XLSX.read(data, {type: 'binary'}),
          sheetName = workbook.SheetNames[0],
          worksheet = workbook.Sheets[sheetName]

        window.adb.bsDatensaetze = XLSX.utils.sheet_to_json(worksheet)
        erstelleTabelle(window.adb.bsDatensaetze, 'bsFelderDiv', 'bsTabelleEigenschaften')
      }
      reader.readAsBinaryString(file)
    }
  }
}
