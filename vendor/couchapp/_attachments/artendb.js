/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

window.adb = window.adb || {};

var $ = require('jquery');

window.adb.setupEvents = function () {
    require('./adbModules/setupEvents')();
};

// wird in index.html benutzt
window.adb.meldeUserAb = function () {
    require('./adbModules/login/meldeUserAb')();
};

// wird in index.html benutzt
window.adb.handleBsNameChange = function () {
    require('./adbModules/import/handleBsNameChange')(this);
};

// wird in index.html benutzt
window.adb.handleDsImportiertVonChange = function () {
    require('./adbModules/import/handleDsImportiertVonChange')();
};

// wird in index.html benutzt
window.adb.handleBsImportiertVonChange = function () {
    require('./adbModules/import/handleBsImportiertVonChange')();
};

// wird in index.html benutzt
window.adb.handleBsZusammenfassendChange = function () {
    require('./adbModules/import/handleBsZusammenfassendChange')(this);
};

// wird in index.html benutzt
window.adb.handleDsZusammenfassendChange = function () {
    require('./adbModules/import/handleDsZusammenfassendChange')(this);
};

// Wenn BsWählen geändert wird
// wird in index.html benutzt
window.adb.handleBsWaehlenChange = function () {
    require('./adbModules/import/handleBsWaehlenChange')(this);
};

// wird in index.html benutzt
window.adb.handleDsFileChange = function () {
    require('./adbModules/import/handleDsFileChange')(event);
};

// wird in index.html benutzt
window.adb.handleBsFileChange = function () {
    require('./adbModules/import/handleBsFileChange')(event);
};

// wird in index.html benutzt
window.adb.nenneDsUm = function () {
    require('./adbModules/admin/nenneDsUm')();
};

// wird in index.html benutzt
window.adb.handleImportierenDsDatenUploadenCollapseShown = function () {
    require('./adbModules/import/handleImportierenDsDatenUploadenCollapseShown')(this);
};

// wird in index.html benutzt
window.adb.handleImportierenBsDatenUploadenCollapseShown = function () {
    require('./adbModules/import/handleImportierenBsDatenUploadenCollapseShown')(this);
};

// wird in index.html benutzt
window.adb.handleImportierenDsIdsIdentifizierenCollapseShown = function () {
    require('./adbModules/import/handleImportierenDsIdsIdentifizierenCollapseShown')(this);
};

// wird in index.html benutzt
window.adb.handleImportierenBsIdsIdentifizierenCollapseShown = function () {
    require('./adbModules/import/handleImportierenBsIdsIdentifizierenCollapseShown')(this);
};

// wird in index.html benutzt
window.adb.handleImportierenDsImportAusfuehrenCollapseShown = function () {
    require('./adbModules/import/handleImportierenDsImportAusfuehrenCollapseShown')(this);
};

// wird in index.html benutzt
window.adb.handleImportierenBsImportAusfuehrenCollapseShown = function () {
    require('./adbModules/import/handleImportierenBsImportAusfuehrenCollapseShown')(this);
};

// wenn DsWählen geändert wird
// wird in index.html benutzt
window.adb.handleDsWaehlenChange = function () {
    require('./adbModules/import/handleDsWaehlenChange')(this);
};

// wird in index.html benutzt
window.adb.handleDsNameChange = function () {
    require('./adbModules/import/handleDsNameChange')(this);
};

// wird in index.html benutzt
window.adb.handleDsLoeschenClick = function () {
    require('./adbModules/import/handleDsLoeschenClick')();
};

// wird in index.html benutzt
window.adb.handleBsLoeschenClick = function () {
    require('./adbModules/import/handleBsLoeschenClick')();
};

// wird in index.html benutzt
window.adb.handleFeldWaehlenChange = function () {
    return require('./adbModules/export/handleFeldWaehlenChange')(this);
};

// wird in index.html benutzt
window.adb.handleFeldWaehlenAlleVonDs = function () {
    require('./adbModules/export/handleFeldWaehlenAlleVonDs')(this);
};

// wird in index.html benutzt
window.adb.handleExportierenDsObjekteWaehlenGruppeChange = function () {
    require('./adbModules/export/handleExportierenDsObjekteWaehlenGruppeChange')();
};

// wird in index.html benutzt
window.adb.handleExportFeldFilternChange = function () {
    require('./adbModules/export/handleExportFeldFilternChange')(this);
};

// wird in index.html benutzt
window.adb.handleExportierenExportierenShow = function () {
    require('./adbModules/export/handleExportierenExportierenShow')();
};

// wird in index.html benutzt
window.adb.handleBtnLrBearbBearbKlick = function () {
    require('./adbModules/lr/handleBtnLrBearbBearbKlick')(this);
};

// wird in index.html benutzt
window.adb.handleBtnLrBearbSchuetzenClick = function () {
    require('./adbModules/lr/handleBtnLrBearbSchuetzenClick')(this);
};

// wird in index.html benutzt
window.adb.handleBtnLrBearbNeuClick = function () {
    require('./adbModules/lr/handleBtnLrBearbNeuClick')(this);
};

// wenn #lr_parent_waehlen_optionen [name="parent_optionen"] geändert wird
// wird in index.html benutzt
window.adb.handleLrParentOptionenChange = function () {
    require('./adbModules/lr/handleLrParentOptionenChange')(this);
};

// wird in index.html benutzt
window.adb.handleRueckfrageLrLoeschenJaClick = function () {
    require('./adbModules/lr/handleRueckfrageLrLoeschenJaClick')();
};

// Wenn #art .Lebensräume.Taxonomie .controls geändert wird
// wird in index.html benutzt
window.adb.handleLrTaxonomieControlsChange = function () {
    require('./adbModules/speichern')($(this).val(), this.id);
};

// wird in index.html benutzt
window.adb.handlePanelbodyLrTaxonomieShown = function () {
    require('./adbModules/lr/handlePanelbodyLrTaxonomieShown')();
};

// wird in index.html benutzt
window.adb.handleExportierenExportierenCollapseShown = function (that) {
    require('./adbModules/export/handleExportierenExportierenCollapseShown')(that);
};

// wird in index.html benutzt
window.adb.scrollThisToTop = function (that, minus) {
    require('./adbModules/scrollThisToTop')(that, minus);
};

// wird in index.html benutzt
window.adb.handleExportierenObjekteWaehlenCollapseShown = function () {
    require('./adbModules/export/handleExportierenObjekteWaehlenCollapseShown')(this);
};

// wird in index.html benutzt
window.adb.handleExportierenObjekteTaxonomienZusammenfassenClick = function (that) {
    require('./adbModules/export/handleExportierenObjekteTaxonomienZusammenfassenClick')(that);
};

// wird in index.html benutzt
window.adb.handleExportierenExportierenExportierenClick = function () {
    require('./adbModules/export/handleExportierenExportierenExportierenClick')();
};

// wird in index.html benutzt
window.adb.handlePanelShown = function () {
    require('./adbModules/handlePanelShown')(this);
};

// wird in index.html benutzt
window.adb.blendeFormatCsvTipps = function () {
    require('./adbModules/export/blendeFormatCsvTipps')();
};

// wird in index.html benutzt
window.adb.handleLinkZuArtGleicherGruppeClick = function (id) {
    require('./adbModules/handleLinkZuArtGleicherGruppeClick')(id);
};

// wird in index.html benutzt
window.adb.handleResize = function () {
    require('./adbModules/handleResize')();
};

// wird in index.html benutzt
window.adb.handleAnmeldenBtnClick = function (that) {
    require('./adbModules/login/handleAnmeldenBtnClick')(that);
};

// wenn .Email keyup
window.adb.handleEmailKeyup = function () {
    //allfällig noch vorhandenen Hinweis ausblenden
    $(".Emailhinweis").hide();
};

// wenn .Passwort keyup
window.adb.handlePasswortKeyup = function () {
    //allfällig noch vorhandenen Hinweis ausblenden
    $(".Passworthinweis").hide();
};

// wenn .Passwort2 keyup
window.adb.handlePasswort2Keyup = function () {
    //allfällig noch vorhandenen Hinweis ausblenden
    $(".Passworthinweis2").hide();
};

// wird in index.html benutzt
window.adb.handleKontoErstellenBtnClick = function (that) {
    require('./adbModules/login/handleKontoErstellenBtnClick')(that);
};

// wird in index.html benutzt
window.adb.handleKontoSpeichernBtnClick = function (that) {
    require('./adbModules/login/handleKontoSpeichernBtnClick')(that);
};

// wenn #DsFelder geändert wird
window.adb.handleDsFelderChange = function () {
    require('./adbModules/import/meldeErfolgVonIdIdentifikation')('Ds');
};

// wenn #BsFelder geändert wird
window.adb.handleBsFelderChange = function () {
    require('./adbModules/import/meldeErfolgVonIdIdentifikation')('Bs');
};

// wenn #DsId geändert wird
window.adb.handleDsIdChange = function () {
    require('./adbModules/import/meldeErfolgVonIdIdentifikation')('Ds');
};

// wenn #BsId geändert wird
window.adb.handleBsIdChange = function () {
    require('./adbModules/import/meldeErfolgVonIdIdentifikation')('Bs');
};

// wenn in textarea keyup oder focus
window.adb.handleTextareaKeyupFocus = function () {
    require('./adbModules/fitTextareaToContent')(this.id);
};

// wird in index.html benutzt
window.adb.importiereDatensammlung = function () {
    require('./adbModules/import/importiereDatensammlung')();
};

// wird in index.html benutzt
window.adb.importiereBeziehungssammlung = function () {
    require('./adbModules/import/importiereBeziehungssammlung')();
};

// wird in index.html benutzt
window.adb.entferneDatensammlung = function () {
    require('./adbModules/import/entferneDatensammlung')();
};

// wird in index.html benutzt
window.adb.entferneBeziehungssammlung = function () {
    require('./adbModules/import/entferneBeziehungssammlung')();
};

// wird in index.html benutzt
window.adb.oeffneUri = function () {
    require('./adbModules/oeffneUri')();
};

// wird in index.html benutzt
window.adb.filtereFuerExport = function (direkt) {
    require('./adbModules/export/filtereFuerExport')(direkt);
};

// wird in index.html benutzt
window.adb.exportZuruecksetzen = function (event, _alt) {
    require('./adbModules/export/exportZuruecksetzen')(event, _alt);
};

// wird in index.html benutzt
window.adb.initiiereApp = function () {
    require('./adbModules/initiiereApp')();
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