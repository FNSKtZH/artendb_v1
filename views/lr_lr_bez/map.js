function(doc) {
	if (doc.Typ && doc.Typ === "Beziehung" && doc.Partner) {
		//Array mit allen Gruppen füllen
		var Gruppen = [];
		for (i in doc.Partner) {
			Gruppen.push(doc.Partner[i].Gruppe);
		}
		if (Gruppen[0] === "Lebensräume" && Gruppen[1] === "Lebensräume") {
			//das ist eine Lr-Lr-Beziehung
			emit ([doc._id, doc._rev]);
		}
	}
}