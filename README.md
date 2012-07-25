<a name="top"></a>
Die Arten- und Lebensraumdatenbank gibt es schon. Man kann sie kostenlos [herunterladen](http://www.aln.zh.ch/internet/baudirektion/aln/de/naturschutz/naturschutzdaten/tools/arten_db.html#a-content). Das hier ist der Versuch, sie weiter zu entwickeln.

## Inhalt ##
* <a href="#Ausgangspunkt">Ausgangspunkt</a>
* <a href="#Ziele">Ziele</a>
* <a href="#Datensammlungen">Datensammlungen</a>
* <a href="#GruppenVereinen">Gruppen vereinen</a>
* <a href="#DatenDecodieren">Daten decodieren</a>
* <a href="#NeueDatensammlungenEinfachHinzufügen">Neue Datensammlungen einfach hinzufügen</a>
* <a href="#DokumentorientierteDatenbankVerwenden">Dokumentorientierte Datenbank verwenden</a>
* <a href="#Benutzeroberfläche">Benutzeroberfläche</a>
* <a href="#Zeitplan">Zeitplan</a>
* <a href="#AktuellerStand">Was kann man mit der aktuellen Version machen?</a>
* <a href="#OpenSource">Open source</a>

<a name="Ausgangspunkt"></a>
#Ausgangspunkt
sind ein paar Feststellungen:

- Art- und Lebensraumeigenschaften müssten nicht nur die Fachstelle Naturschutz des Kantons Zürich interessieren. Ideal wäre eine von allen in diesem Bereich tätigen Stellen gemeinsam nachgeführte Datenbank
- Wenn man Daten aus anderen Quellen bezieht, ist es schwierig, sie aktuell zu halten. Manchmal müssen schon beim erstmaligen Import Entscheidungen getroffen werden, die eigentlich nur der Datenherr fällen sollte
- Die aktuelle Datenbank kann zwar im Internet frei heruntergeladen werden. Sie setzt aber Microsoft Access voraus. Die Anzahl Geräte, welche sie nutzen können, ist daher stark eingeschränkt
- Microsoft Access hat technische Grenzen, die einer Weiterentwicklung im obigen Sinn im Wege stehen. Ab einer gewissen Komplexität ist die Entwicklung und vor allem der Unterhalt einer Anwendung in freieren Umgebungen (z.B. Javascript und HTML) einfacher, übersichtlicher und weniger komplex
- Bei einer Datenbank, die von verschiedensten Stellen nachgeführt wird, sollte die Benutzeroberfläche dynamisch aus den internen Datenstrukturen aufgebaut werden. Wer seine Daten aktualisiert, sollte nicht auch noch die Benutzeroberfläche gestalten müssen...
- Mit der heutigen Datenbank können Daten auch nachgeführt werden. Das ist aber nur bei eigenen Daten sinnvoll. Und dafür eignen sich andere Tools besser. Die Nachführung von Daten ist daher nur bei Lebensraumkartierungen von grosser Bedeutung

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
- Exporte und Auswertungen können ohne zusätzlichen Aufwand über alle Arten- und Lebensraumgruppen hinweg erfolgen


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
 - Allgemeine Beschreibung (ungefähr ein Literaturzitat)
 - Originalbericht
 - Datenstand
 - Link
- Alle Felder sind im JSON-Format hierarchisch unter ihrer Datensammlung gespeichert (<a href="#JsonBeispiel">Beispiel zeigen</a>)

In fast allen Fällen ist es sinnvoll, die Informationen pro solcher Datensammlung darzustellen bzw. zusammenzufassen. Z.B. bei der Anzeige in der Anwendung oder wenn für Exporte Felder ausgewählt werden.

<a name="FelderZusammenfassen"></a>
Für bestimmte Zwecke ist zusätzlich das Gegenteil interessant: Felder aus verschiedenen Datensammlungen zusammenfassen. Z.B. wenn man über alle Artengruppen den aktuellsten Rote-Liste-Status darstellen will (der in diversen Datensammlungen steckt, da er für viele Artengruppen separat publiziert wird). Um das zu ermöglichen folgende Idee:

- In der Feldverwaltung erhalten Felder mit zusammenzufassender Information zusätzlich zum normalen Feldnamen einen zusammenfassenden Feldnamen
- Ein View fasst alle Felder aller Artgruppen mit demselben zusammenfassenden Feldnamen zusammen
- Für den Export von Daten können - neben allen anderen Datensammlungen - auch Felder aus diesem View gewählt werden
- Wird für eine Artengruppe z.B. eine neue Version der Roten Liste erstellt, kann die alte in der Datenbank belassen werden. Die neue wird importiert. In der Feldverwaltung werden die zusammenfassenden Felder angepasst

<a href="#top">&#8593; top</a>

<a name="GruppenVereinen"></a>
#Gruppen vereinen
Heute werden die verschiedenen Gruppen (Flora, Fauna, Moose, Pilze, Flechten, Lebensräume) in unterschiedlichen Tabellen der relationalen Datenbank verwaltet. Das erhöht die Komplexität der Anwendung und erschwert jede Auswertung enorm. Beispielweise müssen alle Beziehungen zu anderen Arten oder Lebensräumen für jede Gruppe separat verwaltet werden... Zumindest in Access kann das aber nicht mehr geändert werden, weil z.B. in der Floratabelle die maximale Anzahl möglicher Indizes (32) erreicht ist und jede Beziehung einen Index voraussetzt. Die (schlechte) Variante, alle Informationen in einer einzigen Riesentabelle zu vereinigen, scheitert wiederum an der maximalen Anzahl Felder (255) und an der maximalen Datenmenge pro Datensatz (2KB).

<a href="#top">&#8593; top</a>

<a name="DatenDecodieren"></a>
#Daten decodieren
Viele Werte sind heute codiert. Die entsprechenden Felder enthalten für Menschen unverständliche Codes. Sie werden in einer Codierungstabelle aufgelöst. Damit die Daten benutzergerecht dargestellt werden können, müssen sie für Darstellung und Export decodiert werden. Dieses System ist sehr kompliziert und bringt Access in Formularen und Abfragen an seine Leistungsgrenze. Deshalb werden die Daten momentan codiert exportiert. Auch leistungsfähigere Systeme dürften gebremst werden. Deshalb sind codierte Informationen zu vermeiden. Sie machen höchstens dort Sinn, wo Daten erfasst werden.

Leider stösst man bei der Decodierung umfangreicher Datensammlungen an eine weitere Leistungsgrenze von Microsoft Access: Ein einzelner Datensatz darf offenbar nicht grösser als 2KB sein! Somit müssen Datensammlungen auf verschiedene Tabellen aufgeteilt werden. Dies erhöht die Komplexität, verringert die Übersicht. Und vor allem: Damit werden wieder mehr Indizes benötigt, was nicht möglich ist, da deren Obergrenze auch schon erreicht ist! So können z.B. nicht alle Daten der CH-Prioritäten importiert werden...

Die Codierung wurde jetzt auch in der Access-DB weitgehend entfernt.

<a href="#top">&#8593; top</a>

<a name="NeueDatensammlungenEinfachHinzufügen"></a>
#Neue Datensammlungen einfach hinzufügen
Die Datenfelder in der Benutzeroberfläche werden dynamisch aus den für die Art gespeicherten Attributen aufgebaut.

Will jemand neue Arteigenschaften ergänzen, geht das dann so:

- Art- oder Lebensraumeigenschaften vorbereiten
- Informationen über die Datensammlung vorbereiten
- importieren

fertig!

Will man Daten in der Anwendung selbst erfassen, reicht es nicht, die Benutzerorberfläche aus den vorhandenen Datenstrukturen aufzubauen. Dazu würden die Feldeigenschaften verwaltet. Unter anderen:

- Datensammlung
- Feldname
- Feldtyp (Text, Auswahlliste, Mehrfachauswahl möglich etc.)
- Optionen für Auswahllisten

Nur Lebensraumkartierungen müssen in der Anwendung selbst erfasst werden können. Alle Arteigenschaften werden von den Autoren in eigener Software entwickelt und in die ArtenDb importiert. Für diese Daten kann auf eine Feldverwaltung verzichtet werden. Sie kann fakultativ benutzt werden, um von besonderen Features zu profitieren, wie zum Beispiel:

- Felder mit einem gemeinsamen Titel gruppiert anzeigen
- Felder aus verschiedenen Datensammlungen zusammenfassen (siehe <a href="#FelderZusammenfassen">oben</a>)
- Bemerkungen bzw. Interpretationshilfen zum Feld anbieten

Neue Datensammlungen sind in der aktuellen Access-Datenbank viel umständlicher hinzuzufügen. Das liegt u.a. an der komplizierten relationalen Datenstruktur, den vielfach erreichten Leistungsgrenzen von Access, der Tatsache, dass in Access die Steuerung nicht in ein paar gut kommentierten Codezeilen erfolgt sondern über Code, Benutzeroberfläche und Abfragen verteilt ist, und weil immer auch die Benutzeroberfläche angepasst werden muss. Das kann ich kaum jemand anderem zumuten. Und das ist ein hohes Risiko für den Unterhalt.

<a href="#top">&#8593; top</a>

<a name="DokumentorientierteDatenbankVerwenden"></a>
#Dokumentorientierte Datenbank verwenden
In der relationalen Datenbank sieht die ideale Datenstruktur von Arteigenschaften so aus: Alle Datensammlungen sind eigene Tabellen und werden 1:1 mit dem Index verbunden. Auch so bleiben viele Felder leer. Fasst man in einer Abfrage verschiedene Datensammlungen zusammen, enthalten die wenigsten Felder Informationen. Diese Struktur ist für eine traditionelle, tabellenbasierte Datenbank wenig geeignet. Für eine dokumentenorientierte hingegen ist sie ideal.

Eine dokumentbasierte Datenbank eignet sich hervorragend, um ohne Einbezug des Systemadministrators jederzeit zuvor nicht geplante neue Felder zu ergänzen.

Sie ist auch ideal, um alle Arten gleich zu verwalten und Gruppen (Flora, Fauna, Moose, Pilze, Flechten, sogar die Lebensräume) nur aufgrund eines Attributs zu unterscheiden. Beziehungen zwischen Arten und Arten oder Arten und Lebensräumen gestalten sich entsprechend einfach.

Moderne dokumentorientierte Datenbanken speichern ihre Daten meist im JSON-Format. Hier ein Beispiel, wie eine Art im JSON Format mit vielen Informationen aus Datensammlungen dargestellt werden kann:
<a name="JsonBeispiel"></a>
```javascript
{
   "_id": "8B825C10-C098-48B1-BAB7-5C6287002635",
   "_rev": "13-d348c0b5ee1852015dceef081c829699",
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
           "Artname": "Coronella austriaca Laurenti, 1768",
           "Artname vollständig": "Coronella austriaca Laurenti, 1768 (Schlingnatter)",
           "Name Deutsch": "Schlingnatter",
           "Name Französisch": "Coronelle lisse",
           "Name Italienisch": "Colubro liscio",
           "Name Romanisch": "Natra glischa",
           "Name Englisch": "Smooth snake",
           "Schutz CH": "Schutz gemäss NHG"
       }
   },
   "CH Rote Listen": {
       "Typ": "Datensammlung",
       "Beschreibung": "Aktuellster Stand pro Artengruppe der Roten Listen. Daten zu 2284 Arten",
       "Datenstand": "unterschiedlich",
       "Felder": {
           "Europa Smaragd": false,
           "Europa": "gefährdet",
           "Deutschland": "keine Angabe",
           "Schweiz aktuell": "verletzlich (VU)",
           "Schweiz Kriterien": "B2a, B2b(iii, iv)",
           "Nordschweiz": "stark gefährdet",
           "Jura": "keine Angabe",
           "Nordostschweiz": "keine Angabe",
           "Östliches Mittelland": "keine Angabe",
           "Kt Zürich": "vom Aussterben bedroht",
           "Bemerkungen": "Im Mittelland vom Aussterben bedroht",
           "Quelle": "BAFU 2005 (CH), älter (Regionen)"
       }
   },
   "Blaue Liste": {
       "Typ": "Datensammlung",
       "Beschreibung": "Gigon A. et al. (1998): Blaue Listen der erfolgreich erhaltenen oder geförderten Tier- und Pflanzenarten der Roten Listen. Methodik und Anwendung in der nördlichen Schweiz. Veröff. Geobot. Inst. ETH, Stiftung Rübel, Zürich 129: 1-137 + 180 pp. Appendicesn. Daten zu 207 Arten",
       "Datenstand": "1998",
       "Link": "http://www.bluelist.ethz.ch/",
       "Felder": {
           "Lebensraum": "Geröllhalden, Schuttfluren, Waldränder, Steinbrüche, Böschungen",
           "Bestandesentwicklung": "Bestandesabnahme gesamthaft im Untersuchungsgebiet ohne oder trotz Schutzmassnahmen",
           "Schutzmassnahmen": "Teilweises Entbuschen/Auflichten verwachsener oder verwaldeter Lebensräume, Versteck- und Überwinterungsplätze erhalten.",
           "Wirksamkeit": "Einsatz oder Wirkung von Schutzmassnahmen nicht beurteilt oder unklar",
           "Anwendungshäufigkeit zur Erhaltung": "Einzelfälle",
           "Anwendungshäufigkeit zur Förderung": "noch nie",
           "Erfolgsaussichten": "befriedigend",
           "Aufwand": "mittel"
       }
   },
   "CH Prioritäten": {
       "Typ": "Datensammlung",
       "Beschreibung": "BAFU. Daten zu 607 Arten",
       "Datenstand": "2012.01",
       "Link": "http://www.bafu.admin.ch/publikationen/publikation/01607/index.html?lang=de",
       "Felder": {
           "Priorität": "mässig",
           "Gefährdung": "gefährdet bzw. verletzlich",
           "Verantwortung": "geringe Verantwortung",
           "Massnahmenbedarf": "klar",
           "Bestände überwachen": "eventuell nötig",
           "Kenntnisse vorhanden": "ausreichend",
           "Techniken bekannt": "erfolgreiche Techniken sind bekannt",
           "Verbreitung Jura": "letzter Fund aus den Jahren 2000 bis 2010",
           "Verbreitung Mittelland": "letzter Fund aus den Jahren 2000 bis 2010",
           "Verbreitung Nordalpen": "letzter Fund aus den Jahren 2000 bis 2010",
           "Verbreitung westliche Zentralalpen": "letzter Fund aus den Jahren 2000 bis 2010",
           "Verbreitung östliche Zentralalpen": "letzter Fund aus den Jahren 2000 bis 2010",
           "Verbreitung Südalpen": "letzter Fund aus den Jahren 2000 bis 2010",
           "Verbreitung kollin": "letzter Fund aus den Jahren 2000 bis 2010",
           "Verbreitung montan": "letzter Fund aus den Jahren 2000 bis 2010",
           "Verbreitung subalpin": "letzter Fund aus den Jahren 2000 bis 2010",
           "Verbreitung alpin": "letzter Fund aus den Jahren 2000 bis 2010",
           "Verbreitung Kt Zürich": "letzter Fund aus den Jahren 2000 bis 2010"
       }
   },
   "CH Umweltziele LW": {
       "Typ": "Datensammlung",
       "Beschreibung": "BAFU und BLW (2008): Umweltziele Landwirtschaft. Hergeleitet aus bestehenden rechtlichen Grundlagen. Daten zu 374 Arten\r\nUmwelt-Wissen Nr. 0820. Bundesamt für Umwelt, Bern: 221 S.",
       "Datenstand": "2008",
       "Felder": {
           "Zielart": true,
           "Leitart": false,
           "Priorität Umsetzung": "hoch prioritär",
           "Qualitätsstufe": "hohe Qualität, ist nur unter günstigen Rahmenbedingungen zu erreichen",
           "Jura": true,
           "Mittelland": true,
           "Nordalpen": true,
           "Westliche Zentralalpen": true,
           "Östliche Zentralalpen": true,
           "Südalpen": true
       }
   },
   "Agroscope Zielart": {
       "Typ": "Datensammlung",
       "Beschreibung": "Agroscope (2008). Daten zu 207 Arten",
       "Datenstand": "2008",
       "Link": "http://www.agroscope.admin.ch",
       "Felder": {
           "1_1 West-Jura": true,
           "1_2 Nord-Jura": true,
           "1_3 Nordostschweiz": true,
           "2_1 West-Mittelland": true,
           "2_2 Ost-Mittelland": true,
           "3_1 West-Nordalpen": true,
           "3_2 Ost-Nordalpen": true,
           "4_1 West-Zentralalpen": true,
           "4_2 Ost-Zentralalpen": true,
           "4_3 Engadin": true,
           "5 Südalpen": true,
           "Collin": true,
           "Montan": true,
           "Subalpin": true,
           "Alpin": false,
           "Rote Liste CH": "gefährdet",
           "Aufwand für Erfolg": "gross",
           "Beobachtbarkeit": "Die Art ist schwieriger nachzuweisen",
           "Verbreitung Lebensraum Massnahmen": "Im Mittelland ist sie nur noch inselartig verbreitet und regional bereits ausgestorben; bis knapp über 2000 m. Bevorzugt in sich schnell erwärmenden Lagen, v.a. in flachgründigen Lebensräumen, die mit Steinstrukturen unterschiedlichster Art durchzogen sind. Lebensraum: Felsfluren, Blockschutt- und Geröllhalden, steinige Böschungen aller Art, Magerweiden, Steppenrasen, aber auch Waldränder, Eisenbahnareale, Abbaugebiete, Rebberge. Massnahmen: V.a. Erhalt bestehender Populationen und Vergrösserung deren Lebensräume durch Schaffung von Kleinstrukturen (Steinhaufen, Trockensteinmauern, Holzhaufen, etc.), extensive Nutzung (Krautschicht nur einmal jährlich mähen, spät mähen, Teile stehen lassen, Schnitthöhe > 10 cm), Waldränder mit stufigem Gebüschmantel und breitem Krautsaum; Aufwertungsmassnahmen für Eidechsen und Blindschleichen (Hauptnahrung); Bahndämme reptiliengerecht pflegen, da sie wichtige Ausbreitungs- und Verbindungskorridore sein können. Flächenanspruch einer Population (Grössenordnung): geeignete und vernetzte Teilflächen von mind. 1-5 a, insgesamt 50 ha geeignetes Habitat."
       }
   },
   "ZH Artwert": {
       "Typ": "Datensammlung",
       "Beschreibung": "Artwerte für den Kanton Zürich. Daten zu 1530 Arten",
       "Datenstand": "ca. 1995",
       "Link": "http://www.naturschutz.zh.ch",
       "Felder": {
           "Artwert": 8,
           "Mangelnde Datengrundlagen": false,
           "Artwertberechnung Areal weltweit": "gross (0 Punkte)",
           "Artwertberechnung Anteil am CH-Bestand": "klein: <1/4 (0 Punkte)"
       }
   },
   "ZH AP": {
       "Typ": "Datensammlung",
       "Beschreibung": "Aktionsplan Fauna des Kantons Zürich. Daten zu 36 Arten",
       "Datenstand": "2007",
       "Link": "http://www.naturschutz.zh.ch",
       "Felder": {
           "Status": "erstellt",
           "Beginn im Jahr": 2004,
           "Stand Umsetzung": "noch keine Umsetzung",
           "Link zum AP-Bericht": "http://www.aln.zh.ch/internet/baudirektion/aln/de/naturschutz/artenfoerderung/ap_fa/schlingnatter.html"
       }
   },
   "ZH AP Einstufung": {
       "Typ": "Datensammlung",
       "Beschreibung": "Einstufung von Arten im Kanton Zürich. Daten zu 682 Arten",
       "Datenstand": "ca. 1995",
       "Link": "http://www.naturschutz.zh.ch",
       "Felder": {
           "Dringlichkeit Aktionsplan": "gross",
           "Priorität nach Naturschutz-Gesamtkonzept 1990": "gross",
           "Bestandesentwicklung 1985-2000": "Abnahme",
           "Keine Bestandesabnahme aber Population bedroht": "nicht beurteilt",
           "Fördermassnahmen bekannt": "ja",
           "Geeignete Lebensräume vohanden oder herstellbar": "ja",
           "Überlebensfähige Populationen vorhanden": "ja",
           "Etablierungs-Potential gut": "ja",
           "Ausbreitungs-Potential gut": "ja",
           "Erfolgsaussichten vorhanden": "ja",
           "Nationales Artenschutzprogramm": "nein",
           "Höchste Dringlichkeit": "ja",
           "Verhältnis Aufwand-Ertrag günstig": "unbekannt",
           "Umbrella- oder flagship-species": "ja",
           "Bereits irgendwo Artenschutzprogramme": "ja",
           "Dringlichkeit": "gross",
           "Auswahl vorgeschlagen": true,
           "Bemerkungen": "Höchste Dringlichkeit? Ergänzungen zum bestehenden Konzept (übrige Standorte) ect.; ZH hat grosse Verantwortung: mehr Standorte als Nachbarkantone\r\nErfolgsaussichten (Bemerkung zu Punkt 4): grosse Pop. an Bahnlinien\r\nFörderungsmassnahmen: Massnahmen in einfacher Form vorgeschlagen: konkret Standort ermittelt, für ca. 1/2 klar, was machen, Feinumsetzung fehlt noch; Restliche Pop.: keine Massnahmen-Empfehlungen formuliert.\r\nRealisierbarkeit: Grundeigentümer z.T. nicht einverstanden\r\nProjekt: Naturnetz Pfannenstiel  für Fr. 300000.-- (Geld v.a. von Stiftungen): Schlingnatter im Zentrum, da Schwerpunktvorkommen; früheres Konzept von P. Müller war Grundlage.\r\nJetzt generelle Überlegungen im Kt. ZH machen. (SBB ev. kooperativer, wenn Programm da ist.)",
           "Schutz": "Schutz gemäss Bundesgesetz über die Jagd"
       }
   },
   "ZH AP LiWa": {
       "Typ": "Datensammlung",
       "Beschreibung": "Aktionsplan Lichter Wald des Kantons Zürich. Daten zu 51 Arten",
       "Datenstand": "2009",
       "Link": "http://www.naturschutz.zh.ch",
       "Felder": {
           "Zielart": true,
           "AP LiWa Artwert": 11
       }
   },
   "ZH AP TWW": {
       "Typ": "Datensammlung",
       "Beschreibung": "Aktionsplan Trockene Wiesen und Weiden des Kantons Zürich. Daten zu 1113 Arten",
       "Datenstand": "2011",
       "Link": "http://www.naturschutz.zh.ch",
       "Felder": {
           "Art ist für AP TWW relevant": true,
           "Art ist Zielart": true,
           "Bindung an TWW": 8,
           "Artwert AP TWW": 16,
           "Quelle": "2006: Diverse im Auftrag der FNS"
       }
   },
   "ZH Artengruppen": {
       "Typ": "Datensammlung",
       "Beschreibung": "Artengruppen Kt. Zürich. Daten zu allen Arten",
       "Datenstand": "2012",
       "Link": "http://www.naturschutz.zh.ch",
       "Felder": {
           "GIS-Layer": "Reptilien",
           "Artengruppen-ID in EvAB": 12
       }
   },
   "ZH GIS": {
       "Typ": "Datensammlung",
       "Beschreibung": "GIS-Layer und Projektrelevanzen im Kanton Zürich. Daten zu allen Arten",
       "Datenstand": "2012",
       "Link": "http://www.naturschutz.zh.ch",
       "Felder": {
           "Betrachtungsdistanz in Meter": 3000,
           "Berücksichtigen wenn in Betrachtungsdistanz nicht ausgewiesen": false,
           "Kriterien für Bestimmung der Betrachtungsdistanz": "9"
       }
   }
}
```

Das kann jeder Laie direkt lesen, obwohl es die Rohdaten sind. Versuchen Sie einmal, diese Informationen aus einer relationalen Datenbank abzufragen und so übersichtlich darzustellen! Es wäre nur schon eine Kunst, die diversen Felder nicht anzuzeigen, in denen für diese Art keine Informationen enthalten sind. Und die Zusammenfassung aller Datensammlungen in einer einzigen Zeile vernichtet jede strukturelle Information. Ehrlich gesagt war das JSON-Format kombiniert mit CouchDb nach Jahren des K(r)ampfes mit den Arteigenschaften in Access für mich wie eine Offenbarung.

<a href="#top">&#8593; top</a>

<a name="Benutzeroberfläche"></a>
#Benutzeroberfläche
**Hauptelemente**

Oben links ist ein Suchfeld. Darunter ein Strukturbaum, der die Arten nach ihrer Verwandschaft darstellt. Rechts ist das Formular, in dem Daten angezeigt werden. Navigiert werden kann entweder mit dem Strukturbaum oder mit dem Suchfeld.

**Suchfeld mit autocomplete**

Gesucht werden kann nach wissenschaftlichem und nach Deutschem Namen. Ab drei eingegebenen Zeichen wird eine Auswahlliste eingeblendet. Wenn es leistungsmässig gut funktioniert, soll nach allen Gruppen gesucht werden können. Die Resultate können nach Gruppen getrennt angezeigt werden.

**Strukturbaum**

Im Baum wird dynamisch die Hierarchie der Arten aufgebaut, soweit sie in der betreffenden Artengruppe vorliegt. Unterhalb der Arten werden folgende Ordner platziert (eventuell, bin noch nicht sicher, ob das die ideale Lösung ist):

- Beziehungen zu Arten (für jede Gruppe einen Ordner)
- Beziehungen zu Lebensräumen (für jeden Lebensraum-Schlüssel einen Ordner)

**Formular**

Die Datensammlungen werden in einem Accordion dargestellt. Innerhalb jedes Accordion-Elements wird zunächst die Beschreibung der Datensammlung angezeigt. Darunter ihre Datenfelder. Beim erstmaligen Anzeigen der Art ist der Index geöffnet.

Aus der JSON-Struktur des Datensatzes wird dynamisch eine simple Liste aller Felder generiert. Ja/nein Werte werden mit einer Checkbox dargestellt. Text unter 90 Zeichen mit einem Textfeld. Längerer Text mit einer Textarea. Diese wird beim Anzeigen der Seite an die Länge des Inhalts angepasst. Zahlen werden in einem Zahlenfeld angezeigt.

Im Index sollen Synonyme und eingeschlossene Arten als kommagetrennte Liste von Links angezeigt werden. Links ermöglichen wie bisher die Suche nach der Art in Google-Bildern und Wikipedia.

**Menu**

Da bin ich mir noch nicht so sicher. Vermutlich werden die Menus mit der rechten Maustaste im Strukturbaum erreichbar sein. Am wichtigsten ist ja der Export von Daten. Und so kann er bequem für die gewünschte Hierarchiestufe angeboten werden (aber wie für die ganze Gruppe?).

<a href="#top">&#8593; top</a>

<a name="Zeitplan"></a>
#Zeitplan
Das ist ein Freizeitprojekt. Keine Ahnung, wie ich vorwärts komme.

Aktueller Stand:

- Die Ideen sind weit gediehen und im wesentlichen oben dargestellt
- Der Datenexport aus der heutigen ArtenDB ist zum grossen Teil [vorbereitet](https://github.com/barbalex/artendb_import)
- Habe mit der Umsetzung begonnen: [http://www.barbalex.iriscouch.com/artendb/_design/artendb/index.html](http://www.barbalex.iriscouch.com/artendb/_design/artendb/index.html)

<a href="#top">&#8593; top</a>

<a name="AktuellerStand"></a>
#Was kann man mit der aktuellen Version machen?

Achtung: Die hier aufgelisteten features beziehen sich auf meine lokale Entwicklerversion. Die Version im Web kann einzelne Features noch nicht enthalten.

Arten suchen:

- im hierarchischen Verwandschaftsbaum
- mit einem Filterfeld

Eigenschaften anzeigen:

- Für alle in der Artendb.mdb enthaltenen Arten aus den Gruppen Fauna, Flora, Moose, Pilze und Lebensräume
- Alle für diese Gruppen in der Artendb.mdb enthaltenen Datensammlungen
- Beziehungen zwischen verwandten arten werden mit Links angezeigt. Der Link führt zur betreffenden Art
- Felder, die nur einen Web-Link enthalten, werden als Link angezeigt
- Die jeweilige Datemsammlung ist beschrieben

<a href="#top">&#8593; top</a>

<a name="OpenSource"></a>
#Open source
Die für die Anwendung verwendete [Lizenz](https://github.com/barbalex/artendb/blob/master/License.md) ist sehr freizügig. Eine Weiterverbreitung der in der Anwendung enthaltenen Daten ist aber nur mit Einverständnis der Autoren zulässig.

<a href="#top">&#8593; top</a>