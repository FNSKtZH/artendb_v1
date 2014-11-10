// übernimmt anfangs drei arrays: taxonomien, datensammlungen und beziehungssammlungen
// verarbeitet immer den ersten array und ruft sich mit den übrigen selber wieder auf
// formular: hier kommt 'export_alt', wenn die Felder für das ALT gewählt werden (sonst nichts)

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var _          = require('underscore'),
    Autolinker = require('autolinker'),
    $          = require('jquery');

var erstelleExportfelder = function (taxonomien, datensammlungen, beziehungssammlungen, formular) {
    var html_felder_wählen = '',
        html_filtern = '',
        ds_typ,
        x,
        dsbs_von_objekten = [],
        dsbs_von_objekt,
        ds_felder_objekt,
        html,
        _alt = '',
        ersetzeUngueltigeZeichenInIdNamen = require('../ersetzeUngueltigeZeichenInIdNamen');

    if (formular === 'export_alt') {
        _alt = '_alt';
        // fürs alt muss die GUID nicht mitgeliefert werden
        $('#exportieren_alt_felder_waehlen_objekt_id').prop('checked', false);
    }

    // Eigenschaftensammlungen vorbereiten
    // Struktur von window.adb.ds_bs_von_objekten ist jetzt: [ds_typ, ds.Name, ds.zusammenfassend, ds["importiert von"], Felder_array]
    // erst mal die nicht benötigten Werte entfernen
    _.each(window.adb.ds_bs_von_objekten.rows, function (object_with_array_in_key) {
        dsbs_von_objekten.push([object_with_array_in_key.key[1], object_with_array_in_key.key[4]]);
    });
    // Struktur von dsbs_von_objekten ist jetzt: [ds.Name, felder_objekt]
    // jetzt gibt es Mehrfacheinträge, diese entfernen
    dsbs_von_objekten = _.union(dsbs_von_objekten);

    if (taxonomien && datensammlungen && beziehungssammlungen) {
        ds_typ = "Taxonomie";
        html_felder_wählen += '<h3>Taxonomie</h3>';
        html_filtern += '<h3>Taxonomie</h3>';
    } else if (taxonomien && datensammlungen) {
        ds_typ = "Datensammlung";
        html_felder_wählen += '<h3>Eigenschaftensammlungen</h3>';
        html_filtern += '<h3>Eigenschaftensammlungen</h3>';
    } else {
        ds_typ = "Beziehung";
        // bei "felder wählen" soll man auch wählen können, ob pro Beziehung eine Zeile oder alle Beziehungen in ein Feld geschrieben werden sollen
        // das muss auch erklärt sein
        html_felder_wählen += '<h3>Beziehungssammlungen</h3><div class="export_zum_titel_gehoerig"><div class="well well-sm" style="margin-top:9px;"><b>Sie können aus zwei Varianten wählen</b> <a href="#" class="show_next_hidden">...mehr</a><ol class="adb-hidden"><li>Pro Beziehung eine Zeile (Standardeinstellung):<ul><li>Für jede Art oder Lebensraum wird pro Beziehung eine neue Zeile erzeugt</li><li>Anschliessende Auswertungen sind so meist einfacher auszuführen</li><li>Dafür können Sie aus maximal einer Beziehungssammlung Felder wählen (aber wie gewohnt mit beliebig vielen Feldern aus Taxonomie(n) und Eigenschaftensammlungen ergänzen)</li></ul></li><li>Pro Art/Lebensraum eine Zeile und alle Beziehungen kommagetrennt in einem Feld:<ul><li>Von allen Beziehungen der Art oder des Lebensraums wird der Inhalt des Feldes kommagetrennt in das Feld der einzigen Zeile geschrieben</li><li>Sie können Felder aus beliebigen Beziehungssammlungen gleichzeitig exportieren</li></ul></li></ol></div><div class="radio"><label><input type="radio" id="export' + _alt + '_bez_in_zeilen" checked="checked" name="export_bez_wie">Pro Beziehung eine Zeile</label></div><div class="radio"><label><input type="radio" id="export' + _alt + '_bez_in_feldern" name="export_bez_wie">Pro Art/Lebensraum eine Zeile und alle Beziehungen kommagetrennt in einem Feld</label></div></div><hr>';
        html_filtern += '<h3>Beziehungssammlungen</h3>';
    }
    _.each(taxonomien, function (taxonomie, index) {
        if (index > 0) {
            html_felder_wählen += '<hr>';
            html_filtern += '<hr>';
        }

        html_felder_wählen += '<h5>' + taxonomie.Name;
        html_filtern += '<h5>' + taxonomie.Name;
        // informationen zur ds holen
        dsbs_von_objekt = _.find(dsbs_von_objekten, function (array) {
            return array[0] === taxonomie.Name;
        });
        if (dsbs_von_objekt && dsbs_von_objekt[1]) {
            html_felder_wählen += ' <a href="#" class="show_next_hidden_export">...mehr</a>';
            html_filtern += ' <a href="#" class="show_next_hidden_export">...mehr</a>';
            // ds-titel abschliessen
            html_felder_wählen += '</h5>';
            html_filtern += '</h5>';
            // Felder der ds darstellen
            html_felder_wählen += '<div class="adb-hidden">';
            html_filtern += '<div class="adb-hidden">';
            ds_felder_objekt = dsbs_von_objekt[1];
            _.each(ds_felder_objekt, function (feldwert, feldname) {
                if (feldname === "zusammenfassend") {
                    // nicht sagen, woher die Infos stammen, weil das Objekt-abhängig ist
                    html = '<div class="ds_beschreibung_zeile"><div>Zus.-fassend:</div><div>Diese Datensammlung fasst die Daten mehrerer Eigenschaftensammlungen in einer zusammen</div></div>';
                    html_felder_wählen += html;
                    html_filtern += html;
                } else if (feldname !== "Ursprungsdatensammlung") {
                    html = '<div class="ds_beschreibung_zeile"><div>' + feldname + ':</div><div>' + Autolinker.link(feldwert) + '</div></div>';
                    html_felder_wählen += html;
                    html_filtern += html;
                }
            });
            html_felder_wählen += '</div>';
            html_filtern += '</div>';
        } else {
            // ds-titel abschliessen
            html_felder_wählen += '</h5>';
            html_filtern += '</h5>';
        }

        // jetzt die checkbox um alle auswählen zu können
        // aber nur, wenn mehr als 1 Feld existieren
        if ((taxonomie.Eigenschaften && _.size(taxonomie.Eigenschaften) > 1) || (taxonomie.Beziehungen && _.size(taxonomie.Beziehungen) > 1)) {
            html_felder_wählen += '<div class="checkbox"><label>';
            html_felder_wählen += '<input class="feld_waehlen_alle_von_ds' + _alt + '" type="checkbox" DsTyp="'+ds_typ+'" Datensammlung="' + taxonomie.Name + '"><em>alle</em>';
            html_felder_wählen += '</div></label>';
        }
        html_felder_wählen += '<div class="felderspalte">';


        html_filtern += '<div class="felderspalte">';
        for (var x in (taxonomie.Eigenschaften || taxonomie.Beziehungen)) {
            // felder wählen
            html_felder_wählen += '<div class="checkbox"><label>';
            html_felder_wählen += '<input class="feld_waehlen" type="checkbox" DsTyp="'+ds_typ+'" Datensammlung="' + taxonomie.Name + '" Feld="' + x + '">' + x;
            html_felder_wählen += '</div></label>';
            // filtern
            html_filtern += '<div class="form-group">';
            html_filtern += '<label class="control-label" for="exportieren_objekte_waehlen_ds_' + ersetzeUngueltigeZeichenInIdNamen (x) + '"';
            // Feldnamen, die mehr als eine Zeile belegen: Oben ausrichten
            if (x.length > 28) {
                html_filtern += ' style="padding-top:0px"';
            }
            html_filtern += '>' + x + '</label>';
            //if (taxonomie.Feldtyp === "boolean") {
            if ((taxonomie.Eigenschaften && (taxonomie.Eigenschaften[x] === "boolean")) || (taxonomie.Beziehungen && (taxonomie.Beziehungen[x] === "boolean"))) {
                // in einer checkbox darstellen
                // readonly markiert, dass kein Wert erfasst wurde
                html_filtern += '<input class="controls form-control export_feld_filtern form-control" type="checkbox" id="exportieren_objekte_waehlen_ds_' + ersetzeUngueltigeZeichenInIdNamen (x) + '" DsTyp="' + ds_typ + '" Eigenschaft="' + taxonomie.Name + '" Feld="' + x + '" readonly>';
            } else {
                // in einem input-feld darstellen
                html_filtern += '<input class="controls form-control export_feld_filtern form-control input-sm" type="text" id="exportieren_objekte_waehlen_ds_' + ersetzeUngueltigeZeichenInIdNamen (x) + '" DsTyp="' + ds_typ + '" Eigenschaft="' + taxonomie.Name + '" Feld="' + x + '">';
            }
            html_filtern += '</div>';
        }
        // Spalten abschliessen
        html_felder_wählen += '</div>';
        html_filtern += '</div>';
    });
    // linie voranstellen
    html_felder_wählen = '<hr>' + html_felder_wählen;
    html_filtern = '<hr>' + html_filtern;

    // html anfügen
    if (!formular || formular === 'export') {
        if (beziehungssammlungen) {
            $("#exportieren_felder_waehlen_felderliste")
                .html(html_felder_wählen);
            $("#exportieren_objekte_waehlen_ds_felderliste")
                .html(html_filtern);
            erstelleExportfelder(datensammlungen, beziehungssammlungen);
        } else if (datensammlungen) {
            $("#exportieren_felder_waehlen_felderliste")
                .append(html_felder_wählen);
            $("#exportieren_objekte_waehlen_ds_felderliste")
                .append(html_filtern);
            erstelleExportfelder(datensammlungen);
        } else {
            $("#exportieren_felder_waehlen_felderliste")
                .append(html_felder_wählen);
            $("#exportieren_objekte_waehlen_ds_felderliste")
                .append(html_filtern)
                .find("input[type='checkbox']").each(function () {
                   this.indeterminate = true;
                });
        }
    }
    if (formular === 'export_alt') {
        if (beziehungssammlungen) {
            $("#exportieren_alt_felder_waehlen_felderliste")
                .html(html_felder_wählen);
            erstelleExportfelder(datensammlungen, beziehungssammlungen, null, 'export_alt');
        } else if (datensammlungen) {
            $("#exportieren_alt_felder_waehlen_felderliste")
                .append(html_felder_wählen);
            erstelleExportfelder(datensammlungen, null, null, 'export_alt');
        } else {
            $("#exportieren_alt_felder_waehlen_felderliste")
                .append(html_felder_wählen);
            // Rückmeldung ausblenden
            $("#exportieren_alt_felder_waehlen_hinweis_text")
                .hide();
        }
    }   
};

module.exports = erstelleExportfelder;