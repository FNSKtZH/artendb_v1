function(doc) {

	var value = {},
		i,
		artname_vollstaendig,
		artname_vollstaendig_worte;

	if (doc.Gruppe && doc.Taxonomie && doc.Taxonomie.Daten && doc.Taxonomie.Daten["Artname vollständig"]) {

		artname_vollstaendig = doc.Taxonomie.Daten["Artname vollständig"];

		// value.Name: dieser Name wird als Suchresultat angezeigt
		value.Name = artname_vollstaendig;

		// mit dieser id wird der Datensatz geholt
		value.id = doc._id;

		// nach den in tokens enthaltenen Begriffen wird gesucht
		value.tokens = [];

		// Artnamen vollständig auftrennen
		artname_vollstaendig_worte = artname_vollstaendig.split(" ");
		for (i=0; i<artname_vollstaendig_worte.length; i++) {
			// Klammern entfernen. Sonst findet die Suche nach "Erd" keine Erdkröte (nur die Suche nach "(Erd")
			value.tokens.push(artname_vollstaendig_worte[i].replace("\(", "", "g").replace("\)", "", "g"));
		}

		// Idee: GUID und Taxonomie Id als token ergänzen
		// funktioniert nicht, daher ausgeschaltet
		/*value.tokens.push(doc._id);
		if (doc.Taxonomie.Daten["Taxonomie ID"]) {
			value.tokens.push(doc.Taxonomie.Daten["Taxonomie ID"]);
		}*/
		
		emit ([doc.Gruppe, artname_vollstaendig], value);
	}
	
}