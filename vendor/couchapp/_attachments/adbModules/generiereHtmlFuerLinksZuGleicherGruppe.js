// generiert den html-Inhalt für Serien von Links in Flora

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var _ = require('underscore');

module.exports = function (feldname, objektListe) {
    var html;

    html = '<div class="form-group"><label class="control-label">';
    html += feldname;
    html += ':</label><span class="feldtext controls">';
    _.each(objektListe, function (objekt, index) {
        if (index > 0) {
            html += ', ';
        }
        html += '<p class="form-control-static controls"><a href="#" class="linkZuArtGleicherGruppe" ArtId="';
        html += objekt.GUID;
        html += '">';
        html += objekt.Name;
        html += '</a></p>';
    });
    html += '</span></div>';

    return html;
};