// wenn .btn.lr_bearb_schuetzen geklickt wird

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $ = require('jquery');

module.exports = function (that) {
    var schuetzeLrTaxonomie = require('./schuetzeLrTaxonomie');

    if (!$(that).hasClass('disabled')) {
        schuetzeLrTaxonomie();
        // Einstellung merken, damit auch nach Datensatzwechsel die Bearbeitbarkeit bleibt
        delete localStorage.lrBearb;
    }
};