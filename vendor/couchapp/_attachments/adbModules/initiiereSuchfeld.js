/*jslint node: true, browser: true, nomen: true, todo: true */


'use strict';

var initiiereSuchfeld2 = require('./initiiereSuchfeld2');

var returnFunction = function ($) {
    var $db = $.couch.db("artendb");
    // zuerst mal die benötigten Daten holen
    if (window.adb.Gruppe && window.adb.Gruppe === "Lebensräume") {
        if (window.adb.filtere_lr) {
            initiiereSuchfeld2($, window.adb.filtere_lr);
        } else {
            $db.view('artendb/filtere_lr?startkey=["' + window.adb.Gruppe + '"]&endkey=["' + window.adb.Gruppe + '",{},{},{}]', {
                success: function (data) {
                    window.adb.filtere_lr = data;
                    initiiereSuchfeld2($, data);
                },
                error: function () {
                    console.log('initiiereSuchfeld: keine Daten erhalten');
                }
            });
        }
    } else if (window.adb.Gruppe) {
        if (window.adb["filtere_art_" + window.adb.Gruppe.toLowerCase()]) {
            initiiereSuchfeld2($, window.adb["filtere_art_" + window.adb.Gruppe.toLowerCase()]);
        } else {
            $db.view('artendb/filtere_art?startkey=["' + window.adb.Gruppe + '"]&endkey=["' + window.adb.Gruppe + '",{}]', {
                success: function (data) {
                    window.adb["filtere_art_" + window.adb.Gruppe.toLowerCase()] = data;
                    initiiereSuchfeld2($, data);
                },
                error: function () {
                    console.log('initiiereSuchfeld: keine Daten erhalten');
                }
            });
        }
    }
};

module.exports = returnFunction;