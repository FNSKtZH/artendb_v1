// wenn importBsDsBeschreibenCollapse geöffnet wird

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $                                  = require('jquery'),
    bereiteImportierenBsBeschreibenVor = require('./bereiteImportierenBsBeschreibenVor');

module.exports = function () {
    // mitgeben, woher die Anfrage kommt, weil ev. angemeldet werden muss
    bereiteImportierenBsBeschreibenVor('bs');
    $('#bsImportiertVon').val(localStorage.email);
};