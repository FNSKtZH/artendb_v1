/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $ = require('jquery'),
    _ = require('underscore');

var returnFunction = function () {
    $("#admin_pilze_zhgis_ergänzen_rückmeldung").html("Daten werden analysiert...");
    var $db = $.couch.db('artendb');
    $db.view('artendb/macromycetes?include_docs=true', {
        success: function (data) {
            var ds_zhgis = {},
                ergänzt = 0,
                fehler = 0,
                zhgis_schon_da = 0;
            ds_zhgis.Name = "ZH GIS";
            ds_zhgis.Beschreibung = "GIS-Layer und Betrachtungsdistanzen für das Artenlistentool, Artengruppen für EvAB, im Kanton Zürich. Eigenschaften aller Arten";
            ds_zhgis.Datenstand = "dauernd nachgeführt";
            ds_zhgis.Link = "http://www.naturschutz.zh.ch";
            ds_zhgis["importiert von"] = "alex@gabriel-software.ch";
            ds_zhgis.Eigenschaften = {};
            ds_zhgis.Eigenschaften["GIS-Layer"] = "Pilze";
            _.each(data.rows, function (row) {
                var pilz = row.doc,
                    zhgis_in_ds;
                if (!pilz.Eigenschaftensammlungen) {
                    pilz.Eigenschaftensammlungen = [];
                }
                zhgis_in_ds = _.find(pilz.Eigenschaftensammlungen, function (ds) {
                    return ds.Name === "ZH GIS";
                });
                // nur ergänzen, wenn ZH GIS noch nicht existiert
                if (!zhgis_in_ds) {
                    pilz.Eigenschaftensammlungen.push(ds_zhgis);
                    pilz.Eigenschaftensammlungen = _.sortBy(pilz.Eigenschaftensammlungen, function (ds) {
                        return ds.Name;
                    });
                    $db.saveDoc(pilz, {
                        success: function () {
                            ergänzt ++;
                            $("#admin_pilze_zhgis_ergänzen_rückmeldung").html("Total: " + data.rows.length + ". Ergänzt: " + ergänzt + ", Fehler: " + fehler + ", 'ZH GIS' schon enthalten: " + zhgis_schon_da);
                        },
                        error: function () {
                            fehler ++;
                            $("#admin_pilze_zhgis_ergänzen_rückmeldung").html("Total: " + data.rows.length + ". Ergänzt: " + ergänzt + ", Fehler: " + fehler + ", 'ZH GIS' schon enthalten: " + zhgis_schon_da);
                        }
                    });
                } else {
                    zhgis_schon_da ++;
                    $("#admin_pilze_zhgis_ergänzen_rückmeldung").html("Total: " + data.rows.length + ". Ergänzt: " + ergänzt + ", Fehler: " + fehler + ", 'ZH GIS' schon enthalten: " + zhgis_schon_da);
                }
            });
        }
    });
};

module.exports = returnFunction;