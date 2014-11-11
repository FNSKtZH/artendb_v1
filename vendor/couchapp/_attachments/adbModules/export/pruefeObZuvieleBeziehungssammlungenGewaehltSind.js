/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $ = require('jquery'),
    _ = require('underscore');

module.exports = function (that, _alt) {
    if ($("#export" + _alt + "_bez_in_zeilen").prop('checked')) {
        var bez_ds_checked = [];
        $("#export" + _alt)
            .find(" .exportieren_felder_waehlen_felderliste")
            .find(".feld_waehlen")
            .each(function () {
                if ($(this).prop('checked')) {
                    if ($(this).attr('dstyp') === "Beziehung") {
                        bez_ds_checked.push($(this).attr('datensammlung'));
                    }
                }
            });

        // eindeutige Liste der dsTypen erstellen
        bez_ds_checked = _.union(bez_ds_checked);
        if (bez_ds_checked && bez_ds_checked.length > 1) {
            $('#meldung_zuviele_bs').modal();
            $(that).prop('checked', false);
            return true;
        }
        return false;
    }
};