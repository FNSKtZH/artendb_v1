'use strict'

window.adb = window.adb || {}

// wird direkt in index.html aufgerufen
// damit es garantiert nur einmal läuft
window.adb.setupEvents = function () {
  require('./adbModules/setupEvents')()
}

// wird in index.html benutzt
window.adb.initiiereApp = function () {
  require('./adbModules/initiiereApp')()
}
