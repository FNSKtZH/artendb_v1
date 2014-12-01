/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var exportZuruecksetzen                  = require('./exportZuruecksetzen'),
    fasseTaxonomienZusammen              = require('./fasseTaxonomienZusammen'),
    onChangeExportDsObjekteWaehlenGruppe = require('./onChangeExportDsObjekteWaehlenGruppe');

module.exports = function () {
    // event stoppen, um zu verhindern, dass bootstrap ganz nach oben scrollt
    event.preventDefault ? event.preventDefault() : event.returnValue = false;
    // this übergeben!
    fasseTaxonomienZusammen(this);
    onChangeExportDsObjekteWaehlenGruppe();
    exportZuruecksetzen(this);
};