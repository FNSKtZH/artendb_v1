function(doc) {
	if (doc.Gruppe && doc.Taxonomie && doc.Taxonomie.Daten && doc.Taxonomie.Daten["Taxonomie ID"]) {
		emit ([doc.Gruppe, doc._id, doc.Taxonomie.Daten["Taxonomie ID"]], null);
	}
}