/*jslint node: true */
'use strict';

// braucht $ wegen $.jstree
var returnFunction = function ($, id) {
    // Hierarchie der id holen
    $.ajax('http://localhost:5984/artendb/' + id, {
        type: 'GET',
        dataType: "json"
    }).done(function (objekt) {
        var $filter_klasse = $("[filter='" + objekt.Taxonomie.Eigenschaften.Klasse + "']"),
            $art_anmelden = $("#art_anmelden"),
            oeffneNodeNachIdArray = require('./oeffneNodeNachIdArray');
        switch (objekt.Gruppe) {
        case "Fauna":
            // von oben nach unten die jeweils richtigen nodes öffnen, zuletzt selektieren
            // oberste Ebene aufbauen nicht nötig, die gibt es schon
            $.jstree._reference("#treeFauna").open_node($filter_klasse, function() {
                $.jstree._reference("#treeFauna").open_node($("[filter='" + objekt.Taxonomie.Eigenschaften.Klasse + "," + objekt.Taxonomie.Eigenschaften.Ordnung + "']"), function() {
                    $.jstree._reference("#treeFauna").open_node($("[filter='" + objekt.Taxonomie.Eigenschaften.Klasse + "," + objekt.Taxonomie.Eigenschaften.Ordnung + ","+objekt.Taxonomie.Eigenschaften.Familie+"']"), function() {
                        $.jstree._reference("#treeFauna").select_node($("#" + objekt._id), function() {}, false);
                    }, true);
                }, true);
            }, true);
            // Anmeldung verstecken, wenn nicht Lebensräume
            $art_anmelden.hide();
            break;
        case "Flora":
            // von oben nach unten die jeweils richtigen nodes öffnen, zuletzt selektieren
            // oberste Ebene aufbauen nicht nötig, die gibt es schon
            $.jstree._reference("#treeFlora").open_node($("[filter='" + objekt.Taxonomie.Eigenschaften.Familie + "']"), function () {
                $.jstree._reference("#treeFlora").open_node($("[filter='" + objekt.Taxonomie.Eigenschaften.Familie + "," + objekt.Taxonomie.Eigenschaften.Gattung + "']"), function() {
                    $.jstree._reference("#treeFlora").select_node($("#" + objekt._id), function () {}, false);
                }, true);
            }, true);
            // Anmeldung verstecken, wenn nicht Lebensräume
            $art_anmelden.hide();
            break;
        case "Moose":
            // von oben nach unten die jeweils richtigen nodes öffnen, zuletzt selektieren
            // oberste Ebene aufbauen nicht nötig, die gibt es schon
            $.jstree._reference("#treeMoose").open_node($filter_klasse, function() {
                $.jstree._reference("#treeMoose").open_node($("[filter='"+objekt.Taxonomie.Eigenschaften.Klasse+","+objekt.Taxonomie.Eigenschaften.Familie+"']"), function() {
                    $.jstree._reference("#treeMoose").open_node($("[filter='"+objekt.Taxonomie.Eigenschaften.Klasse+","+objekt.Taxonomie.Eigenschaften.Familie+","+objekt.Taxonomie.Eigenschaften.Gattung+"']"), function() {
                        $.jstree._reference("#treeMoose").select_node($("#"+objekt._id), function() {}, false);
                    }, true);
                }, true);
            }, true);
            // Anmeldung verstecken, wenn nicht Lebensräume
            $art_anmelden.hide();
            break;
        case "Macromycetes":
            // von oben nach unten die jeweils richtigen nodes öffnen, zuletzt selektieren
            // oberste Ebene aufbauen nicht nötig, die gibt es schon
            $.jstree._reference("#treeMacromycetes").open_node($("[filter='"+objekt.Taxonomie.Eigenschaften.Gattung+"']"), function() {
                $.jstree._reference("#treeMacromycetes").select_node($("#"+objekt._id), function() {}, false);
            }, true);
            // Anmeldung verstecken, wenn nicht Lebensräume
            $art_anmelden.hide();
            break;
        case "Lebensräume":
            var id_array = [];
            _.each(objekt.Taxonomie.Eigenschaften.Hierarchie, function (hierarchie) {
                id_array.push(hierarchie.GUID);
            });
            oeffneNodeNachIdArray ($, id_array);
            break;
        }
    }).fail(function () {
        console.log('keine Daten erhalten');
    });
};

module.exports = returnFunction;