function(doc) {
	var value = {};
	value.id = doc._id;
	if (doc.Gruppe && doc.Gruppe === "Lebensräume" && doc.Taxonomie && doc.Taxonomie.Eigenschaften && doc.Taxonomie.Eigenschaften.Taxonomie && doc.Taxonomie.Eigenschaften.Einheit) {
		value.tokens = [];
		if (doc.Taxonomie.Eigenschaften.Einheit) {
			var einheit_worte = doc.Taxonomie.Eigenschaften.Einheit.split(" ");
			for (var i=0; i<einheit_worte.length; i++) {
				value.tokens.push(einheit_worte[i]);
			}
		}
		if (doc.Taxonomie.Eigenschaften.Label) {
			value.tokens.push(doc.Taxonomie.Eigenschaften.Label);
		}
		if (doc.Taxonomie.Eigenschaften.Label) {
			value.Name = doc.Taxonomie.Eigenschaften.Taxonomie+" > "+doc.Taxonomie.Eigenschaften.Label+": "+doc.Taxonomie.Eigenschaften.Einheit;
			// Taxonomie, label und Einheit als keys einfügen, damit richtig sortiert wird
			emit ([doc.Gruppe, doc.Taxonomie.Eigenschaften.Taxonomie, doc.Taxonomie.Eigenschaften.Label, doc.Taxonomie.Eigenschaften.Einheit], value);
		} else {
			value.Name = doc.Taxonomie.Eigenschaften.Taxonomie+" > "+doc.Taxonomie.Eigenschaften.Einheit;
			emit ([doc.Gruppe, doc.Taxonomie.Eigenschaften.Taxonomie, "", doc.Taxonomie.Eigenschaften.Einheit], value);
		}
	}
}