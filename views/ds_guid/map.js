function(doc) {
	if (doc.Eigenschaftensammlungen) {
		for (var i=0; i<doc.Eigenschaftensammlungen.length; i++) {
			emit ([doc.Eigenschaftensammlungen[i].Name, doc._id], 1);
		}
	}
}