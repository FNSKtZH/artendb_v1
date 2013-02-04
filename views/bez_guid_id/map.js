function(doc) {
	if (doc.Typ && doc.Typ === "Beziehung" && doc.Partner && doc.Datensammlung && doc.Datensammlung.Name) {
		for (i in doc.Partner) {
			emit([doc.Partner[i].GUID, doc.Datensammlung.Name], doc._id);
		}
	}
}