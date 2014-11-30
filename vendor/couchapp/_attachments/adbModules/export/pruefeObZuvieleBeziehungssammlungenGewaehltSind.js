/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $ = require('jquery'),
    _ = require('underscore');

module.exports = function (that, alt) {
    if ($('#export' + alt + 'BezInZeilen').prop('checked')) {
        var bezDsChecked = [];

        $('#export' + alt)
            .find(' .exportFelderWaehlenFelderliste')
            .find('.feldWaehlen')
            .each(function () {
                if ($(this).prop('checked')) {
                    if ($(this).attr('dstyp') === 'Beziehung') {
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