/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $ = require('jquery'),
    _ = require('underscore');

module.exports = function () {
    var $db = $.couch.db('artendb');
    $("#admin_pilze_zhgis_ergänzen_rückmeldung").html("Daten werden analysiert...");
    $db.view('artendb/macromycetes?include_docs=true', {
        success: function (data) {
            var dsZhGis      = {},
                ergaenzt     = 0,
                fehler       = 0,
                zhGisSchonDa = 0;

            dsZhGis.Name = "ZH GIS";
            dsZhGis.Beschreibung = "GIS-Layer und Betrachtungsdistanzen für das Artenlistentool, Artengruppen für EvAB, im Kanton Zürich. Eigenschaften aller Arten";
            dsZhGis.Datenstand = "dauernd nachgeführt";
            dsZhGis.Link = "http://www.naturschutz.zh.ch";
            dsZhGis["importiert von"] = "alex@gabriel-software.ch";
            dsZhGis.Eigenschaften = {};
            dsZhGis.Eigenschaften["GIS-Layer"] = "Pilze";
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
                    pilz.Eigenschaftensammlungen.push(dsZhGis);
                    pilz.Eigenschaftensammlungen = _.sortBy(pilz.Eigenschaftensammlungen, function (ds) {
                        return ds.Name;
                    });
                    $db.saveDoc(pilz, {
                        success: function () {
                            ergaenzt++;
                            $("#admin_pilze_zhgis_ergänzen_rückmeldung").html("Total: " + data.rows.length + ". Ergänzt: " + ergaenzt + ", Fehler: " + fehler + ", 'ZH GIS' schon enthalten: " + zhGisSchonDa);
                        },
                        error: function () {
                            fehler++;
                            $("#admin_pilze_zhgis_ergänzen_rückmeldung").html("Total: " + data.rows.length + ". Ergänzt: " + ergaenzt + ", Fehler: " + fehler + ", 'ZH GIS' schon enthalten: " + zhGisSchonDa);
                        }
                    });
                } else {
                    zhGisSchonDa++;
                    $("#admin_pilze_zhgis_ergänzen_rückmeldung").html("Total: " + data.rows.length + ". Ergänzt: " + ergaenzt + ", Fehler: " + fehler + ", 'ZH GIS' schon enthalten: " + zhGisSchonDa);
                }
            });
        }
    });
};