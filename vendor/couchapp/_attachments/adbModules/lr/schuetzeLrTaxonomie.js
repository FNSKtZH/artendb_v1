// alle Felder schreibbar setzen

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $ = require('jquery');

module.exports = function () {
    var parent,
        feldWert;

    $(".Lebensräume.Taxonomie .controls").each(function () {
        parent = $(this).parent();
        $(this).attr('readonly', true);
        if (parent.attr('href')) {
            feldWert = $(this).val();
            if (typeof feldWert === "string" && feldWert.slice(0, 7) === "//") {
                parent.attr('href', feldWert);
                // falls onclick besteht, entfernen
                parent.removeAttr("onclick");
                // Mauspointer nicht mehr als Finger
                this.style.cursor = 'pointer';
            }
        }
    });
    $('.lrBearb').addClass('disabled');
    $(".lr_bearb_bearb").removeClass('disabled');
    $("#artAnmelden").hide();
};