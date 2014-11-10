// übernimmt Feldname und Feldwert
// generiert daraus und retourniert html für die Darstellung im passenden Feld

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var returnFunction = function (feldname, feldwert, dsTyp, dsName) {
    var html_datensammlung = "";
    if ((typeof feldwert === "string" && feldwert.slice(0, 7) === "http://") || (typeof feldwert === "string" && feldwert.slice(0, 8) === "https://") || (typeof feldwert === "string" && feldwert.slice(0, 2) === "//")) {
        // www-Links als Link darstellen
        html_datensammlung += window.adb.generiereHtmlFürWwwLink(feldname, feldwert, dsTyp, dsName);
    } else if (typeof feldwert === "string" && feldwert.length < 45) {
        html_datensammlung += window.adb.generiereHtmlFürTextinput(feldname, feldwert, "text", dsTyp, dsName);
    } else if (typeof feldwert === "string" && feldwert.length >= 45) {
        html_datensammlung += window.adb.generiereHtmlFürTextarea(feldname, feldwert, dsTyp);
    } else if (typeof feldwert === "number") {
        html_datensammlung += window.adb.generiereHtmlFürTextinput(feldname, feldwert, "number", dsTyp, dsName);
    } else if (typeof feldwert === "boolean") {
        html_datensammlung += window.adb.generiereHtmlFürBoolean(feldname, feldwert, dsTyp, dsName);
    } else {
        html_datensammlung += window.adb.generiereHtmlFürTextinput(feldname, feldwert, "text", dsTyp, dsName);
    }
    return html_datensammlung;
};

module.exports = returnFunction;