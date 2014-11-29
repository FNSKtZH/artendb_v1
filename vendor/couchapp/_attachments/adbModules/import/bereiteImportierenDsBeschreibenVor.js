// woher wird bloss benötigt, wenn angemeldet werden muss

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $                                     = require('jquery'),
    bereiteImportierenDsBeschreibenVor_02 = require('./bereiteImportierenDsBeschreibenVor_02'),
    pruefeAnmeldung                       = require('../login/pruefeAnmeldung');

module.exports = function (woher) {
    var $db = $.couch.db('artendb');

    if (!pruefeAnmeldung(woher)) {
        $('#importierenDsDsBeschreibenCollapse').collapse('hide');
    } else {
        $('#dsName').focus();
        // Daten holen, wenn nötig
        if (window.adb.dsVonObjekten) {
            bereiteImportierenDsBeschreibenVor_02();
        } else {
            $db.view('artendb/ds_von_objekten?startkey=["Datensammlung"]&endkey=["Datensammlung",{},{},{},{}]&group_level=5', {
                success: function (data) {
                    // Daten in Objektvariable speichern > Wenn Ds ausgewählt, Angaben in die Felder kopieren
                    window.adb.dsVonObjekten = data;
                    bereiteImportierenDsBeschreibenVor_02();
                }
            });
        }
    }
};