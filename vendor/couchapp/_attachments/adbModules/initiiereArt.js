/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var _                                  = require('underscore'),
    $                                  = require('jquery'),
    initiiereArt2                      = require('./initiiereArt2'),
    erstelleHtmlFuerBeziehungssammlung = require('./erstelleHtmlFuerBeziehungssammlung'),
    erstelleHtmlFuerDatensammlung      = require('./erstelleHtmlFuerDatensammlung'),
    sortiereObjektarrayNachName        = require('./sortiereObjektarrayNachName');

module.exports = function (id) {
    var $db = $.couch.db('artendb');

    $db.openDoc(id, {
        success: function (art) {
            var htmlArt,
                artEigenschaftensammlungen          = art.Eigenschaftensammlungen,
                artBeziehungssammlungen             = [],
                taxonomischeBeziehungssammlungen    = [],
                guidsVonSynonymen                   = [],
                eigenschaftensammlungenVonSynonymen = [],
                beziehungssammlungenVonSynonymen    = [],
                dsNamen                             = [],
                bezNamen                            = [];

            // panel beginnen
            htmlArt = '<h4>Taxonomie:</h4>';
            // zuerst alle Datensammlungen auflisten, damit danach sortiert werden kann
            // gleichzeitig die Taxonomie suchen und gleich erstellen lassen
            htmlArt += erstelleHtmlFuerDatensammlung("Taxonomie", art, art.Taxonomie);
            // Datensammlungen muss nicht gepusht werden
            // aber Beziehungssammlungen aufteilen
            if (art.Beziehungssammlungen.length > 0) {
                _.each(art.Beziehungssammlungen, function (beziehungssammlung) {
                    if (beziehungssammlung.Typ === undefined) {
                        artBeziehungssammlungen.push(beziehungssammlung);
                        // bezNamen auflisten, um später zu vergleichen, ob diese DS schon dargestellt wird
                        bezNamen.push(beziehungssammlung.Name);
                    } else if (beziehungssammlung.Typ === "taxonomisch") {
                        taxonomischeBeziehungssammlungen.push(beziehungssammlung);
                        // bezNamen auflisten, um später zu vergleichen, ob diese DS schon dargestellt wird
                        bezNamen.push(beziehungssammlung.Name);
                    }
                });
            }
            // taxonomische Beziehungen in gewollter Reihenfolge hinzufügen
            if (taxonomischeBeziehungssammlungen.length > 0) {
                // Titel hinzufügen, falls Datensammlungen existieren
                htmlArt += "<h4>Taxonomische Beziehungen:</h4>";
                _.each(taxonomischeBeziehungssammlungen, function (beziehungssammlung) {
                    // HTML für Datensammlung erstellen lassen und hinzufügen
                    htmlArt += erstelleHtmlFuerBeziehungssammlung(beziehungssammlung, "");
                    if (beziehungssammlung["Art der Beziehungen"] && beziehungssammlung["Art der Beziehungen"] === "synonym" && beziehungssammlung.Beziehungen) {
                        _.each(beziehungssammlung.Beziehungen, function (beziehung) {
                            if (beziehung.Beziehungspartner) {
                                _.each(beziehung.Beziehungspartner, function (beziehungspartner) {
                                    if (beziehungspartner.GUID) {
                                        guidsVonSynonymen.push(beziehungspartner.GUID);
                                    }
                                });
                            }
                        });
                    }
                });
            }
            // Datensammlungen in gewollter Reihenfolge hinzufügen
            if (artEigenschaftensammlungen.length > 0) {
                // Titel hinzufügen
                htmlArt += "<h4>Eigenschaften:</h4>";
                _.each(artEigenschaftensammlungen, function (datensammlung) {
                    // HTML für Datensammlung erstellen lassen und hinzufügen
                    htmlArt += erstelleHtmlFuerDatensammlung("Datensammlung", art, datensammlung);
                    // dsNamen auflisten, um später zu vergleichen, ob sie schon dargestellt wird
                    dsNamen.push(datensammlung.Name);
                });
            }
            // Beziehungen hinzufügen
            if (artBeziehungssammlungen.length > 0) {
                // Titel hinzufügen
                htmlArt += "<h4>Beziehungen:</h4>";
                _.each(artBeziehungssammlungen, function (beziehungssammlung) {
                    // HTML für Datensammlung erstellen lassen und hinzufügen
                    htmlArt += erstelleHtmlFuerBeziehungssammlung(beziehungssammlung, "");
                });
            }
            // Beziehungssammlungen von synonymen Arten
            if (guidsVonSynonymen.length > 0) {
                $db.view('artendb/all_docs?keys=' + JSON.stringify(guidsVonSynonymen) + '&include_docs=true', {
                    success: function (data) {
                        var synonymeArt;
                        _.each(data.rows, function (dataRow) {
                            synonymeArt = dataRow.doc;
                            if (synonymeArt.Eigenschaftensammlungen && synonymeArt.Eigenschaftensammlungen.length > 0) {
                                _.each(synonymeArt.Eigenschaftensammlungen, function (eigenschaftensammlungen) {
                                    if (dsNamen.indexOf(eigenschaftensammlungen.Name) === -1) {
                                        // diese Datensammlung wird noch nicht dargestellt
                                        eigenschaftensammlungenVonSynonymen.push(eigenschaftensammlungen);
                                        // auch in dsNamen pushen, damit beim nächsten Vergleich mit berücksichtigt
                                        dsNamen.push(eigenschaftensammlungen.Name);
                                        // auch in Datensammlungen ergänzen, weil die Darstellung davon abhängt, ob eine DS existiert
                                        artEigenschaftensammlungen.push(eigenschaftensammlungen);
                                    }
                                });
                            }
                            if (synonymeArt.Beziehungssammlungen && synonymeArt.Beziehungssammlungen.length > 0) {
                                _.each(synonymeArt.Beziehungssammlungen, function (beziehungssammlung) {
                                    if (bezNamen.indexOf(beziehungssammlung.Name) === -1 && beziehungssammlung["Art der Beziehungen"] !== "synonym" && beziehungssammlung.Typ !== "taxonomisch") {
                                        // diese Beziehungssammlung wird noch nicht dargestellt
                                        // und sie ist nicht taxonomisch
                                        beziehungssammlungenVonSynonymen.push(beziehungssammlung);
                                        // auch in bezNamen pushen, damit beim nächsten Vergleich mit berücksichtigt
                                        bezNamen.push(beziehungssammlung.Name);
                                        // auch in Beziehungssammlungen ergänzen, weil die Darstellung davon abhängt, ob eine DS existiert
                                        artBeziehungssammlungen.push(beziehungssammlung);
                                    } else if (beziehungssammlung["Art der Beziehungen"] !== "synonym" && beziehungssammlung.Typ !== "taxonomisch") {
                                        // diese Beziehungssammlung wird schon dargestellt
                                        // kann aber sein, dass beim Synonym Beziehungen existieren, welche noch nicht dargestellt werden
                                        var bsDerSynonymenArt = beziehungssammlung,
                                            bsDerOriginalArt = _.find(art.Beziehungssammlungen, function (beziehungssammlung) {
                                                return beziehungssammlung.Name === bsDerSynonymenArt.Name;
                                            });

                                        if (bsDerSynonymenArt.Beziehungen && bsDerSynonymenArt.Beziehungen.length > 0 && bsDerOriginalArt && bsDerOriginalArt.Beziehungen && bsDerOriginalArt.Beziehungen.length > 0) {
                                            // Beide Arten haben in derselben Beziehungssammlung Beziehungen
                                            // in der Originalart vorhandene Beziehungen aus dem Synonym entfernen
                                            bsDerSynonymenArt.Beziehungen = _.reject(bsDerSynonymenArt.Beziehungen, function (beziehungDesSynonyms) {
                                                // suche in Beziehungen der Originalart eine mit denselben Beziehungspartnern
                                                var beziehungDerOriginalArt = _.find(bsDerOriginalArt.Beziehungen, function (beziehungOrigArt) {
                                                    //return _.isEqual(beziehungDesSynonyms, beziehungOrigArt);  Wieso funktioniert das nicht?
                                                    if (beziehungDesSynonyms.Beziehungspartner.length > 0 && beziehungOrigArt.Beziehungspartner.length > 0) {
                                                        return beziehungDesSynonyms.Beziehungspartner[0].GUID === beziehungOrigArt.Beziehungspartner[0].GUID;
                                                    }
                                                    return false;
                                                });
                                                return !!beziehungDerOriginalArt;
                                            });
                                        }
                                        if (bsDerSynonymenArt.Beziehungen.length > 0) {
                                            // falls noch darzustellende Beziehungen verbleiben, die DS pushen
                                            beziehungssammlungenVonSynonymen.push(bsDerSynonymenArt);
                                        }
                                    }
                                });
                            }
                        });
                        // BS von Synonymen darstellen
                        if (eigenschaftensammlungenVonSynonymen.length > 0) {
                            // DatensammlungenVonSynonymen nach Name sortieren
                            eigenschaftensammlungenVonSynonymen = sortiereObjektarrayNachName(eigenschaftensammlungenVonSynonymen);
                            // Titel hinzufügen
                            htmlArt += "<h4>Eigenschaften von Synonymen:</h4>";
                            _.each(eigenschaftensammlungenVonSynonymen, function (datensammlung) {
                                // HTML für Datensammlung erstellen lassen und hinzufügen
                                htmlArt += erstelleHtmlFuerDatensammlung("Datensammlung", art, datensammlung);
                            });
                        }
                        // bez von Synonymen darstellen
                        if (beziehungssammlungenVonSynonymen.length > 0) {
                            // BeziehungssammlungenVonSynonymen sortieren
                            beziehungssammlungenVonSynonymen = sortiereObjektarrayNachName(beziehungssammlungenVonSynonymen);
                            // Titel hinzufügen
                            htmlArt += "<h4>Beziehungen von Synonymen:</h4>";
                            _.each(beziehungssammlungenVonSynonymen, function (beziehungssammlung) {
                                // HTML für Beziehung erstellen lassen und hinzufügen. Dritten Parameter mitgeben, damit die DS in der UI nicht gleich heisst
                                htmlArt += erstelleHtmlFuerBeziehungssammlung(beziehungssammlung, "2");
                            });
                        }
                        initiiereArt2(htmlArt, art);
                    },
                    error: function () {
                        console.log('initiiereArt.js: keine Daten für Synonyme erhalten');
                        // trotzdem initiieren
                        initiiereArt2(htmlArt, art);
                    }
                });
            } else {
                initiiereArt2(htmlArt, art);
            }
        },
        error: function () {
            console.log('initiiereArt.js: keine Daten für die Art erhalten');
        }
    });
};