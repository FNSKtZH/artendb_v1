// wenn BsName geändert wird
// suchen, ob schon eine Datensammlung mit diesem Namen existiert
// und sie von jemand anderem importiert wurde
// und sie nicht zusammenfassend ist

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $ = require('jquery'),
    _ = require('underscore');

module.exports = function () {
    var bsKey,
        that = this;

    bsKey = _.find(window.adb.dsNamenEindeutig, function (key) {
        return key[0] === that.value && key[2] !== localStorage.Email && !key[1];
    });

    if (bsKey) {
        $("#importieren_bs_ds_beschreiben_hinweis2")
            .alert()
            .removeClass("alert-success")
            .removeClass("alert-danger")
            .addClass("alert-info")
            .show();
        $("#importieren_bs_ds_beschreiben_hinweis2_text").html('Es existiert schon eine gleich heissende und nicht zusammenfassende Beziehungssammlung.<br>Sie wurde von jemand anderem importiert. Daher müssen Sie einen anderen Namen verwenden.');
        setTimeout(function () {
            $("#importieren_bs_ds_beschreiben_hinweis2")
                .alert()
                .hide();
        }, 30000);
        $("#BsName")
            .val("")
            .focus();
    } else {
        $("#importieren_bs_ds_beschreiben_hinweis2")
            .alert()
            .hide();
    }
};