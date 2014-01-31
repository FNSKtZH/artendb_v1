function(head, req) {

	start({
		"headers": {
			"Content-Type": "text/csv",
			"Content-disposition": "attachment;filename=Arteigenschaften_mit_Synonymen_fuer_Artenlistentool.csv",
			"Accept-Charset": "utf-8"
		}
	});

	var row, Objekt,
		exportObjekte = [],
		exportObjekt,
		gruppen,
		beziehungssammlungen_aus_synonymen, datensammlungen_aus_synonymen;
	var _ = require("lists/lib/underscore");
	var _a = require("lists/lib/artendb_listfunctions");

	// gruppen ist vorgegeben
	gruppen = ["Fauna", "Flora"];

	// arrays für sammlungen aus synonymen gründen
	beziehungssammlungen_aus_synonymen = [];
	datensammlungen_aus_synonymen = [];

	objekt_loop:
	while (row = getRow()) {
		Objekt = row.doc;

		if (gruppen.indexOf(Objekt.Gruppe) === -1) {
			// diese Gruppe wollen wir nicht > weiter mit nächstem Objekt
			continue objekt_loop;
		}

		// row.key[1] ist 0, wenn es sich um ein Synonym handelt, dessen Informationen geholt werden sollen
		if (row.key[1] === 0) {
			if (Objekt.Datensammlungen && Objekt.Datensammlungen.length > 0) {
				var ds_aus_syn_namen = [];
				if (datensammlungen_aus_synonymen.length > 0) {
					for (i=0; i<datensammlungen_aus_synonymen.length; i++) {
						if (datensammlungen_aus_synonymen[i].Name) {
							ds_aus_syn_namen.push(datensammlungen_aus_synonymen[i].Name);
						}
					}
				}
				var ds_aus_syn_name;
				if (Objekt.Datensammlungen.length > 0) {
					for (i=0; i<Objekt.Datensammlungen.length; i++) {
						ds_aus_syn_name = Objekt.Datensammlungen[i].Name;
						if (ds_aus_syn_namen.length === 0 || ds_aus_syn_name.indexOf(ds_aus_syn_namen) === -1) {
							datensammlungen_aus_synonymen.push(Objekt.Datensammlungen[i]);
							// sicherstellen, dass diese ds nicht nochmals gepuscht wird
							ds_aus_syn_namen.push(ds_aus_syn_name);
						}
					}
				}
			}
			if (Objekt.Beziehungssammlungen && Objekt.Beziehungssammlungen.length > 0) {
				var bs_aus_syn_namen = [];
				if (beziehungssammlungen_aus_synonymen.length > 0) {
					for (i=0; i<beziehungssammlungen_aus_synonymen.length; i++) {
						if (beziehungssammlungen_aus_synonymen[i].Name) {
							bs_aus_syn_namen.push(beziehungssammlungen_aus_synonymen[i].Name);
						}
					}
				}
				var bs_aus_syn_name;
				if (Objekt.Beziehungssammlungen.length > 0) {
					for (i=0; i<Objekt.Beziehungssammlungen.length; i++) {
						bs_aus_syn_name = Objekt.Beziehungssammlungen[i].Name;
						if (bs_aus_syn_namen.length === 0 || bs_aus_syn_name.indexOf(bs_aus_syn_namen) === -1) {
							beziehungssammlungen_aus_synonymen.push(Objekt.Beziehungssammlungen[i]);
							// sicherstellen, dass diese bs nicht nochmals gepuscht wird
							bs_aus_syn_namen.push(bs_aus_syn_name);
						}
					}
				}
			}
			// das war ein Synonym. Hier aufhören
		} else if (row.key[1] === 1) {
			// wir sind jetzt im Originalobjekt
			// sicherstellen, dass DS und BS existieren
			if (!Objekt.Datensammlungen) {
				Objekt.Datensammlungen = [];
			}
			if (!Objekt.Beziehungssammlungen) {
				Objekt.Beziehungssammlungen = [];
			}
			// allfällige DS und BS aus Synonymen anhängen
			// zuerst DS
			// eine Liste der im Objekt enthaltenen DsNamen erstellen
			var dsNamen = [];
			if (Objekt.Datensammlungen.length > 0) {
				for (i=0; i<Objekt.Datensammlungen.length; i++) {
					if (Objekt.Datensammlungen[i].Name) {
						dsNamen.push(Objekt.Datensammlungen[i].Name);
					}
				}
			}
			// nicht enthaltene Datensammlungen ergänzen
			var ds_aus_syn_name2;
			if (datensammlungen_aus_synonymen.length > 0) {
				for (i=0; i<datensammlungen_aus_synonymen.length; i++) {
					ds_aus_syn_name2 = datensammlungen_aus_synonymen[i].Name;
					if (dsNamen.length === 0 || ds_aus_syn_name2.indexOf(dsNamen) === -1) {
						Objekt.Datensammlungen.push(datensammlungen_aus_synonymen[i]);
						// den Namen zu den dsNamen hinzufügen, damit diese DS sicher nicht nochmals gepusht wird, auch nicht, wenn sie von einem anderen Synonym nochmals gebracht wird
						dsNamen.push(ds_aus_syn_name2);
					}
				}
			}
			// jetzt BS aus Synonymen anhängen
			// eine Liste der im Objekt enthaltenen BsNamen erstellen
			var bsNamen = [];
			if (Objekt.Beziehungssammlungen.length > 0) {
				for (i=0; i<Objekt.Beziehungssammlungen.length; i++) {
					if (Objekt.Beziehungssammlungen[i].Name) {
						bsNamen.push(Objekt.Beziehungssammlungen[i].Name);
					}
				}
			}
			// nicht enthaltene Beziehungssammlungen ergänzen
			var bs_aus_syn_name2;
			if (beziehungssammlungen_aus_synonymen.length > 0) {
				for (i=0; i<beziehungssammlungen_aus_synonymen.length; i++) {
					bs_aus_syn_name2 = beziehungssammlungen_aus_synonymen[i].Name;
					if (bsNamen.length === 0 || bs_aus_syn_name2.indexOf(bsNamen) === -1) {
						Objekt.Beziehungssammlungen.push(beziehungssammlungen_aus_synonymen[i]);
						// den Namen zu den bsNamen hinzufügen, damit diese BS sicher nicht nochmals gepusht wird, auch nicht, wenn sie von einem anderen Synonym nochmals gebracht wird
						bsNamen.push(bs_aus_syn_name2);
					}
				}
			}

			// exportobjekt gründen bzw. zurücksetzen
			exportObjekt = {};

			// Felder hinzufügen
			exportObjekt.Gruppe = Objekt.Gruppe;
			exportObjekt.Ref = Objekt.Taxonomie.Daten["Taxonomie ID"];

			var ds_zh_gis = _.find(Objekt.Datensammlungen, function(ds) {
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

			exportObjekt.NameLat = Objekt.Taxonomie.Daten.Artname;
			exportObjekt.NameDeu = "";
			if (Objekt.Taxonomie.Daten["Name Deutsch"]) {
				exportObjekt.NameDeu = Objekt.Taxonomie.Daten["Name Deutsch"];
			}

			var ds_zh_artwert_1995 = _.find(Objekt.Datensammlungen, function(ds) {
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

			var ds_blaue_liste = _.find(Objekt.Datensammlungen, function(ds) {
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

			var ds_zh_ap_flora = _.find(Objekt.Datensammlungen, function(ds) {
				return ds.Name === "ZH AP Flora";
			}) || {};

			exportObjekt.Link_zum_AP_Bericht = "";
			if (ds_zh_ap_flora && ds_zh_ap_flora.Daten && ds_zh_ap_flora.Daten["Link zum AP-Bericht"]) {
				exportObjekt.Link_zum_AP_Bericht = ds_zh_ap_flora.Daten["Link zum AP-Bericht"];
			}

			exportObjekt["GUID_FNS"] = Objekt._id;
			
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