function(doc) {
	if (doc.Typ && doc.Typ === "Beziehung") {
		emit (doc._id);
	}
}