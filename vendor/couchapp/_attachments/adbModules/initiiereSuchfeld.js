/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $ = require('jquery');

module.exports = function () {
    var $db = $.couch.db('artendb'),
        initiiereSuchfeld2 = require('./initiiereSuchfeld2');

    // zuerst mal die benötigten Daten holen
    if (window.adb.Gruppe && window.adb.Gruppe === "Lebensräume") {
        if (window.adb.filtereLr) {
            initiiereSuchfeld2(window.adb.filtereLr);
        } else {
            $db.view('artendb/filtere_lr?startkey=["' + window.adb.Gruppe + '"]&endkey=["' + window.adb.Gruppe + '",{},{},{}]', {
                success: function (data) {
                    window.adb.filtereLr = data;
                    initiiereSuchfeld2(data);
                },
                error: function () {
                    console.log('initiiereSuchfeld: keine Daten erhalten');
                }
            });
        }
    } else if (window.adb.Gruppe) {
        if (window.adb["filtere_art_" + window.adb.Gruppe.toLowerCase()]) {
            initiiereSuchfeld2(window.adb["filtere_art_" + window.adb.Gruppe.toLowerCase()]);
        } else {
            $db.view('artendb/filtere_art?startkey=["' + window.adb.Gruppe + '"]&endkey=["' + window.adb.Gruppe + '",{}]', {
                success: function (data) {
                    window.adb["filtere_art_" + window.adb.Gruppe.toLowerCase()] = data;
                    initiiereSuchfeld2(data);
                },
                error: function () {
                    console.log('initiiereSuchfeld: keine Daten erhalten');
                }
            });
        }
    }
};