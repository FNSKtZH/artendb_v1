function(doc) {
	var value = {};
	if (doc.Gruppe && doc.Taxonomie && doc.Taxonomie.Daten && doc.Taxonomie.Daten["Artname vollständig"]) {
		if (doc.Gruppe === "Fauna" || doc.Gruppe === "Flora" || doc.Gruppe === "Macromycetes" || doc.Gruppe === "Moose") {
			value.Name = doc.Taxonomie.Daten["Artname vollständig"];
			value.id = doc._id;
			emit ([doc.Gruppe, doc.Taxonomie.Daten["Artname vollständig"]], value);
		}
	}
}