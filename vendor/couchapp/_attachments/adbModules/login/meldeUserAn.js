/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $                             = require('jquery'),
    capitaliseFirstLetter         = require('../capitaliseFirstLetter'),
    blendeMenus                   = require('./blendeMenus'),
    passeUiFuerAngemeldetenUserAn = require('./passeUiFuerAngemeldetenUserAn'),
    validiereUserAnmeldung        = require('./validiereUserAnmeldung'),
    bearbeiteLrTaxonomie          = require('../lr/bearbeiteLrTaxonomie');

module.exports = function (woher) {
    var email    = $('#email' + capitaliseFirstLetter(woher)).val(),
        passwort = $('#passwort' + capitaliseFirstLetter(woher)).val();

    if (validiereUserAnmeldung(woher)) {
        $.couch.login({
            name:     email,
            password: passwort,
            success : function (r) {
                localStorage.email = $('#email' + capitaliseFirstLetter(woher)).val();
                if (woher === 'art') {
                    bearbeiteLrTaxonomie();
                }
                passeUiFuerAngemeldetenUserAn(woher);
                // Werte aus Feldern entfernen
                $('#email' + capitaliseFirstLetter(woher)).val('');
                $('#passwort' + capitaliseFirstLetter(woher)).val('');
                $('#artAnmelden').show();
                // admin-Funktionen
                if (r.roles.indexOf('_admin') !== -1) {
                    // das ist ein admin
                    console.log('hallo admin');
                    localStorage.admin = true;
                } else {
                    delete localStorage.admin;
                }
                blendeMenus();
            },
            error: function () {
                var praefix = 'import';
                if (woher === 'art') {
                    praefix = '';
                }
                // zuerst allfällige bestehende Hinweise ausblenden
                $('.hinweis').hide();
                $('#' + praefix + woher + 'AnmeldenFehlerText')
                    .html('Anmeldung gescheitert.<br>Sie müssen ev. ein Konto erstellen?')
                    .alert()
                    .show();
            }
        });
    }
};