function(doc) {
	var value = {};
	var i;
	var name_deutsch_worte;
	if (doc.Gruppe && doc.Taxonomie && doc.Taxonomie.Daten && doc.Taxonomie.Daten["Artname vollständig"]) {
		if (doc.Gruppe === "Fauna" || doc.Gruppe === "Flora" || doc.Gruppe === "Macromycetes" || doc.Gruppe === "Moose") {
			value.Name = doc.Taxonomie.Daten["Artname vollständig"];
			value.id = doc._id;
			value.tokens = [];
			if (doc.Gruppe === "Fauna") {
				value.tokens.push(doc.Taxonomie.Daten.Gattung);
				value.tokens.push(doc.Taxonomie.Daten.Art);
				value.tokens.push(doc.Taxonomie.Daten.Autor);
				name_deutsch_worte = doc.Taxonomie.Daten["Name Deutsch"].split(" ");
				for (i=0; i<name_deutsch_worte.length; i++) {
					value.tokens.push(name_deutsch_worte[i]);
				}
			} else if (doc.Gruppe === "Flora") {
				value.tokens.push(doc.Taxonomie.Daten.Gattung);
				value.tokens.push(doc.Taxonomie.Daten.Art);
				value.tokens.push(doc.Taxonomie.Daten.Autor);
				var namen_deutsch_worte = doc.Taxonomie.Daten["Name Deutsch"].split(" ");
				for (i=0; i<namen_deutsch_worte.length; i++) {
					value.tokens.push(namen_deutsch_worte[i]);
				}
			} else if (doc.Gruppe === "Macromycetes") {
				value.tokens.push(doc.Taxonomie.Daten.Gattung);
				var name_worte = doc.Taxonomie.Daten.Name.split(" ");
				for (i=0; i<name_worte.length; i++) {
					value.tokens.push(name_worte[i]);
				}
				value.tokens.push(doc.Taxonomie.Daten.Autor);
				name_deutsch_worte = doc.Taxonomie.Daten["Name Deutsch"].split(" ");
				for (i=0; i<name_deutsch_worte.length; i++) {
					value.tokens.push(name_deutsch_worte[i]);
				}
			} else if (doc.Gruppe === "Moose") {
				value.tokens.push(doc.Taxonomie.Daten.Gattung);
				value.tokens.push(doc.Taxonomie.Daten.Art);
				value.tokens.push(doc.Taxonomie.Daten.Autor);
			}
			emit ([doc.Gruppe, doc.Taxonomie.Daten["Artname vollständig"]], value);
		}
	}
}