/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var _ = require('underscore'),
    $ = require('jquery');

module.exports = function () {
    var $adminKorrigiereDsNameRueckmeldung = $("#adminKorrigiereDsNameRueckmeldung"),
        $adminKorrigiereDsNameNameVorher   = $("#adminKorrigiereDsNameNameVorher"),
        $adminKorrigiereDsNameNameNachher  = $("#adminKorrigiereDsNameNameNachher"),
        name_vorher                        = $adminKorrigiereDsNameNameVorher.val(),
        name_nachher                       = $adminKorrigiereDsNameNameNachher.val(),
        $db                                = $.couch.db('artendb');

    if (!name_vorher) {
        $adminKorrigiereDsNameRueckmeldung.html("Bitte Name vorher erfassen");
        $adminKorrigiereDsNameNameVorher.focus();
        return;
    }
    if (!name_nachher) {
        $adminKorrigiereDsNameRueckmeldung.html("Bitte Name nachher erfassen");
        $adminKorrigiereDsNameNameNachher.focus();
        return;
    }
    $adminKorrigiereDsNameRueckmeldung.html("Daten werden analysiert...");

    $db.view('artendb/ds_bs_guid?startkey=["' + name_vorher + '"]&endkey=["' + name_vorher + '",{}]&include_docs=true', {
        success: function (data) {
            var korrigiert = 0,
                fehler = 0;

            if (data.rows.length === 0) {
                $adminKorrigiereDsNameRueckmeldung.html("Es gibt keine Datensammlung namens " + name_vorher);
                return;
            }
            _.each(data.rows, function (row) {
                var art = row.doc,
                    ds,
                    bs,
                    save = false;

                // Datensammlung mit diesem Namen suchen
                if (art.Eigenschaftensammlungen && art.Eigenschaftensammlungen.length > 0) {
                    ds = _.find(art.Eigenschaftensammlungen, function (ds_) {
                        if (ds_.Name) {
                            return ds_.Name === name_vorher;
                        }
                    });
                    if (ds) {
                        ds.Name = name_nachher;
                        save = true;
                    }
                }
                // Beziehungssammlung mit diesem Namen suchen
                if (art.Beziehungssammlungen && art.Beziehungssammlungen.length > 0) {
                    bs = _.find(art.Beziehungssammlungen, function (ds_) {
                        if (ds_.Name) {
                            return ds_.Name === name_vorher;
                        }
                    });
                    if (bs) {
                        bs.Name = name_nachher;
                        save = true;
                    }
                }
                // Datensatz speichern, wenn nötig
                if (save) {
                    $db.saveDoc(art, {
                        success: function () {
                            korrigiert ++;
                            $adminKorrigiereDsNameRueckmeldung.html("Arten mit dieser Datensammlung: " + data.rows.length + ". Umbenannt: " + korrigiert + ", Fehler: " + fehler);
                        },
                        error: function () {
                            fehler ++;
                            $adminKorrigiereDsNameRueckmeldung.html("Arten mit dieser Datensammlung: " + data.rows.length + ". Umbenannt: " + korrigiert + ", Fehler: " + fehler);
                        }
                    });
                }
            });
            if (korrigiert === 0) {
                $("#adminKorrigiereArtwertnameInFloraRueckmeldung").html("Es gibt offenbar keine Datensammlungen mehr mit Namen '" + name_vorher + "'");
            }
        },
        error: function () {
            console.log('nenneDsUm:  Keine Daten erhalten');
        }
    });
};