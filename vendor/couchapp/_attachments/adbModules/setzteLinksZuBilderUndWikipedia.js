// managt die Links zu Google Bilder und Wikipedia
// erwartet das Objekt mit der Art

/*jslint node: true, browser: true, nomen: true, todo: true */


'use strict';

var $ = require('jquery');

var returnFunction = function (art) {
    // jetzt die Links im Menu setzen
    if (art) {
        var google_bilder_link = "",
            wikipedia_link = "";
        switch (art.Gruppe) {
        case "Flora":
            google_bilder_link = 'https://www.google.ch/search?num=10&hl=de&site=imghp&tbm=isch&source=hp&bih=824&q="' + art.Taxonomie.Eigenschaften.Artname + '"';
            if (art.Taxonomie.Eigenschaften['Name Deutsch']) {
                google_bilder_link += '+OR+"' + art.Taxonomie.Eigenschaften['Name Deutsch'] + '"';
            }
            if (art.Taxonomie.Eigenschaften['Name Französisch']) {
                google_bilder_link += '+OR+"' + art.Taxonomie.Eigenschaften['Name Französisch'] + '"';
            }
            if (art.Taxonomie.Eigenschaften['Name Italienisch']) {
                google_bilder_link += '+OR+"' + art.Taxonomie.Eigenschaften['Name Italienisch'] + '"';
            }
            if (art.Taxonomie.Eigenschaften['Name Deutsch']) {
                wikipedia_link = '//de.wikipedia.org/wiki/' + art.Taxonomie.Eigenschaften['Name Deutsch'];
            } else {
                wikipedia_link = '//de.wikipedia.org/wiki/' + art.Taxonomie.Eigenschaften.Artname;
            }
            break;
        case "Fauna":
            google_bilder_link = 'https://www.google.ch/search?num=10&hl=de&site=imghp&tbm=isch&source=hp&bih=824&q="' + art.Taxonomie.Eigenschaften.Artname + '"';
            if (art.Taxonomie.Eigenschaften["Name Deutsch"]) {
                google_bilder_link += '+OR+"' + art.Taxonomie.Eigenschaften['Name Deutsch'] + '"';
            }
            if (art.Taxonomie.Eigenschaften['Name Französisch']) {
                google_bilder_link += '+OR+"' + art.Taxonomie.Eigenschaften['Name Französisch'] + '"';
            }
            if (art.Taxonomie.Eigenschaften['Name Italienisch']) {
                google_bilder_link += '+OR"' + art.Taxonomie.Eigenschaften['Name Italienisch'] + '"';
            }
            wikipedia_link = '//de.wikipedia.org/wiki/' + art.Taxonomie.Eigenschaften.Gattung + '_' + art.Taxonomie.Eigenschaften.Art;
            break;
        case 'Moose':
            google_bilder_link = 'https://www.google.ch/search?num=10&hl=de&site=imghp&tbm=isch&source=hp&bih=824&q="' + art.Taxonomie.Eigenschaften.Gattung + ' ' + art.Taxonomie.Eigenschaften.Art + '"';
            wikipedia_link = '//de.wikipedia.org/wiki/' + art.Taxonomie.Eigenschaften.Gattung + '_' + art.Taxonomie.Eigenschaften.Art;
            break;
        case 'Macromycetes':
            google_bilder_link = 'https://www.google.ch/search?num=10&hl=de&site=imghp&tbm=isch&source=hp&bih=824&q="' + art.Taxonomie.Eigenschaften.Name + '"';
            if (art.Taxonomie.Eigenschaften['Name Deutsch']) {
                google_bilder_link += '+OR+"' + art.Taxonomie.Eigenschaften['Name Deutsch'] + '"';
            }
            wikipedia_link = '//de.wikipedia.org/wiki/' + art.Taxonomie.Eigenschaften.Name;
            break;
        case 'Lebensräume':
            google_bilder_link = 'https://www.google.ch/search?num=10&hl=de&site=imghp&tbm=isch&source=hp&bih=824&q="' + art.Taxonomie.Eigenschaften.Einheit;
            wikipedia_link = '//de.wikipedia.org/wiki/' + art.Taxonomie.Eigenschaften.Einheit;
            break;
        }
        // mit replace Hochkommata ' ersetzen, sonst klappt url nicht
        $("#GoogleBilderLink").attr("href", encodeURI(google_bilder_link).replace("&#39;", "%20"));
        $("#GoogleBilderLink_li").removeClass("disabled");
        $("#WikipediaLink").attr("href", wikipedia_link);
        $("#WikipediaLink_li").removeClass("disabled");
    } else {
        $("#WikipediaLink").attr("href", "#");
        $("#WikipediaLink_li").addClass("disabled");
        $("#GoogleBilderLink").attr("href", "#");
        $("#GoogleBilderLink_li").addClass("disabled");
    }
};

module.exports = returnFunction;