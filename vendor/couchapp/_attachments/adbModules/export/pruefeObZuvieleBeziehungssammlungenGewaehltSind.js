/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $ = require('jquery'),
    _ = require('underscore');

module.exports = function (that, _alt) {
    if ($("#export" + _alt + "_bez_in_zeilen").prop('checked')) {
        var bezDsChecked = [];
        $("#export" + _alt)
            .find(" .exportierenFelderWaehlenFelderliste")
            .find(".feldWaehlen")
            .each(function () {
                if ($(this).prop('checked')) {
                    if ($(this).attr('dstyp') === "Beziehung") {
                        bezDsChecked.push($(this).attr('datensammlung'));
                    }
                }
            });

        // eindeutige Liste der dsTypen erstellen
        bezDsChecked = _.union(bezDsChecked);
        if (bezDsChecked && bezDsChecked.length > 1) {
            $('#meldungZuvieleBs').modal();
            $(that).prop('checked', false);
            return true;
        }
        return false;
    }
};