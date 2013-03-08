function(doc) {
	if (doc.Gruppe && doc.Typ && doc.Typ === "Objekt") {
		for (x in doc) {
			//durch alle Eigenschaften des Dokuments loopen
			//zurückgegeben wird: Gruppe, Datensammlung, Typ der Datensammlung, Typ der Eigenschaft, Feld, Feldtyp
			if (typeof doc[x] !== "object" && x !== "_rev") {
				emit ([doc.Gruppe, "Objekt", "", "Objekt-Eigenschaft", x, typeof doc[x]], doc._id);
			}
			if (doc[x].Typ && (doc[x].Typ === "Datensammlung" || doc[x].Typ === "Taxonomie")) {
				for (a in doc[x]) {
					if (a !== "Felder") {
						emit ([doc.Gruppe, x, doc[x].Typ, doc[x].Typ + "-Eigenschaft", a, typeof doc[x][a]], doc._id);
					} else if (a === "Felder") {
						for (b in doc[x][a]) {
							emit ([doc.Gruppe, x, doc[x].Typ, doc[x].Typ + "-Feld", a, typeof doc[x][a][b]], doc._id);
						}
					}
				}
			}
		}
	}
}