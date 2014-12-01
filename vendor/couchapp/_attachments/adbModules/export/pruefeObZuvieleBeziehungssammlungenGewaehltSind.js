/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $ = require('jquery'),
    _ = require('underscore');

module.exports = function (that) {
    var $formular = $(that).closest('form'),   // ermitteln, aus welchem Formular aufgerufen wurde
        formularName = $formular.attr('id'),
        bezDsChecked = [];

    if ($('#' + formularName + 'BezInZeilen').prop('checked')) {
        $formular
            .find(' .exportFelderWaehlenFelderliste')
            .find('.feldWaehlen[dstyp="Beziehung"]')
            .each(function () {
                if ($(this).prop('checked')) {
                    bezDsChecked.push($(this).attr('datensammlung'));
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