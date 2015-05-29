// wenn #exportExportiereBtn geklickt wird

'use strict'

var $ = require('jquery'),
  saveAs = require('saveAs'),
  erstelleExportString = require('./erstelleExportString'),
  createBlobDataXlsx = require('./createBlobDataXlsx'),
  isFileAPIAvailable = require('../isFileAPIAvailable')

module.exports = function (event) {
  var exportstring,
    blobData,
    blob,
    d,
    month,
    day,
    dateString,
    format = $('input[name="exportExportFormat"]:checked').val() || 'xlsx'

  // event stoppen, um zu verhindern, dass bootstrap ganz nach oben scrollt
  event.preventDefault ? event.preventDefault() : event.returnValue = false

  if (isFileAPIAvailable()) {
    d = new Date()
    month = d.getMonth() + 1
    day = d.getDate()
    dateString = d.getFullYear() + '-' + (month < 10 ? '0' : '') + month + '-' + (day < 10 ? '0' : '') + day

    if (format === 'csv') {
      exportstring = erstelleExportString(window.adb.exportierenObjekte)
      blob = new window.Blob([exportstring], {type: 'text/csv;charset=utf-8;'})
      saveAs(blob, dateString + '_export.csv')
    } else {
      blobData = createBlobDataXlsx(window.adb.exportierenObjekte)
      blob = new window.Blob([blobData], {type: 'application/octet-stream;charset=utf-8;'})
      saveAs(blob, dateString + '_export.xlsx')
    }
  }
}
