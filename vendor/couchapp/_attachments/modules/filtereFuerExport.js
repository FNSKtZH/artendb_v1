// wird aufgerufen durch eine der zwei Schaltflächen: "Vorschau anzeigen", "direkt exportieren"
// direkt: list-funktion aufrufen, welche die Daten direkt herunterlädt

'use strict';

var _ = require('underscore');

// $ wird benötigt wegen .alert
var returnFunction = function ($, direkt) {
    // Array von Filterobjekten bilden
    var filterkriterien = [],
        // Objekt bilden, in das die Filterkriterien integriert werden, da ein array schlecht über die url geliefert wird
        filterkriterien_objekt = {},
        filter_objekt,
        gruppen_array = [],
        gruppen = "",
        gewählte_felder = [],
        anz_gewählte_felder_aus_dsbs = 0,
        gewählte_felder_objekt = {},
        anz_ds_gewählt = 0,
        $exportieren_exportieren_hinweis_text = $("#exportieren_exportieren_hinweis_text"),
        html_filterkriterien;

    // kontrollieren, ob eine Gruppe gewählt wurde
    if (window.adb.fürExportGewählteGruppen().length === 0) {
        return;
    }

    // Beschäftigung melden
    if (!direkt) {
        $exportieren_exportieren_hinweis_text
            .alert()
            .show()
            .html("Die Daten werden vorbereitet...");
    }

    // zum Hinweistext scrollen
    $('html, body').animate({
        scrollTop: $exportieren_exportieren_hinweis_text.offset().top
    }, 2000);
    // gewählte Gruppen ermitteln
    $("#exportieren_exportieren_exportieren_fuer_alt")
        .addClass("adb-hidden-strictly");
    $(".exportieren_ds_objekte_waehlen_gruppe").each(function() {
        if ($(this).prop('checked')) {
            gruppen_array.push($(this).attr('view'));
            if (gruppen) {
                gruppen += ",";
            }
            gruppen += $(this).val();
        }
    });
    var gruppenliste = gruppen.split(",");
    if (gruppenliste.indexOf("Flora") >= 0 && gruppenliste.indexOf("Fauna") >= 0) {
        // Wenn Flora und Fauna gewählt: Schaltfläche für den Export für das ALT anzeigen
        $("#exportieren_exportieren_exportieren_fuer_alt")
            .removeClass("adb-hidden-strictly");
    }
    // durch alle Filterfelder loopen
    // wenn ein Feld einen Wert enthält, danach filtern
    $("#exportieren_objekte_waehlen_ds_collapse").find(".export_feld_filtern").each(function() {
        var that = this,
            $this = $(this);
        if (that.type === "checkbox") {
            if (!$this.prop('readonly')) {
                filter_objekt = {};
                filter_objekt.DsTyp = $this.attr('dstyp');
                filter_objekt.DsName = $this.attr('eigenschaft');
                filter_objekt.Feldname = $this.attr('feld');
                filter_objekt.Filterwert = $this.prop("checked");
                filter_objekt.Vergleichsoperator = "=";
                filterkriterien.push(filter_objekt);
            } else {
                // übrige checkboxen ignorieren
            }
        } else if (this.value || this.value === 0) {
            // Filterobjekt zurücksetzen
            filter_objekt = {};
            filter_objekt.DsTyp = $this.attr('dstyp');
            filter_objekt.DsName = $this.attr('eigenschaft');
            filter_objekt.Feldname = $this.attr('feld');
            // Filterwert in Kleinschrift verwandeln, damit Gross-/Kleinschrift nicht wesentlich ist (Vergleichswerte werden von filtereFürExport später auch in Kleinschrift verwandelt)
            filter_objekt.Filterwert = window.adb.ermittleVergleichsoperator(this.value)[1];
            filter_objekt.Vergleichsoperator = window.adb.ermittleVergleichsoperator(this.value)[0];
            filterkriterien.push(filter_objekt);
        }
    });

    // den array dem objekt zuweisen
    filterkriterien_objekt.filterkriterien = filterkriterien;
    // gewählte Felder ermitteln
    $(".exportieren_felder_waehlen_objekt_feld.feld_waehlen").each(function() {
        if ($(this).prop('checked')) {
            // feldObjekt erstellen
            var feldObjekt = {};
            feldObjekt.DsName = "Objekt";
            feldObjekt.Feldname = $(this).attr('feldname');
            gewählte_felder.push(feldObjekt);
        }
    });
    $("#exportieren_felder_waehlen_felderliste").find(".feld_waehlen").each(function() {
        if ($(this).prop('checked')) {
            // feldObjekt erstellen
            var feldObjekt = {};
            feldObjekt.DsTyp = $(this).attr('dstyp');
            if (feldObjekt.DsTyp !== "Taxonomie") {
                anz_ds_gewählt++;
            }
            feldObjekt.DsName = $(this).attr('datensammlung');
            feldObjekt.Feldname = $(this).attr('feld');
            gewählte_felder.push(feldObjekt);
            anz_gewählte_felder_aus_dsbs++;
        }
    });
    // den array dem objekt zuweisen
    gewählte_felder_objekt.felder = gewählte_felder;

    // Wenn keine Felder gewählt sind: Melden und aufhören
    if (gewählte_felder_objekt.felder.length === 0) {
        // Beschäftigungsmeldung verstecken
        $exportieren_exportieren_hinweis_text
            .alert()
            .hide();
        $("#exportieren_exportieren_error_text_text")
            .html("Keine Eigenschaften gewählt<br>Bitte wählen Sie Eigenschaften, die exportiert werden sollen");
        $("#exportieren_exportieren_error_text")
            .alert()
            .show();
        return;
    }

    // html für filterkriterien aufbauen
    html_filterkriterien = "Gewählte Filterkriterien:<ul>";
    if ($("#exportieren_synonym_infos").prop('checked')) {
        html_filterkriterien += "<li>inklusive Informationen von Synonymen</li>";
    } else {
        html_filterkriterien += "<li>Informationen von Synonymen ignorieren</li>";
    }
    if (filterkriterien.length > 0) {
        _.each(filterkriterien, function(filterkriterium) {
            html_filterkriterien += "<li>";
            html_filterkriterien += "Feld \"" + filterkriterium.Feldname + "\" ";
            if (filterkriterium.Vergleichsoperator !== "kein") {
                html_filterkriterien += filterkriterium.Vergleichsoperator + " \"";
            } else {
                html_filterkriterien += "enthält \"";
            }
            html_filterkriterien += filterkriterium.Filterwert;
            html_filterkriterien += "\"</li>";
        });
        html_filterkriterien += "</ul>";
    } else if (anz_gewählte_felder_aus_dsbs > 0) {
        // wenn Filterkriterien erfasst wurde, werden sowieso nur Datensätze angezeigt, in denen Daten vorkommen
        // daher ist die folgende Info nur interesssant, wenn kein Filter gesetzt wurde
        // und natürlich auch nur, wenn Felder aus DS/BS gewählt wurden
        if ($("#exportieren_nur_objekte_mit_eigenschaften").prop('checked')) {
            html_filterkriterien += "<li>Nur Datensätze exportieren, die in den gewählten Eigenschaften- und Beziehungssammlungen Informationen enthalten</li>";
        } else {
            html_filterkriterien += "<li>Auch Datensätze exportieren, die in den gewählten Eigenschaften- und Beziehungssammlungen keine Informationen enthalten</li>";
        }
    }
    $("#exportieren_exportieren_filterkriterien")
        .html(html_filterkriterien)
        .show();

    // jetzt das filterObjekt übergeben
    if (direkt === "direkt") {
        window.adb.übergebeFilterFürDirektExport(gruppen, gruppen_array, anz_ds_gewählt, filterkriterien_objekt, gewählte_felder_objekt);
    } if (direkt === "für_alt") {
        window.adb.übergebeFilterFürExportFürAlt(gruppen, gruppen_array, anz_ds_gewählt, filterkriterien_objekt, gewählte_felder_objekt);
    } else {
        window.adb.übergebeFilterFürExportMitVorschau(gruppen, gruppen_array, anz_ds_gewählt, filterkriterien_objekt, gewählte_felder_objekt);
    }
};

module.exports = returnFunction;