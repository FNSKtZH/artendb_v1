'use strict'

var $ = require('jquery'),
  onResize = require('./onResize'),
  fitTextareaToContent = require('./fitTextareaToContent'),
  onClickAnmeldenBtn = require('./login/onClickAnmeldenBtn'),
  meldeUserAb = require('./login/meldeUserAb'),
  onKeyupEmail = require('./login/onKeyupEmail'),
  onKeyupPasswort = require('./login/onKeyupPasswort'),
  onKeyupPasswort2 = require('./login/onKeyupPasswort2'),
  onClickKontoErstellenBtn = require('./login/onClickKontoErstellenBtn'),
  onClickKontoSpeichernBtn = require('./login/onClickKontoSpeichernBtn'),
  onClickOeffneGruppe = require('./onClickOeffneGruppe'),
  onClickBtnResize = require('./onClickBtnResize'),
  onClickMenuBtn = require('./onClickMenuBtn'),
  onClickShowNextHidden = require('./onClickShowNextHidden'),
  onClickShowNextHiddenExport = require('./onClickShowNextHiddenExport'),
  onClickMenuAdmin = require('./onClickMenuAdmin'),
  onClickMenuDsImportieren = require('./onClickMenuDsImportieren'),
  onClickMenuBsImportieren = require('./onClickMenuBsImportieren'),
  onClickMenuExportieren = require('./onClickMenuExportieren'),
  onShownPanel = require('./onShownPanel'),
  speichern = require('./speichern'),
  onClickLinkZuArtGleicherGruppe = require('./onClickLinkZuArtGleicherGruppe'),
  onClickAdminPilzeZhgisErgaenzen = require('./admin/onClickAdminPilzeZhgisErgaenzen'),
  onClickAdminKorrigiereArtwertnameInFlora = require('./admin/onClickAdminKorrigiereArtwertnameInFlora'),
  onClickAdminKorrigiereDsNameChRoteListe1991 = require('./admin/onClickAdminKorrigiereDsNameChRoteListe1991'),
  onClickAdminKorrigiereDsName = require('./admin/onClickAdminKorrigiereDsName'),
  onClickAdminBaueDsZuEigenschaftenUm = require('./admin/onClickAdminBaueDsZuEigenschaftenUm'),
  onShownImportierenDsDsBeschreibenCollapse = require('./import/onShownImportierenDsDsBeschreibenCollapse'),
  onShownImportierenBsDsBeschreibenCollapse = require('./import/onShownImportierenBsDsBeschreibenCollapse'),
  onShownImportierenDsDatenUploadenCollapse = require('./import/onShownImportierenDsDatenUploadenCollapse'),
  onShownImportierenBsDatenUploadenCollapse = require('./import/onShownImportierenBsDatenUploadenCollapse'),
  onShownImportierenDsIdsIdentifizierenCollapse = require('./import/onShownImportierenDsIdsIdentifizierenCollapse'),
  onShownImportierenBsIdsIdentifizierenCollapse = require('./import/onShownImportierenBsIdsIdentifizierenCollapse'),
  onShownImportierenDsImportAusfuehrenCollapse = require('./import/onShownImportierenDsImportAusfuehrenCollapse'),
  onShownImportierenBsImportAusfuehrenCollapse = require('./import/onShownImportierenBsImportAusfuehrenCollapse'),
  onChangeDsWaehlen = require('./import/onChangeDsWaehlen'),
  onChangeDsName = require('./import/onChangeDsName'),
  onChangeDsImportiertVon = require('./import/onChangeDsImportiertVon'),
  onChangeDsZusammenfassend = require('./import/onChangeDsZusammenfassend'),
  onChangeDsFile = require('./import/onChangeDsFile'),
  onChangeDsFelder = require('./import/onChangeDsFelder'),
  onChangeDsId = require('./import/onChangeDsId'),
  onClickDsLoeschen = require('./import/onClickDsLoeschen'),
  onClickDsImportieren = require('./import/onClickDsImportieren'),
  onClickDsEntfernen = require('./import/onClickDsEntfernen'),
  onClickPanelHeadingA = require('./onClickPanelHeadingA'),
  onChangeBsWaehlen = require('./import/onChangeBsWaehlen'),
  onChangeBsName = require('./import/onChangeBsName'),
  onChangeBsImportiertVon = require('./import/onChangeBsImportiertVon'),
  onChangeBsZusammenfassend = require('./import/onChangeBsZusammenfassend'),
  onChangeBsFile = require('./import/onChangeBsFile'),
  onChangeBsId = require('./import/onChangeBsId'),
  onChangeBsFelder = require('./import/onChangeBsFelder'),
  onClickBsImportieren = require('./import/onClickBsImportieren'),
  onClickBsLoeschen = require('./import/onClickBsLoeschen'),
  onClickBsEntfernen = require('./import/onClickBsEntfernen'),
  onChangeExportDsObjekteWaehlenGruppe = require('./export/onChangeExportDsObjekteWaehlenGruppe'),
  onChangeFeldWaehlen = require('./export/onChangeFeldWaehlen'),
  onChangeFeldWaehlenAlleVonDs = require('./export/onChangeFeldWaehlenAlleVonDs'),
  onChangeExportFeldFiltern = require('./export/onChangeExportFeldFiltern'),
  exportZuruecksetzen = require('./export/exportZuruecksetzen'),
  onClickExportFormat = require('./export/onClickExportFormat'),
  onClickTaxonomienZusammenfassen = require('./export/onClickTaxonomienZusammenfassen'),
  onClickExportExportiereBtn = require('./export/onClickExportExportiereBtn'),
  onClickExportiereDirekt = require('./export/onClickExportiereDirekt'),
  onShownExportExportCollapse = require('./export/onShownExportExportCollapse'),
  onShownExportObjekteWaehlenCollapse = require('./export/onShownExportObjekteWaehlenCollapse'),
  onShowExportExport = require('./export/onShowExportExport'),
  onClickLrBearb = require('./lr/onClickLrBearb'),
  onClickLrBearbBtn = require('./lr/onClickLrBearbBtn'),
  onClickLrBearbSchuetzenBtn = require('./lr/onClickLrBearbSchuetzenBtn'),
  onClickLrBearbNeu = require('./lr/onClickLrBearbNeu'),
  onShownLrTaxonomie = require('./lr/onShownLrTaxonomie'),
  onChangeParentOptionen = require('./lr/onChangeParentOptionen'),
  onClickRueckfrageLrLoeschenJa = require('./lr/onClickRueckfrageLrLoeschenJa')

module.exports = function () {
  var $body = $('body')

  $(window).resize(onResize)

  // body
  $body
    .on('click', '.showNextHidden', onClickShowNextHidden)
    .on('click', '.showNextHiddenExport', onClickShowNextHiddenExport)
    .on('click', '.anmeldenBtn', onClickAnmeldenBtn)
    .on('click', '.abmeldenBtn', meldeUserAb)
    .on('keyup', '.Email', onKeyupEmail)
    .on('keyup', '.Passwort', onKeyupPasswort)
    .on('keyup', '.passwort2', onKeyupPasswort2)
    .on('click', '.kontoErstellenBtn', onClickKontoErstellenBtn)
    .on('click', '.kontoSpeichernBtn', onClickKontoSpeichernBtn)

  // menu
  $('#menuBtn').on('click', onClickMenuBtn)
  $('#menu').on('click', '.gruppe', onClickOeffneGruppe)
  $('#btnResize').on('click', onClickBtnResize)
  $('#menuDsImportieren').on('click', onClickMenuDsImportieren)
  $('#bsImportieren').on('click', onClickMenuBsImportieren)
  $('#menuAdmin').on('click', onClickMenuAdmin)
  $('#menuExportieren').on('click', onClickMenuExportieren)

  $('.form')
    .on('keyup focus', 'textarea', fitTextareaToContent)
    .on('shown.bs.collapse', '.panel', onShownPanel)
    .on('click', '.linkZuArtGleicherGruppe', onClickLinkZuArtGleicherGruppe)

  // admin
  $('#adminPilzeZhgisErgaenzen').on('click', onClickAdminPilzeZhgisErgaenzen)
  $('#adminKorrigiereArtwertnameInFlora').on('click', onClickAdminKorrigiereArtwertnameInFlora)
  $('#adminKorrigiereDsNameChRoteListe1991').on('click', onClickAdminKorrigiereDsNameChRoteListe1991)
  $('#adminKorrigiereDsName').on('click', onClickAdminKorrigiereDsName)
  $('#adminBaueDsZuEigenschaftenUm').on('click', onClickAdminBaueDsZuEigenschaftenUm)

  // importieren
  $('#importDsDsBeschreibenCollapse').on('shown.bs.collapse', onShownImportierenDsDsBeschreibenCollapse)
  $('#importBsDsBeschreibenCollapse').on('shown.bs.collapse', onShownImportierenBsDsBeschreibenCollapse)
  $('#importDsDatenUploadenCollapse').on('shown.bs.collapse', onShownImportierenDsDatenUploadenCollapse)
  $('#importBsDatenUploadenCollapse').on('shown.bs.collapse', onShownImportierenBsDatenUploadenCollapse)
  $('#importDsIdsIdentifizierenCollapse').on('shown.bs.collapse', onShownImportierenDsIdsIdentifizierenCollapse)
  $('#importBsIdsIdentifizierenCollapse').on('shown.bs.collapse', onShownImportierenBsIdsIdentifizierenCollapse)
  $('#importDsImportAusfuehrenCollapse').on('shown.bs.collapse', onShownImportierenDsImportAusfuehrenCollapse)
  $('#importBsImportAusfuehrenCollapse').on('shown.bs.collapse', onShownImportierenBsImportAusfuehrenCollapse)
  $('#dsWaehlen').on('change', onChangeDsWaehlen)
  $('#dsName').on('change', onChangeDsName)
  $('#dsImportiertVon').on('change', onChangeDsImportiertVon)
  $('#dsZusammenfassend').on('change', onChangeDsZusammenfassend)
  $('#dsFile').on('change', onChangeDsFile)
  $('#dsFelder').on('change', onChangeDsFelder)
  $('#dsId').on('change', onChangeDsId)
  $('#dsLoeschen').on('click', onClickDsLoeschen)
  $('#dsImportieren').on('click', onClickDsImportieren)
  $('#dsEntfernen').on('click', onClickDsEntfernen)
  $('#importDs').on('click', '.panel-heading a', onClickPanelHeadingA)
  $('#bsWaehlen').on('change', onChangeBsWaehlen)
  $('#bsName').on('change', onChangeBsName)
  $('#bsImportiertVon').on('change', onChangeBsImportiertVon)
  $('#bsZusammenfassend').on('change', onChangeBsZusammenfassend)
  $('#bsFile').on('change', onChangeBsFile)
  $('#bsId').on('change', onChangeBsId)
  $('#bsFelder').on('change', onChangeBsFelder)
  $('#bsImportieren').on('click', onClickBsImportieren)
  $('#bsLoeschen').on('click', onClickBsLoeschen)
  $('#bsEntfernen').on('click', onClickBsEntfernen)

  // exportieren
  $('#export')
    .on('change', '.exportDsObjekteWaehlenGruppe', onChangeExportDsObjekteWaehlenGruppe)
    .on('change', '.feldWaehlen', onChangeFeldWaehlen)
    .on('change', '.feldWaehlenAlleVonDs', onChangeFeldWaehlenAlleVonDs)
    .on('change', '.exportFeldFiltern', onChangeExportFeldFiltern)
    .on('click', '.panel-heading a', onClickPanelHeadingA)
    .on('click', '[name="exportExportFormat"]', onClickExportFormat)
  $('#exportBezInZeilen,#exportBezInFeldern').on('change', exportZuruecksetzen)
  $('#exportSynonymInfos').on('change', exportZuruecksetzen)
  $('#exportNurObjekteMitEigenschaften').on('change', exportZuruecksetzen)
  $('#exportObjekteTaxonomienZusammenfassen').on('click', onClickTaxonomienZusammenfassen)
  $('#exportExportiereBtn').on('click', onClickExportExportiereBtn)
  $('#exportExportiereDirekt').on('click', onClickExportiereDirekt)
  $('#exportExportCollapse').on('shown.bs.collapse', onShownExportExportCollapse)
  $('#exportObjekteWaehlenDsCollapse').on('shown.bs.collapse', onShownExportObjekteWaehlenCollapse)
  $('#exportFelderWaehlenCollapse').on('shown.bs.collapse', onShownExportObjekteWaehlenCollapse)
  $('#exportExport').on('show', onShowExportExport)

  // exportieren für alt
  $('#exportAlt')
    .on('change', '.feldWaehlen', onChangeFeldWaehlen)
    .on('change', '.feldWaehlenAlleVonDsAlt', onChangeFeldWaehlenAlleVonDs)
    .on('shown.bs.collapse', '#exportAltExportCollapse', onShownExportExportCollapse)
    .on('click', ' .panel-heading a', onClickPanelHeadingA)
  $('#exportAltBezInZeilen').on('change', exportZuruecksetzen)
  $('#exportAltBezInFeldern').on('change', exportZuruecksetzen)
  $('#exportAltSynonymInfos').on('change', exportZuruecksetzen)

  // * art / lr
  $('#art')
    .on('click', '.btn.lrBearb', onClickLrBearb)
    .on('click', '.btn.lrBearbBtn', onClickLrBearbBtn)
    .on('click', '.btn.lrBearbSchuetzen', onClickLrBearbSchuetzenBtn)
    .on('click', '.btn.lrBearbNeu', onClickLrBearbNeu)
    .on('change', '.Lebensräume.Taxonomie .controls', speichern)
    .on('shown.bs.collapse', '.Lebensräume.Taxonomie', onShownLrTaxonomie)
  $('#lrParentWaehlenOptionen').on('change', '[name="parentOptionen"]', onChangeParentOptionen)
  $('#rueckfrageLrLoeschenJa').on('click', onClickRueckfrageLrLoeschenJa)
}
