/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $                  = require('jquery'),
    initiiereSuchfeld2 = require('./initiiereSuchfeld2');

module.exports = function () {
    var $db = $.couch.db('artendb');

    // zuerst mal die benötigten Daten holen
    if (window.adb.gruppe && window.adb.gruppe === 'Lebensräume') {
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
        if (window.adb['filtereArt' + window.adb.gruppe]) {
            initiiereSuchfeld2(window.adb['filtereArt' + window.adb.gruppe]);
        } else {
            $db.view('artendb/filtere_art?startkey=["' + window.adb.gruppe + '"]&endkey=["' + window.adb.gruppe + '",{}]', {
                success: function (data) {
                    window.adb['filtereArt' + window.adb.gruppe] = data;
                    initiiereSuchfeld2(data);
                },
                error: function () {
                    console.log('initiiereSuchfeld: keine Daten erhalten');
                }
            });
        }
    }
};