/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $ = require('jquery'),
    _ = require('underscore');

module.exports = function () {
    var $admin_baue_ds_zu_eigenschaften_um_rueckmeldung = $("#admin_baue_ds_zu_eigenschaften_um_rueckmeldung"),
        $db = $.couch.db('artendb');

    $admin_baue_ds_zu_eigenschaften_um_rueckmeldung.html("Daten werden analysiert...");
    $db.view('artendb/all_docs?include_docs=true', {
        success: function (data) {
            var korrigiert = 0,
                fehler = 0;

            if (data.rows.length === 0) {
                $admin_baue_ds_zu_eigenschaften_um_rueckmeldung.html("Keine Daten erhalten");
                return;
            }
            _.each(data.rows, function (row) {
                var art = row.doc,
                    datensammlungen,
                    beziehungssammlungen,
                    ds_daten,
                    tax_daten,
                    save = false;
                // Datensammlungen umbenennen
                // ds und bs entfernen, danach in der richtigen Reihenfolge hinzufügen
                // damit die Reihenfolge bewahrt bleibt
                if (art.Taxonomie && art.Taxonomie.Daten) {
                    tax_daten = art.Taxonomie.Daten;
                    delete art.Taxonomie.Daten;
                    art.Taxonomie.Eigenschaften = tax_daten;
                    save = true;
                }
                if (art.Datensammlungen) {
                    datensammlungen = art.Datensammlungen;
                    _.each(datensammlungen, function (ds) {
                        if (ds.Daten) {
                            ds_daten = ds.Daten;
                            delete ds.Daten;
                            ds.Eigenschaften = ds_daten;
                        }
                    });
                    delete art.Datensammlungen;
                    if (art.Beziehungssammlungen) {
                        beziehungssammlungen = art.Beziehungssammlungen;
                        delete art.Beziehungssammlungen;
                    } else {
                        beziehungssammlungen = {};
                    }
                    art.Eigenschaftensammlungen = datensammlungen;
                    art.Beziehungssammlungen    = beziehungssammlungen;
                    save = true;
                }
                if (save) {
                    $db.saveDoc(art, {
                        success: function () {
                            korrigiert ++;
                            $admin_baue_ds_zu_eigenschaften_um_rueckmeldung.html("Anzahl Dokumente in DB: " + data.rows.length + ". Umbenannt: " + korrigiert + ", Fehler: " + fehler);
                        },
                        error: function () {
                            fehler ++;
                            $admin_baue_ds_zu_eigenschaften_um_rueckmeldung.html("Anzahl Dokumente in DB: " + data.rows.length + ". Umbenannt: " + korrigiert + ", Fehler: " + fehler);
                        }
                    });
                }

            });
            if (korrigiert === 0) {
                $admin_baue_ds_zu_eigenschaften_um_rueckmeldung.html("Es gibt offenbar keine Datensammlungen mehr, die umbenannt werden müssen");
            }
        },
        error: function () {
            console.log('baueDsZuEigenschaftenUm: keine Daten erhalten');
        }
    });
};