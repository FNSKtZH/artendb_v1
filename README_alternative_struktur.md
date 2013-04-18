###Alternative Struktur für die Taxonomien?
Das hier ist nur für mich und etwaige Spezialisten aus den Artdatenzentren.

Man könnte dem Dokument auch eine Liste (Array) von Taxonomien verpassen. Darin würden alle synonymen Taxonomien aufgenommen, da sie ja dasselbe Objekt beschreiben. Die Taxonomie sähe am Beispiel von Thlaspi repens Maire so aus:
```javascript
"Taxonomien": [
	{
		"Name": "SISF Index 2 (2005)",
		"Beschreibung": "D. Aeschimann & C. Heitz: Synonymie-Index der Schweizer Flora (2005). Zweite Auflage. Eigenschaften von 7973 Pflanzenarten. Arten mit NR > 1000000 von der FNS provisorisch ergänzt",
		"Datenstand": "2007.05.08",
		"Link": "http://www.infoflora.ch/de/daten-beziehen/standard-artenliste.html",
		"Daten": {
			"Taxonomie ID": 419000,
			"Familie": "Brassicaceae",
			"Gattung": "Thlaspi",
			"Art": "repens",
			"Autor": "Maire",
			"Artname": "Thlaspi repens Maire",
			"Artname vollständig": "Thlaspi repens Maire",
			"Status": "Synonym",
			"Name Französisch": "Tabouret à feuilles rondes, Tabouret rampant",
			"Name Italienisch": "Erba storna rotondifoglia",
			"Referenzwerke": "Aeschimann, D. & H. M. Burdet (2005). Flore de la Suisse et des territoires limitrophes. Le Nouveau Binz. Ed. 3"
		}
	},
	{
		"Name": "SISF Index 2 (2005)",
		"Beschreibung": "D. Aeschimann & C. Heitz: Synonymie-Index der Schweizer Flora (2005). Zweite Auflage. Eigenschaften von 7973 Pflanzenarten. Arten mit NR > 1000000 von der FNS provisorisch ergänzt",
		"Datenstand": "2007.05.08",
		"Link": "http://www.infoflora.ch/de/daten-beziehen/standard-artenliste.html",
		"Daten": {
			"Taxonomie ID": 419100,
			"Familie": "Brassicaceae",
			"Gattung": "Thlaspi",
			"Art": "rotundifolium",
			"Autor": "(L.) Gaudin s.str.",
			"Artname": "Thlaspi rotundifolium (L.) Gaudin s.str.",
			"Artname vollständig": "Thlaspi rotundifolium (L.) Gaudin s.str. (Rundblättriges Täschelkraut)",
			"Status": "akzeptierter Name",
			"Deutsche Namen": "Rundblättriges Täschelkraut",
			"Referenzwerke": "Binz, A. & Ch. Heitz (1990). Schul- und Exkursionsflora für die Schweiz. Ed. 19  /  Lauber, K. & G. Wagner (2001). Flora Helvetica  /  Hess, H. & al. (1976-1980). Flora der Schweiz. Ed. 2  /  Welten, M. & R. Sutter (1982). Verbreitungsatlas der Farn- und Blütenpflanzen der Schweiz  /  Landolt, E. (1977). Ökologische Zeigerwerte zur Schweizer Flora  /  Landolt, E. (1991). Gefährdung der Farn- und Blütenpflanzen in der Schweiz mit gesamtschweizerischen und regionalen roten Listen"
	}
]
```

Vorteile:

- Für Synonyme muss kein neues Objekt geschaffen werden.<br>Das ist besonders praktisch, wenn z.B. der nächste Index der Flora publiziert wird > einfach im bestehenden Objekt den SISF-Index 3 ergänzen. Sonst: Neues Objekt schaffen. Hm. Wo sollen jetzt die Datensammlungen dran hängen? Alle zügeln? Alle kopieren? Am alten Ort belassen und über die Beziehung managen? Das ist alles nicht schön oder aufwändig. Am besten ist wohl die letzte Variante
- Synonyme haben automatisch alle Datensammlungen und Beziehungssammlungen aller anderen Synonyme. Kein Aufwand in Exporten, Schnittstellen und der Benutzeroberfläche!
- Das Datenmodell ist einheitlicher und einfacher - eleganter
- Eigentlich ist klar: Synonym = dieselbe Art mit denselben Eigenschaften (die Praxis sieht leider anders aus)

Nachteile:

- Der strukturelle Umbau ist massiv, aufwändig und fehlerträchtig
- An sich ist es korrekt, wenn eine Datensammlung an derjenigen Taxonomie hängt, mit der sie erarbeitet wurde
- Synonymie ist datentechnisch gesehen eine Beziehung wie andere auch (z.B. "hierarchisch"). Beziehungen würden somit auf zwei unterschiedliche Arten behandelt
- Man kann nicht darstellen, dass eine Taxonomie ein Objekt einer anderen als Synonym bezeichnet, umgekehrt aber nicht (kommt das vor?). Man müsste dann wie bisher (nur) im einen Objekt eine (einseitige) Beziehung schaffen. Wenn man von so bezeichneten Synonymen die Informationen des Synonyms anzeigen will, muss man dazu doch extra Funktionalitäten einbauen. Ist aber durchaus möglich. Aber dann wird noch klarer, dass Beziehungen auf unterschiedliche Arten im Datenmodell abgebildet werden
- In Datensammlungen müsste in einem Feld beschrieben werden, mit welcher Taxonomie (bei Beziehungen: Taxonomien) sie ursprünglich erstellt wurden. Falls an der Synonymie einmal etwas geändert würde, können sie so wieder korrekt zugewiesen werden
- Was machen, wenn zwei Synonyme dieselbe Datensammlung haben?
 - Flora Artwert: Denjenigen nehmen, bei dem "Information original" leer ist > keine Probleme
 - Flora FnsBis: 4 von über 3000 Arten
 - Flora RL02: 3 Synonyme (von über 3000) haben unterschiedliche Informationen
 - Flora Witt: 3 von 915 mit unterschiedlichen Informationen
 - Flora Zw77: 1 von 3340 mit geringen Unterschieden
 - Flora Zw2010: 37 von 6400 mit unterschiedlichen Informationen
 - Moose: Synonym über akzeptierte Referenz. RL04: 2 von 1200
 <br>Lösung: Zuerst akzeptierte Arten importieren und Objekte daraus machen. Danach Synonyme importieren: Wenn die Datensammlung schon existiert: Zusätzliche Datensammlung schaffen, z.B. "Witt (1995): Informationen zum Synonym mit Taxonomie ID x" (zweiter Teil des Titels aus den nachfolgenden Feldern geholt - Datensammlung darf nicht anderst heissen). Zwei neue Felder: Typ der Ds: "Synonym-Info" und "Synonym-Info für Taxonomie-Id" > in Exportformularen nicht darstellen (würde überladen) - kommt über die gleichen Feldnamen eh mit.<br>Nicht vergessen: Dieses komplizierte Vorgehen muss auch bei gewöhnlichen Importen gewählt werden!
- Die Suche muss für Taxonomische Einheiten erweitert werden, die nicht im Baum erscheinen

Vorläufige Schlussfolgerung: Das braucht noch reifliche Überlegung. Ist wohl keine so gute Idee.