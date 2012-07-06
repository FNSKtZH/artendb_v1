<a name="top"></a>
Die Arten- und Lebensraumdatenbank gibt es schon. Man kann sie kostenlos [herunterladen](http://www.aln.zh.ch/internet/baudirektion/aln/de/naturschutz/naturschutzdaten/tools/arten_db.html#a-content). Das hier ist der Versuch, sie weiter zu entwickeln.

## Inhalt ##
* <a href="#Ausgangspunkt">Ausgangspunkt</a>
* <a href="#Ziele">Ziele</a>
* <a href="#Datensammlungen">Datensammlungen</a>
* <a href="#GruppenVereinen">Gruppen vereinen</a>
* <a href="#CodierungVereinfachen">Codierung vereinfachen</a>
* <a href="#NeueDatensammlungenEinfachHinzufügen">Neue Datensammlungen einfach hinzufügen</a>
* <a href="#DokumentorientierteDatenbankVerwenden">Dokumentorientierte Datenbank verwenden</a>
* <a href="#Roadmap">Roadmap</a>
* <a href="#OpenSource">Open source</a>

<a name="Ausgangspunkt"></a>
#Ausgangspunkt
sind ein paar Feststellungen:

- Art- und Lebensraumeigenschaften müssten nicht nur die Fachstelle Naturschutz des Kantons Zürich interessieren. Ideal wäre eine von allen in diesem Bereich tätigen Stellen gemeinsam nachgeführte Datenbank
- Wenn man Daten aus anderen Quellen bezieht, ist es schwierig, sie aktuell zu halten. Manchmal müssen schon beim erstmaligen Import Entscheidungen getroffen werden, die eigentlich nur der Datenherr fällen sollte
- Die aktuelle DB kann zwar im Internet frei heruntergeladen werden. Sie setzt aber Microsoft Access voraus. Die Anzahl Geräte, welche sie nutzen können, ist daher stark eingeschränkt
- Microsoft Access hat als relationale, dateigebundene Datenbank und als die Anwendung, die sie ist, technische Rahmenbedingungen, die einer Weiterentwicklung im obigen Sinn im Wege stehen. Ab einer gewissen Komplexität ist die Entwicklung und v.a. der Unterhalt einer Anwendung in freieren Umgebungen (z.B. Javascript und HTML) einfacher, übersichtlicher und weniger komplex als in Access
- Bei einer Datenbank, die von verschiedensten Stellen nachgeführt wird, sollte die Benutzeroberfläche dynamisch aus den internen Datenstrukturen aufgebaut werden (siehe unten)
- Mit der heutigen Datenbank können Daten auch nachgeführt werden. Das ist aber nur bei eigenen Daten sinnvoll. Und dafür eignen sich andere Tools besser.

<a href="#top">&#8593; top</a>

<a name="Ziele"></a>
#Ziele
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
- Der Code ist gut dokumentiert
- Datensammlungen können von technisch durchschnittlich begabten Personen mit Hilfe einer Anleitung in wenigen Stunden per Import ergänzt oder aktualisiert werden

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

<a name="GruppenVereinen"></a>
#Gruppen vereinen
Heute werden die verschiedenen Gruppen (Flora, Fauna, Moose, Pilze, Flechten, Lebensräume) in unterschiedlichen Tabellen der relationalen Datenbank verwaltet. Das erhöht die Komplexität der Anwendung und erschwert jede Auswertung enorm. Beispielweise müssen alle Beziehungen zu anderen Arten oder Lebensräumen für jede Gruppe separat verwaltet werden... Zumindest in Access kann das aber nicht mehr geändert werden, weil z.B. in der Floratabelle die maximale Anzahl möglicher Indizes (32) erreicht ist und jede Beziehung einen Index voraussetzt. Die (schlechte) Variante, alle Informationen in einer einzigen Riesentabelle zu vereinigen, scheitert wiederum an der maximalen Anzahl Felder (255).

<a href="#top">&#8593; top</a>

<a name="CodierungVereinfachen"></a>
#Codierung vereinfachen
Viele Werte sind heute codiert. Die entsprechenden Felder enthalten für Menschen unverständliche Codes. Sie werden in einer Codierungstabelle aufgelöst. Damit die Daten benutzergerecht dargestellt werden können, müssen sie für Darstellung und Export decodiert werden. Dieses System ist sehr kompliziert und bringt Access in Formularen und Abfragen an seine Leistungsgrenze. Deshalb werden die Daten momentan codiert exportiert. Auch leistungsfähigere Systeme dürften gebremst werden. Deshalb sind codierte Informationen zu vermeiden. Sie machen höchstens dort Sinn, wo Daten erfasst werden.

Leider stösst man bei der Decodierung umfangreicher Datensammlungen an eine weitere Leistungsgrenze von Microsoft Access: Ein einzelner Datensatz darf offenbar nicht grösser als 2K sein! Somit müssen Datensammlungen auf verschiedene Tabellen aufgeteilt werden. Dies erhöht die Komplexität, verringert die Übersicht. Und vor allem: Damit werden wieder mehr Indizes benötigt, was nicht möglich ist, da deren Obergrenze auch schon erreicht ist! So können z.B. nicht alle Daten der CH-Prioritäten importiert werden...

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
- Informationen über die Felder vorbereiten (fakultativ, siehe unten)
- Informationen über die Datensammlung vorbereiten
- Alles importieren
fertig!

Nur Lebensraumkartierungen müssen in der Anwendung selbst erfasst werden können. Alle Arteigenschaften werden von den Autoren in eigener Software entwickelt und in die ArtenDb importiert. Für diese Daten kann auf eine Feldverwaltung verzichtet werden. Sie kann fakultativ benutzt werden, um von besonderen Features zu profitieren, wie zum Beispiel:
- Felder mit einem gemeinsamen Titel gruppiert anzeigen
- Felder aus verschiedenen Datensammlungen zusammenfassen (siehe <a href="#FelderZusammenfassen">oben</a>)
- Bemerkungen bzw. Interpretationshilfen zum Feld anbieten

Neue Datensammlungen sind in der aktuellen Access-Datenbank viel umständlicher hinzuzufügen. Das kann ich kaum jemand anderem zumuten. Und das ist ein hohes Risiko für den Unterhalt.

<a href="#top">&#8593; top</a>

<a name="DokumentorientierteDatenbankVerwenden"></a>
#Dokumentorientierte Datenbank verwenden
- Die Datenstruktur der Arteigenschaften (1:1, die meisten Felder bleiben leer) ist für eine traditionelle, tabellenbasierte Datenbank wenig geeignet, für eine dokumentenorientierte hingegen ideal
- Eine dokumentbasierte Datenbank eignet sich hervorragend, um ohne Einbezug des Systemadministrators neue Felder zu ergänzen...
- ...und um alle Arten gleich zu verwalten und Gruppen (Flora, Fauna, Moose, Pilze, Flechten, sogar die Lebensräume) nur aufgrund eines Attributs zu unterscheiden. Beziehungen zwischen Arten und Arten oder Arten und Lebensräumen gestalten sich entsprechend einfach

Moderne dokumentorientierte Datenbanken speichern ihre Daten meist im JSON-Format. Hier ein Beispiel, wie eine Art im JSON Format mit vielen Informationen aus Datensammlungen dargestellt werden kann:
```javascript
{
   "_id": "8B825C10-C098-48B1-BAB7-5C6287002635",
   "_rev": "13-6618d5fd491d49b6faffda8f7a6ffe8f",
   "Gruppe": "Fauna",
   "Index": {
       "Typ": "Datensammlung",
       "Beschreibung": "Index der Info Fauna. Daten zu 21542 Arten",
       "Datenstand": "2009",
       "Link": "http://www.cscf.ch/",
       "Felder": {
           "Nuesp": 70158,
           "Klasse": "Reptilia",
           "Ordnung": "Squamata",
           "Familie": "Colubridae",
           "Gattung": "Coronella",
           "Art": "austriaca",
           "Autor": "Laurenti, 1768",
           "Name_Deutsch": "Schlingnatter",
           "Name_Französisch": "Coronelle lisse",
           "Name_Italienisch": "Colubro liscio",
           "Name_Romanisch": "Natra glischa",
           "Name_Englisch": "Smooth snake",
           "Name_vollständig": "Coronella austriaca Laurenti, 1768",
           "Schutz_CH": "Schutz gemäss NHG"
       }
   },
   "CH_Rote_Listen": {
       "Typ": "Datensammlung",
       "Beschreibung": "Aktuellster Stand pro Artengruppe der Roten Listen. Daten zu 2284 Arten",
       "Datenstand": "unterschiedlich",
       "Felder": {
           "Europa_Smaragd": false,
           "Europa": "gefährdet",
           "Deutschland": "keine Angabe",
           "Schweiz_aktuell": "verletzlich (VU)",
           "Schweiz_Kriterien": "B2a, B2b(iii, iv)",
           "Nordschweiz": "stark gefährdet",
           "Jura": "keine Angabe",
           "Nordostschweiz": "keine Angabe",
           "Östliches_Mittelland": "keine Angabe",
           "Kt_Zürich": "vom Aussterben bedroht",
           "Bemerkungen": "Im Mittelland vom Aussterben bedroht",
           "Quelle": "BAFU 2005 (CH), älter (Regionen)",
           "Prioritätsart_Vögel": false
       }
   },
   "Blaue_Liste": {
       "Typ": "Datensammlung",
       "Beschreibung": "Gigon A. et al. (1998): Blaue Listen der erfolgreich erhaltenen oder geförderten Tier- und Pflanzenarten der Roten Listen. Methodik und Anwendung in der nördlichen Schweiz. Veröff. Geobot. Inst. ETH, Stiftung Rübel, Zürich 129: 1-137 + 180 pp. Appendicesn. Daten zu 207 Arten",
       "Datenstand": "1998",
       "Link": "http://www.bluelist.ethz.ch/",
       "Felder": {
           "Lebensraum": "Geröllhalden, Schuttfluren, Waldränder, Steinbrüche, Böschungen",
           "Bestandesentwicklung": "Bestandesabnahme gesamthaft im Untersuchungsgebiet ohne oder trotz Schutzmassnahmen",
           "Schutzmassnahmen": "Teilweises Entbuschen/Auflichten verwachsener oder verwaldeter Lebensräume, Versteck- und Überwinterungsplätze erhalten.",
           "Wirksamkeit_der_Schutzmassnahmen": "Einsatz oder Wirkung von Schutzmassnahmen nicht beurteilt oder unklar",
           "Anwendungshäufigkeit_der_Schutzmassnahmen_zur_Erhaltung": "Einzelfälle",
           "Anwendungshäufigkeit_der_Schutzmassnahmen_zur_Förderung": "noch nie",
           "Erfolgsaussichten": "befriedigend",
           "Aufwand": "mittel"
       }
   },
   "CH_Prioritäten": {
       "Typ": "Datensammlung",
       "Beschreibung": "BAFU. Daten zu 607 Arten",
       "Datenstand": "2012.01",
       "Link": "http://www.bafu.admin.ch/publikationen/publikation/01607/index.html?lang=de",
       "Felder": {
           "Prioritätsindex": "4a",
           "Lebensraum_Delarze_Nummer": "6.-3",
           "Lebensraum_Delarze": "wärmliebende Laubwälder",
           "Letzter_Nachweis_Kt_AG": "2000-2006",
           "Letzter_Nachweis_Kt_AI": "2000-2006",
           "Letzter_Nachweis_Kt_BE": "2000-2006",
           "Letzter_Nachweis_Kt_BL": "1980-1999",
           "Letzter_Nachweis_Kt_BS": "1980-1999",
           "Letzter_Nachweis_Kt_FR": "2000-2006",
           "Letzter_Nachweis_Kt_GE": "1980-1999",
           "Letzter_Nachweis_Kt_GL": "2000-2006",
           "Letzter_Nachweis_Kt_GR": "2000-2006",
           "Letzter_Nachweis_Kt_JU": "2000-2006",
           "Letzter_Nachweis_Kt_LU": "2000-2006",
           "Letzter_Nachweis_Kt_NE": "2000-2006",
           "Letzter_Nachweis_Kt_NW": "2000-2006",
           "Letzter_Nachweis_Kt_OW": "2000-2006",
           "Letzter_Nachweis_Kt_SG": "2000-2006",
           "Letzter_Nachweis_Kt_SH": "2000-2006",
           "Letzter_Nachweis_Kt_SO": "2000-2006",
           "Letzter_Nachweis_Kt_SZ": "2000-2006",
           "Letzter_Nachweis_Kt_TG": "1980-1999",
           "Letzter_Nachweis_Kt_TI": "2000-2006",
           "Letzter_Nachweis_Kt_UR": "2000-2006",
           "Letzter_Nachweis_Kt_VD": "2000-2006",
           "Letzter_Nachweis_Kt_VS": "2000-2006",
           "Letzter_Nachweis_Kt_ZG": "< 1950",
           "Letzter_Nachweis_Kt_ZH": "2000-2006"
       }
   },
   "CH_Umweltziele_LW": {
       "Typ": "Datensammlung",
       "Beschreibung": "BAFU und BLW (2008): Umweltziele Landwirtschaft. Hergeleitet aus bestehenden rechtlichen Grundlagen. Daten zu 374 Arten\r\nUmwelt-Wissen Nr. 0820. Bundesamt für Umwelt, Bern: 221 S.",
       "Datenstand": "2008",
       "Felder": {
           "Zielart": true,
           "Leitart": false,
           "Priorität_Umsetzung": "hoch prioritär",
           "Qualitätsstufe": "hohe Qualität, ist nur unter günstigen Rahmenbedingungen zu erreichen",
           "Jura": true,
           "Mittelland": true,
           "Nordalpen": true,
           "Westliche_Zentralalpen": true,
           "Östliche_Zentralalpen": true,
           "Südalpen": true
       }
   },
   "Agroscope_Zielart": {
       "Typ": "Datensammlung",
       "Beschreibung": "Agroscope (2008).  Daten zu 207 Arten",
       "Datenstand": "2008",
       "Link": "http://www.agroscope.admin.ch",
       "Felder": {
           "1_1_West-Jura": true,
           "1_2_Nord-Jura": true,
           "1_3_Nordostschweiz": true,
           "2_1_West-Mittelland": true,
           "2_2_Ost-Mittelland": true,
           "3_1_West-Nordalpen": true,
           "3_2_Ost-Nordalpen": true,
           "4_1_West-Zentralalpen": true,
           "4_2_Ost-Zentralalpen": true,
           "4_3_Engadin": true,
           "5_Südalpen": true,
           "Collin": true,
           "Montan": true,
           "Subalpin": true,
           "Alpin": false,
           "Rote_Liste_CH": "gefährdet",
           "Aufwand_für_Erfolg": "gross",
           "Beobachtbarkeit": " Die Art ist schwieriger nachzuweisen",
           "Verbreitung_Lebensraum_Massnahmen": "Im Mittelland ist sie nur noch inselartig verbreitet und regional bereits ausgestorben; bis knapp über 2000 m. Bevorzugt in sich schnell erwärmenden Lagen, v.a. in flachgründigen Lebensräumen, die mit Steinstrukturen unterschiedlichster Art durchzogen sind. Lebensraum: Felsfluren, Blockschutt- und Geröllhalden, steinige Böschungen aller Art, Magerweiden, Steppenrasen, aber auch Waldränder, Eisenbahnareale, Abbaugebiete, Rebberge. Massnahmen: V.a. Erhalt bestehender Populationen und Vergrösserung deren Lebensräume durch Schaffung von Kleinstrukturen (Steinhaufen, Trockensteinmauern, Holzhaufen, etc.), extensive Nutzung (Krautschicht nur einmal jährlich mähen, spät mähen, Teile stehen lassen, Schnitthöhe > 10 cm), Waldränder mit stufigem Gebüschmantel und breitem Krautsaum; Aufwertungsmassnahmen für Eidechsen und Blindschleichen (Hauptnahrung); Bahndämme reptiliengerecht pflegen, da sie wichtige Ausbreitungs- und Verbindungskorridore sein können. Flächenanspruch einer Population (Grössenordnung): geeignete und vernetzte Teilflächen von mind. 1-5 a, insgesamt 50 ha geeignetes Habitat."
       }
   },
   "ZH_Artwert": {
       "Typ": "Datensammlung",
       "Beschreibung": "Artwerte für den Kanton Zürich. Daten zu 1530 Arten",
       "Datenstand": "ca. 1995",
       "Link": "http://www.naturschutz.zh.ch",
       "Felder": {
           "Artwert": 8,
           "Mangelnde_Datengrundlagen": false,
           "Artwertberechnung_Areal_weltweit": "gross (0 Punkte)",
           "Artwertberechnung_Anteil_am_CH-Bestand": "klein: <1/4 (0 Punkte)"
       }
   },
   "ZH_AP": {
       "Typ": "Datensammlung",
       "Beschreibung": "Aktionsplan Fauna des Kantons Zürich. Daten zu 36 Arten",
       "Datenstand": "2007",
       "Link": "http://www.naturschutz.zh.ch",
       "Felder": {
           "Status": "erstellt",
           "Beginn_im_Jahr": 2004,
           "Stand_Umsetzung": "noch keine Umsetzung",
           "Link_zum_AP-Bericht": "http://www.aln.zh.ch/internet/baudirektion/aln/de/naturschutz/artenfoerderung/ap_fa/schlingnatter.html"
       }
   },
   "ZH_AP_Einstufung": {
       "Typ": "Datensammlung",
       "Beschreibung": "Einstufung von Arten im Kanton Zürich. Daten zu 682 Arten",
       "Datenstand": "ca. 1995",
       "Link": "http://www.naturschutz.zh.ch",
       "Felder": {
           "Dringlichkeit_AP": "gross",
           "Priorität_nach_NSGK90": "gross",
           "Bestandesentwicklung_1985_bis_2000": "Abnahme",
           "Keine_Bestandesabnahme_aber_Population_bedroht": "nicht beurteilt",
           "Fördermassnahmen_bekannt": "ja",
           "Geeignete_Lebensräume_vohanden_herstellbar": "ja",
           "Überlebensfähige_Populationen_vorhanden": "ja",
           "Etablierungs-Potential_gut": "ja",
           "Ausbreitungs-Potential_gut": "ja",
           "Erfolgsaussichten_vorhanden": "ja",
           "Nationales_Artenschutzprogramm": "nein",
           "Höchste_Dringlichkeit": "ja",
           "Verhältnis_Aufwand_Ertrag_günstig": "unbekannt",
           "Umbrella_flagship_species": "ja",
           "Bereits_irgendwo_Artenschutzprogramme": "ja",
           "Dringlichkeit": "gross",
           "Auswahl_vorgeschlagen": true,
           "Bemerkungen": "Höchste Dringlichkeit? Ergänzungen zum bestehenden Konzept (übrige Standorte) ect.; ZH hat grosse Verantwortung: mehr Standorte als Nachbarkantone\r\nErfolgsaussichten (Bemerkung zu Punkt 4): grosse Pop. an Bahnlinien\r\nFörderungsmassnahmen: Massnahmen in einfacher Form vorgeschlagen: konkret Standort ermittelt, für ca. 1/2 klar, was machen, Feinumsetzung fehlt noch; Restliche Pop.: keine Massnahmen-Empfehlungen formuliert.\r\nRealisierbarkeit: Grundeigentümer z.T. nicht einverstanden\r\nProjekt: Naturnetz Pfannenstiel  für Fr. 300000.-- (Geld v.a. von Stiftungen): Schlingnatter im Zentrum, da Schwerpunktvorkommen; früheres Konzept von P. Müller war Grundlage.\r\nJetzt generelle Überlegungen im Kt. ZH machen. (SBB ev. kooperativer, wenn Programm da ist.)",
           "Schutz": "Schutz gemäss Bundesgesetz über die Jagd"
       }
   },
   "ZH_AP_LiWa": {
       "Typ": "Datensammlung",
       "Beschreibung": "Aktionsplan Lichter Wald des Kantons Zürich. Daten zu 51 Arten",
       "Datenstand": "2009",
       "Link": "http://www.naturschutz.zh.ch",
       "Felder": {
           "LiWa_Zielart": true,
           "LiWa_Artwert": 11
       }
   },
   "ZH_AP_TWW": {
       "Typ": "Datensammlung",
       "Beschreibung": "Aktionsplan Trockene Wiesen und Weiden des Kantons Zürich. Daten zu 1113 Arten",
       "Datenstand": "2011",
       "Link": "http://www.naturschutz.zh.ch",
       "Felder": {
           "Art_ist_relevant": true,
           "Art_ist_Zielart": true,
           "Bindung_an_TWW": 8,
           "Artwert_AP_TWW": 16,
           "Quelle": "2006: Diverse im Auftrag der FNS"
       }
   },
   "ZH_Artengruppen": {
       "Typ": "Datensammlung",
       "Beschreibung": "Artengruppen Kt. Zürich. Daten zu allen Arten",
       "Datenstand": "2012",
       "Link": "http://www.naturschutz.zh.ch",
       "Felder": {
           "GIS_Layer": "Reptilien",
           "Artengruppen_ID_EvAB": 12
       }
   },
   "ZH_GIS": {
       "Typ": "Datensammlung",
       "Beschreibung": "GIS-Layer und Projektrelevanzen im Kanton Zürich. Daten zu allen Arten",
       "Datenstand": "2012",
       "Link": "http://www.naturschutz.zh.ch",
       "Felder": {
           "Betrachtungsdistanz_in_Meter": 3000,
           "Berücksichtigen_wenn_in_BetrDist_nicht_ausgewiesen": false,
           "Kriterien_für_Bestimmung_der_Betrachtungsdistanz": "9"
       }
   }
}
```

Das kann jeder Laie direkt lesen, obwohl es die Rohdaten sind. Versuchen Sie einmal, diese Informationen aus einer relationalen Datenbank abzufragen und so übersichtlich darzustellen! Es wäre nur schon eine Kunst, die diversen Felder nicht anzuzeigen, in denen für diese Art keine Informationen enthalten sind.

<a href="#top">&#8593; top</a>

<a name="Roadmap"></a>
#Roadmap
Das ist ein Freizeitprojekt. Keine Ahnung, wie ich vorwärts komme.

<a href="#top">&#8593; top</a>

<a name="OpenSource"></a>
#Open source
Die für die Anwendung verwendete [Lizenz](https://github.com/barbalex/artendb/blob/master/License.md) ist sehr freizügig. Eine Weiterverbreitung der in der Anwendung enthaltenen Daten ist aber nur mit Einverständnis der Autoren zulässig.

<a href="#top">&#8593; top</a>