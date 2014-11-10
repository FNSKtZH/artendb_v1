// DsNamen in Auswahlliste stellen
// veränderbare sind normal, übrige grau

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $ = require('jquery'),
    _ = require('underscore');

module.exports = function () {
    var html,
        dsNamen = [];
    // in diesem Array werden alle keys gesammelt
    // diesen Array als globale Variable gestalten: Wir benutzt, wenn DsName verändert wird
    window.adb.DsKeys = _.map(window.adb.dsVonObjekten.rows, function (row) {
        return row.key;
    });
    // brauche nur drei keys
    // email: leider gibt es Null-Werte
    window.adb.dsNamenEindeutig = _.map(window.adb.DsKeys, function (dsKey) {
        return [dsKey[1], dsKey[2], dsKey[3] || "alex@gabriel-software.ch"];
    });
    // Objektarray reduzieren auf eindeutige Namen
    window.adb.dsNamenEindeutig = _.reject(window.adb.dsNamenEindeutig, function (objekt) {
        var positionInDsNamen = _.indexOf(dsNamen, objekt[0]);
        if (positionInDsNamen === -1) {
            dsNamen.push(objekt[0]);
            return false;
        }
        return true;
    });
    // nach DsNamen sortieren
    window.adb.dsNamenEindeutig = _.sortBy(window.adb.dsNamenEindeutig, function (key) {
        return key[0];
    });
    // mit leerer Zeile beginnen
    html = "<option value='' waehlbar=true></option>";
    // Namen der Datensammlungen als Optionen anfügen
    _.each(window.adb.dsNamenEindeutig, function (dsNameEindeutig) {
        // veränderbar sind nur selbst importierte und zusammenfassende
        if (dsNameEindeutig[2] === localStorage.Email || dsNameEindeutig[1] || Boolean(localStorage.admin)) {
            // veränderbare sind normal = schwarz
            html += "<option value='" + dsNameEindeutig[0] + "' class='adb_gruen_fett' waehlbar=true>" + dsNameEindeutig[0] + "</option>";
        } else {
            // nicht veränderbare sind grau
            html += "<option value='" + dsNameEindeutig[0] + "' class='adb_grau_normal' waehlbar=false>" + dsNameEindeutig[0] + "</option>";
        }
    });
    $("#DsWaehlen").html(html);
    $("#DsUrsprungsDs").html(html);
};