<a name="top"></a>
Die Arten- und Lebensraumdatenbank existiert schon. Man kann sie kostenlos [herunterladen](http://www.aln.zh.ch/internet/baudirektion/aln/de/naturschutz/naturschutzdaten/tools/arten_db.html#a-content).


Als ich in der [Fachstelle Naturschutz des Kantons Zürich](http://www.naturschutz.zh.ch) angefangen habe, existierte bereits eine Version. Sie wurde in den letzten vier Jahren stark ausgebaut. Dies hier ist der Versuch, sie weiter zu entwickeln.

## Inhalt ##
* <a href="#Ausgangspunkt">Ausgangspunkt</a>
* <a href="#WasIstWichtig">Was ist wichtig</a>
* <a href="#Datensammlungen">Datensammlungen</a>
* <a href="#ArtgruppenVereinen">Artgruppen vereinen</a>
* <a href="#CodierungVereinfachen">Codierung vereinfachen</a>
* <a href="#NeueDatensammlungenEinfachHinzufügen">Neue Datensammlungen einfach hinzufügen</a>
* <a href="#DokumentorientierteDatenbankVerwenden">Dokumentorientierte Datenbank verwenden</a>
* <a href="#Roadmap">Roadmap</a>
* <a href="#OpenSource">Open source</a>

<a name="Ausgangspunkt"></a>
#Ausgangspunkt
sind ein paar Feststellungen:

- Art- und Lebensraumeigenschaften müssten nicht nur die Fachstelle Naturschutz des Kantons Zürich interessieren. Ideal wäre eine von allen in diesem Bereich tätigen Stellen gemeinsam nachgeführte Datenbank
- Wenn man Daten aus anderen Quellen bezieht, ist es schwierig, sie aktuell zu halten. Manchmal müssen schon beim erstmaligen Import Entscheidungen getroffen werden, welche eigentlich nur der Datenherr fällen sollte
- Die aktuelle DB kann zwar im Internet frei heruntergeladen werden. Sie setzt aber Microsoft Access voraus. Die Anzahl Geräte, welche sie nutzen können, ist daher stark eingeschränkt
- Microsoft Access hat als relationale, dateigebundene Datenbank und als die Anwendung, die sie ist, technische Rahmenbedingungen, die einer Weiterentwicklung im obigen Sinn im Wege stehen. Ab einer gewissen Komplexität scheint mir die Entwicklung und v.a. der Unterhalt einer Anwendung in freieren Umgebungen (z.B. Javascript und HTML) einfacher, übersichtlicher und weniger komplex als in Access
- Bei einer Datenbank, die von verschiedensten Stellen nachgeführt wird, sollte die Benutzeroberfläche dynamisch aus den internen Datenstrukturen aufgebaut werden (siehe unten)

<a href="#top">&#8593; top</a>

<a name="WasIstWichtig"></a>
#Was ist wichtig
**Für die Benutzerin:**

- Die Anwendung ist einfach zu bedienen
- Die Datenflut kann bewältigt werden:
 - Die Benutzerin wählt, welche Daten sie sehen oder exportieren will
 - Leere Felder werden im Lesemodus nicht angezeigt
- Die Daten sind gut dokumentiert, neue Benutzer finden sich rasch zurecht
- Die Daten sind gut verfügbar:
 - Von jedem Gerät im Internet
 - Als Export im csv-Format (ev. weitere)
 - Über Schnittstellen für GIS, [Artenlistentool](http://www.aln.zh.ch/internet/baudirektion/aln/de/naturschutz/naturschutzdaten/tools/artenlistentool.html#a-content), [EvAB](http://www.aln.zh.ch/internet/baudirektion/aln/de/naturschutz/naturschutzdaten/tools/evab.html#a-content), [EvAB mobile](https://github.com/barbalex/EvabMobile), beliebige Apps
- Exporte, Auswertungen etc. können ohne zusätzlichen Aufwand über alle Artengruppen hinweg erfolgen


**Für Datenpfleger und Systemverantwortliche:**

- Die Komplexität der Datenstruktur ist minimiert
- Neue Datensammlungen können von technisch durchschnittlich begabten Personen mit Hilfe einer Anleitung in wenigen Stunden ergänzt werden

<a href="#top">&#8593; top</a>

<a name="Datensammlungen"></a>
#Datensammlungen
Systematische Informationen über Arten kommen in ganzen Datensammlungen, z.B. „Flora Indicativa 2010“. Solche Datensammlungen haben gemeinsame Eigenschaften wie z.B.:

- Dieselbe Herkunft (Autoren, Publikation)
- Meist eine bestimmte Artgruppe (z.B. Flora, Fauna, Schmetterlinge…)
- Innerhalb der Artgruppe eine definierte Auswahl bearbeiteter Arten
- Definierte Auswahl erfasster Informationen
- Definierte Methodik

Datensammlungen sollten in der Regel durch die Autoren nachgeführt werden. Ausser es wird ein Arten- und Lebensraum-Wiki angestrebt (dies könnte zusätzlich ermöglicht werden).

Um die Artdaten verstehen und verwalten zu können, ist es wichtig, diese Datensammlungen als wesentlichen Teil der Struktur zu behandeln. Das kann folgendermassen geschehen:

- Datensammlungen werden eigens beschrieben und gespeichert, u.a. mit:
 - Quelle
 - Link
 - Allgemeine Beschreibung
 - Nachführungsberechtigte User
- In der Feldverwaltung wird für jedes Feld die zugehörige Datensammlung genannt

In vielen Fällen ist es sinnvoll, die Informationen pro solcher Datensammlung darzustellen bzw. zusammenzufassen. Z.B. bei der Anzeige in der Anwendung oder wenn für Exporte Felder ausgewählt werden.

<a name="FelderZusammenfassen"></a>
Für bestimmte Zwecke ist das Gegenteil interessant: Felder aus verschiedenen Datensammlungen zusammenfassen. Z.B. wenn man über alle Artengruppen den aktuellsten Rote-Liste-Status darstellen will. Um das zu ermöglichen folgende Idee:

- In der Feldverwaltung erhalten Felder mit zusammenzufassender Information zusätzlich zum normalen Feldnamen einen zusammenfassenden Feldnamen
- Ein View fasst alle Felder aller Artgruppen mit demselben zusammenfassenden Feldnamen zusammen
- Für den Export von Daten können - neben allen anderen Datensammlungen - auch Felder aus diesem View gewählt werden
- Wird für eine Artengruppe z.B. eine neue Version der Roten Liste erstellt, kann die alte in der Datenbank belassen werden. Die neue wird importiert. In der Feldverwaltung werden die zusammenfassenden Felder angepasst

<a href="#top">&#8593; top</a>

<a name="ArtgruppenVereinen"></a>
#Artgruppen vereinen
Heute werden die verschiedenen Gruppen (Flora, Fauna, Moose, Pilze, Flechten, Lebensräume) in unterschiedlichen Tabellen der relationalen Datenbank verwaltet. Das erhöht die Komplexität der Anwendung und erschwert jede Auswertung enorm. Beispielweise müssen alle Beziehungen zu anderen Arten oder Lebensräumen für jede Gruppe separat verwaltet werden... Zumindest in Access kann das aber nicht mehr geändert werden, weil z.B. in der Floratabelle die maximale Anzahl möglicher Indizes (32) erreicht ist und jede Beziehung einen Index voraussetzt. Die (schlechte) Variante, alle Informationen in einer einzigen Riesentabelle zu vereinigen, scheitert wiederum an der maximalen Anzahl Felder (255).

<a href="#top">&#8593; top</a>

<a name="CodierungVereinfachen"></a>
#Codierung vereinfachen
Viele Werte sind heute codiert. Die entsprechenden Felder enthalten für Menschen unverständliche Codes. Sie werden in einer Codierungstabelle aufgelöst. Damit die Daten benutzergerecht dargestellt werden können, müssen sie für Darstellung und Export decodiert werden. Dieses System ist sehr kompliziert und bringt Access in Formularen und Abfragen an seine Leistungsgrenze. Deshalb werden die Daten momentan codiert exportiert. Auch leistungsfähigere Systeme dürften gebremst werden.
- Decodierung vermeiden: Wenn immer möglich uncodierte Werte ins Feld einfügen und Optionslisten in der Feldverwaltung definieren (Arrays)
- Redundanz statt Komplexität: Wo Abkürzungen für Laien unverständlich sind aber allgemein benutzt werden (z.B. die IUCN-Stati in der Roten Liste) wird der decodierte Wert in einem zweiten Feld gespeichert

<a href="#top">&#8593; top</a>

<a name="NeueDatensammlungenEinfachHinzufügen"></a>
#Neue Datensammlungen einfach hinzufügen
- Die clientseitigen Datenfelder werden dynamisch aus den für die Art gespeicherten Attributen aufgebaut
- Dazu werden die Feldeigenschaften verwaltet. Unter anderen:
 - Datensammlung
 - Feldname
 - Feldtyp (Text, Auswahlliste, Mehrfachauswahl möglich etc.)
 - Optionen für Auswahllisten

Will jemand neue Arteigenschaften ergänzen, geht das dann so:

- Art- oder Lebensraumeigenschaften vorbereiten
- Informationen über die Felder vorbereiten (ev. nicht nötig, siehe unten)
- Informationen über die Datensammlung vorbereiten
- Alles importieren
fertig!

Ev. kann auf die Feldverwaltung verzichtet werden. Oder sie kann für besondere Featurs benutzt werden, muss aber nicht. Denn es sollte möglich sein, die Benutzeroberfläche auch ohne eine explizite Feldverwaltung aufzubauen. So sollte der Datentyp dynamisch eruierbar sein. Und auch die Länge des Feldinhalts kann dynamisch ermittelt werden und daraufhin für lange Textfelder ein "Textarea" gewählt werden.
Solche besonderen Features könnten sein:
- Felder mit einem gemeinsamen Titel gruppieren
- Felder aus verschiedenen Datensammlungen zusammenfassen (siehe <a href="#FelderZusammenfassen">oben</a>)
- Bemerkungen bzw. Interpretationshilfen zum Feld

<a href="#top">&#8593; top</a>

<a name="DokumentorientierteDatenbankVerwenden"></a>
#Dokumentorientierte Datenbank verwenden
- Die Datenstruktur der Arteigenschaften (1:1, die meisten Felder bleiben leer) ist für eine traditionelle, tabellenbasierte Datenbank wenig geeignet, für eine dokumentenorientierte hingegen ideal
- Eine dokumentbasierte Datenbank eignet sich hervorragend, um ohne Einbezug des Systemadministrators neue Felder zu ergänzen...
- ...und um alle Arten gleich zu verwalten und Gruppen (Flora, Fauna, Moose, Pilze, Flechten, sogar die Lebensräume) nur aufgrund eines Attributs zu unterscheiden. Beziehungen zwischen Arten und Lebensräumen sind entsprechend sehr einfach zu verwalten

Hier ein Beispiel, wie eine Art im JSON Format mit vielen Informationen aus Datensammlungen dargestellt werden kann:
```javascript
{
   "_id": "15544EBD-51D0-470B-9C34-B6F822EACABF",
   "_rev": "18-8bfc0deddc787bbc247fddcad2b64a7f",
   "Index": {
       "Typ": "Datensammlung",
       "Felder": {
           "Gruppe": "Flora",
           "NR": 334200,
           "Status": "A",
           "Name": "Pulsatilla vulgaris Mill.",
           "Familie": "Ranunculaceae",
           "Gattung": "Pulsatilla",
           "Art": "vulgaris",
           "Autor": "Mill.",
           "OffizielleArt": 334200,
           "Deutsch": "Gewöhnliche Küchenschelle",
           "Franzoesisch": "Coquelourde, Pulsatille vulgaire",
           "Italienisch": "Pulsatilla comune",
           "EXPORT_SOURCES": "AB/BH/FH/HL/WS/LZ/LR",
           "NO_FH": "158",
           "GUID": "15544EBD-51D0-470B-9C34-B6F822EACABF"
       }
   },
   "CH Zeigerwerte 2010": {
       "Typ": "Datensammlung",
       "Felder": {
           "Zw2010Sen": "4736",
           "Zw2010Fan": "19.14.5.1",
           "Zw2010Fhn": "158",
           "Zw2010Zwn": "1146",
           "Zw2010Wsn": "378",
           "Zw2010KlimaT": "4",
           "Zw2010KlimaTv": "I",
           "Zw2010KlimaK": "5",
           "Zw2010KlimaKv": "I",
           "Zw2010KlimaL": "4",
           "Zw2010KlimaLv": "I",
           "Zw2010BodenF": "1.5",
           "Zw2010BodenFv": "I",
           "Zw2010BodenW": "1",
           "Zw2010BodenR": "4",
           "Zw2010BodenRv": "I",
           "Zw2010BodenN": "2",
           "Zw2010BodenNv": "I",
           "Zw2010BodenH": "3",
           "Zw2010BodenHv": "I",
           "Zw2010BodenD": "3",
           "Zw2010BodenDv": "I",
           "Zw2010StrLf": "h",
           "Zw2010StrBd": "s",
           "Zw2010StrWt": "1.5",
           "Zw2010StrRo": "Rh Wv",
           "Zw2010StrKs": "crs",
           "Zw2010BioDa": "Me",
           "Zw2010BioVa": "Sr",
           "Zw2010BioFs": "zw",
           "Zw2010BioMa": "r6",
           "Zw2010BioBz": "3-4",
           "Zw2010BioMv": "2",
           "Zw2010BioDg": 2,
           "Zw2010BioGi": "tg h",
           "Zw2010VorkAe": "I",
           "Zw2010VorkEm": "2",
           "NR": 334200,
           "GUID": "15544EBD-51D0-470B-9C34-B6F822EACABF"
       }
   },
   "CH Zeigerwerte 1977": {
       "Typ": "Datensammlung",
       "Felder": {
           "ZwlFeuchtezahl": 1,
           "ZwlFeuchteZ1": false,
           "ZwlFeuchteZ2": false,
           "ZwlFeuchteZ3": 0,
           "ZwlReakzahl": 4,
           "ZwlNaehrstzahl": 2,
           "ZwlHumuszahl": 3,
           "ZwlDisperszahl": 3,
           "ZwlSalzzeichen": 2,
           "ZwlLichtzahl": 4,
           "ZwlTempzahl": 4,
           "ZwlKontzahl": 4,
           "ZwlWuchsform": 8,
           "ZwlNeophyt": false
       }
   },
   "Witt 1995": {
       "Typ": "Datensammlung",
       "Felder": {
           "Witt_Alter": "mehrjährig",
           "Witt_Höhe": "10-30",
           "Witt_Blfarbe": "violett",
           "Witt_Blmonat": "2-4",
           "Witt_Wärmekeimer": false,
           "Witt_Kaltkeimer": true,
           "Witt_Lichtkeimer": true,
           "Witt_Dunkelkeimer": false,
           "Witt_KeimMonate": "8-12",
           "Witt_ungeschlechtlicheFortpflanzung": "Wurzelschnittlinge 11",
           "Witt_Schmetterlinge": true,
           "Witt_Wildbienen": true,
           "Witt_Hummeln": true,
           "Witt_Fliegen": false,
           "Witt_Käfer": false,
           "Witt_Vögel": false,
           "Witt_Säuger": false
       }
   },
   "CH Rote Liste 2002": {
       "Typ": "Datensammlung",
       "Felder": {
           "RL02_NO_LR2002": 2307,
           "RL02_BERN_CONVENTION": false,
           "RL02_IUCN1997_REDLIST": false,
           "RL02_PROTECTION": 1,
           "RL02_NEOPHYTE": 0,
           "RL02_INVASIF": false,
           "RL02_CH": 5,
           "RL02_ADV_JU": false,
           "RL02_JU_TOT": 5,
           "RL02_JU1": 5,
           "RL02_JU2": 5,
           "RL02_ADV_MP": false,
           "RL02_MP_TOT": 5,
           "RL02_MP1": 5,
           "RL02_MP2": 5,
           "RL02_ADV_NA": false,
           "RL02_NA_TOT": 6,
           "RL02_NA1": 9,
           "RL02_NA2": 6,
           "RL02_ADV_WA": false,
           "RL02_WA_TOT": 9,
           "RL02_ADV_EA": false,
           "RL02_EA_TOT": 9,
           "RL02_ADV_SA": false,
           "RL02_SA_TOT": 9,
           "RL02_SA1": 9,
           "RL02_SA2": 9,
           "RL02_SA3": 9,
           "RL02_GRP_ECOL": 6,
           "RL02_CRITERES_IUCN": "A4dB1B2cB2eC2a"
       }
   },
   "CH Rote Liste 1991": {
       "Typ": "Datensammlung",
       "Felder": {
           "RlSmaragd": false,
           "RlEu": 6,
           "RlCh": 2,
           "RlWJu": 2,
           "RlNJu": 2,
           "RlNo": 2,
           "RlWestML": 10,
           "RlOstML": 2,
           "RlWestN": 10,
           "RlOstN": 10,
           "RlWestZ": 10,
           "RlOstZ": 2,
           "RlSued": 10,
           "RlLR": 3
       }
   },
   "Blaue Liste": {
       "Typ": "Datensammlung",
       "Felder": {
           "BlBl": 3,
           "BlNUT": 2,
           "BlAnwhNUTErh": 3,
           "BlAnwhNUTFoerd": 1,
           "BlFoerdErfChance": 1,
           "BlFoerdErfChanceW": 2,
           "BlFoerdAufwand": 3,
           "BlFoerdNUT": "Magere Wiesen in trockenen, warmen Lagen regenerieren; lichte Wälder und Waldränder fördern.",
           "BlLrTyp": "Trocken- und Halbtrocken-rasen; Trockene, wärmeliebende Waldränder; Wärmeliebende Wälder"
       }
   },
   "CH Prioritäten": {
       "Typ": "Datensammlung",
       "Felder": {
           "PbPGefaehrdung": 3,
           "PbPVerantwortung": 0,
           "PbPKombiniert": "3_0",
           "PbPrioritaetBafu": "4",
           "PbDiffAtlas": false,
           "PbAG": 1,
           "PbBL": 3,
           "PbGR": 3,
           "PbLU": 4,
           "PbNE": 2,
           "PbSG": 4,
           "PbSH": 1,
           "PbSO": 3,
           "PbTG": 1,
           "PbVD": 1,
           "PbZH": 1
       }
   },
   "CH Umweltziele LW": {
       "Typ": "Datensammlung",
       "Felder": {
           "UzlZielart": true,
           "UzlLeitart": false,
           "UzlEtappierungZielart": "2",
           "UzlQualitaetsstufe": "3",
           "UzlQualitaetRegion1": 3
       }
   },
   "CH TWW": {
       "Typ": "Datensammlung",
       "Felder": {
           "TwwBd_BLUEHBEGINN": "April",
           "TwwBd_NUTZUNG": "Wiese oder Weide",
           "TwwBd_POPKONTR": "alle 10 Jahre"
       }
   },
   "ZH Artwert": {
       "Typ": "Datensammlung",
       "Felder": {
           "AwArtwert": 11,
           "AwNeophyt": false,
           "AwArealWw": 2,
           "AwAntCh": 2,
           "AwGefZh2": "E"
       }
   },
   "ZH AP Flora": {
       "Typ": "Datensammlung",
       "Felder": {
           "ApStatus": 3,
           "ApJahr": 2001,
           "ApUmsetzung": 1,
           "ApUrl": "http://www.aln.zh.ch/internet/baudirektion/aln/de/naturschutz/artenfoerderung/ap_fl/kuechenschelle.html"
       }
   },
   "ZH AP FM": {
       "Typ": "Datensammlung",
       "Felder": {
           "ApFmAwProvNeuber": false,
           "ApFmRel": false,
           "ApFmUnerw": false,
           "ApFmBindungStru": false,
           "ApFmFoerdReg": false,
           "ApFmBem": "Art nicht beurteilt: Trockenheitszeiger, F=1"
       }
   },
   "ZH AP LiWa": {
       "Typ": "Datensammlung",
       "Felder": {
           "Gruppe_": "Flora",
           "IdFloraArtenliste": 233,
           "IdKategorie": 1,
           "LiWaArtwert": 13
       }
   },
   "ZH AP TWW": {
       "Typ": "Datensammlung",
       "Felder": {
           "ApTwwRel": true,
           "ApTwwUnerw": 0,
           "ApTwwChZielart": true,
           "ApTwwBb": 9,
           "ApTwwAw": 20
       }
   },
   "ZH Artengruppen": {
       "Typ": "Datensammlung",
       "Felder": {
           "GISLayer": "Flora",
           "ArtengruppeIdEVAB": 18
       }
   },
   "ZH KEF": {
       "Typ": "Datensammlung",
       "Felder": {
           "KefArt": true,
           "KefKontrolljahr": 2003
       }
   },
   "ZH Verbreitung 1995": {
       "Typ": "Datensammlung",
       "Felder": {
           "BISNr": 1132,
           "DringAP": 1,
           "SchutzZH": true,
           "Vorkommen": 4,
           "HaeufZH1967": 3,
           "HaeufZH1890": 4,
           "HaeufZH2010": 2,
           "BestAendZH": 2,
           "Gefaehrdung": 2
       }
   }
}
```

Das könnte jeder Laie direkt lesen. Versuchen Sie einmal, diese Informationen aus einer relationalen Datenbank abzufragen und so übersichtlich darzustellen! Es wäre nur schon aufwändig, die diversen Felder nicht anzuzeigen, in denen für diese Art keine Informationen enthalten sind.

Für eine gute Lesbarkeit fehlt in diesem Beispiel noch die Decodierung der Daten. Die Feldnamen müssen ausformuliert und die Abkürzungen durch lesbare Bezeichnungen ersetzt werden.

<a href="#top">&#8593; top</a>

<a name="Roadmap"></a>
#Roadmap
- Die Anwendung enthält alle geplanten Funktionen
- Jetzt wird sie durch die AnwenderInnen getestet
- Bewährt sie sich, wird sie die bisherige Access-Anwendung ersetzen

<a href="#top">&#8593; top</a>

<a name="OpenSource"></a>
#Open source
Die für die Anwendung verwendete [Lizenz](https://github.com/barbalex/artendb/blob/master/License.md) ist sehr freizügig. Eine Weiterverbreitung der in der Anwendung enthaltenen Daten ist aber nur mit Einverständnis der Autoren zulässig.

<a href="#top">&#8593; top</a>