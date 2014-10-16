// erhält dbs = "Ds" oder "Bs"

'use strict';

var _ = require('underscore'),
    meldeErfolgVonIdIdentifikation2 = require('./meldeErfolgVonIdIdentifikation2');

// $ wird benötigt wegen $.alert
var returnFunction = function ($, dbs) {
    var $dbsFelderSelected       = $("#" + dbs + "Felder option:selected"),
        $dbsIdSelected           = $("#" + dbs + "Id option:selected"),
        ids_von_datensätzen      = [],
        mehrfach_vorkommende_ids = [],
        ids_von_nicht_importierbaren_datensätzen = [];

    if ($dbsFelderSelected.length && $dbsIdSelected.length) {
        // beide ID's sind gewählt
        window.adb[dbs + "FelderId"] = $dbsFelderSelected.val();
        window.adb.DsId = $dbsIdSelected.val();
        window.adb[dbs + "Id"] = $dbsIdSelected.val();
        // das hier wird später noch für den Inmport gebraucht > globale Variable machen
        window.adb.ZuordbareDatensätze = [];
        $("#importieren_" + dbs.toLowerCase() + "_ids_identifizieren_hinweis_text")
            .alert()
            .html("Bitte warten, die Daten werden analysiert.<br>Das kann eine Weile dauern...")
            .removeClass("alert-success")
            .removeClass("alert-danger")
            .addClass("alert-info")
            .show();
        $('html, body').animate({
            scrollTop: $("#importieren_" + dbs.toLowerCase() + "_ids_identifizieren_collapse").offset().top
        }, 2000);

        // Dokumente aus der Gruppe der Datensätze holen
        // durch alle loopen. Dabei einen Array von Objekten bilden mit id und guid
        // kontrollieren, ob eine id mehr als einmal vorkommt
        if (window.adb.DsId === "guid") {
            $.ajax('http://localhost:5984/artendb/_design/artendb/_view/all_docs', {
                type: 'GET',
                dataType: "json"
            }).done(function (data) {
                var name_des_id_felds = window.adb[dbs+"FelderId"];
                // durch die importierten Datensätze loopen
                _.each(window.adb[dbs.toLowerCase() + "Datensätze"], function(import_datensatz) {
                    if (ids_von_datensätzen.indexOf(import_datensatz[name_des_id_felds]) === -1) {
                        // diese ID wurde noch nicht hinzugefügt > hinzufügen
                        ids_von_datensätzen.push(import_datensatz[name_des_id_felds]);
                        // prüfen, ob die ID zugeordnet werden kann
                        var zugehöriges_objekt = _.find(data.rows, function(objekt_row) {
                            return objekt_row.key === import_datensatz[name_des_id_felds];
                        });
                        if (zugehöriges_objekt) {
                            window.adb.ZuordbareDatensätze.push(import_datensatz[name_des_id_felds]);
                        } else {
                            // diese ID konnte nicht hinzugefügt werden. In die Liste der nicht hinzugefügten aufnehmen
                            ids_von_nicht_importierbaren_datensätzen.push(import_datensatz[name_des_id_felds]);
                        }
                    } else {
                        // diese ID wurden schon hinzugefügt > mehrfach!
                        mehrfach_vorkommende_ids.push(import_datensatz[name_des_id_felds]);
                    }
                });
                meldeErfolgVonIdIdentifikation2 ($, mehrfach_vorkommende_ids, ids_von_datensätzen, ids_von_nicht_importierbaren_datensätzen, dbs);
            }).fail(function () {
                console.log('keine Daten erhalten');
            });
        } else {
            $.ajax('http://localhost:5984/artendb/_design/artendb/_view/gruppe_id_taxonomieid', {
                type: 'GET',
                dataType: "json",
                data: {
                    startkey: '["' + window.adb.DsId + '"]',
                    endkey: '["' + window.adb.DsId + '",{},{}]'
                }
            }).done(function (data) {
                var name_des_id_felds = window.adb[dbs+"FelderId"];
                // durch die importierten Datensätze loopen
                _.each(window.adb[dbs.toLowerCase()+"Datensätze"], function(import_datensatz) {
                    if (ids_von_datensätzen.indexOf(import_datensatz[name_des_id_felds]) === -1) {
                        // diese ID wurde noch nicht hinzugefügt > hinzufügen
                        ids_von_datensätzen.push(import_datensatz[name_des_id_felds]);
                        // prüfen, ob die ID zugeordnet werden kann
                        var zugehöriges_objekt = _.find(data.rows, function(objekt_row) {
                            return objekt_row.key[2] === import_datensatz[name_des_id_felds];
                        });
                        if (zugehöriges_objekt) {
                            var Objekt = {};
                            Objekt.Id = parseInt(import_datensatz[name_des_id_felds], 10);
                            Objekt.Guid = zugehöriges_objekt.key[1];
                            window.adb.ZuordbareDatensätze.push(Objekt);
                        } else {
                            // diese ID konnte nicht hinzugefügt werden. In die Liste der nicht hinzugefügten aufnehmen
                            ids_von_nicht_importierbaren_datensätzen.push(import_datensatz[name_des_id_felds]);
                        }
                    } else {
                        // diese ID wurden schon hinzugefügt > mehrfach!
                        mehrfach_vorkommende_ids.push(import_datensatz[name_des_id_felds]);
                    }
                });
                meldeErfolgVonIdIdentifikation2 ($, mehrfach_vorkommende_ids, ids_von_datensätzen, ids_von_nicht_importierbaren_datensätzen, dbs);
            }).fail(function () {
                console.log('keine Daten erhalten');
            });
        }
    }
};

module.exports = returnFunction;