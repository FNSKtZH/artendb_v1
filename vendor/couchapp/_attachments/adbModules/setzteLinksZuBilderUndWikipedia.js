// managt die Links zu Google Bilder und Wikipedia
// erwartet das Objekt mit der Art

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $ = require('jquery');

module.exports = function (art) {
    // jetzt die Links im Menu setzen
    if (art) {
        var googleBilderLink = "",
            wikipediaLink = "";
        switch (art.Gruppe) {
        case "Flora":
            googleBilderLink = 'https://www.google.ch/search?num=10&hl=de&site=imghp&tbm=isch&source=hp&bih=824&q="' + art.Taxonomie.Eigenschaften.Artname + '"';
            if (art.Taxonomie.Eigenschaften['Name Deutsch']) {
                googleBilderLink += '+OR+"' + art.Taxonomie.Eigenschaften['Name Deutsch'] + '"';
            }
            if (art.Taxonomie.Eigenschaften['Name Französisch']) {
                googleBilderLink += '+OR+"' + art.Taxonomie.Eigenschaften['Name Französisch'] + '"';
            }
            if (art.Taxonomie.Eigenschaften['Name Italienisch']) {
                googleBilderLink += '+OR+"' + art.Taxonomie.Eigenschaften['Name Italienisch'] + '"';
            }
            if (art.Taxonomie.Eigenschaften['Name Deutsch']) {
                wikipediaLink = '//de.wikipedia.org/wiki/' + art.Taxonomie.Eigenschaften['Name Deutsch'];
            } else {
                wikipediaLink = '//de.wikipedia.org/wiki/' + art.Taxonomie.Eigenschaften.Artname;
            }
            break;
        case "Fauna":
            googleBilderLink = 'https://www.google.ch/search?num=10&hl=de&site=imghp&tbm=isch&source=hp&bih=824&q="' + art.Taxonomie.Eigenschaften.Artname + '"';
            if (art.Taxonomie.Eigenschaften["Name Deutsch"]) {
                googleBilderLink += '+OR+"' + art.Taxonomie.Eigenschaften['Name Deutsch'] + '"';
            }
            if (art.Taxonomie.Eigenschaften['Name Französisch']) {
                googleBilderLink += '+OR+"' + art.Taxonomie.Eigenschaften['Name Französisch'] + '"';
            }
            if (art.Taxonomie.Eigenschaften['Name Italienisch']) {
                googleBilderLink += '+OR"' + art.Taxonomie.Eigenschaften['Name Italienisch'] + '"';
            }
            wikipediaLink = '//de.wikipedia.org/wiki/' + art.Taxonomie.Eigenschaften.Gattung + '_' + art.Taxonomie.Eigenschaften.Art;
            break;
        case 'Moose':
            googleBilderLink = 'https://www.google.ch/search?num=10&hl=de&site=imghp&tbm=isch&source=hp&bih=824&q="' + art.Taxonomie.Eigenschaften.Gattung + ' ' + art.Taxonomie.Eigenschaften.Art + '"';
            wikipediaLink = '//de.wikipedia.org/wiki/' + art.Taxonomie.Eigenschaften.Gattung + '_' + art.Taxonomie.Eigenschaften.Art;
            break;
        case 'Macromycetes':
            googleBilderLink = 'https://www.google.ch/search?num=10&hl=de&site=imghp&tbm=isch&source=hp&bih=824&q="' + art.Taxonomie.Eigenschaften.Name + '"';
            if (art.Taxonomie.Eigenschaften['Name Deutsch']) {
                googleBilderLink += '+OR+"' + art.Taxonomie.Eigenschaften['Name Deutsch'] + '"';
            }
            wikipediaLink = '//de.wikipedia.org/wiki/' + art.Taxonomie.Eigenschaften.Name;
            break;
        case 'Lebensräume':
            googleBilderLink = 'https://www.google.ch/search?num=10&hl=de&site=imghp&tbm=isch&source=hp&bih=824&q="' + art.Taxonomie.Eigenschaften.Einheit;
            wikipediaLink = '//de.wikipedia.org/wiki/' + art.Taxonomie.Eigenschaften.Einheit;
            break;
        }
        // mit replace Hochkommata ' ersetzen, sonst klappt url nicht
        $("#GoogleBilderLink").attr("href", encodeURI(googleBilderLink).replace("&#39;", "%20"));
        $("#GoogleBilderLink_li").removeClass("disabled");
        $("#WikipediaLink").attr("href", wikipediaLink);
        $("#WikipediaLink_li").removeClass("disabled");
    } else {
        $("#WikipediaLink").attr("href", "#");
        $("#WikipediaLink_li").addClass("disabled");
        $("#GoogleBilderLink").attr("href", "#");
        $("#GoogleBilderLink_li").addClass("disabled");
    }
};