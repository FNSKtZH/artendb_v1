function(doc) {
	if (doc.Typ && doc.Typ === "Objekt" && doc.Taxonomie && doc.Taxonomie.Daten && doc.Taxonomie.Daten.Hierarchie && doc.Taxonomie.Daten.Hierarchie.length > 0) {
		for (var i=0; i<doc.Taxonomie.Daten.Hierarchie.length; i++) {
			if (doc.Taxonomie.Daten.Hierarchie[i].GUID) {
				emit(doc.Taxonomie.Daten.Hierarchie[i].GUID, doc._id);
			}
		}
	}
}