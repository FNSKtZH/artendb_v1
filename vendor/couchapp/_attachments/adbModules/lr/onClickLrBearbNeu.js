// wenn .btn.lrBearbNeu geklickt wird

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $                              = require('jquery'),
    getHtmlForLrParentAuswahlliste = require('./getHtmlForLrParentAuswahlliste');

module.exports = function (that) {
    if (!$(that).hasClass('disabled')) {
        getHtmlForLrParentAuswahlliste($('#Taxonomie').val(), function (html) {
            $('#lrParentWaehlenOptionen').html(html);
            // jetzt das modal aufrufen
            // höhe Anpassen funktioniert leider nicht über css mit calc
            $('#lrParentWaehlen').modal();
            $('#lrParentWaehlenOptionen').css('max-height', $(window).height() - 100);
        });
    }
};