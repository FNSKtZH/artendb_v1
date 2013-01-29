function(doc) {
	if (doc.Typ && doc.Typ === "Beziehung" && doc.Partner) {
		//Array mit allen Gruppen füllen
		var Gruppen = [];
		for (i in doc.Partner) {
			Gruppen.push(doc.Partner[i].Gruppe);
		}
		if (Gruppen.indexOf("Flora") !== -1) {
			if (Gruppen.indexOf("Fauna") !== -1) {
				//das ist eine Flora-Fauna-Beziehung
				emit (doc._id);
			}
		}
	}
}