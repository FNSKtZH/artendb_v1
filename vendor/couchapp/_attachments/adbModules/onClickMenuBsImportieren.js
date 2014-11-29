// wenn bsImportieren geklickt wird
// testen, ob der Browser das Importieren unterstützt
// wenn nein, Meldung bringen (macht die aufgerufene Funktion)

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $                  = require('jquery'),
    zeigeFormular      = require('./zeigeFormular'),
    pruefeAnmeldung    = require('./login/pruefeAnmeldung'),
    isFileAPIAvailable = require('./isFileAPIAvailable');

module.exports = function () {
    if (isFileAPIAvailable()) {
        zeigeFormular("importierenBs");
        // Ist der User noch angemeldet? Wenn ja: Anmeldung überspringen
        if (pruefeAnmeldung("bs")) {
            $("#importieren_bs_ds_beschreiben_collapse").collapse('show');
        }
    }
};