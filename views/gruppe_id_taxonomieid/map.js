function(doc) {
	if (doc.Gruppe && doc.Taxonomie && doc.Taxonomie.Felder && doc.Taxonomie.Felder["Taxonomie ID"]) {
		emit ([doc.Gruppe, doc._id, doc.Taxonomie.Felder["Taxonomie ID"]], null);
	}
}