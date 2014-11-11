// generiert den html-Inhalt für ja/nein-Felder

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

module.exports = function (feldname, feldwert, dsTyp, dsName) {
    var html;

    html = '<div class="form-group"><label class="control-label" for="';
    html += feldname;
    html += '">';
    html += feldname;
    html += ':</label><input type="checkbox" id="';
    html += feldname;
    html += '" name="';
    html += feldname;
    html += '"';
    if (feldwert === true) {
        html += ' checked="true"';
    }
    html += '" readonly="readonly" disabled="disabled" dsTyp="' + dsTyp + '" dsName="' + dsName + '"></div>';

    return html;
};