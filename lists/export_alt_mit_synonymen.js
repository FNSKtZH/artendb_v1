function(head, req) {

	start({
		"headers": {
			"Content-Type": "text/csv",
			"Content-disposition": "attachment;filename=Arteigenschaften_mit_Synonymen_fuer_Artenlistentool.csv",
			"Accept-Charset": "utf-8"
		}
	});

	var row,
        objekt,
		exportObjekte = [],
		exportObjekt,
		gruppen,
		beziehungssammlungen_aus_synonymen, datensammlungen_aus_synonymen,
        ergänzeDsBsVonSynonym_return,
        _ = require("lists/lib/underscore"),
        _a = require("lists/lib/artendb_listfunctions");

	// gruppen ist vorgegeben
	gruppen = ["Fauna", "Flora"];

	// arrays für sammlungen aus synonymen gründen
	beziehungssammlungen_aus_synonymen = [];
	datensammlungen_aus_synonymen = [];

	while (row = getRow()) {
		objekt = row.doc;

		if (gruppen.indexOf(objekt.Gruppe) === -1) {
			// diese Gruppe wollen wir nicht > weiter mit nächstem Objekt
			continue;
		}

		if (row.key[1] === 0) {
            // das ist ein Synonym
            // wir erstellen je eine Liste aller in Synonymen enthaltenen Daten- und Beziehungssammlungen inkl. der darin enthaltenen Daten
            // nämlich: datensammlungen_aus_synonymen und beziehungssammlungen_aus_synonymen
            // später können diese, wenn nicht im Originalobjekt enthalten, angefügt werden
            ergänzeDsBsVonSynonym_return = adb.ergänzeDsBsVonSynonym(objekt, datensammlungen_aus_synonymen, beziehungssammlungen_aus_synonymen);
            datensammlungen_aus_synonymen = ergänzeDsBsVonSynonym_return[0];
            beziehungssammlungen_aus_synonymen = ergänzeDsBsVonSynonym_return[1];
		} else if (row.key[1] === 1) {
			// wir sind jetzt im Originalobjekt
			// sicherstellen, dass DS und BS existieren
			if (!objekt.Datensammlungen) {
				objekt.Datensammlungen = [];
			}
			if (!objekt.Beziehungssammlungen) {
				objekt.Beziehungssammlungen = [];
			}
			// allfällige DS und BS aus Synonymen anhängen
			// zuerst DS
			// eine Liste der im Objekt enthaltenen DsNamen erstellen
			var dsNamen = [];
			if (objekt.Datensammlungen.length > 0) {
				for (i=0; i<objekt.Datensammlungen.length; i++) {
					if (objekt.Datensammlungen[i].Name) {
						dsNamen.push(objekt.Datensammlungen[i].Name);
					}
				}
			}
			// nicht enthaltene Datensammlungen ergänzen
			var ds_aus_syn_name2;
			if (datensammlungen_aus_synonymen.length > 0) {
				for (i=0; i<datensammlungen_aus_synonymen.length; i++) {
					ds_aus_syn_name2 = datensammlungen_aus_synonymen[i].Name;
					if (dsNamen.length === 0 || ds_aus_syn_name2.indexOf(dsNamen) === -1) {
						objekt.Datensammlungen.push(datensammlungen_aus_synonymen[i]);
						// den Namen zu den dsNamen hinzufügen, damit diese DS sicher nicht nochmals gepusht wird, auch nicht, wenn sie von einem anderen Synonym nochmals gebracht wird
						dsNamen.push(ds_aus_syn_name2);
					}
				}
			}
			// jetzt BS aus Synonymen anhängen
			// eine Liste der im Objekt enthaltenen BsNamen erstellen
			var bsNamen = [];
			if (objekt.Beziehungssammlungen.length > 0) {
				for (i=0; i<objekt.Beziehungssammlungen.length; i++) {
					if (objekt.Beziehungssammlungen[i].Name) {
						bsNamen.push(objekt.Beziehungssammlungen[i].Name);
					}
				}
			}
			// nicht enthaltene Beziehungssammlungen ergänzen
			var bs_aus_syn_name2;
			if (beziehungssammlungen_aus_synonymen.length > 0) {
				for (i=0; i<beziehungssammlungen_aus_synonymen.length; i++) {
					bs_aus_syn_name2 = beziehungssammlungen_aus_synonymen[i].Name;
					if (bsNamen.length === 0 || bs_aus_syn_name2.indexOf(bsNamen) === -1) {
						objekt.Beziehungssammlungen.push(beziehungssammlungen_aus_synonymen[i]);
						// den Namen zu den bsNamen hinzufügen, damit diese BS sicher nicht nochmals gepusht wird
						// auch nicht, wenn sie von einem anderen Synonym nochmals gebracht wird
						bsNamen.push(bs_aus_syn_name2);
					}
				}
			}

			// exportobjekt gründen bzw. zurücksetzen
			exportObjekt = {};

			// Felder hinzufügen
			exportObjekt.Gruppe = objekt.Gruppe;
			exportObjekt.Ref = objekt.Taxonomie.Daten["Taxonomie ID"];

			var ds_zh_gis = _.find(objekt.Datensammlungen, function(ds) {
				return ds.Name === "ZH GIS";
			}) || {};

			exportObjekt.GISLayer = "";
			if (ds_zh_gis && ds_zh_gis.Daten && ds_zh_gis.Daten["GIS-Layer"]) {
				exportObjekt.GISLayer = ds_zh_gis.Daten["GIS-Layer"];
			}

			exportObjekt.Distanz = "";
			if (ds_zh_gis && ds_zh_gis.Daten && ds_zh_gis.Daten["Betrachtungsdistanz (m)"]) {
				exportObjekt.Distanz = ds_zh_gis.Daten["Betrachtungsdistanz (m)"];
			}

			exportObjekt.NameLat = objekt.Taxonomie.Daten.Artname;
			exportObjekt.NameDeu = "";
			if (objekt.Taxonomie.Daten["Name Deutsch"]) {
				exportObjekt.NameDeu = objekt.Taxonomie.Daten["Name Deutsch"];
			}

			var ds_zh_artwert_1995 = _.find(objekt.Datensammlungen, function(ds) {
				return ds.Name === "ZH Artwert (1995)";
			}) || {};

			exportObjekt.Artwert = "";
			if (ds_zh_artwert_1995 && ds_zh_artwert_1995.Daten && (ds_zh_artwert_1995.Daten.Artwert || ds_zh_artwert_1995.Daten.Artwert === 0)) {
				exportObjekt.Artwert = ds_zh_artwert_1995.Daten.Artwert;
			}

			exportObjekt.AwZusatz = "";
			if (ds_zh_artwert_1995 && ds_zh_artwert_1995.Daten && ds_zh_artwert_1995.Daten["Artwert Zusatz"]) {
				exportObjekt.AwZusatz = ds_zh_artwert_1995.Daten["Artwert Zusatz"];
			}

			var ds_blaue_liste = _.find(objekt.Datensammlungen, function(ds) {
				return ds.Name === "Blaue Liste (1998)";
			}) || {};

			exportObjekt.Bestandesentwicklung = "";
			if (ds_blaue_liste && ds_blaue_liste.Daten && ds_blaue_liste.Daten.Bestandesentwicklung) {
				exportObjekt.Bestandesentwicklung = ds_blaue_liste.Daten.Bestandesentwicklung;
			}

			exportObjekt.Schutzmassnahmen = "";
			if (ds_blaue_liste && ds_blaue_liste.Daten && ds_blaue_liste.Daten.Schutzmassnahmen) {
				exportObjekt.Schutzmassnahmen = ds_blaue_liste.Daten.Schutzmassnahmen;
			}

			exportObjekt.Wirksamkeit = "";
			if (ds_blaue_liste && ds_blaue_liste.Daten && ds_blaue_liste.Daten.Wirksamkeit) {
				exportObjekt.Wirksamkeit = ds_blaue_liste.Daten.Wirksamkeit;
			}

			var ds_zh_ap_flora = _.find(objekt.Datensammlungen, function(ds) {
				return ds.Name === "ZH AP Flora";
			}) || {};

			exportObjekt.Link_zum_AP_Bericht = "";
			if (ds_zh_ap_flora && ds_zh_ap_flora.Daten && ds_zh_ap_flora.Daten["Link zum AP-Bericht"]) {
				exportObjekt.Link_zum_AP_Bericht = ds_zh_ap_flora.Daten["Link zum AP-Bericht"];
			}

			exportObjekt["GUID_FNS"] = objekt._id;
			
			// Objekt zu Exportobjekten hinzufügen
			exportObjekte.push(exportObjekt);
			// arrays für sammlungen aus synonymen zurücksetzen
			beziehungssammlungen_aus_synonymen = [];
			datensammlungen_aus_synonymen = [];
		}
	}
	// leere Objekte entfernen
	var exportObjekte_ohne_leere = _.reject(exportObjekte, function(object) {
		return _.isEmpty(object);
	});

	send(_a.erstelleExportString(exportObjekte_ohne_leere));
}