/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $   = require('jquery'),
    _   = require('underscore'),
    Uri = require('Uri');

module.exports = function () {
    // zuerst die id des Objekts holen
    var uri   = new Uri($(location).attr('href')),
        uri2,
        id    = uri.getQueryParamValue('id'),
        hash  = uri.anchor(),
        $db   = $.couch.db('artendb'),
        oeffneGruppe = require('../oeffneGruppe');

    // wenn browser history nicht unterstützt, erstellt history.js eine hash
    // dann muss die id durch die id in der hash ersetzt werden
    if (hash) {
        uri2 = new Uri(hash);
        id = uri2.getQueryParamValue('id');
    }
    // Objekt selbst inkl. aller hierarchisch darunter liegende Objekte ermitteln und löschen
    $db.view('artendb/hierarchie?key="' + id + '"&include_docs=true', {
        success: function (data) {
            var docArray,
                vorigerNode;
            // daraus einen Array von docs machen
            docArray = _.map(data.rows, function (row) {
                return row.doc;
            });
            // und diese Dokumente nun löschen
            window.adb.loescheMassenMitObjektArray(docArray);
            // vorigen node ermitteln
            vorigerNode = $.jstree._reference("#" + id)._get_prev("#" + id);
            // node des gelöschten LR entfernen
            $.jstree._reference("#" + id).delete_node("#" + id);
            // vorigen node öffnen
            if (vorigerNode) {
                $.jstree._reference(vorigerNode).select_node(vorigerNode);
            } else {
                oeffneGruppe("Lebensräume");
            }
        },
        error: function () {
            console.log('handleRückfrageLrLöschenJaClick: keine Daten erhalten');
        }
    });
};