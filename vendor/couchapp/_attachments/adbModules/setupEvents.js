/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true, white: true*/
'use strict';

var $                                           = require('jquery'),
    onClickOeffneGruppe                         = require('./onClickOeffneGruppe'),
    onClickBtnResize                            = require('./onClickBtnResize'),
    onClickMenuBtn                              = require('./onClickMenuBtn'),
    onClickShowNextHidden                       = require('./onClickShowNextHidden'),
    onClickShowNextHiddenExport                 = require('./onClickShowNextHiddenExport'),
    onClickDsImportieren                        = require('./import/onClickDsImportieren'),
    onClickBsImportieren                        = require('./import/onClickBsImportieren'),
    onClickMenuAdmin                            = require('./onClickMenuAdmin'),
    onClickExportieren                          = require('./export/onClickExportieren'),
    onClickExportierenAlt                       = require('./export/onClickExportierenAlt'),
    onClickAdminPilzeZhgisErgaenzen             = require('./admin/onClickAdminPilzeZhgisErgaenzen'),
    onClickAdminKorrigiereArtwertnameInFlora    = require('./admin/onClickAdminKorrigiereArtwertnameInFlora'),
    onClickAdminKorrigiereDsNameChRoteListe1991 = require('./admin/onClickAdminKorrigiereDsNameChRoteListe1991'),
    onClickAdminKorrigiereDsName                = require('./admin/onClickAdminKorrigiereDsName'),
    onClickAdminBaueDsZuEigenschaftenUm         = require('./admin/onClickAdminBaueDsZuEigenschaftenUm'),
    onShownImportierenDsDsBeschreibenCollapse   = require('./import/onShownImportierenDsDsBeschreibenCollapse'),
    onShownImportierenBsDsBeschreibenCollapse   = require('./import/onShownImportierenBsDsBeschreibenCollapse'),
    onShownImportierenDsDatenUploadenCollapse   = require('./import/onShownImportierenDsDatenUploadenCollapse'),
    onShownImportierenBsDatenUploadenCollapse   = require('./import/onShownImportierenBsDatenUploadenCollapse');

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
    $('#menu').on('click',  '.gruppe', onClickOeffneGruppe);
    $('#btnResize')                                 .on('click',             onClickBtnResize);
    $('#ds_importieren')                            .on('click',             onClickDsImportieren);
    $('#bs_importieren')                            .on('click',             onClickBsImportieren);
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
    $('#importieren_ds_ids_identifizieren_collapse').on('shown.bs.collapse', window.adb.handleImportierenDsIdsIdentifizierenCollapseShown);
    $('#importieren_bs_ids_identifizieren_collapse').on('shown.bs.collapse', window.adb.handleImportierenBsIdsIdentifizierenCollapseShown);
    $('#importieren_ds_import_ausfuehren_collapse') .on('shown.bs.collapse', window.adb.handleImportierenDsImportAusfuehrenCollapseShown);
    $('#importieren_bs_import_ausfuehren_collapse') .on('shown.bs.collapse', window.adb.handleImportierenBsImportAusfuehrenCollapseShown);
    $('#DsWaehlen').on('change', window.adb.handleDsWaehlenChange);
    $('#DsName').on('change', window.adb.handleDsNameChange);
    $('#DsImportiertVon').on('change', window.adb.handleDsImportiertVonChange);
    $('#DsZusammenfassend').on('change', window.adb.handleDsZusammenfassendChange);
    $('#DsFile').on('change', function (event) {
        // den event hier stoppen, nicht erst in der Funktion
        // hier übernimmt jQuery das stoppen, in der Funktion nicht
        // dort gibt es folgendes Problem: IE9 kennt preventDefault nicht
        event.preventDefault();
        window.adb.handleDsFileChange();
    });
    $('#DsFelder').on('change', window.adb.handleDsFelderChange);
    $('#DsId').on('change', window.adb.handleDsIdChange);
    $('#DsLoeschen').on('click', function (event) {
        // den event hier stoppen, nicht erst in der Funktion
        // hier übernimmt jQuery das stoppen, in der Funktion nicht // dort gibt es folgendes Problem: IE9 kennt preventDefault nicht
        event.preventDefault();
        window.adb.handleDsLoeschenClick();
    });
    $('#DsImportieren').on('click', function (event) {
        // den event hier stoppen, nicht erst in der Funktion
        // hier übernimmt jQuery das stoppen, in der Funktion nicht // dort gibt es folgendes Problem: IE9 kennt preventDefault nicht
        event.preventDefault();
        window.adb.importiereDatensammlung();
    });
    $('#DsEntfernen').on('click', function (event) {
        // den event hier stoppen, nicht erst in der Funktion
        // hier übernimmt jQuery das stoppen, in der Funktion nicht
        // dort gibt es folgendes Problem: IE9 kennt preventDefault nicht
        event.preventDefault();
        window.adb.entferneDatensammlung();
    });
    $('#importieren_ds').on('click',  '.panel-heading a', function (event) {
        // verhindern, dass bootstrap ganz nach oben scrollt
        event.preventDefault();
    });

    $('#BsWaehlen').on('change', window.adb.handleBsWaehlenChange);
    $('#BsName').on('change', window.adb.handleBsNameChange);
    $('#BsImportiertVon').on('change', window.adb.handleBsImportiertVonChange);
    $('#BsZusammenfassend').on('change', window.adb.handleBsZusammenfassendChange);
    $('#BsFile').on('change', function (event) {
        // den event hier stoppen, nicht erst in der Funktion
        // hier übernimmt jQuery das stoppen, in der Funktion nicht
        // dort gibt es folgendes Problem: IE9 kennt preventDefault nicht
        event.preventDefault();
        window.adb.handleBsFileChange();
    });
    $('#BsId').on('change', window.adb.handleBsIdChange);
    $('#BsFelder').on('change', window.adb.handleBsFelderChange);
    $('#BsImportieren').on('click', function (event) {
        // den event hier stoppen, nicht erst in der Funktion
        // hier übernimmt jQuery das stoppen, in der Funktion nicht
        // dort gibt es folgendes Problem: IE9 kennt preventDefault nicht
        event.preventDefault();
        window.adb.importiereBeziehungssammlung();
    });
    $('#BsLoeschen').on('click', function (event) {
        // den event hier stoppen, nicht erst in der Funktion
        // hier übernimmt jQuery das stoppen, in der Funktion nicht
        // dort gibt es folgendes Problem: IE9 kennt preventDefault nicht
        event.preventDefault();
        window.adb.handleBsLoeschenClick();
    });
    $('#BsEntfernen').on('click', function (event) {
        // den event hier stoppen, nicht erst in der Funktion
        // hier übernimmt jQuery das stoppen, in der Funktion nicht
        // dort gibt es folgendes Problem: IE9 kennt preventDefault nicht
        event.preventDefault();
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
            event.preventDefault();
        })
        .on('click', '[name="exportieren_exportieren_format"]', window.adb.blendeFormatCsvTipps)
        .on('change', '.feld_waehlen_alle_von_ds', window.adb.exportZuruecksetzen);
    $('#export_bez_in_zeilen,#export_bez_in_feldern,#exportieren_synonym_infos,#exportieren_nur_objekte_mit_eigenschaften').on('change', window.adb.exportZuruecksetzen);
    $('#exportieren_objekte_Taxonomien_zusammenfassen').on('click', function (event) {
        // event stoppen, um zu verhindern, dass bootstrap ganz nach oben scrollt
        // den event hier stoppen, nicht erst in der Funktion
        // hier übernimmt jQuery das stoppen, in der Funktion nicht
        // dort gibt es folgendes Problem: IE9 kennt preventDefault nicht
        event.preventDefault();
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
        event.preventDefault();
        window.adb.handleExportierenExportierenExportierenClick();
    });
    $('#exportieren_exportieren_exportieren_direkt').on('click', function (event) {
        event.preventDefault();
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
            event.preventDefault();
        });

    /*
     * art / lr
     */
    $('#art')
        .on('click', '.btn.lrBearb', function (event) {
            event.preventDefault();
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
        event.preventDefault();
        window.adb.handleRueckfrageLrLoeschenJaClick();
    });
    $body
        .on('click', '.anmelden_btn', function (event) {
            // den event hier stoppen, nicht erst in der Funktion
            // hier übernimmt jQuery das stoppen, in der Funktion nicht
            // dort gibt es folgendes Problem: IE9 kennt preventDefault nicht
            event.preventDefault();
            // this übergeben, kommt sonst nicht mit!
            window.adb.handleAnmeldenBtnClick(this);
        })
        .on('click', '.abmelden_btn', function (event) {
            // den event hier stoppen, nicht erst in der Funktion
            // hier übernimmt jQuery das stoppen, in der Funktion nicht
            // dort gibt es folgendes Problem: IE9 kennt preventDefault nicht
            event.preventDefault();
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
            event.preventDefault();
            // this übergeben
            window.adb.handleKontoErstellenBtnClick(this);
        })
        .on('click', '.konto_speichern_btn', function (event) {
            // den event hier stoppen, nicht erst in der Funktion
            // hier übernimmt jQuery das stoppen, in der Funktion nicht
            // dort gibt es folgendes Problem: IE9 kennt preventDefault nicht
            event.preventDefault();
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
            event.preventDefault();
            window.adb.handleLinkZuArtGleicherGruppeClick($(this).attr('artid'));
        });
};