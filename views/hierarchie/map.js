function(doc) {
	if (doc.Typ && doc.Typ === "Objekt" && doc.Taxonomie && doc.Taxonomie.Eigenschaften && doc.Taxonomie.Eigenschaften.Hierarchie && doc.Taxonomie.Eigenschaften.Hierarchie.length > 0) {
		for (var i=0; i<doc.Taxonomie.Eigenschaften.Hierarchie.length; i++) {
			if (doc.Taxonomie.Eigenschaften.Hierarchie[i].GUID) {
				emit(doc.Taxonomie.Eigenschaften.Hierarchie[i].GUID, doc._id);
			}
		}
	}
}