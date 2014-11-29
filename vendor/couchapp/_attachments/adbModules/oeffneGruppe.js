/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $            = require('jquery'),
    erstelleBaum = require('./jstree/erstelleBaum');

module.exports = function (gruppe) {
    var treeMitteilung;

    // gruppe als globale Variable speichern, weil sie an vielen Orten benutzt wird
    window.adb.gruppe = gruppe;
    $(".suchfeld").val("");
    $("#gruppeLabel").html("Gruppe:");
    $(".suchen")
        .hide()
        .val("");
    $("#forms").hide();
    treeMitteilung = "hole Daten...";
    if (window.adb.gruppe === "Macromycetes") {
        treeMitteilung = "hole Daten (das dauert bei Pilzen länger...)";
    }
    $("#treeMitteilung")
        .html(treeMitteilung)
        .show();
    erstelleBaum();
    // keine Art mehr aktiv
    delete localStorage.art_id;
};