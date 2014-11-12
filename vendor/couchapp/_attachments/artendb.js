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

// wird in index.html benutzt
window.adb.handleBsImportiertVonChange = function () {
    'use strict';
    require('./adbModules/import/handleBsImportiertVonChange')();
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

// wird in index.html benutzt
window.adb.handleImportierenBsImportAusfuehrenCollapseShown = function () {
    'use strict';
    require('./adbModules/import/handleImportierenBsImportAusfuehrenCollapseShown')(this);
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

// wird in index.html benutzt
window.adb.handleDsLoeschenClick = function () {
    'use strict';
    require('./adbModules/import/handleDsLoeschenClick')();
};

// wird in index.html benutzt
window.adb.handleBsLoeschenClick = function () {
    'use strict';
    require('./adbModules/import/handleBsLoeschenClick')();
};

// wird in index.html benutzt
window.adb.handleExportierenClick = function () {
    'use strict';
    require('./adbModules/export/handleExportierenClick')();
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

// wird in index.html benutzt
window.adb.handleExportierenDsObjekteWaehlenGruppeChange = function () {
    'use strict';
    require('./adbModules/export/handleExportierenDsObjekteWaehlenGruppeChange')();
};

// wird in index.html benutzt
window.adb.handleExportFeldFilternChange = function () {
    'use strict';
    require('./adbModules/export/handleExportFeldFilternChange')(this);
};

// wird in index.html benutzt
window.adb.handleExportierenExportierenShow = function () {
    'use strict';
    require('./adbModules/export/handleExportierenExportierenShow')();
};

// wird in index.html benutzt
window.adb.handleBtnLrBearbBearbKlick = function () {
    'use strict';
    require('./adbModules/lr/handleBtnLrBearbBearbKlick')(this);
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

// wird in index.html benutzt
window.adb.handlePanelbodyLrTaxonomieShown = function () {
    'use strict';
    require('./adbModules/lr/handlePanelbodyLrTaxonomieShown')();
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

// wird in index.html benutzt
window.adb.handlePanelShown = function () {
    'use strict';
    require('./adbModules/handlePanelShown')(this);
};

// wird in index.html benutzt
window.adb.handleLinkZuArtGleicherGruppeClick = function (id) {
    'use strict';
    require('./adbModules/handleLinkZuArtGleicherGruppeClick')(id);
};

// wird in index.html benutzt
window.adb.handleResize = function () {
    'use strict';
    require('./adbModules/handleResize')();
};

// wird in index.html benutzt
window.adb.handleAnmeldenBtnClick = function (that) {
    'use strict';
    require('./adbModules/login/handleAnmeldenBtnClick')(that);
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

// wird in index.html benutzt
window.adb.handleKontoErstellenBtnClick = function (that) {
    'use strict';
    require('./adbModules/login/handleKontoErstellenBtnClick')(that);
};

// wird in index.html benutzt
window.adb.handleKontoSpeichernBtnClick = function (that) {
    'use strict';
    require('./adbModules/login/handleKontoSpeichernBtnClick')(that);
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

// wird in index.html benutzt
window.adb.oeffneUri = function () {
    'use strict';
    require('./adbModules/oeffneUri')();
};

// wird in index.html benutzt
window.adb.filtereFuerExport = function (direkt) {
    'use strict';
    require('./adbModules/export/filtereFuerExport')(direkt);
};

// wird in index.html benutzt
window.adb.exportZuruecksetzen = function (event, _alt) {
    'use strict';
    require('./adbModules/export/exportZuruecksetzen')(event, _alt);
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