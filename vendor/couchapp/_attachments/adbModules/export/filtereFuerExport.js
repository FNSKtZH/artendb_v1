// wird aufgerufen durch eine der zwei Schaltflächen: "Vorschau anzeigen", "direkt exportieren"
// direkt: list-funktion aufrufen, welche die Daten direkt herunterlädt

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var _ = require('underscore'),
    $ = require('jquery');

// $ wird benötigt wegen .alert
module.exports = function (direkt, fuerAlt) {
    // Array von Filterobjekten bilden
    var filterkriterien           = [],
        // Objekt bilden, in das die Filterkriterien integriert werden, da ein array schlecht über die url geliefert wird
        filterkriterienObjekt     = {},
        filterObjekt,
        gruppenArray              = [],
        gruppen                   = "",
        gewaehlteFelder           = [],
        anzGewaehlteFelderAusDsbs = 0,
        gewaehlteFelderObjekt     = {},
        anzDsGewaehlt             = 0,
        htmlFilterkriterien,
        formular                  = 'export',
        _alt                      = '',
        $exportieren_exportieren_hinweis_text,
        uebergebeFilterFuerDirektExport      = require('./uebergebeFilterFuerDirektExport'),
        uebergebeFilterFuerExportMitVorschau = require('./uebergebeFilterFuerExportMitVorschau'),
        uebergebeFilterFuerExportFuerAlt     = require('./uebergebeFilterFuerExportFuerAlt'),
        ermittleVergleichsoperator           = require('./ermittleVergleichsoperator'),
        fuerExportGewaehlteGruppen           = require('./fuerExportGewaehlteGruppen');

    if (fuerAlt) {
        formular = 'export_alt';
        _alt     = '_alt';
    }
    $exportieren_exportieren_hinweis_text = $("#exportieren" + _alt + "_exportieren_hinweis_text");

    // kontrollieren, ob eine Gruppe gewählt wurde
    if (!fuerAlt && fuerExportGewaehlteGruppen().length === 0) {
        return;
    }

    // Beschäftigung melden
    // nicht nötig für ALT, da sehr schnell
    if (!direkt) {
        $exportieren_exportieren_hinweis_text
            .alert()
            .show()
            .html('Die Daten werden vorbereitet...');
        // zum Hinweistext scrollen
        $('html, body').animate({
            scrollTop: $exportieren_exportieren_hinweis_text.offset().top
        }, 2000);
    }

    // gewählte Gruppen ermitteln
    if (!fuerAlt) {
        $(".exportieren_ds_objekte_waehlen_gruppe").each(function () {
            if ($(this).prop('checked')) {
                gruppenArray.push($(this).attr('view'));
                if (gruppen) {
                    gruppen += ",";
                }
                gruppen += $(this).val();
            }
        });
    } else {
        gruppenArray = ['fauna', 'flora'];
        gruppen = 'Fauna, Flora';
    }

    if (!fuerAlt) {
        // durch alle Filterfelder loopen
        // aber nur, wenn nicht für ALT exportiert wird
        // wenn ein Feld einen Wert enthält, danach filtern
        $("#exportieren_objekte_waehlen_ds_collapse").find(".export_feld_filtern").each(function () {
            var that = this,
                $this = $(this);
            if (that.type === "checkbox") {
                if (!$this.prop('readonly')) {
                    filterObjekt            = {};
                    filterObjekt.DsTyp      = $this.attr('dstyp');
                    filterObjekt.DsName     = $this.attr('eigenschaft');
                    filterObjekt.Feldname   = $this.attr('feld');
                    filterObjekt.Filterwert = $this.prop("checked");
                    filterObjekt.Vergleichsoperator = "=";
                    filterkriterien.push(filterObjekt);
                }
                // übrige checkboxen ignorieren
            } else if (this.value || this.value === 0) {
                // Filterobjekt zurücksetzen
                filterObjekt          = {};
                filterObjekt.DsTyp    = $this.attr('dstyp');
                filterObjekt.DsName   = $this.attr('eigenschaft');
                filterObjekt.Feldname = $this.attr('feld');
                // Filterwert in Kleinschrift verwandeln, damit Gross-/Kleinschrift nicht wesentlich ist (Vergleichswerte werden von filtereFürExport später auch in Kleinschrift verwandelt)
                filterObjekt.Filterwert = ermittleVergleichsoperator(this.value)[1];
                filterObjekt.Vergleichsoperator = ermittleVergleichsoperator(this.value)[0];
                filterkriterien.push(filterObjekt);
            }
        });
    }

    // den array dem objekt zuweisen
    filterkriterienObjekt.filterkriterien = filterkriterien;

    // gewählte Felder ermitteln
    $("#" + formular).find(".exportieren_felder_waehlen_objekt_feld.feld_waehlen").each(function () {
        if ($(this).prop('checked')) {
            // feldObjekt erstellen
            var feldObjekt = {};
            feldObjekt.DsName = "Objekt";
            feldObjekt.Feldname = $(this).attr('feldname');
            gewaehlteFelder.push(feldObjekt);
        }
    });
    $("#" + formular).find(".exportieren_felder_waehlen_felderliste").find(".feld_waehlen").each(function () {
        if ($(this).prop('checked')) {
            // feldObjekt erstellen
            var feldObjekt = {};
            feldObjekt.DsTyp = $(this).attr('dstyp');
            if (feldObjekt.DsTyp !== "Taxonomie") {
                anzDsGewaehlt++;
            }
            feldObjekt.DsName = $(this).attr('datensammlung');
            feldObjekt.Feldname = $(this).attr('feld');
            gewaehlteFelder.push(feldObjekt);
            anzGewaehlteFelderAusDsbs++;
        }
    });

    // den array dem objekt zuweisen
    gewaehlteFelderObjekt.felder = gewaehlteFelder;

    // Wenn keine Felder gewählt sind: Melden und aufhören
    if (gewaehlteFelderObjekt.felder.length === 0) {
        // Beschäftigungsmeldung verstecken
        $exportieren_exportieren_hinweis_text
            .alert()
            .hide();
        $("#exportieren" + _alt + "_exportieren_error_text_text")
            .html("Keine Eigenschaften gewählt<br>Bitte wählen Sie Eigenschaften, die exportiert werden sollen");
        $("#exportieren" + _alt + "_exportieren_error_text")
            .alert()
            .show();
        return;
    }

    // html für filterkriterien aufbauen
    htmlFilterkriterien = "Gewählte Filterkriterien:<ul>";
    if (fuerAlt) {
        htmlFilterkriterien = "Gewählte Option:<ul>";
    }
    if ($("#exportieren_synonym_infos").prop('checked')) {
        htmlFilterkriterien += "<li>inklusive Informationen von Synonymen</li>";
    } else {
        htmlFilterkriterien += "<li>Informationen von Synonymen ignorieren</li>";
    }
    if (filterkriterien.length > 0) {
        _.each(filterkriterien, function (filterkriterium) {
            htmlFilterkriterien += "<li>";
            htmlFilterkriterien += "Feld \"" + filterkriterium.Feldname + "\" ";
            if (filterkriterium.Vergleichsoperator !== "kein") {
                htmlFilterkriterien += filterkriterium.Vergleichsoperator + " \"";
            } else {
                htmlFilterkriterien += "enthält \"";
            }
            htmlFilterkriterien += filterkriterium.Filterwert;
            htmlFilterkriterien += "\"</li>";
        });
        htmlFilterkriterien += "</ul>";
    } else if (anzGewaehlteFelderAusDsbs > 0 && !fuerAlt) {
        // wenn Filterkriterien erfasst wurde, werden sowieso nur Datensätze angezeigt, in denen Daten vorkommen
        // daher ist die folgende Info nur interesssant, wenn kein Filter gesetzt wurde
        // und natürlich auch nur, wenn Felder aus DS/BS gewählt wurden
        if ($("#exportieren_nur_objekte_mit_eigenschaften").prop('checked')) {
            htmlFilterkriterien += "<li>Nur Datensätze exportieren, die in den gewählten Eigenschaften- und Beziehungssammlungen Informationen enthalten</li>";
        } else {
            htmlFilterkriterien += "<li>Auch Datensätze exportieren, die in den gewählten Eigenschaften- und Beziehungssammlungen keine Informationen enthalten</li>";
        }
    }
    $("#exportieren" + _alt + "_exportieren_filterkriterien")
        .html(htmlFilterkriterien)
        .show();

    // jetzt das filterObjekt übergeben
    if (direkt === "direkt") {
        uebergebeFilterFuerDirektExport(gruppen, gruppenArray, anzDsGewaehlt, filterkriterienObjekt, gewaehlteFelderObjekt);
    } else if (fuerAlt) {
        uebergebeFilterFuerExportFuerAlt(gewaehlteFelderObjekt);
    } else {
        uebergebeFilterFuerExportMitVorschau(gruppen, gruppenArray, anzDsGewaehlt, filterkriterienObjekt, gewaehlteFelderObjekt);
    }
};