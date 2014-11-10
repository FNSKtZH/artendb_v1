/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $ = require('jquery');

var returnFunction = function () {
    var gruppe,
        gruppenbezeichnung,
        baumErstellt = $.Deferred(),
        $db          = $.couch.db('artendb'),
        erstelleTree = require('./erstelleTree');
    // alle Bäume ausblenden
    $(".baum").hide();
    // alle Beschriftungen ausblenden
    $(".treeBeschriftung").hide();
    // gewollte beschriften und sichtbar schalten
    switch (window.adb.Gruppe) {
    case "Fauna":
        gruppe = "fauna";
        gruppenbezeichnung = "Tiere";
        break;
    case "Flora":
        gruppe = "flora";
        gruppenbezeichnung = "Pflanzen";
        break;
    case "Moose":
        gruppe = "moose";
        gruppenbezeichnung = "Moose";
        break;
    case "Macromycetes":
        gruppe = "macromycetes";
        gruppenbezeichnung = "Pilze";
        break;
    case "Lebensräume":
        gruppe = "lr";
        gruppenbezeichnung = "Lebensräume";
        break;
    }

    $db.view('artendb/' + gruppe + '_gruppiert', {
        success: function (data) {
            var anzahl_objekte = data.rows[0].value;
            $("#tree" + window.adb.Gruppe + "Beschriftung").html(anzahl_objekte + " " + gruppenbezeichnung);
            // eingeblendet wird die Beschriftung, wenn der Baum fertig ist im callback von function erstelleTree
        },
        error: function () {
            console.log('erstelleBaum: keine Daten erhalten');
        }
    });

    $.when(erstelleTree()).then(function () {
        baumErstellt.resolve();
    });

    return baumErstellt.promise();
};

module.exports = returnFunction;