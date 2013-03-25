function(doc) {
	var value = {};
	value.id = doc._id;
	if (doc.Gruppe && doc.Gruppe === "Lebensräume" && doc.Taxonomie && doc.Taxonomie.Daten && doc.Taxonomie.Daten.Taxonomie && doc.Taxonomie.Daten.Einheit) {
		if (doc.Taxonomie.Daten.Label) {
			value.Name = doc.Taxonomie.Daten.Taxonomie+" > "+doc.Taxonomie.Daten.Label+": "+doc.Taxonomie.Daten.Einheit;
			//Taxonomie, label und Einheit als keys einfügen, damit richtig sortiert wird
			emit ([doc.Gruppe, doc.Taxonomie.Daten.Taxonomie, doc.Taxonomie.Daten.Label, doc.Taxonomie.Daten.Einheit], value);
		} else {
			value.Name = doc.Taxonomie.Daten.Taxonomie+" > "+doc.Taxonomie.Daten.Einheit;
			emit ([doc.Gruppe, doc.Taxonomie.Daten.Taxonomie, "", doc.Taxonomie.Daten.Einheit], value);
		}
	}
}