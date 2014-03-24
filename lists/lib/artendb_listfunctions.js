exports.erstelleExportString = function(exportobjekte) {
	var stringTitelzeile = "",
		stringZeilen = "",
		stringZeile;
	for (var i in exportobjekte) {
		// aus unerklärlichem Grund blieb stringTitelzeile leer, wenn nur ein Datensatz gefiltert wurde
		// daher bei jedem Datensatz prüfen, ob eine Titelzeile erstellt wurde und wenn nötig ergänzen
		if (stringTitelzeile === "" || stringTitelzeile === ",") {
			stringTitelzeile = "";
			// durch Spalten loopen
			for (var a in exportobjekte[i]) {
				if (stringTitelzeile !== "") {
					stringTitelzeile += ',';
				}
				stringTitelzeile += '"' + a + '"';
			}
		}

		if (stringZeilen !== "") {
			stringZeilen += '\n';
		}
		stringZeile = "";
		// durch die Felder loopen
		for (var x in exportobjekte[i]) {
		//for (var x = 0; x < exportobjekte[i].length; x++) {
			if (stringZeile !== "") {
				stringZeile += ',';
			}
			// null-Werte als leere Werte
			if (exportobjekte[i][x] === null) {
				stringZeile += "";
			} else if (typeof exportobjekte[i][x] === "number") {
				// Zahlen ohne Anführungs- und Schlusszeichen exportieren
				stringZeile += exportobjekte[i][x];
			} else if (typeof exportobjekte[i][x] === "object") {
				// Anführungszeichen sind Feldtrenner und müssen daher ersetzt werden
				stringZeile += '"' + JSON.stringify(exportobjekte[i][x]).replace(/"/g, "'") + '"';
			} else {
				stringZeile += '"' + exportobjekte[i][x] + '"';
			}
		}
		stringZeilen += stringZeile;
	}
	return stringTitelzeile + "\n" + stringZeilen;
};

exports.filtereBeziehungspartner = function(beziehungspartner, Filterwert, Vergleichsoperator) {
	// Wenn Feldname = Beziehungspartner, durch die Partner loopen und nur hinzufügen, wessen Name die Bedingung erfüllt
	var bezPartner = [];
	for (var m=0; m<beziehungspartner.length; m++) {
		var feldwert = beziehungspartner[m].Name.toLowerCase();
		if (Vergleichsoperator === "kein" && feldwert == Filterwert) {
			bezPartner.push(beziehungspartner[m]);
		} else if (Vergleichsoperator === "kein" && typeof feldwert === "string" && feldwert.indexOf(Filterwert) >= 0) {
			bezPartner.push(beziehungspartner[m]);
		} else if (Vergleichsoperator === "=" && feldwert == Filterwert) {
			bezPartner.push(beziehungspartner[m]);
		} else if (Vergleichsoperator === ">" && feldwert > Filterwert) {
			bezPartner.push(beziehungspartner[m]);
		} else if (Vergleichsoperator === ">=" && feldwert >= Filterwert) {
			bezPartner.push(beziehungspartner[m]);
		} else if (Vergleichsoperator === "<" && feldwert < Filterwert) {
			bezPartner.push(beziehungspartner[m]);
		} else if (Vergleichsoperator === "<=" && feldwert <= Filterwert) {
			bezPartner.push(beziehungspartner[m]);
		}
	}
	return bezPartner;
};

exports.containsObject = function(obj, list) {
	var i;
	for (i = 0; i < list.length; i++) {
		if (list[i] === obj) {
			return true;
		}
	}
	return false;
};

exports.convertToCorrectType = function(feldWert) {
	var type = exports.myTypeOf(feldWert);
	if (type === "boolean") {
		return Boolean(feldWert);
	} else if (type === "float") {
		return parseFloat(feldWert);
	} else if (type === "integer") {
		return parseInt(feldWert, 10);
	} else if (type === "string") {
		// string jetzt kleinschreiben, damit das nicht später erfolgen muss
		return feldWert.toLowerCase();
	} else {
		// object nicht umwandeln. Man muss beim Vergleichen unterscheiden können, ob es ein Object war
		return feldWert;
	}
};

// Hilfsfunktion, die typeof ersetzt und ergänzt
// typeof gibt bei input-Feldern immer String zurück!
exports.myTypeOf = function(Wert) {
	if (typeof Wert === "boolean") {
		return "boolean";
	} else if (parseInt(Wert, 10) && parseFloat(Wert) && parseInt(Wert, 10) !== parseFloat(Wert) && parseInt(Wert, 10) == Wert) {
		// es ist eine Float
		return "float";
	// verhindern, dass führende Nullen abgeschnitten werden
	} else if ((parseInt(Wert, 10) == Wert && Wert.toString().length === Math.ceil(parseInt(Wert, 10)/10)) || Wert == "0") {
		// es ist eine Integer
		return "integer";
	} else if (typeof Wert === "object") {
		// es ist ein Objekt
		return "object";
	} else if (typeof Wert === "string") {
		// als String behandeln
		return "string";
	} else if (typeof Wert === "undefined") {
		return "undefined";
	} else if (typeof Wert === "function") {
		return "function";
	}
};

// beurteilt, ob ein Objekt exportiert werden soll
// indem er Feldwerte mit Filterkriterien vergleicht
// das Filterkriterium besteht aus einem Vergleichsoperator (oder auch nicht) und einem Filterwert
exports.beurteileFilterkriterien = function(feldwert, filterwert, vergleichsoperator) {
	if (vergleichsoperator === "kein" && feldwert == filterwert) {
		return true;
	} else if (vergleichsoperator === "kein" && exports.myTypeOf(feldwert) === "string" && feldwert.indexOf(filterwert) >= 0) {
		return true;
	} else if (vergleichsoperator === "=" && feldwert == filterwert) {
		return true;
	} else if (vergleichsoperator === ">" && feldwert > filterwert) {
		return true;
	} else if (vergleichsoperator === ">=" && feldwert >= filterwert) {
		return true;
	} else if (vergleichsoperator === "<" && feldwert < filterwert) {
		return true;
	} else if (vergleichsoperator === "<=" && feldwert <= filterwert) {
		return true;
	}
	return false;
};