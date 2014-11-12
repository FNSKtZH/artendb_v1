// wenn .btn.lr_bearb_neu geklickt wird

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $ = require('jquery');

module.exports = function (that) {
    var getHtmlForLrParentAuswahlliste = require('./getHtmlForLrParentAuswahlliste');

    console.log('that : ', that);

    if (!$(that).hasClass('disabled')) {
        getHtmlForLrParentAuswahlliste($("#Taxonomie").val(), function (html) {
            $("#lr_parent_waehlen_optionen").html(html);
            // jetzt das modal aufrufen
            // höhe Anpassen funktioniert leider nicht über css mit calc
            $('#lr_parent_waehlen').modal();
            $('#lr_parent_waehlen_optionen').css('max-height', $(window).height() - 100);
        });
    }
};