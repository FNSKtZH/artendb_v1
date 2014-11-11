/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $ = require('jquery'),
    _ = require('underscore');

module.exports = function () {
    var $admin_korrigiere_ds_name_ch_rote_liste_1991_rueckmeldung = $("#admin_korrigiere_ds_name_ch_rote_liste_1991_rueckmeldung"),
        $db = $.couch.db('artendb');

    $admin_korrigiere_ds_name_ch_rote_liste_1991_rueckmeldung.html("Daten werden analysiert...");
    $db.view('artendb/flora?include_docs=true', {
        success: function (data) {
            var korrigiert = 0,
                fehler = 0;

            _.each(data.rows, function (row) {
                var art = row.doc,
                    ds;

                if (art.Eigenschaftensammlungen) {
                    ds = _.find(art.Eigenschaftensammlungen, function (ds) {
                        return ds.Name === "CH Rote Liste (1991)";
                    });
                    if (ds) {
                        ds.Name = "CH Rote Listen Flora (1991)";
                        $db.saveDoc(art, {
                            success: function () {
                                korrigiert++;
                                $admin_korrigiere_ds_name_ch_rote_liste_1991_rueckmeldung.html("Floraarten: " + data.rows.length + ". Umbenannt: " + korrigiert + ", Fehler: " + fehler);
                            },
                            error: function () {
                                fehler++;
                                $admin_korrigiere_ds_name_ch_rote_liste_1991_rueckmeldung.html("Floraarten: " + data.rows.length + ". Umbenannt: " + korrigiert + ", Fehler: " + fehler);
                            }
                        });
                    }
                }
            });
            if (korrigiert === 0) {
                $("#admin_korrigiere_artwertname_in_flora_rückmeldung").html("Es gibt offenbar keine Datensammlungen mehr mit Namen 'CH Rote Liste (1991)'");
            }
        },
        error: function () {
            console.log('korrigiereDsNameFloraChRoteListe1991: keine Daten erhalten');
        }
    });
};