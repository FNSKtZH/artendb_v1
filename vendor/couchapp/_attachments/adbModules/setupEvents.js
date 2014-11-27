/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true, white: true*/
'use strict';

var $                                             = require('jquery'),
    onClickOeffneGruppe                           = require('./onClickOeffneGruppe'),
    onClickBtnResize                              = require('./onClickBtnResize'),
    onClickMenuBtn                                = require('./onClickMenuBtn'),
    onClickShowNextHidden                         = require('./onClickShowNextHidden'),
    onClickShowNextHiddenExport                   = require('./onClickShowNextHiddenExport'),
    onClickMenuAdmin                              = require('./onClickMenuAdmin'),
    onClickMenuDsImportieren                      = require('./onClickMenuDsImportieren'),
    onClickMenuBsImportieren                      = require('./onClickMenuBsImportieren'),
    onClickExportieren                            = require('./export/onClickExportieren'),
    onClickExportierenAlt                         = require('./export/onClickExportierenAlt'),
    onClickAdminPilzeZhgisErgaenzen               = require('./admin/onClickAdminPilzeZhgisErgaenzen'),
    onClickAdminKorrigiereArtwertnameInFlora      = require('./admin/onClickAdminKorrigiereArtwertnameInFlora'),
    onClickAdminKorrigiereDsNameChRoteListe1991   = require('./admin/onClickAdminKorrigiereDsNameChRoteListe1991'),
    onClickAdminKorrigiereDsName                  = require('./admin/onClickAdminKorrigiereDsName'),
    onClickAdminBaueDsZuEigenschaftenUm           = require('./admin/onClickAdminBaueDsZuEigenschaftenUm'),
    onShownImportierenDsDsBeschreibenCollapse     = require('./import/onShownImportierenDsDsBeschreibenCollapse'),
    onShownImportierenBsDsBeschreibenCollapse     = require('./import/onShownImportierenBsDsBeschreibenCollapse'),
    onShownImportierenDsDatenUploadenCollapse     = require('./import/onShownImportierenDsDatenUploadenCollapse'),
    onShownImportierenBsDatenUploadenCollapse     = require('./import/onShownImportierenBsDatenUploadenCollapse'),
    onShownImportierenDsIdsIdentifizierenCollapse = require('./import/onShownImportierenDsIdsIdentifizierenCollapse'),
    onShownImportierenBsIdsIdentifizierenCollapse = require('./import/onShownImportierenBsIdsIdentifizierenCollapse'),
    onShownImportierenDsImportAusfuehrenCollapse  = require('./import/onShownImportierenDsImportAusfuehrenCollapse'),
    onShownImportierenBsImportAusfuehrenCollapse  = require('./import/onShownImportierenBsImportAusfuehrenCollapse'),
    onChangeDsWaehlen                             = require('./import/onChangeDsWaehlen'),
    onChangeDsName                                = require('./import/onChangeDsName'),
    onChangeDsImportiertVon                       = require('./import/onChangeDsImportiertVon'),
    onChangeDsZusammenfassend                     = require('./import/onChangeDsZusammenfassend'),
    onChangeDsFile                                = require('./import/onChangeDsFile'),
    onChangeDsFelder                              = require('./import/onChangeDsFelder'),
    onChangeDsId                                  = require('./import/onChangeDsId'),
    onClickDsLoeschen                             = require('./import/onClickDsLoeschen'),
    onClickDsImportieren                          = require('./import/onClickDsImportieren'),
    onClickDsEntfernen                            = require('./import/onClickDsEntfernen'),
    onClickPanelHeadingA                          = require('./import/onClickPanelHeadingA'),
    onChangeBsWaehlen                             = require('./import/onChangeBsWaehlen'),
    onChangeBsName                                = require('./import/onChangeBsName'),
    onChangeBsImportiertVon                       = require('./import/onChangeBsImportiertVon'),
    onChangeBsZusammenfassend                     = require('./import/onChangeBsZusammenfassend'),
    onChangeBsFile                                = require('./import/onChangeBsFile');

module.exports = function () {
    var $body = $('body');

    $(window).resize(window.adb.handleResize);

    /*
     * body
     */
    $body
        .on('click', '.showNextHidden',                                      onClickShowNextHidden)
        .on('click', '.showNextHiddenExport',                                onClickShowNextHiddenExport);
    $('#menuBtn')                                   .on('click',             onClickMenuBtn);

    /*
     * menu
     */
    $('#menu').on('click',  '.gruppe',                                       onClickOeffneGruppe);
    $('#btnResize')                                 .on('click',             onClickBtnResize);
    $('#menuDsImportieren')                         .on('click',             onClickMenuDsImportieren);
    $('#bs_importieren')                            .on('click',             onClickMenuBsImportieren);
    $('#menu_admin')                                .on('click',             onClickMenuAdmin);
    $('#exportieren')                               .on('click',             onClickExportieren);
    $('#exportieren_alt')                           .on('click',             onClickExportierenAlt);

    /*
     * admin
     */
    $('#adminPilzeZhgisErgaenzen')                  .on('click',             onClickAdminPilzeZhgisErgaenzen);
    $('#adminKorrigiereArtwertnameInFlora')         .on('click',             onClickAdminKorrigiereArtwertnameInFlora);
    $('#adminKorrigiereDsNameChRoteListe1991')      .on('click',             onClickAdminKorrigiereDsNameChRoteListe1991);
    $('#adminKorrigiereDsName')                     .on('click',             onClickAdminKorrigiereDsName);
    $('#adminBaueDsZuEigenschaftenUm')              .on('click',             onClickAdminBaueDsZuEigenschaftenUm);

    /*
     * importieren
     */
    $('#importieren_ds_ds_beschreiben_collapse')    .on('shown.bs.collapse', onShownImportierenDsDsBeschreibenCollapse);
    $('#importieren_bs_ds_beschreiben_collapse')    .on('shown.bs.collapse', onShownImportierenBsDsBeschreibenCollapse);
    $('#importieren_ds_daten_uploaden_collapse')    .on('shown.bs.collapse', onShownImportierenDsDatenUploadenCollapse);
    $('#importieren_bs_daten_uploaden_collapse')    .on('shown.bs.collapse', onShownImportierenBsDatenUploadenCollapse);
    $('#importierenDsIdsIdentifizierenCollapse')    .on('shown.bs.collapse', onShownImportierenDsIdsIdentifizierenCollapse);
    $('#importierenBsIdsIdentifizierenCollapse')    .on('shown.bs.collapse', onShownImportierenBsIdsIdentifizierenCollapse);
    $('#importieren_ds_import_ausfuehren_collapse') .on('shown.bs.collapse', onShownImportierenDsImportAusfuehrenCollapse);
    $('#importieren_bs_import_ausfuehren_collapse') .on('shown.bs.collapse', onShownImportierenBsImportAusfuehrenCollapse);
    $('#DsWaehlen')                                 .on('change',            onChangeDsWaehlen);
    $('#DsName')                                    .on('change',            onChangeDsName);
    $('#DsImportiertVon')                           .on('change',            onChangeDsImportiertVon);
    $('#DsZusammenfassend')                         .on('change',            onChangeDsZusammenfassend);
    $('#DsFile')                                    .on('change',            onChangeDsFile);
    $('#DsFelder')                                  .on('change',            onChangeDsFelder);
    $('#DsId')                                      .on('change',            onChangeDsId);
    $('#DsLoeschen')                                .on('click',             onClickDsLoeschen);
    $('#DsImportieren')                             .on('click',             onClickDsImportieren);
    $('#DsEntfernen')                               .on('click',             onClickDsEntfernen);
    $('#importierenDs').on('click', '.panel-heading a',                      onClickPanelHeadingA);
    $('#BsWaehlen')                                 .on('change',            onChangeBsWaehlen);
    $('#BsName')                                    .on('change',            onChangeBsName);
    $('#BsImportiertVon')                           .on('change',            onChangeBsImportiertVon);
    $('#BsZusammenfassend')                         .on('change',            onChangeBsZusammenfassend);
    $('#BsFile')                                    .on('change',            onChangeBsFile);
    $('#BsId').on('change', window.adb.handleBsIdChange);
    $('#BsFelder').on('change', window.adb.handleBsFelderChange);
    $('#BsImportieren').on('click', function (event) {
        // den event hier stoppen, nicht erst in der Funktion
        // hier übernimmt jQuery das stoppen, in der Funktion nicht
        // dort gibt es folgendes Problem: IE9 kennt preventDefault nicht
        event.preventDefault ? event.preventDefault() : event.returnValue = false;
        window.adb.importiereBeziehungssammlung();
    });
    $('#BsLoeschen').on('click', function (event) {
        // den event hier stoppen, nicht erst in der Funktion
        // hier übernimmt jQuery das stoppen, in der Funktion nicht
        // dort gibt es folgendes Problem: IE9 kennt preventDefault nicht
        event.preventDefault ? event.preventDefault() : event.returnValue = false;
        window.adb.handleBsLoeschenClick();
    });
    $('#BsEntfernen').on('click', function (event) {
        // den event hier stoppen, nicht erst in der Funktion
        // hier übernimmt jQuery das stoppen, in der Funktion nicht
        // dort gibt es folgendes Problem: IE9 kennt preventDefault nicht
        event.preventDefault ? event.preventDefault() : event.returnValue = false;
        window.adb.entferneBeziehungssammlung();
    });

    /*
     * exportieren
     */
    $('#export')
        .on('change', '.exportieren_ds_objekte_waehlen_gruppe', window.adb.handleExportierenDsObjekteWaehlenGruppeChange)
        .on('change', '.feld_waehlen',                          window.adb.handleFeldWaehlenChange)
        .on('change', '.feld_waehlen_alle_von_ds',              window.adb.handleFeldWaehlenAlleVonDs)
        .on('change', '.export_feld_filtern',                   window.adb.handleExportFeldFilternChange)
        // verhindern, dass bootstrap ganz nach oben scrollt
        .on('click', '.panel-heading a', function (event) {
            event.preventDefault ? event.preventDefault() : event.returnValue = false;
        })
        .on('click', '[name="exportieren_exportieren_format"]', window.adb.blendeFormatCsvTipps)
        .on('change', '.feld_waehlen_alle_von_ds', window.adb.exportZuruecksetzen);
    $('#export_bez_in_zeilen,#export_bez_in_feldern,#exportieren_synonym_infos,#exportieren_nur_objekte_mit_eigenschaften').on('change', window.adb.exportZuruecksetzen);
    $('#exportieren_objekte_Taxonomien_zusammenfassen').on('click', function (event) {
        // event stoppen, um zu verhindern, dass bootstrap ganz nach oben scrollt
        // den event hier stoppen, nicht erst in der Funktion
        // hier übernimmt jQuery das stoppen, in der Funktion nicht
        // dort gibt es folgendes Problem: IE9 kennt preventDefault nicht
        event.preventDefault ? event.preventDefault() : event.returnValue = false;
        // this übergeben!
        window.adb.handleExportierenObjekteTaxonomienZusammenfassenClick(this);
        window.adb.handleExportierenDsObjekteWaehlenGruppeChange();
        window.adb.exportZuruecksetzen();
    });
    $('#exportieren_exportieren_exportieren').on('click', function (event) {
        // event stoppen, um zu verhindern, dass bootstrap ganz nach oben scrollt
        // den event hier stoppen, nicht erst in der Funktion
        // hier übernimmt jQuery das stoppen, in der Funktion nicht
        // dort gibt es folgendes Problem: IE9 kennt preventDefault nicht
        event.preventDefault ? event.preventDefault() : event.returnValue = false;
        window.adb.handleExportierenExportierenExportierenClick();
    });
    $('#exportieren_exportieren_exportieren_direkt').on('click', function (event) {
        event.preventDefault ? event.preventDefault() : event.returnValue = false;
        window.adb.filtereFuerExport('direkt');
    });
    $('#exportieren_exportieren_collapse').on('shown.bs.collapse', function () {
        window.adb.handleExportierenExportierenCollapseShown(this);
    });
    $('#exportieren_objekte_waehlen_ds_collapse').on('shown.bs.collapse', window.adb.handleExportierenObjekteWaehlenCollapseShown);
    $('#exportieren_felder_waehlen_collapse').on('shown.bs.collapse', window.adb.handleExportierenObjekteWaehlenCollapseShown);
    $('#exportieren_exportieren').on('show', window.adb.handleExportierenExportierenShow);

    /*
     * exportieren für alt
     */
    $('#export_alt')
        .on('change', '.feld_waehlen', window.adb.handleFeldWaehlenChange)
        .on('change', '.feld_waehlen_alle_von_ds_alt', window.adb.handleFeldWaehlenAlleVonDs)
        .on('change', '#export_alt_bez_in_zeilen,#export_alt_bez_in_feldern,#exportieren_alt_synonym_infos,#exportieren_alt_nur_objekte_mit_eigenschaften,.feld_waehlen_alle_von_ds_alt', function () {
            window.adb.exportZuruecksetzen(null, '_alt');
        })
        .on('schown.bs.collapse', '#exportieren_alt_felder_waehlen_collapse', function () {
            window.adb.scrollThisToTop(this, 6);
        })
        .on('shown.bs.collapse', '#exportieren_alt_exportieren_collapse', function () {
            // mitteilen, dass für alt exportiert wird
            window.adb.handleExportierenExportierenCollapseShown(this);
            window.adb.scrollThisToTop(this, 6);
        })
        // verhindern, dass bootstrap ganz nach oben scrollt
        .on('click', '.panel-heading a', function (event) {
            event.preventDefault ? event.preventDefault() : event.returnValue = false;
        });

    /*
     * art / lr
     */
    $('#art')
        .on('click', '.btn.lrBearb', function (event) {
            event.preventDefault ? event.preventDefault() : event.returnValue = false;
        })
        .on('click', '.btn.lr_bearb_bearb', window.adb.handleBtnLrBearbBearbKlick)
        .on('click', '.btn.lr_bearb_schuetzen', window.adb.handleBtnLrBearbSchuetzenClick)
        .on('click', '.btn.lr_bearb_neu', window.adb.handleBtnLrBearbNeuClick)
        .on('change', '.Lebensräume.Taxonomie .controls', window.adb.handleLrTaxonomieControlsChange)
        .on('shown.bs.collapse', '.Lebensräume.Taxonomie', window.adb.handlePanelbodyLrTaxonomieShown);
    $('#lr_parent_waehlen_optionen').on('change', '[name="parent_optionen"]', window.adb.handleLrParentOptionenChange);
    $('#rueckfrage_lr_loeschen_ja').on('click', function (event) {
        // den event hier stoppen, nicht erst in der Funktion
        // hier übernimmt jQuery das stoppen, in der Funktion nicht
        // dort gibt es folgendes Problem: IE9 kennt preventDefault nicht
        event.preventDefault ? event.preventDefault() : event.returnValue = false;
        window.adb.handleRueckfrageLrLoeschenJaClick();
    });
    $body
        .on('click', '.anmelden_btn', function (event) {
            // den event hier stoppen, nicht erst in der Funktion
            // hier übernimmt jQuery das stoppen, in der Funktion nicht
            // dort gibt es folgendes Problem: IE9 kennt preventDefault nicht
            event.preventDefault ? event.preventDefault() : event.returnValue = false;
            // this übergeben, kommt sonst nicht mit!
            window.adb.handleAnmeldenBtnClick(this);
        })
        .on('click', '.abmelden_btn', function (event) {
            // den event hier stoppen, nicht erst in der Funktion
            // hier übernimmt jQuery das stoppen, in der Funktion nicht
            // dort gibt es folgendes Problem: IE9 kennt preventDefault nicht
            event.preventDefault ? event.preventDefault() : event.returnValue = false;
            // auf eigene Funktion verzichten, da nur ein Aufruf
            window.adb.meldeUserAb();
        })
        .on('keyup', '.Email', window.adb.handleEmailKeyup)
        .on('keyup', '.Passwort', window.adb.handlePasswortKeyup)
        .on('keyup', '.Passwort2', window.adb.handlePasswort2Keyup)
        .on('click', '.konto_erstellen_btn', function (event) {
            // den event hier stoppen, nicht erst in der Funktion
            // hier übernimmt jQuery das stoppen, in der Funktion nicht
            // dort gibt es folgendes Problem: IE9 kennt preventDefault nicht
            event.preventDefault ? event.preventDefault() : event.returnValue = false;
            // this übergeben
            window.adb.handleKontoErstellenBtnClick(this);
        })
        .on('click', '.konto_speichern_btn', function (event) {
            // den event hier stoppen, nicht erst in der Funktion
            // hier übernimmt jQuery das stoppen, in der Funktion nicht
            // dort gibt es folgendes Problem: IE9 kennt preventDefault nicht
            event.preventDefault ? event.preventDefault() : event.returnValue = false;
            window.adb.handleKontoSpeichernBtnClick(this);
        });
    $('.form')
        .on('keyup focus', 'textarea', window.adb.handleTextareaKeyupFocus) // Wenn panel geöffnet wird: Höhe der textareas an Textgrösse anpassen
        .on('shown.bs.collapse', '.panel', window.adb.handlePanelShown)
        // Klick auf Link zu Art steuern
        .on('click', '.LinkZuArtGleicherGruppe', function (event) {
            // den event hier stoppen, nicht erst in der Funktion
            // hier übernimmt jQuery das stoppen, in der Funktion nicht
            // dort gibt es folgendes Problem: IE9 kennt preventDefault nicht
            event.preventDefault ? event.preventDefault() : event.returnValue = false;
            window.adb.handleLinkZuArtGleicherGruppeClick($(this).attr('artid'));
        });
};