/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $                                 = require('jquery'),
    holeDatenUrlFuerTreeOberstesLevel = require('./holeDatenUrlFuerTreeOberstesLevel'),
    holeDatenUrlFuerTreeUntereLevel   = require('./holeDatenUrlFuerTreeUntereLevel'),
    initiiereSuchfeld                 = require('../initiiereSuchfeld'),
    initiiereArt                      = require('../initiiereArt'),
    setzeTreehoehe                    = require('./setzeTreehoehe');

module.exports = function () {
    var level,
        gruppe,
        filter,
        id,
        jstreeErstellt = $.Deferred();

    $('#tree' + window.adb.gruppe).jstree({
        'json_data': {
            ajax: {
                type: 'GET',
                url: function (node) {
                    if (node === -1) {
                        return holeDatenUrlFuerTreeOberstesLevel();
                    }
                    level = parseInt(node.attr('level'), 10) + 1;
                    gruppe = node.attr('gruppe');
                    if (node.attr('filter')) {
                        filter = node.attr('filter').split(',');
                        id = '';
                    } else {
                        filter = '';
                        id = node.attr('id');
                    }
                    return holeDatenUrlFuerTreeUntereLevel(level, filter, gruppe, id);
                },
                success: function (data) {
                    return data;
                },
                error: function () {
                    //console.log('erstelleTree meldet: ajax failure');  // KOMISCH: MELDET FEHLER, obwohl daten erhalten wurden
                }
            }
        },
        'ui': {
            'select_limit': 1,    // nur ein Datensatz kann aufs mal gewählt werden
            'selected_parent_open': true,    // wenn Code einen node wählt, werden alle parents geöffnet
            'select_prev_on_delete': true
        },
        'core': {
            'open_parents': true,    // wird ein node programmatisch geöffnet, öffnen sich alle parents
            'strings': {
                'loading': 'hole Daten...'
            }
        },
        'sort': function (a, b) {
            return this.get_text(a) > this.get_text(b) ? 1 : -1;
        },
        'themes': {
            'icons': false
        },
        'plugins' : ['ui', 'themes', 'json_data', 'sort']
    }).bind('select_node.jstree', function (e, data) {
        var node = data.rslt.obj;

        $.jstree._reference(node).open_node(node);
        if (node.attr('id')) {
            // verhindern, dass bereits offene Seiten nochmals geöffnet werden
            if (!$('#art').is(':visible') || localStorage.art_id !== node.attr('id')) {
                localStorage.art_id = node.attr('id');
                // Anzeige im Formular initiieren. ID und Datensammlung übergeben
                initiiereArt(node.attr('id'));
            }
        }
    }).bind('loaded.jstree', function () {
        jstreeErstellt.resolve();
        $('#suchen' + window.adb.gruppe).css('display', 'table');
        $('#treeMitteilung').hide();
        $('#tree' + window.adb.gruppe).show();
        $('#tree' + window.adb.gruppe + 'Beschriftung').show();
        setzeTreehoehe();
        initiiereSuchfeld();
    }).bind('after_open.jstree', function () {
        setzeTreehoehe();
    }).bind('after_close.jstree', function () {
        setzeTreehoehe();
    });
    return jstreeErstellt.promise();
};