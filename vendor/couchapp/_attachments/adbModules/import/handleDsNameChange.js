// wenn DsName geändert wird
// suchen, ob schon eine Datensammlung mit diesem Namen existiert
// und sie von jemand anderem importiert wurde
// und sie nicht zusammenfassend ist

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $ = require('jquery'),
    _ = require('underscore');

module.exports = function (that) {
    var dsKey = _.find(window.adb.dsNamenEindeutig, function (key) {
            return key[0] === that.value && key[2] !== localStorage.Email && !key[1];
        }),
        $importieren_ds_ds_beschreiben_hinweis2 = $("#importieren_ds_ds_beschreiben_hinweis2");

    if (dsKey) {
        $importieren_ds_ds_beschreiben_hinweis2
            .alert()
            .show()
            .html('Es existiert schon eine gleich heissende und nicht zusammenfassende Datensammlung.<br>Sie wurde von jemand anderem importiert. Daher müssen Sie einen anderen Namen verwenden.');
        setTimeout(function () {
            $importieren_ds_ds_beschreiben_hinweis2
                .alert()
                .hide();
        }, 30000);
        $("#DsName")
            .val("")
            .focus();
    } else {
        $importieren_ds_ds_beschreiben_hinweis2
            .alert()
            .hide();
    }
};