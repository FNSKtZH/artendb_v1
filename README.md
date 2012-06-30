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

Für bestimmte Zwecke ist das Gegenteil interessant: Felder aus verschiedenen Datensammlungen zusammenfassen. Z.B. wenn man über alle Artengruppen den aktuellsten Rote-Liste-Status darstellen will. Um das zu ermöglichen folgende Idee:

- In der Feldverwaltung erhalten Felder mit zusammenzufassender Information zusätzlich zum normalen Feldnamen einen zusammenfassenden Feldnamen
- Ein View fasst alle Felder aller Artgruppen mit demselben zusammenfassenden Feldnamen zusammen
- Für den Export von Daten können - neben allen anderen Datensammlungen - auch Felder aus diesem View gewählt werden
- Wird für eine Artengruppe z.B. eine neue Version der Roten Liste erstellt, kann die alte in der Datenbank belassen werden. Die neue wird importiert. In der Feldverwaltung werden die zusammenfassenden Felder angepasst

<a href="#top">&#8593; top</a>

<a name="ArtgruppenVereinen"></a>
#Artgruppen vereinen
Heute werden die verschiedenen Gruppen (Flora, Fauna, Moose, Pilze, Flechten, Lebensräume) in unterschiedlichen Tabellen der relationalen Datenbank verwaltet. Das erhöht die Komplexität der Anwendung und erschwert jede Auswertung enorm. Beispielweise müssen alle Beziehungen zu anderen Arten oder Lebensräumen für jede Gruppe separat verwaltet werden... Zumindest in Access kann das aber nicht mehr geändert werden, weil z.B. in der Floratabelle die maximale Anzahl möglicher Indizes erreicht ist (32). Die (schlechte) Variante, alle Informationen in einer einzigen Riesentabelle zu vereinigen, scheitert wiederum an der maximalen Anzahl Felder (255).

<a href="#top">&#8593; top</a>

<a name="CodierungVereinfachen"></a>
#Codierung vereinfachen
Viele Werte sind heute codiert. Die Felder enthalten unverständliche Codes. Diese werden in einer Codierungstabelle aufgelöst. Damit die Daten benutzergerecht dargestellt werden können, müssen sie für Darstellung und Export decodiert werden. Dieses System ist sehr kompliziert und bringt Access in Formularen und Abfragen an seine Leistungsgrenze. Deshalb werden die Daten momentan codiert exportiert. Auch leistungsfähigere Systeme dürften gebremst werden.
- Decodierung vermeiden: Wenn immer möglich uncodierte Werte ins Feld einfügen und Optionslisten in der Feldverwaltung definieren (Arrays)
- Redundanz statt Komplexität: Wo Abkürzungen für Laien unverständlich sind aber allgemein benutzt werden (z.B. die IUCN-Stati in der Roten Liste) wird der decodierte Wert in einem zweiten Feld gespeichert.

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
- Informationen über die Felder vorbereiten
- Informationen über die Datensammlung vorbereiten
- Alles importieren
fertig!

<a href="#top">&#8593; top</a>

<a name="DokumentorientierteDatenbankVerwenden"></a>
#Dokumentorientierte Datenbank verwenden
- Die Datenstruktur der Arteigenschaften (1:1, die meisten Felder bleiben leer) ist für eine traditionelle, tabellenbasierte Datenbank wenig geeignet, für eine dokumentenorientierte hingegen ideal
- Eine dokumentbasierte Datenbank eignet sich hervorragend, um ohne Einbezug des Systemadministrators neue Felder zu ergänzen
- Eine dokumentbasierte Datenbank eignet sich hervorragend, um alle Arten gleich zu verwalten und Gruppen (Flora, Fauna, Moose, Pilze, Flechten, sogar die Lebensräume) nur aufgrund eines Attributs zu unterscheiden. Beziehungen zwischen Arten und Lebensräumen sind entsprechend sehr einfach zu verwalten

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