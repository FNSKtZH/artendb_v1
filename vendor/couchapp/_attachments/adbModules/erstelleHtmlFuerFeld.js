// übernimmt Feldname und Feldwert
// generiert daraus und retourniert html für die Darstellung im passenden Feld

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var returnFunction = function (feldname, feldwert, dsTyp, dsName) {
    var htmlDatensammlung = "";
    if ((typeof feldwert === "string" && feldwert.slice(0, 7) === "http://") || (typeof feldwert === "string" && feldwert.slice(0, 8) === "https://") || (typeof feldwert === "string" && feldwert.slice(0, 2) === "//")) {
        // www-Links als Link darstellen
        htmlDatensammlung += window.adb.generiereHtmlFuerWwwLink(feldname, feldwert, dsTyp, dsName);
    } else if (typeof feldwert === "string" && feldwert.length < 45) {
        htmlDatensammlung += window.adb.generiereHtmlFuerTextinput(feldname, feldwert, "text", dsTyp, dsName);
    } else if (typeof feldwert === "string" && feldwert.length >= 45) {
        htmlDatensammlung += window.adb.generiereHtmlFuerTextarea(feldname, feldwert, dsTyp);
    } else if (typeof feldwert === "number") {
        htmlDatensammlung += window.adb.generiereHtmlFuerTextinput(feldname, feldwert, "number", dsTyp, dsName);
    } else if (typeof feldwert === "boolean") {
        htmlDatensammlung += window.adb.generiereHtmlFuerBoolean(feldname, feldwert, dsTyp, dsName);
    } else {
        htmlDatensammlung += window.adb.generiereHtmlFuerTextinput(feldname, feldwert, "text", dsTyp, dsName);
    }
    return htmlDatensammlung;
};

module.exports = returnFunction;