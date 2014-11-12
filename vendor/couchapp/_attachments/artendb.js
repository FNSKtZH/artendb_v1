/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/

window.adb = window.adb || {};

var $ = require('jquery'),
    _ = require('underscore');

// wird in index.html benutzt
window.adb.meldeUserAb = function () {
    'use strict';
    require('./adbModules/login/meldeUserAb')();
};

// wird in index.html benutzt
window.adb.handleBsNameChange = function () {
    'use strict';
    require('./adbModules/import/handleBsNameChange')(this);
};

// wird in index.html benutzt
window.adb.handleDsImportiertVonChange = function () {
    'use strict';
    require('./adbModules/import/handleDsImportiertVonChange')();
};

// Wenn BsImportiertVon geändert wird
// Kontrollieren, dass es die email der angemeldeten Person ist
window.adb.handleBsImportiertVonChange = function () {
    'use strict';
    $("#BsImportiertVon").val(localStorage.Email);
    $("#importieren_bs_ds_beschreiben_hinweis2")
        .alert()
        .removeClass("alert-success")
        .removeClass("alert-danger")
        .addClass("alert-info")
        .show();
    $("#importieren_bs_ds_beschreiben_hinweis_text2").html('"importiert von" ist immer die email-Adresse der angemeldeten Person');
    setTimeout(function () {
        $("#importieren_bs_ds_beschreiben_hinweis2")
            .alert()
            .hide();
    }, 10000);
};

// wenn BsZusammenfassend geändert wird
// BsUrsprungsBs_div zeigen oder verstecken
window.adb.handleBsZusammenfassendChange = function () {
    'use strict';
    if ($(this).prop('checked')) {
        $("#BsUrsprungsBs_div").show();
    } else {
        $("#BsUrsprungsBs_div").hide();
    }
};

// wenn DsZusammenfassend geändert wird
// DsUrsprungsDs zeigen oder verstecken
window.adb.handleDsZusammenfassendChange = function () {
    'use strict';
    if ($(this).prop('checked')) {
        $("#DsUrsprungsDs_div").show();
    } else {
        $("#DsUrsprungsDs_div").hide();
    }
};

// Wenn BsWählen geändert wird
// wird in index.html benutzt
window.adb.handleBsWaehlenChange = function () {
    'use strict';
    require('./adbModules/import/handleBsWaehlenChange')(this);
};

// wird in index.html benutzt
window.adb.handleDsFileChange = function () {
    'use strict';
    require('./adbModules/import/handleDsFileChange')(event);
};

// wird in index.html benutzt
window.adb.handleBsFileChange = function () {
    'use strict';
    require('./adbModules/import/handleBsFileChange')(event);
};

// wird in index.html benutzt
window.adb.handleBtnResizeClick = function () {
    'use strict';
    require('./adbModules/handleBtnResizeClick')();
};

// wenn menu_btn geklickt wird
// Menu: Links zu Google Bilder und Wikipedia nur aktiv setzen, wenn Art oder Lebensraum angezeigt wird
window.adb.handleMenuBtnClick = function () {
    'use strict';
    if (localStorage.art_id) {
        $("#GoogleBilderLink_li").removeClass("disabled");
        $("#WikipediaLink_li").removeClass("disabled");
    } else {
        $("#GoogleBilderLink_li").addClass("disabled");
        $("#WikipediaLink_li").addClass("disabled");
    }
};

// wenn ds_importieren geklickt wird
// testen, ob der Browser das Importieren unterstützt
// wenn nein, Meldung bringen (macht die aufgerufene Funktion)
window.adb.handleDsImportierenClick = function () {
    'use strict';
    var zeigeFormular      = require('./adbModules/zeigeFormular'),
        pruefeAnmeldung    = require('./adbModules/login/pruefeAnmeldung'),
        isFileAPIAvailable = require('./adbModules/isFileAPIAvailable');

    if (isFileAPIAvailable()) {
        zeigeFormular("importieren_ds");
        // Ist der User noch angemeldet? Wenn ja: Anmeldung überspringen
        if (pruefeAnmeldung("ds")) {
            $("#importieren_ds_ds_beschreiben_collapse").collapse('show');
        }
    }
};

// wenn bs_importieren geklickt wird
// testen, ob der Browser das Importieren unterstützt
// wenn nein, Meldung bringen (macht die aufgerufene Funktion)
window.adb.handleBsImportierenClick = function () {
    'use strict';
    var zeigeFormular      = require('./adbModules/zeigeFormular'),
        pruefeAnmeldung    = require('./adbModules/login/pruefeAnmeldung'),
        isFileAPIAvailable = require('./adbModules/isFileAPIAvailable');

    if (isFileAPIAvailable()) {
        zeigeFormular("importieren_bs");
        // Ist der User noch angemeldet? Wenn ja: Anmeldung überspringen
        if (pruefeAnmeldung("bs")) {
            $("#importieren_bs_ds_beschreiben_collapse").collapse('show');
        }
    }
};

window.adb.handleMenuAdminClick = function () {
    'use strict';
    var zeigeFormular = require('./adbModules/zeigeFormular');
    zeigeFormular("admin");
};

// wird in index.html benutzt
window.adb.ergaenzePilzeZhgis = function () {
    'use strict';
    require('./adbModules/admin/ergaenzePilzeZhgis')();
};

// wird in index.html benutzt
window.adb.korrigiereArtwertnameInFlora = function () {
    'use strict';
    require('./adbModules/admin/korrigiereArtwertnameInFlora')();
};

// wird in index.html benutzt
window.adb.korrigiereDsNameFloraChRoteListe1991 = function () {
    'use strict';
    require('./adbModules/admin/korrigiereDsNameFloraChRoteListe1991')();
};

// wird in index.html benutzt
window.adb.nenneDsUm = function () {
    'use strict';
    require('./adbModules/admin/nenneDsUm')();
};

// wird in index.html benutzt
window.adb.baueDsZuEigenschaftenUm = function () {
    'use strict';
    require('./adbModules/admin/baueDsZuEigenschaftenUm')();
};

// wenn importieren_ds_ds_beschreiben_collapse geöffnet wird
window.adb.handleImportierenDsDsBeschreibenCollapseShown = function () {
    'use strict';
    // mitgeben, woher die Anfrage kommt, weil ev. angemeldet werden muss
    require('./adbModules/import/bereiteImportierenDsBeschreibenVor')("ds");
    $("#DsImportiertVon").val(localStorage.Email);
};

// wenn importieren_bs_ds_beschreiben_collapse geöffnet wird
window.adb.handleImportierenBsDsBeschreibenCollapseShown = function () {
    'use strict';
    var bereiteImportierenBsBeschreibenVor = require('./adbModules/import/bereiteImportierenBsBeschreibenVor');
    // mitgeben, woher die Anfrage kommt, weil ev. angemeldet werden muss
    bereiteImportierenBsBeschreibenVor("bs");
    $("#BsImportiertVon").val(localStorage.Email);
};

// wenn importieren_ds_daten_uploaden_collapse geöffnet wird
window.adb.handleImportierenDsDatenUploadenCollapseShown = function () {
    'use strict';
    var pruefeAnmeldung = require('./adbModules/login/pruefeAnmeldung');

    if (!pruefeAnmeldung("ds")) {
        $(this).collapse('hide');
    } else {
        $('#DsFile').fileupload();
    }
    $('html, body').animate({
        scrollTop: $("#importieren_ds_daten_uploaden_collapse").offset().top
    }, 2000);
};

// wenn importieren_bs_daten_uploaden_collapse geöffnet wird
window.adb.handleImportierenBsDatenUpladenCollapseShown = function () {
    'use strict';
    var pruefeAnmeldung = require('./adbModules/login/pruefeAnmeldung');

    if (!pruefeAnmeldung("bs")) {
        $(this).collapse('hide');
    } else {
        $('#BsFile').fileupload();
    }
    $('html, body').animate({
        scrollTop: $("#importieren_bs_daten_uploaden_collapse").offset().top
    }, 2000);
};

// wenn importieren_ds_ids_identifizieren_collapse geöffnet wird
window.adb.handleImportierenDsIdsIdentifizierenCollapseShown = function () {
    'use strict';
    var pruefeAnmeldung = require('./adbModules/login/pruefeAnmeldung');

    if (!pruefeAnmeldung("ds")) {
        $(this).collapse('hide');
    }
    $('html, body').animate({
        scrollTop: $("#importieren_ds_ids_identifizieren_collapse").offset().top
    }, 2000);
};

// wenn importieren_bs_ids_identifizieren_collapse geöffnet wird
window.adb.handleImportierenBsIdsIdentifizierenCollapseShown = function () {
    'use strict';
    var pruefeAnmeldung = require('./adbModules/login/pruefeAnmeldung');

    if (!pruefeAnmeldung("bs")) {
        $(this).collapse('hide');
    }
    $('html, body').animate({
        scrollTop: $("#importieren_bs_ids_identifizieren_collapse").offset().top
    }, 2000);
};

// wenn importieren_ds_import_ausfuehren_collapse geöffnet wird
window.adb.handleImportierenDsImportAusfuehrenCollapseShown = function () {
    'use strict';
    var pruefeAnmeldung = require('./adbModules/login/pruefeAnmeldung');

    if (!pruefeAnmeldung("ds")) {
        $(this).collapse('hide');
    }
    $('html, body').animate({
        scrollTop: $("#importieren_ds_import_ausfuehren_collapse").offset().top
    }, 2000);
};

// wenn importieren_bs_import_ausfuehren_collapse geöffnet wird
window.adb.handleImportierenBsImportAusfuehrenCollapseShown = function () {
    'use strict';
    var pruefeAnmeldung = require('./adbModules/login/pruefeAnmeldung');

    if (!pruefeAnmeldung("bs")) {
        $(this).collapse('hide');
    }
    $('html, body').animate({
        scrollTop: $("#importieren_bs_import_ausfuehren_collapse").offset().top
    }, 2000);
};

// wenn DsWählen geändert wird
// wird in index.html benutzt
window.adb.handleDsWaehlenChange = function () {
    'use strict';
    require('./adbModules/import/handleDsWaehlenChange')(this);
};

// wird in index.html benutzt
window.adb.handleDsNameChange = function () {
    'use strict';
    require('./adbModules/import/handleDsNameChange')(this);
};

// wenn DsLöschen geklickt wird
window.adb.handleDsLoeschenClick = function () {
    'use strict';
    var entferneDatensammlungAusAllenObjekten = require('./adbModules/import/entferneDatensammlungAusAllenObjekten');
    // Rückmeldung anzeigen
    $("#importieren_ds_ds_beschreiben_hinweis")
        .alert()
        .show()
        .html("Bitte warten: Die Datensammlung wird entfernt...");
    entferneDatensammlungAusAllenObjekten($("#DsName").val());
};

// wenn BsLoeschen geklickt wird
window.adb.handleBsLoeschenClick = function () {
    'use strict';
    var entferneBeziehungssammlungAusAllenObjekten = require('./adbModules/import/entferneBeziehungssammlungAusAllenObjekten');
    // Rückmeldung anzeigen
    $("#importieren_bs_ds_beschreiben_hinweis")
        .alert()
        .removeClass("alert-success")
        .removeClass("alert-danger")
        .addClass("alert-info")
        .show();
    $("#importieren_bs_ds_beschreiben_hinweis_text").html("Bitte warten: Die Beziehungssammlung wird entfernt...");
    entferneBeziehungssammlungAusAllenObjekten($("#BsName").val());
};

// wenn exportieren geklickt wird
window.adb.handleExportierenClick = function () {
    'use strict';
    var zeigeFormular = require('./adbModules/zeigeFormular');
    zeigeFormular("export");
    delete window.adb.exportieren_objekte;
};

// wenn exportieren_alt geklickt wird
window.adb.handleExportierenAltClick = function () {
    'use strict';
    window.open("_list/export_alt_mit_synonymen_standardfelder/all_docs_mit_synonymen_fuer_alt?include_docs=true");
};

// wird in index.html benutzt
window.adb.handleFeldWaehlenChange = function () {
    'use strict';
    return require('./adbModules/export/handleFeldWaehlenChange')(this);
};

// wird in index.html benutzt
window.adb.handleFeldWaehlenAlleVonDs = function () {
    'use strict';
    require('./adbModules/export/handleFeldWaehlenAlleVonDs')(this);
};

// wenn exportieren_ds_objekte_waehlen_gruppe geändert wird
window.adb.handleExportierenDsObjekteWaehlenGruppeChange = function () {
    'use strict';
    var gruppenGewaehlt = window.adb.fuerExportGewaehlteGruppen();
    require('./adbModules/export/erstelleListeFuerFeldwahl')(gruppenGewaehlt);
};

// ist nötig, weil index.html nicht requiren kann
// wird in index.html benutzt
window.adb.handleExportFeldFilternChange = function () {
    'use strict';
    require('./adbModules/export/handleExportFeldFilternChange')(this);
};

// wenn exportieren_exportieren angezeigt wird
// zur Schaltfläche Vorschau scrollen
window.adb.handleExportierenExportierenShow = function () {
    'use strict';
    // Fehlermeldung verstecken, falls sie noch offen war
    $("#exportieren_exportieren_error_text")
        .alert()
        .hide();
    $('html, body').animate({
        scrollTop: $("#exportieren_exportieren_tabelle_aufbauen").offset().top
    }, 2000);
};

// wenn .btn.lr_bearb_bearb geklickt wird
window.adb.handleBtnLrBearbBearbKlick = function () {
    'use strict';
    var bearbeiteLrTaxonomie = require('./adbModules/lr/bearbeiteLrTaxonomie');
    if (!$(this).hasClass('disabled')) {
        bearbeiteLrTaxonomie();
    }
};

// wird in index.html benutzt
window.adb.handleBtnLrBearbSchuetzenClick = function () {
    'use strict';
    require('./adbModules/lr/handleBtnLrBearbSchuetzenClick')(this);
};

// wird in index.html benutzt
window.adb.handleBtnLrBearbNeuClick = function () {
    'use strict';
    require('./adbModules/lr/handleBtnLrBearbNeuClick')(this);
};

// wenn #lr_parent_waehlen_optionen [name="parent_optionen"] geändert wird
// wird in index.html benutzt
window.adb.handleLrParentOptionenChange = function () {
    'use strict';
    require('./adbModules/lr/handleLrParentOptionenChange')(this);
};

// wird in index.html benutzt
window.adb.handleRueckfrageLrLoeschenJaClick = function () {
    'use strict';
    require('./adbModules/lr/handleRueckfrageLrLoeschenJaClick')();
};

// Wenn #art .Lebensräume.Taxonomie .controls geändert wird
// wird in index.html benutzt
window.adb.handleLrTaxonomieControlsChange = function () {
    'use strict';
    require('./adbModules/speichern')($(this).val(), this.id);
};

// wenn .Lebensräume.Taxonomie geöffnet wird
window.adb.handlePanelbodyLrTaxonomieShown = function () {
    'use strict';
    var bearbeiteLrTaxonomie = require('./adbModules/lr/bearbeiteLrTaxonomie');
    if (localStorage.lrBearb === "true") {
        bearbeiteLrTaxonomie();
    }
};

// wird in index.html benutzt
window.adb.handleExportierenExportierenCollapseShown = function (that) {
    'use strict';
    require('./adbModules/export/handleExportierenExportierenCollapseShown')(that);
};

// wird in index.html benutzt
window.adb.scrollThisToTop = function (that, minus) {
    'use strict';
    require('./adbModules/scrollThisToTop')(that, minus);
};

// wird in index.html benutzt
window.adb.handleExportierenObjekteWaehlenCollapseShown = function () {
    'use strict';
    require('./adbModules/export/handleExportierenObjekteWaehlenCollapseShown')(this);
};

// wird in index.html benutzt
window.adb.handleExportierenObjekteTaxonomienZusammenfassenClick = function (that) {
    'use strict';
    require('./adbModules/export/handleExportierenObjekteTaxonomienZusammenfassenClick')(that);
};

// wird in index.html benutzt
window.adb.handleExportierenExportierenExportierenClick = function () {
    'use strict';
    require('./adbModules/export/handleExportierenExportierenExportierenClick')();
};

// wenn .panel geöffnet wird
// Höhe der textareas an Textgrösse anpassen
window.adb.handlePanelShown = function () {
    'use strict';
    var fitTextareaToContent = require('./adbModules/fitTextareaToContent');

    $(this).find('textarea').each(function () {
        fitTextareaToContent(this.id);
    });
};

// wenn .LinkZuArtGleicherGruppe geklickt wird
window.adb.handleLinkZuArtGleicherGruppeClick = function (id) {
    'use strict';
    $(".suchen").val("");
    $("#tree" + window.adb.gruppe)
        .jstree("clear_search")
        .jstree("deselect_all")
        .jstree("close_all", -1)
        .jstree("select_node", "#" + id);
};

// wenn Fenstergrösse verändert wird
window.adb.handleResize = function () {
    'use strict';
    var setzeTreehoehe       = require('./adbModules/jstree/setzeTreehoehe'),
        fitTextareaToContent = require('./adbModules/fitTextareaToContent');

    setzeTreehoehe();
    // Höhe der Textareas korrigieren
    $('#forms').find('textarea').each(function () {
        fitTextareaToContent(this.id);
    });
};

// wenn .anmelden_btn geklickt wird
window.adb.handleAnmeldenBtnClick = function (that) {
    'use strict';
    var meldeUserAn = require('./adbModules/login/meldeUserAn');
    // es muss mitgegeben werden, woher die Anmeldung kam, damit die email aus dem richtigen Feld geholt werden kann
    var bs_ds = that.id.substring(that.id.length-2);
    if (bs_ds === "rt") {
        bs_ds = "art";
    }
    meldeUserAn(bs_ds);
};

// wenn .Email keyup
window.adb.handleEmailKeyup = function () {
    'use strict';
    //allfällig noch vorhandenen Hinweis ausblenden
    $(".Emailhinweis").hide();
};

// wenn .Passwort keyup
window.adb.handlePasswortKeyup = function () {
    'use strict';
    //allfällig noch vorhandenen Hinweis ausblenden
    $(".Passworthinweis").hide();
};

// wenn .Passwort2 keyup
window.adb.handlePasswort2Keyup = function () {
    'use strict';
    //allfällig noch vorhandenen Hinweis ausblenden
    $(".Passworthinweis2").hide();
};

// wenn .konto_erstellen_btn geklickt wird
window.adb.handleKontoErstellenBtnClick = function (that) {
    'use strict';
    var bsDs = that.id.substring(that.id.length-2);
    if (bsDs === "rt") {
        bsDs = "art";
    }
    $(".signup").show();
    $(".anmelden_btn").hide();
    $(".abmelden_btn").hide();
    $(".konto_erstellen_btn").hide();
    $(".konto_speichern_btn").show();
    $(".importieren_anmelden_fehler").hide();
    setTimeout(function () {
        $("#Email_" + bsDs).focus();
    }, 50);  // need to use a timer so that .blur() can finish before you do .focus()
};

// wenn .konto_speichern_btn geklickt wird
window.adb.handleKontoSpeichernBtnClick = function (that) {
    'use strict';
    var bsDs = that.id.substring(that.id.length - 2),
        validiereSignup = require('./adbModules/login/validiereSignup'),
        erstelleKonto   = require('./adbModules/login/erstelleKonto');

    if (bsDs === "rt") {
        bsDs = "art";
    }
    if (validiereSignup(bsDs)) {
        erstelleKonto(bsDs);
        // Anmeldefenster zurücksetzen
        $(".signup").hide();
        $(".anmelden_btn").hide();
        $(".abmelden_btn").show();
        $(".konto_erstellen_btn").hide();
        $(".konto_speichern_btn").hide();
    }
};

// wenn .gruppe geklickt wird
window.adb.handleOeffneGruppeClick = function () {
    'use strict';
    require('./adbModules/oeffneGruppe')($(this).attr("Gruppe"));
};

// wenn #DsFelder geändert wird
window.adb.handleDsFelderChange = function () {
    'use strict';
    require('./adbModules/import/meldeErfolgVonIdIdentifikation')('Ds');
};

// wenn #BsFelder geändert wird
window.adb.handleBsFelderChange = function () {
    'use strict';
    require('./adbModules/import/meldeErfolgVonIdIdentifikation')('Bs');
};

// wenn #DsId geändert wird
window.adb.handleDsIdChange = function () {
    'use strict';
    require('./adbModules/import/meldeErfolgVonIdIdentifikation')('Ds');
};

// wenn #BsId geändert wird
window.adb.handleBsIdChange = function () {
    'use strict';
    require('./adbModules/import/meldeErfolgVonIdIdentifikation')('Bs');
};

// wenn in textarea keyup oder focus
window.adb.handleTextareaKeyupFocus = function () {
    'use strict';
    require('./adbModules/fitTextareaToContent')(this.id);
};

// wird in index.html benutzt
window.adb.importiereDatensammlung = function () {
    'use strict';
    require('./adbModules/import/importiereDatensammlung')();
};

// wird in index.html benutzt
window.adb.importiereBeziehungssammlung = function () {
    'use strict';
    require('./adbModules/import/importiereBeziehungssammlung')();
};

// wird in index.html benutzt
window.adb.entferneDatensammlung = function () {
    'use strict';
    require('./adbModules/import/entferneDatensammlung')();
};

// wird in index.html benutzt
window.adb.entferneBeziehungssammlung = function () {
    'use strict';
    require('./adbModules/import/entferneBeziehungssammlung')();
};

// übernimmt die id des zu verändernden Dokuments
// und den Namen der Datensammlung, die zu entfernen ist
// entfernt die Datensammlung
window.adb.entferneDatensammlungAusDokument = function (id, dsName) {
    'use strict';
    var $db = $.couch.db('artendb');
    $db.openDoc(id, {
        success: function (doc) {
            // Datensammlung entfernen
            if (doc.Eigenschaftensammlungen) {
                doc.Eigenschaftensammlungen = _.reject(doc.Eigenschaftensammlungen, function (datensammlung) {
                    return datensammlung.Name === dsName;
                });
                // in artendb speichern
                $db.saveDoc(doc);
                // mitteilen, dass eine ds entfernt wurde
                $(document).trigger('adb.dsEntfernt');
                // TODO: Scheitern abfangen (trigger adb.ds_nicht_entfernt)
            }
        }
    });
};

// übernimmt die id des zu verändernden Dokuments
// und den Namen der Beziehungssammlung, die zu entfernen ist
// entfernt die Beziehungssammlung
window.adb.entferneBeziehungssammlungAusDokument = function (id, bsName) {
    'use strict';
    var $db = $.couch.db('artendb');
    $db.openDoc(id, {
        success: function (doc) {
            // Beziehungssammlung entfernen
            doc.Beziehungssammlungen = _.reject(doc.Beziehungssammlungen, function (beziehungssammlung) {
                return beziehungssammlung.Name === bsName;
            });
            // in artendb speichern
            $db.saveDoc(doc);
            // mitteilen, dass eine ds entfernt wurde
            $(document).trigger('adb.bsEntfernt');
            // TODO: Scheitern abfangen (trigger adb.ds_nicht_entfernt)
        }
    });
};

// wird in index.html benutzt
window.adb.oeffneUri = function () {
    'use strict';
    require('./adbModules/oeffneUri')();
};

// wird in index.html benutzt
window.adb.filtereFürExport = function (direkt) {
    'use strict';
    require('./adbModules/export/filtereFuerExport')(direkt);
};

window.adb.fuerExportGewaehlteGruppen = function () {
    'use strict';
    var export_gruppen = [];
    $(".exportieren_ds_objekte_waehlen_gruppe").each(function () {
        if ($(this).prop('checked')) {
            export_gruppen.push($(this).val());
        }
    });
    return export_gruppen;
};

// wird in index.html benutzt
window.adb.exportZuruecksetzen = function (event, _alt) {
    'use strict';
    require('./adbModules/export/exportZuruecksetzen')(event, _alt);
};

window.adb.erstelleHierarchieobjektAusObjekt = function (objekt) {
    'use strict';
    var hierarchieobjekt = {};
    hierarchieobjekt.Name = window.adb.erstelleLrLabelNameAusObjekt(objekt);
    hierarchieobjekt.GUID = objekt._id;
    return hierarchieobjekt;
};

window.adb.erstelleLrLabelNameAusObjekt = function (objekt) {
    'use strict';
    var label = objekt.Taxonomie.Eigenschaften.Label || "",
        einheit = objekt.Taxonomie.Eigenschaften.Einheit || "";
    return window.adb.erstelleLrLabelName(label, einheit);
};

window.adb.erstelleLrLabelName = function (label, einheit) {
    'use strict';
    if (label && einheit) return label + ": " + einheit;
    if (einheit)          return                einheit;
    // aha, ein neues Objekt, noch ohne Label und Einheit
    return "unbenannte Einheit";
};

// wird in index.html benutzt
window.adb.initiiereApp = function () {
    'use strict';
    require('./adbModules/initiiereApp')();
};

// wird in index.html benutzt
window.adb.showNextHidden = function (that) {
    'use strict';
    require('./adbModules/showNextHidden')(that);
};

// wird in index.html benutzt
window.adb.showNextHiddenExport = function (that) {
    'use strict';
    require('./adbModules/export/showNextHiddenExport')(that);
};

/*
* Bootstrap file uploader
* Quelle: //jasny.github.io/bootstrap
*/
/**
* Bootstrap.js by @mdo and @fat, extended by @ArnoldDaniels.
* plugins: bootstrap-fileupload.js
* Copyright 2012 Twitter, Inc.
* //apache.org/licenses/LICENSE-2.0.txt
*/
!function (e){var t=function (t,n){this.$element=e(t),this.type=this.$element.data("uploadtype")||(this.$element.find(".thumbnail").length>0?"image":"file"),this.$input=this.$element.find(":file");if(this.$input.length===0)return;this.name=this.$input.attr("name")||n.name,this.$hidden=this.$element.find('input[type=hidden][name="'+this.name+'"]'),this.$hidden.length===0&&(this.$hidden=e('<input type="hidden" />'),this.$element.prepend(this.$hidden)),this.$preview=this.$element.find(".fileupload-preview");var r=this.$preview.css("height");this.$preview.css("display")!="inline"&&r!="0px"&&r!="none"&&this.$preview.css("line-height",r),this.original={exists:this.$element.hasClass("fileupload-exists"),preview:this.$preview.html(),hiddenVal:this.$hidden.val()},this.$remove=this.$element.find('[data-dismiss="fileupload"]'),this.$element.find('[data-trigger="fileupload"]').on("click.fileupload",e.proxy(this.trigger,this)),this.listen()};t.prototype={listen:function (){this.$input.on("change.fileupload",e.proxy(this.change,this)),e(this.$input[0].form).on("reset.fileupload",e.proxy(this.reset,this)),this.$remove&&this.$remove.on("click.fileupload",e.proxy(this.clear,this))},change:function (e,t){if(t==="clear")return;var n=e.target.files!==undefined?e.target.files[0]:e.target.value?{name:e.target.value.replace(/^.+\\/,"")}:null;if(!n){this.clear();return}this.$hidden.val(""),this.$hidden.attr("name",""),this.$input.attr("name",this.name);if(this.type==="image"&&this.$preview.length>0&&(typeof n.type!="undefined"?n.type.match("image.*"):n.name.match(/\.(gif|png|jpe?g)$/i))&&typeof FileReader!="undefined"){var r=new FileReader,i=this.$preview,s=this.$element;r.onload=function (e){i.html('<img src="'+e.target.result+'" '+(i.css("max-height")!="none"?'style="max-height: '+i.css("max-height")+';"':"")+" />"),s.addClass("fileupload-exists").removeClass("fileupload-new")},r.readAsDataURL(n)}else this.$preview.text(n.name),this.$element.addClass("fileupload-exists").removeClass("fileupload-new")},clear:function (e){this.$hidden.val(""),this.$hidden.attr("name",this.name),this.$input.attr("name","");if(navigator.userAgent.match(/msie/i)){var t=this.$input.clone(!0);this.$input.after(t),this.$input.remove(),this.$input=t}else this.$input.val("");this.$preview.html(""),this.$element.addClass("fileupload-new").removeClass("fileupload-exists"),e&&(this.$input.trigger("change",["clear"]),e.preventDefault ? e.preventDefault() : e.returnValue = false)},reset:function (e){this.clear(),this.$hidden.val(this.original.hiddenVal),this.$preview.html(this.original.preview),this.original.exists?this.$element.addClass("fileupload-exists").removeClass("fileupload-new"):this.$element.addClass("fileupload-new").removeClass("fileupload-exists")},trigger:function (e){this.$input.trigger("click"),e.preventDefault ? e.preventDefault() : e.returnValue = false}},e.fn.fileupload=function (n){return this.each(function (){var r=e(this),i=r.data("fileupload");i||r.data("fileupload",i=new t(this,n)),typeof n=="string"&&i[n]()})},e.fn.fileupload.Constructor=t,e(document).on("click.fileupload.data-api",'[data-provides="fileupload"]',function (t){var n=e(this);if(n.data("fileupload"))return;n.fileupload(n.data());var r=e(t.target).closest('[data-dismiss="fileupload"],[data-trigger="fileupload"]');r.length>0&&(r.trigger("click.fileupload"),t.preventDefault())})}(window.jQuery);