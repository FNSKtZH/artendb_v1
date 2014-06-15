function(doc) {
    'use strict';

	var value = {},
		artname_vollständig,
		artname_vollständig_worte,
        _ = require("views/lib/underscore");

	if (doc.Gruppe && doc.Taxonomie && doc.Taxonomie.Eigenschaften && doc.Taxonomie.Eigenschaften["Artname vollständig"]) {

		artname_vollständig = doc.Taxonomie.Eigenschaften["Artname vollständig"];

		// value.Name: dieser Name wird als Suchresultat angezeigt
		value.Name = artname_vollständig;

		// mit dieser id wird der Datensatz geholt
		value.id = doc._id;

		// nach den in tokens enthaltenen Begriffen wird gesucht
		value.tokens = [];

		// Artnamen vollständig auftrennen
		artname_vollständig_worte = artname_vollständig.split(" ");
        _.each(artname_vollständig_worte, function(wort) {
            // Klammern entfernen. Sonst findet die Suche nach "Erd" keine Erdkröte (nur die Suche nach "(Erd")
            value.tokens.push(wort.replace("\(", "", "g").replace("\)", "", "g"));
        });

		// Idee: GUID und Taxonomie Id als token ergänzen
		// funktioniert nicht, daher ausgeschaltet
		/*value.tokens.push(doc._id);
		if (doc.Taxonomie.Eigenschaften["Taxonomie ID"]) {
			value.tokens.push(doc.Taxonomie.Eigenschaften["Taxonomie ID"]);
		}*/
		
		emit([doc.Gruppe, artname_vollständig], value);
	}
	
}