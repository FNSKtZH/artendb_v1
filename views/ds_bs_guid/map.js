function(doc) {
	if (doc.Beziehungssammlungen) {
		for (var i=0; i<doc.Beziehungssammlungen.length; i++) {
			emit ([doc.Beziehungssammlungen[i].Name, doc._id], 1);
		}
	}
    if (doc.Eigenschaftensammlungen) {
        for (var i=0; i<doc.Eigenschaftensammlungen.length; i++) {
            emit ([doc.Eigenschaftensammlungen[i].Name, doc._id], 1);
        }
    }
}