// woher wird bloss benötigt, wenn angemeldet werden muss

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $                                    = require('jquery'),
    pruefeAnmeldung                      = require('../login/pruefeAnmeldung'),
    bereiteImportierenBsBeschreibenVor_2 = require('./bereiteImportierenBsBeschreibenVor_2');

module.exports = function (woher) {
    var $db = $.couch.db('artendb');

    if (!pruefeAnmeldung('woher')) {
        $('#importBsDsBeschreibenCollapse').collapse('hide');
    } else {
        $('#bsName').focus();
        // anzeigen, dass Daten geladen werden. Nein: Blitzt bloss kurz auf
        //$('#bsWaehlen').html("<option value='null'>Bitte warte, die Liste wird aufgebaut...</option>");
        // Daten holen, wenn nötig
        if (window.adb.bsVonObjekten) {
            bereiteImportierenBsBeschreibenVor_2();
        } else {
            $db.view('artendb/ds_von_objekten?startkey=["Beziehungssammlung"]&endkey=["Beziehungssammlung",{},{},{},{}]&group_level=5', {
                success: function (data) {
                    // Daten in Objektvariable speichern > Wenn Ds ausgewählt, Angaben in die Felder kopieren
                    window.adb.bsVonObjekten = data;
                    bereiteImportierenBsBeschreibenVor_2();
                }
            });
        }
    }
};