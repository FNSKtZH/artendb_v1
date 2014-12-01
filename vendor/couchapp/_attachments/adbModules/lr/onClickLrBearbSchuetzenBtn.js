// wenn .btn.lrBearbSchuetzen geklickt wird

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $                   = require('jquery'),
    schuetzeLrTaxonomie = require('./schuetzeLrTaxonomie');

module.exports = function () {
    if (!$(this).hasClass('disabled')) {
        schuetzeLrTaxonomie();
        // Einstellung merken, damit auch nach Datensatzwechsel die Bearbeitbarkeit bleibt
        delete localStorage.lrBearb;
    }
};