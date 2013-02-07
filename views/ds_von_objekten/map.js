function(doc) {
	if (doc.Typ && doc.Typ === "Objekt") {
		for (i in doc) {
			if (doc.hasOwnProperty(i)) {
				if (i.Typ && i.Typ === "Datensammlung") {
					var Datensammlung = doc[i];
					//Name = key, übrige Felder = Array von Feldnamen
					var Feldnamen = [];
					for (x in Datensammlung) {
						if (Datensammlung.hasOwnProperty(x) && x !== "Felder") {
							Feldnamen.push(x);
						}
					}
					if (Feldnamen.length > 0) {
						//später soll nach Feldnamen gruppiert werden. Daher müssen alle gleich sortiert sein
						Feldnamen.sort();
						emit (i, Feldnamen);
					}
				}
			}
		}
	}
}