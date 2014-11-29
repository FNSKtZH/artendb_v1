/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $ = require('jquery'),
    _ = require('underscore');

module.exports = function () {
    var $adminKorrigiereDsNameChRoteListe1991Rueckmeldung = $('#adminKorrigiereDsNameChRoteListe1991Rueckmeldung'),
        $db                                               = $.couch.db('artendb');

    $adminKorrigiereDsNameChRoteListe1991Rueckmeldung.html('Daten werden analysiert...');
    $db.view('artendb/flora?include_docs=true', {
        success: function (data) {
            var korrigiert = 0,
                fehler     = 0;

            _.each(data.rows, function (row) {
                var art = row.doc,
                    ds;

                if (art.Eigenschaftensammlungen) {
                    ds = _.find(art.Eigenschaftensammlungen, function (ds) {
                        return ds.Name === 'CH Rote Liste (1991)';
                    });
                    if (ds) {
                        ds.Name = 'CH Rote Listen Flora (1991)';
                        $db.saveDoc(art, {
                            success: function () {
                                korrigiert++;
                                $adminKorrigiereDsNameChRoteListe1991Rueckmeldung.html('Floraarten: ' + data.rows.length + '. Umbenannt: ' + korrigiert + ', Fehler: ' + fehler);
                            },
                            error: function () {
                                fehler++;
                                $adminKorrigiereDsNameChRoteListe1991Rueckmeldung.html('Floraarten: ' + data.rows.length + '. Umbenannt: ' + korrigiert + ', Fehler: ' + fehler);
                            }
                        });
                    }
                }
            });
            if (korrigiert === 0) {
                $('#adminKorrigiereArtwertnameInFloraRueckmeldung').html("Es gibt offenbar keine Datensammlungen mehr mit Namen 'CH Rote Liste (1991)'");
            }
        },
        error: function () {
            console.log('onClickAdminKorrigiereDsNameChRoteListe1991: keine Daten erhalten');
        }
    });
};