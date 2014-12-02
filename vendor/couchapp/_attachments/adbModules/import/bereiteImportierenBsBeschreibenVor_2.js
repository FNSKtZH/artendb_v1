/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $ = require('jquery'),
    _ = require('underscore');

module.exports = function () {
    var html,
        bsNamen = [];

    // in diesem Array werden alle keys gesammelt
    // diesen Array als globale Variable gestalten: Wir benutzt, wenn DsName verändert wird
    window.adb.bsKeys = _.map(window.adb.bsVonObjekten.rows, function (row) {
        return row.key;
    });

    // brauche nur drei keys
    window.adb.dsNamenEindeutig = _.map(window.adb.bsKeys, function (bsKey) {
        return [bsKey[1], bsKey[2], bsKey[3]];
    });
    // Objektarray reduzieren auf eindeutige Namen
    window.adb.dsNamenEindeutig = _.reject(window.adb.dsNamenEindeutig, function (objekt) {
        var positionInBsNamen = _.indexOf(bsNamen, objekt[0]);

        if (positionInBsNamen === -1) {
            bsNamen.push(objekt[0]);
            return false;
        }
        return true;
    });

    // nach DsNamen sortieren
    window.adb.dsNamenEindeutig = _.sortBy(window.adb.dsNamenEindeutig, function (key) {
        return key[0];
    });
    // mit leerer Zeile beginnen
    html = '<option value="" waehlbar=true></option>';
    // Namen der Datensammlungen als Optionen anfügen
    _.each(window.adb.dsNamenEindeutig, function (dsNameEindeutig) {
        // veränderbar sind nur selbst importierte und zusammenfassende
        if (dsNameEindeutig[2] === localStorage.email || dsNameEindeutig[1] || Boolean(localStorage.admin)) {
            // veränderbare sind normal = schwarz
            html += "<option value='" + dsNameEindeutig[0] + "' class='adbGruenFett' waehlbar=true>" + dsNameEindeutig[0] + "</option>";
        } else {
            // nicht veränderbare sind grau
            html += "<option value='" + dsNameEindeutig[0] + "' class='adbGrauNormal' waehlbar=false>" + dsNameEindeutig[0] + "</option>";
        }
    });
    $('#bsWaehlen').html(html);
    $('#bsUrsprungsBs').html(html);
};