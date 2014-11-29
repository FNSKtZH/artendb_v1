// wenn .feldWaehlenAlleVonDs geändert wird
// wenn checked: alle unchecken, sonst alle checken

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $                                               = require('jquery'),
    pruefeObZuvieleExportfelderGewaehltSind         = require('./pruefeObZuvieleExportfelderGewaehltSind'),
    pruefeObZuvieleBeziehungssammlungenGewaehltSind = require('./pruefeObZuvieleBeziehungssammlungenGewaehltSind'),
    exportZuruecksetzen                             = require('./exportZuruecksetzen');

module.exports = function (that) {
    var ds       = $(that).attr('datensammlung'),
        formular = $(that).closest('form').attr('id'),
        _alt     = '',
        status   = $(that).prop('checked');

    if (formular === 'exportAlt') {
        _alt = '_alt';
    }

    $('#' + formular + ' [datensammlung="' + ds + '"]').each(function () {
        if (status) {
            // Wenn ein Feld dazugefügt wurde...
            // ...kontrollieren, ob zuviele Beziehungen gewählt sind
            if (pruefeObZuvieleExportfelderGewaehltSind(this, _alt) || pruefeObZuvieleBeziehungssammlungenGewaehltSind(this, _alt)) {
                // oops, zu viele Felder gewählt oder zu viele Beziehungen > aufhören
                return;
            }
        }
        $(this).prop('checked', status);
    });

    // alles i.o.
    // da ein Feld verändert wurde, allfälligen Export zurücksetzen
    exportZuruecksetzen(null, _alt);
};