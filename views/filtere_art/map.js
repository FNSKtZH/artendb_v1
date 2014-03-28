function(doc) {
	var value = {};
	var i;
	var name_deutsch_worte, namen_deutsch_worte, name_worte, autor_worte;
	if (doc.Gruppe && doc.Taxonomie && doc.Taxonomie.Daten && doc.Taxonomie.Daten["Artname vollständig"]) {
		if (doc.Gruppe === "Fauna" || doc.Gruppe === "Flora" || doc.Gruppe === "Macromycetes" || doc.Gruppe === "Moose") {
			value.Name = doc.Taxonomie.Daten["Artname vollständig"];
			value.id = doc._id;
			value.tokens = [];
			if (doc.Gruppe === "Fauna") {
				if (doc.Taxonomie.Daten.Gattung) {
					value.tokens.push(doc.Taxonomie.Daten.Gattung);
				}
				if (doc.Taxonomie.Daten.Art) {
					value.tokens.push(doc.Taxonomie.Daten.Art);
				}
				if (doc.Taxonomie.Daten.Autor) {
					autor_worte = doc.Taxonomie.Daten.Autor.split(" ");
					for (i=0; i<autor_worte.length; i++) {
						value.tokens.push(autor_worte[i]);
					}
				}
				if (doc.Taxonomie.Daten["Name Deutsch"]) {
					name_deutsch_worte = doc.Taxonomie.Daten["Name Deutsch"].split(" ");
					for (i=0; i<name_deutsch_worte.length; i++) {
						value.tokens.push(name_deutsch_worte[i]);
					}
				}
			} else if (doc.Gruppe === "Flora") {
				if (doc.Taxonomie.Daten.Gattung) {
					value.tokens.push(doc.Taxonomie.Daten.Gattung);
				}
				if (doc.Taxonomie.Daten.Art) {
					value.tokens.push(doc.Taxonomie.Daten.Art);
				}
				if (doc.Taxonomie.Daten.Autor) {
					autor_worte = doc.Taxonomie.Daten.Autor.split(" ");
					for (i=0; i<autor_worte.length; i++) {
						value.tokens.push(autor_worte[i]);
					}
				}
				if (doc.Taxonomie.Daten["Name Deutsch"]) {
					namen_deutsch_worte = doc.Taxonomie.Daten["Name Deutsch"].split(" ");
					for (i=0; i<namen_deutsch_worte.length; i++) {
						value.tokens.push(namen_deutsch_worte[i]);
					}
				}
			} else if (doc.Gruppe === "Macromycetes") {
				if (doc.Taxonomie.Daten.Gattung) {
					value.tokens.push(doc.Taxonomie.Daten.Gattung);
				}
				if (doc.Taxonomie.Daten.Name) {
					name_worte = doc.Taxonomie.Daten.Name.split(" ");
					for (i=0; i<name_worte.length; i++) {
						value.tokens.push(name_worte[i]);
					}
				}
				if (doc.Taxonomie.Daten.Autor) {
					autor_worte = doc.Taxonomie.Daten.Autor.split(" ");
					for (i=0; i<autor_worte.length; i++) {
						value.tokens.push(autor_worte[i]);
					}
				}
				if (doc.Taxonomie.Daten["Name Deutsch"]) {
					name_deutsch_worte = doc.Taxonomie.Daten["Name Deutsch"].split(" ");
					for (i=0; i<name_deutsch_worte.length; i++) {
						value.tokens.push(name_deutsch_worte[i]);
					}
				}
			} else if (doc.Gruppe === "Moose") {
				if (doc.Taxonomie.Daten.Gattung) {
					value.tokens.push(doc.Taxonomie.Daten.Gattung);
				}
				if (doc.Taxonomie.Daten.Art) {
					value.tokens.push(doc.Taxonomie.Daten.Art);
				}
				if (doc.Taxonomie.Daten.Autor) {
					autor_worte = doc.Taxonomie.Daten.Autor.split(" ");
					for (i=0; i<autor_worte.length; i++) {
						value.tokens.push(autor_worte[i]);
					}
				}
			}
			emit ([doc.Gruppe, doc.Taxonomie.Daten["Artname vollständig"]], value);
		}
	}
}