function(doc) {
	if (doc.Beziehungssammlungen) {
		for (i in doc.Beziehungssammlungen) {
			emit ([doc.Beziehungssammlungen[i].Name, doc._id], 1);
		}
	}
}