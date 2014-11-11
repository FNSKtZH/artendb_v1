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

// wenn DsFile geändert wird
window.adb.handleDsFileChange = function () {
    'use strict';
    var erstelleTabelle = require('./adbModules/erstelleTabelle');
    if (typeof event.target.files[0] === "undefined") {
        // vorhandene Datei wurde entfernt
        $("#DsTabelleEigenschaften").hide();
        $("#importieren_ds_ids_identifizieren_hinweis_text").hide();
        $("#DsImportieren").hide();
        $("#DsEntfernen").hide();
    } else {
        var file = event.target.files[0],
            reader = new FileReader();

        reader.onload = function (event) {
            window.adb.dsDatensaetze = $.csv.toObjects(event.target.result);
            erstelleTabelle (window.adb.dsDatensaetze, "DsFelder_div", "DsTabelleEigenschaften");
        };
        reader.readAsText(file);
    }
};

// wenn BsFile geändert wird
window.adb.handleBsFileChange = function () {
    'use strict';
    var erstelleTabelle = require('./adbModules/erstelleTabelle');
    if (typeof event.target.files[0] === "undefined") {
        // vorhandene Datei wurde entfernt
        $("#BsTabelleEigenschaften").hide();
        $("#importieren_bs_ids_identifizieren_hinweis_text").hide();
        $("#BsImportieren").hide();
        $("#BsEntfernen").hide();
    } else {
        var file = event.target.files[0],
            reader = new FileReader();
        reader.onload = function (event) {
            window.adb.bsDatensaetze = $.csv.toObjects(event.target.result);
            erstelleTabelle (window.adb.bsDatensaetze, "BsFelder_div", "BsTabelleEigenschaften");
        };
        reader.readAsText(file);
    }
};

// wenn btn_resize geklickt wird
window.adb.handleBtnResizeClick = function () {
    'use strict';
    var windowHeight = $(window).height(),
        $body = $("body");
    $body.toggleClass("force-mobile");
    if ($body.hasClass("force-mobile")) {
        // Spalten sind untereinander. Baum 91px weniger hoch, damit Formulare zum raufschieben immer erreicht werden können
        $(".baum").css("max-height", windowHeight - 252);
        // button rechts ausrichten
        $("#btn_resize")
            .css("margin-right", "0px")
            .attr("data-original-title", "in zwei Spalten anzeigen");
    } else {
        $(".baum").css("max-height", windowHeight - 161);
        // button an anderen Schaltflächen ausrichten
        $("#btn_resize")
            .css("margin-right", "6px")
            .attr("data-original-title", "ganze Breite nutzen");
    }
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
window.adb.handleDs_ImportierenClick = function () {
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
window.adb.handleBs_ImportierenClick = function () {
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
window.adb.ergänzePilzeZhgis = function () {
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
window.adb.handleImportierenDsImportAusführenCollapseShown = function () {
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
window.adb.handleImportierenBsImportAusführenCollapseShown = function () {
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
window.adb.handleDsWählenChange = function () {
    'use strict';
    require('./adbModules/import/handleDsWaehlenChange')(this);
};

// wird in index.html benutzt
window.adb.handleDsNameChange = function () {
    'use strict';
    require('./adbModules/import/handleDsNameChange')(this);
};

// wenn DsLöschen geklickt wird
window.adb.handleDsLöschenClick = function () {
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
window.adb.handleBsLöschenClick = function () {
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
    zeigeFormular ("export");
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
window.adb.handleExportierenDsObjekteWählenGruppeChange = function () {
    'use strict';
    var gruppen_gewählt = window.adb.fuerExportGewaehlteGruppen();
    require('./adbModules/export/erstelleListeFuerFeldwahl')(gruppen_gewählt);
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
    if (!$(this).hasClass('disabled')) {
        window.adb.bearbeiteLrTaxonomie();
    }
};

// wenn .btn.lr_bearb_schuetzen geklickt wird
window.adb.handleBtnLrBearbSchuetzenClick = function () {
    'use strict';
    if (!$(this).hasClass('disabled')) {
        window.adb.schuetzeLrTaxonomie();
        // Einstellung merken, damit auch nach Datensatzwechsel die Bearbeitbarkeit bleibt
        delete localStorage.lr_bearb;
    }
};

// wenn .btn.lr_bearb_neu geklickt wird
window.adb.handleBtnLrBearbNeuClick = function () {
    'use strict';
    var html,
        getHtmlForLrParentAuswahlliste = require('./adbModules/lr/getHtmlForLrParentAuswahlliste');
    if (!$(this).hasClass('disabled')) {
        getHtmlForLrParentAuswahlliste($("#Taxonomie").val(), function (html) {
            $("#lr_parent_waehlen_optionen").html(html);
            // jetzt das modal aufrufen
            // höhe Anpassen funktioniert leider nicht über css mit calc
            $('#lr_parent_waehlen').modal();
            $('#lr_parent_waehlen_optionen').css('max-height', $(window).height()-100);
        });
    }
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
    if (localStorage.lr_bearb == "true") {
        window.adb.bearbeiteLrTaxonomie();
    }
};

// wird in index.html benutzt
window.adb.handleExportierenExportierenCollapseShown = function (that) {
    'use strict';
    require('./adbModules/export/handleExportierenExportierenCollapseShown')(that);
};

// scrollt das übergebene Element nach oben
// minus die übergebene Anzahl Pixel
window.adb.scrollThisToTop = function (that, minus) {
    'use strict';
    minus = minus || 0;
    $('html, body').animate({
        scrollTop: $(that).parent().offset().top - minus
    }, 2000);
};

window.adb.handleExportierenObjekteWaehlenCollapseShown = function (that) {
    'use strict';
    var gruppen_gewählt = window.adb.fuerExportGewaehlteGruppen(),
        erstelleListeFuerFeldwahl = require('./adbModules/export/erstelleListeFuerFeldwahl');

    if (gruppen_gewählt.length === 0) {
        // keine Gruppe gewählt
        erstelleListeFuerFeldwahl(gruppen_gewählt);
        // und den panel schliessen
        $(that).collapse('hide');
        return false;
    }
    // nach oben scrollen, damit der Bildschirm optimal genutzt wird
    $('html, body').animate({
        scrollTop: $(that).parent().offset().top - 6
    }, 2000);
    return true;
};

// wenn #exportieren_objekte_Taxonomien_zusammenfassen geklickt wird
window.adb.handleExportierenObjekteTaxonomienZusammenfassenClick = function (that) {
    'use strict';
    var gruppe_ist_gewählt = false,
        erstelleListeFuerFeldwahl = require('./adbModules/export/erstelleListeFuerFeldwahl');
    if ($(that).hasClass("active")) {
        window.adb.fasseTaxonomienZusammen = false;
        $(that).html("Alle Taxonomien zusammenfassen");
    } else {
        window.adb.fasseTaxonomienZusammen = true;
        $(that).html("Taxonomien einzeln behandeln");
    }
    // Felder neu aufbauen, aber nur, wenn eine Gruppe gewählt ist
    var gruppen_gewählt = window.adb.fuerExportGewaehlteGruppen();
    if (gruppen_gewählt.length > 0) {
        erstelleListeFuerFeldwahl(gruppen_gewählt);
    }
};

// wenn #exportieren_exportieren_exportieren geklickt wird
window.adb.handleExportierenExportierenExportierenClick = function () {
    'use strict';
    var erstelleExportString = require('./adbModules/export/erstelleExportString'),
        isFileAPIAvailable   = require('./adbModules/isFileAPIAvailable');

    if (isFileAPIAvailable()) {
        var exportstring = erstelleExportString(window.adb.exportieren_objekte),
            blob   = new Blob([exportstring], {type: "text/csv;charset=utf-8;"}),
            d      = new Date(),
            month  = d.getMonth() + 1,
            day    = d.getDate(),
            output = d.getFullYear() + '-' + (month < 10 ? '0' : '') + month + '-' + (day < 10 ? '0' : '') + day;
        saveAs(blob, output + "_export.csv");
    }
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
    $("#tree" + window.adb.Gruppe)
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
window.adb.handleÖffneGruppeClick = function () {
    'use strict';
    window.adb.oeffneGruppe($(this).attr("Gruppe"));
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

// fügt der Art eine Datensammlung hinzu
// wenn dieselbe schon vorkommt, wird sie überschrieben
window.adb.fuegeDatensammlungZuObjekt = function (guid, datensammlung) {
    'use strict';
    var $db = $.couch.db('artendb');
    $db.openDoc(guid, {
        success: function (doc) {
            // sicherstellen, dass Eigenschaftensammlung existiert
            if (!doc.Eigenschaftensammlungen) {
                doc.Eigenschaftensammlungen = [];
            }
            // falls dieselbe Datensammlung schon existierte: löschen
            // trifft z.B. zu bei zusammenfassenden
            doc.Eigenschaftensammlungen = _.reject(doc.Eigenschaftensammlungen, function (es) {
                return es.Name === datensammlung.Name;
            });
            // Datensammlung anfügen
            doc.Eigenschaftensammlungen.push(datensammlung);
            // sortieren
            // Eigenschaftensammlungen nach Name sortieren
            doc.Eigenschaftensammlungen = window.adb.sortiereObjektarrayNachName(doc.Eigenschaftensammlungen);
            // in artendb speichern
            $db.saveDoc(doc);
            // mitteilen, dass ein ds importiert wurde
            $(document).trigger('adb.ds_hinzugefügt');
            // TODO: Scheitern des Speicherns abfangen (trigger adb.ds_nicht_hinzugefügt)
        }
    });
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
            doc.Eigenschaftensammlungen = _.reject(doc.Eigenschaftensammlungen, function (datensammlung) {
                return datensammlung.Name === dsName;
            });
            // in artendb speichern
            $db.saveDoc(doc);
            // mitteilen, dass eine ds entfernt wurde
            $(document).trigger('adb.dsEntfernt');
            // TODO: Scheitern abfangen (trigger adb.ds_nicht_entfernt)
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

// holt eine Liste aller Datensammlungen, wenn nötig
// speichert sie in einer globalen Variable, damit sie wiederverwendet werden kann
window.adb.holeDatensammlungenFuerExportfelder = function () {
    'use strict';
    var exfe_geholt = $.Deferred();
    if (window.adb.ds_bs_von_objekten) {
        exfe_geholt.resolve();
    } else {
        var $db = $.couch.db('artendb');
        $db.view('artendb/ds_von_objekten?group_level=5', {
            success: function (data) {
                // Daten in Objektvariable speichern > Wenn Ds ausgewählt, Angaben in die Felder kopieren
                window.adb.ds_bs_von_objekten = data;
                exfe_geholt.resolve();
            }
        });
    }
    return exfe_geholt.promise();
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

window.adb.sortiereObjektarrayNachName = function (objektarray) {
    'use strict';
    // Beziehungssammlungen bzw. Datensammlungen nach Name sortieren
    objektarray.sort(function (a, b) {
        var aName = a.Name,
            bName = b.Name;
        if (aName && bName) {
            return (aName.toLowerCase() == bName.toLowerCase()) ? 0 : (aName.toLowerCase() > bName.toLowerCase()) ? 1 : -1;
        } else {
            return (aName == bName) ? 0 : (aName > bName) ? 1 : -1;
        }
    });
    return objektarray;
};

// übernimmt einen Array mit den Beziehungen
// gibt diesen sortiert zurück
window.adb.sortiereBeziehungenNachName = function (beziehungen) {
    'use strict';
// Beziehungen nach Name sortieren
    beziehungen.sort(function (a, b) {
        var aName,
            bName;
        _.each(a.Beziehungspartner, function (beziehungspartner) {
            if (beziehungspartner.Gruppe === "Lebensräume") {
                // sortiert werden soll bei Lebensräumen zuerst nach Taxonomie, dann nach Name
                aName = beziehungspartner.Gruppe + beziehungspartner.Taxonomie + beziehungspartner.Name;
            } else {
                aName = beziehungspartner.Gruppe + beziehungspartner.Name;
            }
        });
        _.each(b.Beziehungspartner, function (beziehungspartner) {
            if (beziehungspartner.Gruppe === "Lebensräume") {
                bName = beziehungspartner.Gruppe + beziehungspartner.Taxonomie + beziehungspartner.Name;
            } else {
                bName = beziehungspartner.Gruppe + beziehungspartner.Name;
            }
        });
        if (aName && bName) {
            return (aName.toLowerCase() == bName.toLowerCase()) ? 0 : (aName.toLowerCase() > bName.toLowerCase()) ? 1 : -1;
        } else {
            return (aName == bName) ? 0 : (aName > bName) ? 1 : -1;
        }
    });
    return beziehungen;
};

// sortiert nach den keys des Objekts
// resultat nicht garantiert!
window.adb.sortKeysOfObject = function (o) {
    'use strict';
    var sorted = {},
        key,
        a = [];

    for (key in o) {
        if (o.hasOwnProperty(key)) {
            a.push(key);
        }
    }

    a.sort();

    for (key = 0; key < a.length; key++) {
        sorted[a[key]] = o[a[key]];
    }
    return sorted;
};

window.adb.exportZuruecksetzen = function (event, _alt) {
    'use strict';
    var $exportieren_exportieren_collapse = $("#exportieren" + _alt + "_exportieren_collapse"),
        _alt = _alt || '';

    // Export ausblenden, falls sie eingeblendet war
    if ($exportieren_exportieren_collapse.css("display") !== "none") {
        $exportieren_exportieren_collapse.collapse('hide');
    }
    $("#exportieren" + _alt + "_exportieren_tabelle").hide();
    $(".exportieren" + _alt + "_exportieren_exportieren").hide();
    $("#exportieren" + _alt + "_exportieren_error_text")
        .alert()
        .hide();
    $('#exportieren_alt_exportieren_url').val('');
};

window.adb.oeffneGruppe = function (Gruppe) {
    'use strict';
    var erstelleBaum = require('./adbModules/jstree/erstelleBaum');
    // Gruppe als globale Variable speichern, weil sie an vielen Orten benutzt wird
    window.adb.Gruppe = Gruppe;
    $(".suchfeld").val("");
    $("#Gruppe_label").html("Gruppe:");
    $(".suchen")
        .hide()
        .val("");
    $("#forms").hide();
    var treeMitteilung = "hole Daten...";
    if (window.adb.Gruppe === "Macromycetes") {
        treeMitteilung = "hole Daten (das dauert bei Pilzen länger...)";
    }
    $("#treeMitteilung")
        .html(treeMitteilung)
        .show();
    erstelleBaum();
    // keine Art mehr aktiv
    delete localStorage.art_id;
};

window.adb.convertToCorrectType = function (feldwert) {
    'use strict';
    var type = window.adb.myTypeOf(feldwert);
    if (type === "boolean") {
        return Boolean(feldwert);
    } else if (type === "float") {
        return parseFloat(feldwert);
    } else if (type === "integer") {
        return parseInt(feldwert);
    } else {
        return feldwert;
    }
};

// Hilfsfunktion, die typeof ersetzt und ergänzt
// typeof gibt bei input-Feldern immer String zurück!
window.adb.myTypeOf = function (wert) {
    'use strict';
    if (typeof wert === "boolean") {
        return "boolean";
    } else if (parseInt(wert) && parseFloat(wert) && parseInt(wert) != parseFloat(wert) && parseInt(wert) == wert) {
        // es ist eine Float
        return "float";
    // verhindern, dass führende Nullen abgeschnitten werden
    } else if (parseInt(wert) == wert && wert.toString().length === Math.ceil(parseInt(wert)/10)) {
        // es ist eine Integer
        return "integer";
    } else {
        // als String behandeln
        return "string";
    }
};

window.adb.bearbeiteLrTaxonomie = function () {
    'use strict';
    var pruefeAnmeldung = require('./adbModules/login/pruefeAnmeldung');

    // Benutzer muss anmelden
    if (!pruefeAnmeldung("art")) {
        return false;
    }

    // Einstellung merken, damit auch nach Datensatzwechsel die Bearbeitbarkeit bleibt
    localStorage.lr_bearb = true;

    // Anmeldung: zeigen, aber geschlossen
    $("#art_anmelden_collapse").collapse('hide');
    $("#art_anmelden").show();

    // alle Felder schreibbar setzen
    $(".Lebensräume.Taxonomie").find(".controls").each(function () {
        // einige Felder nicht bearbeiten
        if ($(this).attr('id') !== "GUID" && $(this).attr('id') !== "Parent" && $(this).attr('id') !== "Taxonomie" && $(this).attr('id') !== "Hierarchie") {
            var parent = $(this).parent();
            $(this).attr('readonly', false);
            if (parent.attr('href')) {
                parent.attr('href', '#');
                // Standardverhalten beim Klicken von Links verhindern
                parent.attr('onclick', 'return false;');
                // Mauspointer nicht mehr als Finger
                this.style.cursor = '';
            }
        }
    });

    // Schreibbarkeit in den Symbolen anzeigen
    $('.lr_bearb').removeClass('disabled');
    $(".lr_bearb_bearb").addClass('disabled');
};

window.adb.schuetzeLrTaxonomie = function () {
    'use strict';
    // alle Felder schreibbar setzen
    $(".Lebensräume.Taxonomie .controls").each(function () {
        var parent = $(this).parent();
        $(this).attr('readonly', true);
        if (parent.attr('href')) {
            var feldWert = $(this).val();
            if (typeof feldWert === "string" && feldWert.slice(0, 7) === "//") {
                parent.attr('href', feldWert);
                // falls onclick besteht, entfernen
                parent.removeAttr("onclick");
                // Mauspointer nicht mehr als Finger
                this.style.cursor = 'pointer';
            }
        }
    });
    $('.lr_bearb').addClass('disabled');
    $(".lr_bearb_bearb").removeClass('disabled');
    $("#art_anmelden").hide();
};

// aktualisiert die Hierarchie eines Arrays von Objekten (in dieser Form: Lebensräumen, siehe wie der Name der parent-objekte erstellt wird)
// der Array kann das Resultat einer Abfrage aus der DB sein (object[i] = dara.rows[i].doc)
// oder aus dem Import einer Taxonomie stammen
// diese Funktion wird benötigt, wenn eine neue Taxonomie importiert wird
// Momentan nicht verwendet
window.adb.aktualisiereHierarchieEinerLrTaxonomie = function (object_array) {
    'use strict';
    var object,
        hierarchie,
        parent;
    _.each(object_array, function (object) {
        hierarchie = [];
        parent = object.Taxonomie.Eigenschaften.Parent;
        // als Start sich selben zur Hierarchie hinzufügen
        hierarchie.push(window.adb.erstelleHierarchieobjektAusObjekt(object));
        if (parent) {
            object.Taxonomie.Eigenschaften.Hierarchie = window.adb.ergaenzeParentZuLrHierarchie(object_array, object._id, hierarchie);
            $db.saveDoc(object);
        }
    });
};

// aktualisiert die Hierarchie eines Objekts (in dieser Form: Lebensraum)
// und auch den parent
// prüft, ob dieses Objekt children hat
// wenn ja, wird deren Hierarchie auch aktualisiert
// ist aktualisiereHierarchiefeld true, wird das Feld in der UI aktualisiert
// wird das Ergebnis der DB-Abfrage mitgegeben, wird die Abfrage nicht wiederholt
// diese Funktion wird benötigt, wenn Namen oder Label eines bestehenden LR verändert wird
window.adb.aktualisiereHierarchieEinesLrInklusiveSeinerChildren = function (lr, object, aktualisiereHierarchiefeld, einheit_ist_taxonomiename) {
    'use strict';
    var $db = $.couch.db('artendb'),
        aktualisiereHierarchieEinesLrInklusiveSeinerChildren2 = require('./adbModules/lr/aktualisiereHierarchieEinesLrInklusiveSeinerChildren2');
    if (lr) {
        aktualisiereHierarchieEinesLrInklusiveSeinerChildren2(lr, object, aktualisiereHierarchiefeld, einheit_ist_taxonomiename);
    } else {
        $db.view('artendb/lr?include_docs=true', {
            success: function (lr) {
                aktualisiereHierarchieEinesLrInklusiveSeinerChildren2(lr, object, aktualisiereHierarchiefeld, einheit_ist_taxonomiename);
            },
            error: function () {
                console.log('aktualisiereHierarchieEinesLrInklusiveSeinerChildren: keine Daten erhalten');
            }
        });
    }
};

// Baut den Hierarchiepfad für einen Lebensraum auf
// das erste Element - der Lebensraum selbst - wird mit der Variable "Hierarchie" übergeben
// ruft sich selbst rekursiv auf, bis das oberste Hierarchieelement erreicht ist
window.adb.ergaenzeParentZuLrHierarchie = function (objektArray, parentGUID, Hierarchie) {
    'use strict';
    var parent_objekt,
        hierarchie_ergänzt;
    _.each(objektArray, function (object) {
        if (object._id === parentGUID) {
            parent_objekt = window.adb.erstelleHierarchieobjektAusObjekt(object);
            Hierarchie.push(parent_objekt);
            if (object.Taxonomie.Eigenschaften.Parent.GUID !== object._id) {
                // die Hierarchie ist noch nicht zu Ende - weitermachen
                hierarchie_ergänzt = window.adb.ergaenzeParentZuLrHierarchie(objektArray, object.Taxonomie.Eigenschaften.Parent.GUID, Hierarchie);
                return Hierarchie;
            }
            // jetzt ist die Hierarchie vollständig
            // sie ist aber verkehrt - umkehren
            return Hierarchie.reverse();
        }
    });
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

// löscht Datensätze in Massen
// nimmt einen Array von Objekten entgegen
// baut daraus einen neuen array auf, in dem die Objekte nur noch die benötigten Informationen haben
// aktualisiert die Objekte mit einer einzigen Operation
window.adb.loescheMassenMitObjektArray = function (object_array) {
    'use strict';
    var objekte_mit_objekte,
        objekte = [],
        new_objekt;
    _.each(object_array, function (object) {
        new_objekt = {};
        new_objekt._id = object._id;
        new_objekt._rev = object._rev;
        new_objekt._deleted = true;
        objekte.push(new_objekt);
    });
    objekte_mit_objekte = {};
    objekte_mit_objekte.docs = objekte;
    $.ajax({
        cache: false,
        type: "POST",
        url: "../../_bulk_docs",
        contentType: "application/json; charset=utf-8", 
        data: JSON.stringify(objekte_mit_objekte)
    }).fail(function () {
        console.log('löscheMassenMitObjektArray: Daten wurde nicht gelöscht');
    });
};


window.adb.ermittleVergleichsoperator = function (filterwert) {
    'use strict';
    
};

// kontrolliert den verwendeten Browser
// Quelle: //stackoverflow.com/questions/13478303/correct-way-to-use-modernizr-to-detect-ie
window.adb.browserDetect = {
    init: function () {
        this.browser = this.searchString(this.dataBrowser) || "Other";
        this.version = this.searchVersion(navigator.userAgent) ||       this.searchVersion(navigator.appVersion) || "Unknown";
    },

    searchString: function (data) {
        for (var i=0 ; i < data.length ; i++)   
        {
            var dataString = data[i].string;
            this.versionSearchString = data[i].subString;

            if (dataString.indexOf(data[i].subString) != -1)
            {
                return data[i].identity;
            }
        }
    },

    searchVersion: function (dataString) {
        var index = dataString.indexOf(this.versionSearchString);
        if (index == -1) return;
        return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
    },

    dataBrowser: [
        { string: navigator.userAgent, subString: "Chrome",  identity: "Chrome" },
        { string: navigator.userAgent, subString: "MSIE",     identity: "Explorer" },
        { string: navigator.userAgent, subString: "Firefox", identity: "Firefox" },
        { string: navigator.userAgent, subString: "Safari",  identity: "Safari" },
        { string: navigator.userAgent, subString: "Opera",   identity: "Opera" }
    ]

};

/*
* Bootstrap file uploader
* Quelle: //jasny.github.io/bootstrap/javascript.html#fileupload
*/
/**
* Bootstrap.js by @mdo and @fat, extended by @ArnoldDaniels.
* plugins: bootstrap-fileupload.js
* Copyright 2012 Twitter, Inc.
* //apache.org/licenses/LICENSE-2.0.txt
*/
!function (e){var t=function (t,n){this.$element=e(t),this.type=this.$element.data("uploadtype")||(this.$element.find(".thumbnail").length>0?"image":"file"),this.$input=this.$element.find(":file");if(this.$input.length===0)return;this.name=this.$input.attr("name")||n.name,this.$hidden=this.$element.find('input[type=hidden][name="'+this.name+'"]'),this.$hidden.length===0&&(this.$hidden=e('<input type="hidden" />'),this.$element.prepend(this.$hidden)),this.$preview=this.$element.find(".fileupload-preview");var r=this.$preview.css("height");this.$preview.css("display")!="inline"&&r!="0px"&&r!="none"&&this.$preview.css("line-height",r),this.original={exists:this.$element.hasClass("fileupload-exists"),preview:this.$preview.html(),hiddenVal:this.$hidden.val()},this.$remove=this.$element.find('[data-dismiss="fileupload"]'),this.$element.find('[data-trigger="fileupload"]').on("click.fileupload",e.proxy(this.trigger,this)),this.listen()};t.prototype={listen:function (){this.$input.on("change.fileupload",e.proxy(this.change,this)),e(this.$input[0].form).on("reset.fileupload",e.proxy(this.reset,this)),this.$remove&&this.$remove.on("click.fileupload",e.proxy(this.clear,this))},change:function (e,t){if(t==="clear")return;var n=e.target.files!==undefined?e.target.files[0]:e.target.value?{name:e.target.value.replace(/^.+\\/,"")}:null;if(!n){this.clear();return}this.$hidden.val(""),this.$hidden.attr("name",""),this.$input.attr("name",this.name);if(this.type==="image"&&this.$preview.length>0&&(typeof n.type!="undefined"?n.type.match("image.*"):n.name.match(/\.(gif|png|jpe?g)$/i))&&typeof FileReader!="undefined"){var r=new FileReader,i=this.$preview,s=this.$element;r.onload=function (e){i.html('<img src="'+e.target.result+'" '+(i.css("max-height")!="none"?'style="max-height: '+i.css("max-height")+';"':"")+" />"),s.addClass("fileupload-exists").removeClass("fileupload-new")},r.readAsDataURL(n)}else this.$preview.text(n.name),this.$element.addClass("fileupload-exists").removeClass("fileupload-new")},clear:function (e){this.$hidden.val(""),this.$hidden.attr("name",this.name),this.$input.attr("name","");if(navigator.userAgent.match(/msie/i)){var t=this.$input.clone(!0);this.$input.after(t),this.$input.remove(),this.$input=t}else this.$input.val("");this.$preview.html(""),this.$element.addClass("fileupload-new").removeClass("fileupload-exists"),e&&(this.$input.trigger("change",["clear"]),e.preventDefault ? e.preventDefault() : e.returnValue = false)},reset:function (e){this.clear(),this.$hidden.val(this.original.hiddenVal),this.$preview.html(this.original.preview),this.original.exists?this.$element.addClass("fileupload-exists").removeClass("fileupload-new"):this.$element.addClass("fileupload-new").removeClass("fileupload-exists")},trigger:function (e){this.$input.trigger("click"),e.preventDefault ? e.preventDefault() : e.returnValue = false}},e.fn.fileupload=function (n){return this.each(function (){var r=e(this),i=r.data("fileupload");i||r.data("fileupload",i=new t(this,n)),typeof n=="string"&&i[n]()})},e.fn.fileupload.Constructor=t,e(document).on("click.fileupload.data-api",'[data-provides="fileupload"]',function (t){var n=e(this);if(n.data("fileupload"))return;n.fileupload(n.data());var r=e(t.target).closest('[data-dismiss="fileupload"],[data-trigger="fileupload"]');r.length>0&&(r.trigger("click.fileupload"),t.preventDefault())})}(window.jQuery);