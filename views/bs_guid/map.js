function(doc) {
	if (doc.Beziehungssammlungen) {
		for (var i=0; i<doc.Beziehungssammlungen.length; i++) {
			emit ([doc.Beziehungssammlungen[i].Name, doc._id], 1);
		}
	}
}