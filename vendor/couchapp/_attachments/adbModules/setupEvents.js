/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $                           = require('jquery'),
    onClickOeffneGruppe         = require('./events/onClickOeffneGruppe'),
    onClickBtnResize            = require('./events/onClickBtnResize'),
    onClickMenuBtn              = require('./events/onClickMenuBtn'),
    onClickShowNextHidden       = require('./events/onClickShowNextHidden'),
    onClickShowNextHiddenExport = require('./events/onClickShowNextHiddenExport');

module.exports = function () {
    $('#menu')
        // Baum aufbauen, wenn Gruppe gewählt wird
        .on('click', '.gruppe',               onClickOeffneGruppe)
        // zwischen Mobil- und Desktopsicht wechseln
        .on('click', '#btnResize',            onClickBtnResize);

    // Menu: Links zu Google Bilder und Wikipedia nur aktiv setzen, wenn Art oder Lebensraum angezeigt wird
    $('body')
        .on('click', '#menuBtn',              onClickMenuBtn)
        .on('click', '.showNextHidden',       onClickShowNextHidden)
        .on('click', '.showNextHiddenExport', onClickShowNextHiddenExport);

    $('#menuBtn')
        // testen, ob der Browser das Importieren unterstützt
        // wenn nein, Meldung bringen
        .on('click', '#ds_importieren',  window.adb.handleDsImportierenClick)
        // testen, ob der Browser das Importieren unterstützt
        // wenn nein, Meldung bringen
        .on('click', '#bs_importieren',  window.adb.handleBsImportierenClick)
        .on('click', '#menu_admin',      window.adb.handleMenuAdminClick)
        .on('click', '#exportieren',     window.adb.handleExportierenClick)
        .on('click', '#exportieren_alt', window.adb.handleExportierenAltClick);

    $('#exportieren_diverses')
        .on('click', '#admin_pilze_zhgis_ergänzen', window.adb.ergaenzePilzeZhgis)
        .on('click', '#admin_korrigiere_artwertname_in_flora', window.adb.korrigiereArtwertnameInFlora)
        .on('click', '#admin_korrigiere_ds_name_ch_rote_liste_1991', window.adb.korrigiereDsNameFloraChRoteListe1991)
        .on('click', '#admin_korrigiere_ds_name', function (event) {
            // dieser Event wurde bei jedem Laden der Seite ausgelöst!
            if ($('#exportieren_diverses_collapse').is(':visible')) {
                window.adb.nenneDsUm();
            } else {
                event.preventDefault();
            }
        })
        .on('click', '#admin_baue_ds_zu_eigenschaften_um', window.adb.baueDsZuEigenschaftenUm);

    $('#importieren_ds').on('shown.bs.collapse', '#importieren_ds_ds_beschreiben_collapse', window.adb.handleImportierenDsDsBeschreibenCollapseShown);

    $('#importieren_bs_ds_beschreiben_collapse').on('shown.bs.collapse', window.adb.handleImportierenBsDsBeschreibenCollapseShown);

    $('#importieren_ds_daten_uploaden_collapse').on('shown.bs.collapse', window.adb.handleImportierenDsDatenUploadenCollapseShown);

    $('#importieren_bs_daten_uploaden_collapse').on('shown.bs.collapse', window.adb.handleImportierenBsDatenUploadenCollapseShown);

    $('#importieren_ds_ids_identifizieren_collapse').on('shown.bs.collapse', window.adb.handleImportierenDsIdsIdentifizierenCollapseShown);

    $('#importieren_bs_ids_identifizieren_collapse').on('shown.bs.collapse', window.adb.handleImportierenBsIdsIdentifizierenCollapseShown);

    $('#importieren_ds_import_ausfuehren_collapse').on('shown.bs.collapse', window.adb.handleImportierenDsImportAusfuehrenCollapseShown);

    $('#importieren_bs_import_ausfuehren_collapse').on('shown.bs.collapse', window.adb.handleImportierenBsImportAusfuehrenCollapseShown);

    $('#importieren_ds')
        .on('change', '#DsWaehlen', window.adb.handleDsWaehlenChange)
        .on('change', '#DsName', window.adb.handleDsNameChange)
        .on('change', '#DsImportiertVon', window.adb.handleDsImportiertVonChange)
        .on('change', '#DsZusammenfassend', window.adb.handleDsZusammenfassendChange)
        .on('change', '#DsFile', function (event) {
            // den event hier stoppen, nicht erst in der Funktion
            // hier übernimmt jQuery das stoppen, in der Funktion nicht
            // dort gibt es folgendes Problem: IE9 kennt preventDefault nicht
            event.preventDefault();
            window.adb.handleDsFileChange();
        })
        .on('change', '#DsFelder', window.adb.handleDsFelderChange)
        .on('change', '#DsId', window.adb.handleDsIdChange)
        .on('click', '#DsLoeschen', function (event) {
            // den event hier stoppen, nicht erst in der Funktion
            // hier übernimmt jQuery das stoppen, in der Funktion nicht // dort gibt es folgendes Problem: IE9 kennt preventDefault nicht
            event.preventDefault();
            window.adb.handleDsLoeschenClick();
        })
        .on('click', '#DsImportieren', function (event) {
            // den event hier stoppen, nicht erst in der Funktion
            // hier übernimmt jQuery das stoppen, in der Funktion nicht // dort gibt es folgendes Problem: IE9 kennt preventDefault nicht
            event.preventDefault();
            window.adb.importiereDatensammlung();
        })
        .on('click', '#DsEntfernen', function (event) {
            // den event hier stoppen, nicht erst in der Funktion
            // hier übernimmt jQuery das stoppen, in der Funktion nicht
            // dort gibt es folgendes Problem: IE9 kennt preventDefault nicht
            event.preventDefault();
            window.adb.entferneDatensammlung();
        })
        // verhindern, dass bootstrap ganz nach oben scrollt
        .on('click', '.panel-heading a', function (event) {
            event.preventDefault();
        });

    $('#importieren_bs')
        .on('change', '#BsWaehlen', window.adb.handleBsWaehlenChange)
        .on('change', '#BsName', window.adb.handleBsNameChange)
        .on('change', '#BsImportiertVon', window.adb.handleBsImportiertVonChange)
        .on('change', '#BsZusammenfassend', window.adb.handleBsZusammenfassendChange)
        .on('change', '#BsFile', function (event) {
            // den event hier stoppen, nicht erst in der Funktion
            // hier übernimmt jQuery das stoppen, in der Funktion nicht
            // dort gibt es folgendes Problem: IE9 kennt preventDefault nicht
            event.preventDefault();
            window.adb.handleBsFileChange();
        })
        .on('change', '#BsId', window.adb.handleBsIdChange)
        .on('change', '#BsFelder', window.adb.handleBsFelderChange)
        .on('click', '#BsImportieren', function (event) {
            // den event hier stoppen, nicht erst in der Funktion
            // hier übernimmt jQuery das stoppen, in der Funktion nicht
            // dort gibt es folgendes Problem: IE9 kennt preventDefault nicht
            event.preventDefault();
            window.adb.importiereBeziehungssammlung();
        })
        .on('click', '#BsLoeschen', function (event) {
            // den event hier stoppen, nicht erst in der Funktion
            // hier übernimmt jQuery das stoppen, in der Funktion nicht
            // dort gibt es folgendes Problem: IE9 kennt preventDefault nicht
            event.preventDefault();
            window.adb.handleBsLoeschenClick();
        })
        .on('click', '#BsEntfernen', function (event) {
            // den event hier stoppen, nicht erst in der Funktion
            // hier übernimmt jQuery das stoppen, in der Funktion nicht
            // dort gibt es folgendes Problem: IE9 kennt preventDefault nicht
            event.preventDefault();
            window.adb.entferneBeziehungssammlung();
        });

    $('#export')
        .on('change', '.exportieren_ds_objekte_waehlen_gruppe', window.adb.handleExportierenDsObjekteWaehlenGruppeChange)
        .on('change', '.feld_waehlen',                          window.adb.handleFeldWaehlenChange)
        .on('change', '.feld_waehlen_alle_von_ds',              window.adb.handleFeldWaehlenAlleVonDs)
        .on('change', '.export_feld_filtern',                   window.adb.handleExportFeldFilternChange)
        .on('change', '#export_bez_in_zeilen,#export_bez_in_feldern,#exportieren_synonym_infos,#exportieren_nur_objekte_mit_eigenschaften,.feld_waehlen_alle_von_ds', window.adb.exportZuruecksetzen)
        .on('click', '#exportieren_objekte_Taxonomien_zusammenfassen', function (event) {
            // event stoppen, um zu verhindern, dass bootstrap ganz nach oben scrollt
            // den event hier stoppen, nicht erst in der Funktion
            // hier übernimmt jQuery das stoppen, in der Funktion nicht
            // dort gibt es folgendes Problem: IE9 kennt preventDefault nicht
            event.preventDefault();
            // this übergeben!
            window.adb.handleExportierenObjekteTaxonomienZusammenfassenClick(this);
            window.adb.handleExportierenDsObjekteWaehlenGruppeChange();
            window.adb.exportZuruecksetzen();
        })
        .on('click', '#exportieren_exportieren_exportieren', function (event) {
            // event stoppen, um zu verhindern, dass bootstrap ganz nach oben scrollt
            // den event hier stoppen, nicht erst in der Funktion
            // hier übernimmt jQuery das stoppen, in der Funktion nicht
            // dort gibt es folgendes Problem: IE9 kennt preventDefault nicht
            event.preventDefault();
            window.adb.handleExportierenExportierenExportierenClick();
        })
        .on('click', '#exportieren_exportieren_exportieren_direkt', function (event) {
            event.preventDefault();
            window.adb.filtereFuerExport('direkt');
        })
        // verhindern, dass bootstrap ganz nach oben scrollt
        .on('click', '.panel-heading a', function (event) {
            event.preventDefault();
        })
        .on('shown.bs.collapse', '#exportieren_exportieren_collapse', function (event) {
            window.adb.handleExportierenExportierenCollapseShown(this);
        })
        .on('shown.bs.collapse', '#exportieren_objekte_waehlen_ds_collapse', window.adb.handleExportierenObjekteWaehlenCollapseShown)
        .on('shown.bs.collapse', '#exportieren_felder_waehlen_collapse', window.adb.handleExportierenObjekteWaehlenCollapseShown)
        .on('click', '[name="exportieren_exportieren_format"]', window.adb.blendeFormatCsvTipps);

    $('#export_alt')
        .on('change', '.feld_waehlen', window.adb.handleFeldWaehlenChange)
        .on('change', '.feld_waehlen_alle_von_ds_alt', window.adb.handleFeldWaehlenAlleVonDs)
        .on('change', '#export_alt_bez_in_zeilen,#export_alt_bez_in_feldern,#exportieren_alt_synonym_infos,#exportieren_alt_nur_objekte_mit_eigenschaften,.feld_waehlen_alle_von_ds_alt', function () {
            window.adb.exportZuruecksetzen(null, '_alt');
        })
        .on('schown.bs.collapse', '#exportieren_alt_felder_waehlen_collapse', function (event) {
            window.adb.scrollThisToTop(this, 6);
        })
        .on('shown.bs.collapse', '#exportieren_alt_exportieren_collapse', function (event) {
            // mitteilen, dass für alt exportiert wird
            window.adb.handleExportierenExportierenCollapseShown(this);
            window.adb.scrollThisToTop(this, 6);
        })
        // verhindern, dass bootstrap ganz nach oben scrollt
        .on('click', '.panel-heading a', function (event) {
            event.preventDefault();
        });

    $('#exportieren_exportieren').on('show', window.adb.handleExportierenExportierenShow);

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

    $(window).resize(window.adb.handleResize);

    $(document)
        .on('click', '#rueckfrage_lr_loeschen_ja', function (event) {
            // den event hier stoppen, nicht erst in der Funktion
            // hier übernimmt jQuery das stoppen, in der Funktion nicht
            // dort gibt es folgendes Problem: IE9 kennt preventDefault nicht
            event.preventDefault();
            window.adb.handleRueckfrageLrLoeschenJaClick();
        })
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
};