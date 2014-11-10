// DsNamen in Auswahlliste stellen
// veränderbare sind normal, übrige grau

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $ = require('jquery'),
    _ = require('underscore');

var returnFunction = function () {
    var html,
        ds_namen = [];
    // in diesem Array werden alle keys gesammelt
    // diesen Array als globale Variable gestalten: Wir benutzt, wenn DsName verändert wird
    window.adb.DsKeys = _.map(window.adb.ds_von_objekten.rows, function (row) {
        return row.key;
    });
    // brauche nur drei keys
    // email: leider gibt es Null-Werte
    window.adb.ds_namen_eindeutig = _.map(window.adb.DsKeys, function (ds_key) {
        return [ds_key[1], ds_key[2], ds_key[3] || "alex@gabriel-software.ch"];
    });
    // Objektarray reduzieren auf eindeutige Namen
    window.adb.ds_namen_eindeutig = _.reject(window.adb.ds_namen_eindeutig, function (objekt) {
        var position_in_ds_namen = _.indexOf(ds_namen, objekt[0]);
        if (position_in_ds_namen === -1) {
            ds_namen.push(objekt[0]);
            return false;
        }
        return true;
    });
    // nach DsNamen sortieren
    window.adb.ds_namen_eindeutig = _.sortBy(window.adb.ds_namen_eindeutig, function (key) {
        return key[0];
    });
    // mit leerer Zeile beginnen
    html = "<option value='' waehlbar=true></option>";
    // Namen der Datensammlungen als Optionen anfügen
    _.each(window.adb.ds_namen_eindeutig, function (ds_name_eindeutig) {
        // veränderbar sind nur selbst importierte und zusammenfassende
        if (ds_name_eindeutig[2] === localStorage.Email || ds_name_eindeutig[1] || Boolean(localStorage.admin)) {
            // veränderbare sind normal = schwarz
            html += "<option value='" + ds_name_eindeutig[0] + "' class='adb_gruen_fett' waehlbar=true>" + ds_name_eindeutig[0] + "</option>";
        } else {
            // nicht veränderbare sind grau
            html += "<option value='" + ds_name_eindeutig[0] + "' class='adb_grau_normal' waehlbar=false>" + ds_name_eindeutig[0] + "</option>";
        }
    });
    $("#DsWaehlen").html(html);
    $("#DsUrsprungsDs").html(html);
};

module.exports = returnFunction;