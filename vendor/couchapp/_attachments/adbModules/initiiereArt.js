/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var _ = require('underscore'),
    $ = require('jquery');

var returnFunction = function (id) {
    var initiiereArt2 = require('./initiiereArt2'),
        $db = $.couch.db("artendb"),
        erstelleHtmlFuerBeziehungssammlung = require('./erstelleHtmlFuerBeziehungssammlung');

    $db.openDoc(id, {
        success: function (art) {
            var html_art,
                art_eigenschaftensammlungen = art.Eigenschaftensammlungen,
                art_beziehungssammlungen = [],
                taxonomische_beziehungssammlungen = [],
                guids_von_synonymen = [],
                eigenschaftensammlungen_von_synonymen = [],
                beziehungssammlungen_von_synonymen = [],
                ds_namen = [],
                bez_namen = [],
                erstelleHtmlFuerDatensammlung = require('./erstelleHtmlFuerDatensammlung');
            // panel beginnen
            html_art = '<h4>Taxonomie:</h4>';
            // zuerst alle Datensammlungen auflisten, damit danach sortiert werden kann
            // gleichzeitig die Taxonomie suchen und gleich erstellen lassen
            html_art += erstelleHtmlFuerDatensammlung("Taxonomie", art, art.Taxonomie);
            // Datensammlungen muss nicht gepusht werden
            // aber Beziehungssammlungen aufteilen
            if (art.Beziehungssammlungen.length > 0) {
                _.each(art.Beziehungssammlungen, function (beziehungssammlung) {
                    if (typeof beziehungssammlung.Typ === "undefined") {
                        art_beziehungssammlungen.push(beziehungssammlung);
                        // bezNamen auflisten, um später zu vergleichen, ob diese DS schon dargestellt wird
                        bez_namen.push(beziehungssammlung.Name);
                    } else if (beziehungssammlung.Typ === "taxonomisch") {
                        taxonomische_beziehungssammlungen.push(beziehungssammlung);
                        // bezNamen auflisten, um später zu vergleichen, ob diese DS schon dargestellt wird
                        bez_namen.push(beziehungssammlung.Name);
                    }
                });
            }
            // taxonomische Beziehungen in gewollter Reihenfolge hinzufügen
            if (taxonomische_beziehungssammlungen.length > 0) {
                // Titel hinzufügen, falls Datensammlungen existieren
                html_art += "<h4>Taxonomische Beziehungen:</h4>";
                _.each(taxonomische_beziehungssammlungen, function (beziehungssammlung) {
                    // HTML für Datensammlung erstellen lassen und hinzufügen
                    html_art += erstelleHtmlFuerBeziehungssammlung(art, beziehungssammlung, "");
                    if (beziehungssammlung["Art der Beziehungen"] && beziehungssammlung["Art der Beziehungen"] === "synonym" && beziehungssammlung.Beziehungen) {
                        _.each(beziehungssammlung.Beziehungen, function (beziehung) {
                            if (beziehung.Beziehungspartner) {
                                _.each(beziehung.Beziehungspartner, function (beziehungspartner) {
                                    if (beziehungspartner.GUID) {
                                        guids_von_synonymen.push(beziehungspartner.GUID);
                                    }
                                });
                            }
                        });
                    }
                });
            }
            // Datensammlungen in gewollter Reihenfolge hinzufügen
            if (art_eigenschaftensammlungen.length > 0) {
                // Titel hinzufügen
                html_art += "<h4>Eigenschaften:</h4>";
                _.each(art_eigenschaftensammlungen, function (datensammlung) {
                    // HTML für Datensammlung erstellen lassen und hinzufügen
                    html_art += erstelleHtmlFuerDatensammlung("Datensammlung", art, datensammlung);
                    // dsNamen auflisten, um später zu vergleichen, ob sie schon dargestellt wird
                    ds_namen.push(datensammlung.Name);
                });
            }
            // Beziehungen hinzufügen
            if (art_beziehungssammlungen.length > 0) {
                // Titel hinzufügen
                html_art += "<h4>Beziehungen:</h4>";
                _.each(art_beziehungssammlungen, function (beziehungssammlung) {
                    // HTML für Datensammlung erstellen lassen und hinzufügen
                    html_art += erstelleHtmlFuerBeziehungssammlung(art, beziehungssammlung, "");
                });
            }
            // Beziehungssammlungen von synonymen Arten
            if (guids_von_synonymen.length > 0) {
                $db.view('artendb/all_docs?keys=' + JSON.stringify(guids_von_synonymen) + 'include_docs=true', {
                    success: function (data) {
                        var synonyme_art;
                        _.each(data.rows, function (data_row) {
                            synonyme_art = data_row.doc;
                            if (synonyme_art.Eigenschaftensammlungen && synonyme_art.Eigenschaftensammlungen.length > 0) {
                                _.each(synonyme_art.Eigenschaftensammlungen, function (eigenschaftensammlungen) {
                                    if (ds_namen.indexOf(eigenschaftensammlungen.Name) === -1) {
                                        // diese Datensammlung wird noch nicht dargestellt
                                        eigenschaftensammlungen_von_synonymen.push(eigenschaftensammlungen);
                                        // auch in dsNamen pushen, damit beim nächsten Vergleich mit berücksichtigt
                                        ds_namen.push(eigenschaftensammlungen.Name);
                                        // auch in Datensammlungen ergänzen, weil die Darstellung davon abhängt, ob eine DS existiert
                                        art_eigenschaftensammlungen.push(eigenschaftensammlungen);
                                    }
                                });
                            }
                            if (synonyme_art.Beziehungssammlungen && synonyme_art.Beziehungssammlungen.length > 0) {
                                _.each(synonyme_art.Beziehungssammlungen, function (beziehungssammlung) {
                                    if (bez_namen.indexOf(beziehungssammlung.Name) === -1 && beziehungssammlung["Art der Beziehungen"] !== "synonym" && beziehungssammlung.Typ !== "taxonomisch") {
                                        // diese Beziehungssammlung wird noch nicht dargestellt
                                        // und sie ist nicht taxonomisch
                                        beziehungssammlungen_von_synonymen.push(beziehungssammlung);
                                        // auch in bezNamen pushen, damit beim nächsten Vergleich mit berücksichtigt
                                        bez_namen.push(beziehungssammlung.Name);
                                        // auch in Beziehungssammlungen ergänzen, weil die Darstellung davon abhängt, ob eine DS existiert
                                        art_beziehungssammlungen.push(beziehungssammlung);
                                    } else if (beziehungssammlung["Art der Beziehungen"] !== "synonym" && beziehungssammlung.Typ !== "taxonomisch") {
                                        // diese Beziehungssammlung wird schon dargestellt
                                        // kann aber sein, dass beim Synonym Beziehungen existieren, welche noch nicht dargestellt werden
                                        var bs_der_synonymen_art = beziehungssammlung,
                                            bs_der_originalart = _.find(art.Beziehungssammlungen, function (beziehungssammlung) {
                                                return beziehungssammlung.Name === bs_der_synonymen_art.Name;
                                            });

                                        if (bs_der_synonymen_art.Beziehungen && bs_der_synonymen_art.Beziehungen.length > 0 && bs_der_originalart && bs_der_originalart.Beziehungen && bs_der_originalart.Beziehungen.length > 0) {
                                            // Beide Arten haben in derselben Beziehungssammlung Beziehungen
                                            // in der Originalart vorhandene Beziehungen aus dem Synonym entfernen
                                            bs_der_synonymen_art.Beziehungen = _.reject(bs_der_synonymen_art.Beziehungen, function (beziehung_des_synonyms) {
                                                // suche in Beziehungen der Originalart eine mit denselben Beziehungspartnern
                                                var beziehung_der_originalart = _.find(bs_der_originalart.Beziehungen, function (beziehung_origart) {
                                                    //return _.isEqual(beziehung_des_synonyms, beziehung_origart);  Wieso funktioniert das nicht?
                                                    if (beziehung_des_synonyms.Beziehungspartner.length > 0 && beziehung_origart.Beziehungspartner.length > 0) {
                                                        return beziehung_des_synonyms.Beziehungspartner[0].GUID === beziehung_origart.Beziehungspartner[0].GUID;
                                                    }
                                                    return false;
                                                });
                                                return !!beziehung_der_originalart;
                                            });
                                        }
                                        if (bs_der_synonymen_art.Beziehungen.length > 0) {
                                            // falls noch darzustellende Beziehungen verbleiben, die DS pushen
                                            beziehungssammlungen_von_synonymen.push(bs_der_synonymen_art);
                                        }
                                    }
                                });
                            }
                        });
                        // BS von Synonymen darstellen
                        if (eigenschaftensammlungen_von_synonymen.length > 0) {
                            // DatensammlungenVonSynonymen nach Name sortieren
                            eigenschaftensammlungen_von_synonymen = window.adb.sortiereObjektarrayNachName(eigenschaftensammlungen_von_synonymen);
                            // Titel hinzufügen
                            html_art += "<h4>Eigenschaften von Synonymen:</h4>";
                            _.each(eigenschaftensammlungen_von_synonymen, function (datesammlung) {
                                // HTML für Datensammlung erstellen lassen und hinzufügen
                                html_art += erstelleHtmlFuerDatensammlung("Datensammlung", art, datesammlung);
                            });
                        }
                        // bez von Synonymen darstellen
                        if (beziehungssammlungen_von_synonymen.length > 0) {
                            // BeziehungssammlungenVonSynonymen sortieren
                            beziehungssammlungen_von_synonymen = window.adb.sortiereObjektarrayNachName(beziehungssammlungen_von_synonymen);
                            // Titel hinzufügen
                            html_art += "<h4>Beziehungen von Synonymen:</h4>";
                            _.each(beziehungssammlungen_von_synonymen, function (beziehungssammlung) {
                                // HTML für Beziehung erstellen lassen und hinzufügen. Dritten Parameter mitgeben, damit die DS in der UI nicht gleich heisst
                                html_art += erstelleHtmlFuerBeziehungssammlung(art, beziehungssammlung, "2");
                            });
                        }
                        initiiereArt2($, html_art, art);
                    },
                    error: function () {
                        console.log('initiiereArt.js: keine Daten für Synonyme erhalten');
                    }
                });
            } else {
                initiiereArt2($, html_art, art);
            }
        },
        error: function () {
            console.log('initiiereArt.js: keine Daten für die Art erhalten');
        }
    });
};

module.exports = returnFunction;