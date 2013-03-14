function(doc) {
	if (doc.Datensammlungen) {
		for (i in doc.Datensammlungen) {
			emit ([doc.Datensammlungen[i].Name, doc._id], 1);
		}
	}
}