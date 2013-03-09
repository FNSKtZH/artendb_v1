function(doc) {
	if (doc.Gruppe && doc.Typ && doc.Typ === "Objekt") {
		for (x in doc) {
			//durch alle Eigenschaften des Dokuments loopen
			//zurückgegeben wird: Gruppe, Typ der Datensammlung, Datensammlung, Feld, Feldtyp
			if (typeof doc[x] !== "object" && x !== "_rev") {
				emit ([doc.Gruppe, "Objekt", "Objekt", x, typeof doc[x]], doc._id);
			}
			if (doc[x].Typ && (doc[x].Typ === "Datensammlung" || doc[x].Typ === "Taxonomie")) {
				for (a in doc[x]) {
					/*if (a !== "Felder") {	Eigenschaften der Datensammlung nicht ausgeben
						//emit ([doc.Gruppe, doc[x].Typ, x, a, typeof doc[x][a]], doc._id);
					} else */
					if (a === "Felder") {
						for (b in doc[x][a]) {
							emit ([doc.Gruppe, doc[x].Typ, x, b, typeof doc[x][a][b]], doc._id);
						}
					}
				}
			}
		}
	}
}