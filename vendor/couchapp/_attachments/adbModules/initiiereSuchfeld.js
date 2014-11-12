/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $ = require('jquery');

module.exports = function () {
    var $db = $.couch.db('artendb'),
        initiiereSuchfeld2 = require('./initiiereSuchfeld2');

    // zuerst mal die benötigten Daten holen
    if (window.adb.gruppe && window.adb.gruppe === "Lebensräume") {
        if (window.adb.filtereLr) {
            initiiereSuchfeld2(window.adb.filtereLr);
        } else {
            $db.view('artendb/filtere_lr?startkey=["' + window.adb.gruppe + '"]&endkey=["' + window.adb.gruppe + '",{},{},{}]', {
                success: function (data) {
                    window.adb.filtereLr = data;
                    initiiereSuchfeld2(data);
                },
                error: function () {
                    console.log('initiiereSuchfeld: keine Daten erhalten');
                }
            });
        }
    } else if (window.adb.gruppe) {
        if (window.adb["filtere_art_" + window.adb.gruppe.toLowerCase()]) {
            initiiereSuchfeld2(window.adb["filtere_art_" + window.adb.gruppe.toLowerCase()]);
        } else {
            $db.view('artendb/filtere_art?startkey=["' + window.adb.gruppe + '"]&endkey=["' + window.adb.gruppe + '",{}]', {
                success: function (data) {
                    window.adb["filtere_art_" + window.adb.gruppe.toLowerCase()] = data;
                    initiiereSuchfeld2(data);
                },
                error: function () {
                    console.log('initiiereSuchfeld: keine Daten erhalten');
                }
            });
        }
    }
};