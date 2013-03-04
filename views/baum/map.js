function(doc) {
	for (x in doc) {
		if (typeof doc[x].Typ !== "undefined" && doc[x].Typ === "Taxonomie") {
			if (doc.Gruppe && doc.Gruppe === "Fauna") {
				emit ([doc.Gruppe, doc[x].Felder.Klasse, doc[x].Felder.Ordnung, doc[x].Felder.Familie, doc[x].Felder.Gattung, doc[x].Felder.Artname_vollständig], doc._id);
			}
			if (doc.Gruppe && doc.Gruppe === "Flora") {
				emit ([doc.Gruppe, doc[x].Felder.Familie, doc[x].Felder.Gattung, doc[x].Felder.Artname_vollständig], doc._id);
			}
			if (doc.Gruppe && doc.Gruppe === "Moose") {
				emit ([doc.Gruppe, doc[x].Felder.Klasse, doc[x].Felder.Familie, doc[x].Felder.Gattung, doc[x].Felder.Artname_vollständig], doc._id);
			}
			break;
		}
	}
}