function(doc) {
	if (doc.Datensammlungen) {
		for (var i=0; i<doc.Datensammlungen.length; i++) {
			emit ([doc.Datensammlungen[i].Name, doc._id], 1);
		}
	}
}