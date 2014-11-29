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
    onChangeBsFile                                = require('./import/onChangeBsFile'),
    onChangeBsId                                  = require('./import/onChangeBsId'),
    onChangeBsFelder                              = require('./import/onChangeBsFelder'),
    onClickBsImportieren                          = require('./import/onClickBsImportieren'),
    onClickBsLoeschen                             = require('./import/onClickBsLoeschen'),
    onClickBsEntfernen                            = require('./import/onClickBsEntfernen'),
    onChangeExportierenDsObjekteWaehlenGruppe     = require('./export/onChangeExportierenDsObjekteWaehlenGruppe'),
    onChangeFeldWaehlen                           = require('./export/onChangeFeldWaehlen');

module.exports = function () {
    var $body = $('body');

    $(window).resize(window.adb.handleResize);

    /*
     * body
     */
    $body
        .on('click', '.showNextHidden',                                   onClickShowNextHidden)
        .on('click', '.showNextHiddenExport',                             onClickShowNextHiddenExport);
    $('#menuBtn')                                .on('click',             onClickMenuBtn);

    /*
     * menu
     */
    $('#menu').on('click',  '.gruppe',                                    onClickOeffneGruppe);
    $('#btnResize')                              .on('click',             onClickBtnResize);
    $('#menuDsImportieren')                      .on('click',             onClickMenuDsImportieren);
    $('#bsImportieren')                          .on('click',             onClickMenuBsImportieren);
    $('#menuAdmin')                              .on('click',             onClickMenuAdmin);
    $('#exportieren')                            .on('click',             onClickExportieren);
    $('#exportierenAlt')                         .on('click',             onClickExportierenAlt);

    /*
     * admin
     */
    $('#adminPilzeZhgisErgaenzen')               .on('click',             onClickAdminPilzeZhgisErgaenzen);
    $('#adminKorrigiereArtwertnameInFlora')      .on('click',             onClickAdminKorrigiereArtwertnameInFlora);
    $('#adminKorrigiereDsNameChRoteListe1991')   .on('click',             onClickAdminKorrigiereDsNameChRoteListe1991);
    $('#adminKorrigiereDsName')                  .on('click',             onClickAdminKorrigiereDsName);
    $('#adminBaueDsZuEigenschaftenUm')           .on('click',             onClickAdminBaueDsZuEigenschaftenUm);

    /*
     * importieren
     */
    $('#importierenDsDsBeschreibenCollapse') .on('shown.bs.collapse', onShownImportierenDsDsBeschreibenCollapse);
    $('#importierenBsDsBeschreibenCollapse') .on('shown.bs.collapse', onShownImportierenBsDsBeschreibenCollapse);
    $('#importierenDsDatenUploadenCollapse')     .on('shown.bs.collapse', onShownImportierenDsDatenUploadenCollapse);
    $('#importierenBsDatenUploadenCollapse')     .on('shown.bs.collapse', onShownImportierenBsDatenUploadenCollapse);
    $('#importierenDsIdsIdentifizierenCollapse') .on('shown.bs.collapse', onShownImportierenDsIdsIdentifizierenCollapse);
    $('#importierenBsIdsIdentifizierenCollapse') .on('shown.bs.collapse', onShownImportierenBsIdsIdentifizierenCollapse);
    $('#importierenDsImportAusfuehrenCollapse')  .on('shown.bs.collapse', onShownImportierenDsImportAusfuehrenCollapse);
    $('#importierenBsImportAusfuehrenCollapse')  .on('shown.bs.collapse', onShownImportierenBsImportAusfuehrenCollapse);
    $('#dsWaehlen')                              .on('change',            onChangeDsWaehlen);
    $('#DsName')                                 .on('change',            onChangeDsName);
    $('#DsImportiertVon')                        .on('change',            onChangeDsImportiertVon);
    $('#DsZusammenfassend')                      .on('change',            onChangeDsZusammenfassend);
    $('#DsFile')                                 .on('change',            onChangeDsFile);
    $('#DsFelder')                               .on('change',            onChangeDsFelder);
    $('#DsId')                                   .on('change',            onChangeDsId);
    $('#DsLoeschen')                             .on('click',             onClickDsLoeschen);
    $('#DsImportieren')                          .on('click',             onClickDsImportieren);
    $('#DsEntfernen')                            .on('click',             onClickDsEntfernen);
    $('#importierenDs').on('click', '.panel-heading a',                   onClickPanelHeadingA);
    $('#bsWaehlen')                              .on('change',            onChangeBsWaehlen);
    $('#BsName')                                 .on('change',            onChangeBsName);
    $('#bsImportiertVon')                        .on('change',            onChangeBsImportiertVon);
    $('#bsZusammenfassend')                      .on('change',            onChangeBsZusammenfassend);
    $('#BsFile')                                 .on('change',            onChangeBsFile);
    $('#BsId')                                   .on('change',            onChangeBsId);
    $('#BsFelder')                               .on('change',            onChangeBsFelder);
    $('#BsImportieren')                          .on('click',             onClickBsImportieren);
    $('#BsLoeschen')                             .on('click',             onClickBsLoeschen);
    $('#BsEntfernen')                            .on('click',             onClickBsEntfernen);

    /*
     * exportieren
     */
    $('#export')
        .on('change', '.exportierenDsObjekteWaehlenGruppe',               onChangeExportierenDsObjekteWaehlenGruppe)
        .on('change', '.feldWaehlen',                                     onChangeFeldWaehlen)
        .on('change', '.feldWaehlenAlleVonDs',              window.adb.handleFeldWaehlenAlleVonDs)
        .on('change', '.exportFeldFiltern',                   window.adb.handleExportFeldFilternChange)
        // verhindern, dass bootstrap ganz nach oben scrollt
        .on('click', '.panel-heading a', function (event) {
            event.preventDefault ? event.preventDefault() : event.returnValue = false;
        })
        .on('click', '[name="exportierenExportierenFormat"]', window.adb.blendeFormatCsvTipps)
        .on('change', '.feldWaehlenAlleVonDs', window.adb.exportZuruecksetzen);
    $('#exportBezInZeilen,#exportBezInFeldern,#exportierenSynonymInfos,#exportierenNurObjekteMitEigenschaften').on('change', window.adb.exportZuruecksetzen);
    $('#exportierenObjekteTaxonomienZusammenfassen').on('click', function (event) {
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
    $('#exportierenExportierenExportieren').on('click', function (event) {
        // event stoppen, um zu verhindern, dass bootstrap ganz nach oben scrollt
        // den event hier stoppen, nicht erst in der Funktion
        // hier übernimmt jQuery das stoppen, in der Funktion nicht
        // dort gibt es folgendes Problem: IE9 kennt preventDefault nicht
        event.preventDefault ? event.preventDefault() : event.returnValue = false;
        window.adb.handleExportierenExportierenExportierenClick();
    });
    $('#exportierenExportierenExportieren_direkt').on('click', function (event) {
        event.preventDefault ? event.preventDefault() : event.returnValue = false;
        window.adb.filtereFuerExport('direkt');
    });
    $('#exportierenExportierenCollapse').on('shown.bs.collapse', function () {
        window.adb.handleExportierenExportierenCollapseShown(this);
    });
    $('#exportierenObjekteWaehlenDsCollapse').on('shown.bs.collapse', window.adb.handleExportierenObjekteWaehlenCollapseShown);
    $('#exportierenFelderWaehlenCollapse').on('shown.bs.collapse', window.adb.handleExportierenObjekteWaehlenCollapseShown);
    $('#exportieren_exportieren').on('show', window.adb.handleExportierenExportierenShow);

    /*
     * exportieren für alt
     */
    $('#exportAlt')
        .on('change', '.feldWaehlen', window.adb.handleFeldWaehlenChange)
        .on('change', '.feld_waehlen_alle_von_ds_alt', window.adb.handleFeldWaehlenAlleVonDs)
        .on('change', '#export_altBezInZeilen,#export_altBezInFeldern,#exportierenAltSynonymInfos,#exportieren_alt_nur_objekte_mit_eigenschaften,.feld_waehlen_alle_von_ds_alt', function () {
            window.adb.exportZuruecksetzen(null, '_alt');
        })
        .on('schown.bs.collapse', '#exportieren_alt_felder_waehlen_collapse', function () {
            window.adb.scrollThisToTop(this, 6);
        })
        .on('shown.bs.collapse', '#exportieren_altExportierenCollapse', function () {
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