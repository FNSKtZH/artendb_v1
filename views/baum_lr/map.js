function(doc) {
	if (doc.Gruppe && doc.Gruppe === "Lebensräume" && doc.Taxonomie && doc.Taxonomie.Daten && doc.Taxonomie.Daten.Parent && doc.Taxonomie.Daten.Parent.GUID && doc.Taxonomie.Daten.Einheit) {
		if (doc.Taxonomie.Daten.Label) {
			// zuvorderst die Länge der Hierarchie, damit die höchste Hierarchie abgefragt werden kann
			// label und Einheit als key[1] und key[2] einfügen, damit richtig sortiert wird
			emit ([doc.Taxonomie.Daten.Hierarchie.length, doc.Taxonomie.Daten.Parent.GUID, doc.Taxonomie.Daten.Label, doc.Taxonomie.Daten.Einheit, doc.Taxonomie.Daten.Label + ": " + doc.Taxonomie.Daten.Einheit, doc._id], null);
		} else {
			emit ([doc.Taxonomie.Daten.Hierarchie.length, doc.Taxonomie.Daten.Parent.GUID, "", doc.Taxonomie.Daten.Einheit, doc.Taxonomie.Daten.Einheit, doc._id], null);
		}
	}
}