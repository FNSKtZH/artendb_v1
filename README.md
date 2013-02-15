<a name="top"></a>
Die Arten- und Lebensraumdatenbank (ArtenDb) enthält naturschutzrelevante Informationen über Arten aus den Gruppen Fauna, Flora, Moose, Pilze und von Lebensräumen. Sie ermöglicht das Nachschlagen, Importieren, Exportieren und den direkten Zugriff auf die Informationen. 

Ihre Stärke ist der einfache Import von Daten. Damit soll gewährleistet werden, dass die Daten möglichst aktuell sind und alle benötigten Daten enthalten sind.

## Inhalt ##
* <a href="#Ziele">Ziele</a>
* <a href="#Konzept">Fachliches Konzept</a>
* <a href="#ui">Benutzeroberfläche</a>
* <a href="#Umsetzung">Technische Umsetzung</a>
* <a href="#Zeitplan">Realisierung</a>
* <a href="#OpenSource">Open source</a>

<a name="Ziele"></a>
#Ziele
###Ausgangspunkt
sind ein paar Erfahrungen, welche in der Fachstelle Naturschutz mit der [bisherigen Datenbank](http://www.aln.zh.ch/internet/baudirektion/aln/de/naturschutz/naturschutzdaten/tools/arten_db.html#a-content) gemacht wurden:

- Bezieht man Daten aus anderen Quellen, ist es schwierig, sie vollständig, fehlerfrei und aktuell zu (er-)halten
- Entscheidend für die Aktualität der Datenbank ist es, die Informationen einfach und mit geringem Aufwand importieren und danach direkt nutzen zu können. Neu erscheinende Datensammlungen müssen rasch und nebenbei ergänzt werden können, d.h. obwohl man sich gerade prioritäreren Aufgaben widmen sollte
- Art- und Lebensraumeigenschaften interessieren nicht nur die Fachstelle Naturschutz des Kantons Zürich. Ideal wäre eine von allen in diesem Bereich tätigen Stellen gemeinsam nachgeführte Datenbank. Oder mindestens: Ein Ort, an dem frei zugängliche Daten mit geringem Aufwand vereint werden können
- Die aktuelle Datenbank basiert auf Microsoft Access. Technische Grenzen verhindern eine sinnvolle Weiterentwicklung. Sie kann zwar im Internet frei heruntergeladen, aber nur auf wenigen Geräten genutzt werden

###Das Zielpublikum...
...befasst sich mit Arten und Lebensräumen, kommt also primär aus diesen Bereichen: Naturschutz, Jagd und Fischerei, Gewässer, Wald, Landwirtschaft, Problemarten. Angesprochen sein dürften Fachstellen bei Bund, Kantonen, Gemeinden, Forschungseinrichtungen und freischaffende Fachleute bzw. Ökobüros.

###Ziele für die Benutzerin

- Die Anwendung ist einfach zu bedienen
- Die Datenflut bleibt überschaubar
- Die Daten sind gut dokumentiert...
- ...und gut verfügbar:
 - Von jedem Gerät im Internet
 - Als Export im csv-Format (ev. weitere)
 - Über Schnittstellen für GIS, [Artenlistentool](http://www.aln.zh.ch/internet/baudirektion/aln/de/naturschutz/naturschutzdaten/tools/artenlistentool.html#a-content), [EvAB](http://www.aln.zh.ch/internet/baudirektion/aln/de/naturschutz/naturschutzdaten/tools/evab.html#a-content), [EvAB mobile](https://github.com/barbalex/EvabMobile), beliebige Apps
- Die Daten können ohne zusätzlichen Aufwand über alle Arten- und Lebensraumgruppen hinweg exportiert und ausgewertet werden

###Ziele für Datenpfleger und Systemverantwortliche

- Datensammlungen können in wenigen Minuten (neu) importiert werden, ohne dass besondere technische Fähigkeiten vorausgesetzt würden
- Die Datenstruktur ist schon in den Rohdaten direkt sichtbar und verständlich
- Der Code ist gut dokumentiert

###Was zeichnet ArtenDb aus?
Die wichtigsten Merkmale dürften sein:

- Die verwendeten Begriffe und Datenstrukturen sind auf Eigenschaften von Arten und Lebensräumen zugeschnitten
- Daten können einfach und rasch importiert werden...
- ...weshalb prinzipiell alle beteiligten Stellen ihre Daten an einem Ort und in einem gemeinsamen Format anbieten könnten. Das mag etwas naiv und utopisch sein. Zumindest aber kann man mit geringem Aufwand anderswo verfügbare Daten in ArtenDb vereinen und gemeinsam in Auswertungen verwenden

<a href="#top">&#8593; top</a>

<a name="Konzept"></a>
#Fachliches Konzept
###Taxonomien
[Taxonomien](http://de.wikipedia.org/wiki/Taxonomie) klassifizieren <a href="http://de.wikipedia.org/wiki/Objekt_(Programmierung)">Objekte</a> (in der ArtenDb: Arten und Lebensräume) mit einer [Hierarchie](http://de.wikipedia.org/wiki/Hierarchie). Darauf bauen alle Datensammlungen und deren Eigenschaften auf. Die Entwicklung von Taxonomien und der Umgang mit unterschiedlichen und sich laufend verändernden Taxonomien sind höchst anspruchsvoll.

Andere geläufige Begriffe: Nomenklatur, Index, Flora, Kartierungs- oder Lebensraumschlüssel. 

Beispiele: Indizes der nationalen Artdatenzentren, "Flora der Schweiz (Ausgabe 2012)", "Lebensraumkartierung Neeracher Riet 2009", "Flora Europaea (Ellenberg, 1991)".

Momentan werden in der ArtenDb wird die aktuell vom zuständigen nationalen Artdatenzentrum verwendete Taxonomie als "Aktuelle Taxonomie" bezeichnet. Künftig sollen sie den Namen der Datensammlung bzw. Publikation erhalten.

Taxonomien werden in der JSON-Struktur gleich verwaltet wie Datensammlungen. Bloss heisst ihr Typ "Taxonomie" statt "Datensammlung" und pro Objekt (Art oder Lebensraum) wird immer genau eine Taxonomie beschrieben (künftig - momentan ist das noch anders implementiert).

Beziehungen zwischen taxonomischen Einheiten, z.B. "synonym", werden (künftig) ähnlich wie andere Beziehungen verwaltet.

Die Benutzerin soll die Arten wahlweise nach allen in den Daten enthaltenen Taxonomien aufrufen und darstellen können. Im Standard wird bei Arten die Struktur der aktuell vom zuständigen nationalen Zentrum verwendeten Taxonomie angezeigt.

In der ArtenDb werden Lebensraumschlüssel auch als Taxonomien behandelt und bezeichnet. Bloss werden im Strukturbaum alle Taxonomien gleichzeitig angezeigt. Das ist hier übersichtlicher, weil es hier sehr viele Taxonomien gibt und man meistens nicht mit der Standard-Taxonomie arbeitet.

###Objekte
<a href="http://de.wikipedia.org/wiki/Objekt_(Programmierung)">Objekte</a> bilden die Grundeinheit der Taxonomie. In der ArtenDb sind das Arten oder Lebensräume. Letztere Begriffe werden in der Benutzeroberfläche verwendet - "Objekte" ist eher von technischer und konzeptioneller Bedeutung.

###Gruppen
Arten werden in Gruppen eingeteilt: Fauna, Flora, Moose und Pilze. Die nationalen Artdatenzentren sind so organisiert und das hat sich auch für viele Anwendungen eingebürgert und bewährt.

###Datensammlungen
Systematische Informationen über Arten kommen in ganzen Datensammlungen, z.B. „Flora Indicativa 2010“. Solche Datensammlungen haben gemeinsame Eigenschaften wie z.B.:

- Dieselbe Herkunft (Autoren, Publikation)
- Meist eine bestimmte Artgruppe (z.B. Flora, Fauna, Schmetterlinge…)
- Innerhalb der Artgruppe eine definierte Auswahl bearbeiteter Arten
- Definierte Methodik und Auswahl erfasster Informationen
- Verwendung einer bestimmten Taxonomie
- Dassselbe Aktualitäts- bzw. Publikationsdatum

Ich bin mir noch nicht ganz im Klaren, ob statt "Datensammlung" der Begriff "Publikation" nicht besser wäre. Damit würde besser erkenntlich, dass eine aktualisierte Version einer bereits bestehenden Datensammlung in der Regel als neue Datensammlung zu behandeln ist.

Datensammlungen sollten in der Regel durch die Autoren nachgeführt werden.

Um Arten- und Lebensraumeigenschaften verstehen und verwalten zu können, ist es wichtig, diese Datensammlungen als wesentlichen Teil der Struktur zu behandeln. In ArtenDb sind Datensammlungen Eigenschaften der taxonomischen Einheit (Art oder Lebensraum) mit der Eigenschaft Typ = "Datensammlung".

Es sollen auch Datensammlungen angezeigt und exportiert werden können, die bei einer synonymen Art beschrieben sind.

In fast allen Fällen ist es sinnvoll, die Informationen (Eigenschaften und Beziehungen) pro solcher Datensammlung darzustellen bzw. zusammenzufassen. Z.B. bei der Anzeige in der Anwendung oder wenn für Exporte Felder ausgewählt werden.

###Zusammenfassende Datensammlungen
Für bestimmte Zwecke ist zusätzlich das Gegenteil interessant: Felder aus verschiedenen Datensammlungen zusammenfassen. Z.B. wenn man über alle Artengruppen den aktuellsten Rote-Liste-Status darstellen will. Er steckt in diversen Datensammlungen, da er für viele Artengruppen separat publiziert wird.

Das soll so erfolgen:

- In den jeweiligen Arten und Lebensräumen wird eine zusätzliche Datensammlung mit Untertyp "zusammenfassend" geschaffen
- Die entsprechenden Daten werden zwei mal importiert:
 - Ein mal in die Ursprungs-Datensammlung
 - Ein mal in die zusammenfassende
- die zusammenfassende Datensammlung kann genau gleich wie alle anderen Datensammlungen in der Anwendung angezeigt, exportiert oder über eine Schnittstelle angezapft werden

Wird z.B. für Heuschrecken eine neue Rote Liste publiziert, so werden nun beim Import:
- Eine neue Datensammlung geschaffen, z.B. "BAFU (2012): Rote Liste der Heuschrecken" und die Daten importiert
- Die alte Datensammlung bleibt bestehen, z.B. "BUWAL (1985): Rote Liste der Heuschrecken"
- Entweder es gibt schon die zusammenfassende Datensammlung "Aktuelle Rote Liste". Dann werden die Daten hier hinein nochmals importiert. Dabei werden die bisherige Einträge überschrieben
- Oder die zusammenfassende Datensammlung wird jetzt beschrieben und als zusammenfassend markiert. Dann werden die Daten nochmals in diese Datensammlung importiert. Zuvor müssen auch die Rote-Liste-Angaben aller anderen entsprechenden Datensammlungen importiert werden (z.B. indem sie zuerst von den Ursprungs-Datensammlungen exportiert werden)
- Falls einige 1985 beschriebene Arten 2012 nicht mehr beschrieben wurden, bleibt der alte Rote-Liste-Status erhalten. Um dies klar zu machen, soll in der zusammenfassenden Datensammlung in einem zusätzlichen Feld immer der Name der Ursprungs-Datensammlung mitgeliefert werden

Normalerweise würden in ArtenDb zuerst die alten Datensammlungen erfasst und erst später die neuen. Falls aber nachträglich eine ältere Datensammlung erfasst wird, für die bereits eine zusammenfassende Datensammlung existiert, sollte es die Möglichkeit geben, zu wählen, dass in der zusammenfassenden Datensammlung vorhandene Daten nicht überschrieben werden. Oder flexibler: Auswählen, aus welchen Quellen stammende zusammenfassende Einträge nicht überschrieben werden sollen.

###Art- und Lebensraumeigenschaften...
...beschreiben einzelne Arten oder Lebensräume. Beispiele: Artwert, Rote-Liste-Status, nationale Priorität.

###Beziehungen...
...beschreiben das Zusammenspiel zwischen zwei oder mehr Arten und/oder Lebensräumen. Beispiele: Bindung von Arten an Biotope, Frasspflanzen von Insekten, Wirte von Parasiten. Aber auch taxonomische Beziehungen wie "synonym".

###Gruppen vereinen
In der bisherigen, relationalen Datenbank werden die verschiedenen Gruppen (Flora, Fauna, Moose, Pilze, Lebensräume) in unterschiedlichen Tabellen der verwaltet. Das erhöht die Komplexität der Anwendung und erschwert jede Auswertung enorm. Beispielweise müssen alle Beziehungen zu anderen Arten oder Lebensräumen für jede Gruppe separat verwaltet werden, d.h. bis zu 10-fach, um dann in Auswertungen mittels Union-Abfragen wieder zusammengeführt zu werden. Zumindest in Access kann das aber nicht mehr geändert werden, weil z.B. in der Floratabelle die maximale Anzahl möglicher Indizes (32) erreicht ist und jede Beziehung einen Index voraussetzt. Die (schlechte) Variante, alle Informationen in einer einzigen Riesentabelle zu vereinigen, scheitert wiederum an der maximalen Anzahl Felder (255) und an der maximalen Datenmenge pro Datensatz (2KB).

###Daten decodieren
Traditionell werden Daten häufig codiert erfasst. Bis vor kurzem waren auch viele Daten in der bisherigen ArtenDb codiert. Die entsprechenden Felder enthielten für Menschen unverständliche Codes. Sie wurden in einer Codierungstabelle aufgelöst. Damit die Daten verständlich dargestellt werden konnten, mussten sie für Darstellung und Export decodiert werden. Dieses System ist sehr kompliziert, leistungshungrig und Rohdaten verlieren jede Aussagekraft. Deshalb sind codierte Informationen zu vermeiden.

###Datensammlungen aktualisieren
Wie soll eine bestehende Datensammlung aktualisiert werden? Zu bedenken sind u.a.:
- Müssen frühere Auswertungen nachvollzogen bzw. wiederholt werden können? Wenn ja, sollten frühere Datenstände (=Datensammlungen) vollständig erhalten bleiben
- Wird eine Datensammlung periodisch teilweise aktualisiert (im Gegensatz zu vollständig)? Und soll ersichtlich sein, welche Eigenschaften welchen Datenstand haben?

Wenn eine von beiden obigen Fragen mit ja beantwortet wurde, kann z.B. folgendermassen vorgegangen werden:
- Neue Daten als neue Datensammlung erfassen. Z.B. "ZH Artwert (2013)", wobei es schon "ZH Artwert (1995)" gibt und ev. weitere
- Für die Auswertung unter Einbezug aller Artwerte eine zusammenfassende Datensammlung schaffen "ZH Artwert (aktuell)"

<a href="#top">&#8593; top</a>

<a name="ui"></a>
#Benutzeroberfläche
###Erscheinungsbild

<img src="https://raw.github.com/barbalex/artendb/master/_attachments/img/eisvogel.png" alt="Beispiel Eisvogel" width="100%">

**Hauptelemente**

Mit den schwarzen Schaltflächen wird die Gruppe gewählt. Danach erscheinen darunter ein Suchfeld und ein Strukturbaum, der die Arten nach ihrer Verwandschaft darstellt. Rechts ist das Formular, in dem Daten angezeigt werden. Navigiert werden kann mit dem Strukturbaum und mit dem Suchfeld.

**Suchfeld**

Gesucht werden kann nach wissenschaftlichem und nach Deutschem Namen.

**Strukturbaum**

Im Baum wird dynamisch die Hierarchie der Arten aufgebaut - soweit sie in der betreffenden Artengruppe vorliegt - bzw. die Hierarchie des Lebensraumschlüssels.

**Formular**

Klickt man auf den Namen einer Taxonomie oder Datensammlung, werden die dazugehörigen Daten angezeigt: Zuoberst die Beschreibung der Datensammlung. Darunter die Eigenschaften der Art, des Lebensraums oder der Beziehung.<br>Hier ein Beispiel für Arteigenschaften:
<img src="https://raw.github.com/barbalex/artendb/master/_attachments/img/eisvogel_rl.png" alt="Beispiel Eisvogel, Datensammlung Rote Liste" width="100%">

...und eines für Beziehungen:
<img src="https://raw.github.com/barbalex/artendb/master/_attachments/img/eisvogel_beziehung.png" alt="Beispiel Eisvogel, Biotopbindung nach AP FM ZH" width="100%">

Aus der [JSON-Struktur](http://de.wikipedia.org/wiki/JavaScript_Object_Notation) des Datensatzes wird dynamisch eine simple Liste aller Felder generiert. Ja/nein Werte werden mit einer Checkbox dargestellt. Text unter 50 Zeichen mit einem Textfeld. Längerer Text mit einer "Textarea". Diese wird beim Anzeigen der Seite an die Länge des Inhalts angepasst. Zahlen werden in einem Zahlenfeld angezeigt.

In der Taxonomie werden Synonyme und eingeschlossene Arten als kommagetrennte Liste von Links angezeigt. Links ermöglichen die Suche nach der Art in Google-Bildern und Wikipedia.

Künftig sollen zuunterst auch wahlweise Datensammlungen angezeigt werden können, die in synonymen Arten erfasst sind.

**Menu**

Das Menu ermöglicht:

- Exporte
- Importe
- Bildersuche
- Suche in Wikipedia
- Informationen über die ArtenDb
- Rückmeldungen an den Entwickler
 
###Neue Datensammlungen hinzufügen
Importiert werden können sollen:
* Taxonomien
* Eigenschaften
* Beziehungen

Will jemand z.B. neue Arteigenschaften ergänzen, geht das dann so:

1. Die Benutzerin meldet sich an (erstellt beim ersten Mal ein Konto)
2. Sie beschreibt die Datensammlung
3. Sie lädt eine vorbereitete csv-Datei mit den Eigenschaften
4. Sie bezeichnet die für die Verknüpfung der Daten benötigte ID
5. Import wird ausgeführt

fertig!

Die Datenfelder in der Benutzeroberfläche und in Exporten werden dynamisch aus den für die Art gespeicherten Attributen aufgebaut. Somit können soeben importierte Eigenschaften direkt angezeigt und exportiert werden.

Um schon vorhandene Arteigenschaften zu verändern, wird zuerst die vorhandene Datensammlung entfernt. Dann die korrigierte importiert.

Neue Datensammlungen sind in der aktuellen Access-Datenbank viel umständlicher hinzuzufügen. Das liegt u.a. an der komplizierten relationalen Datenstruktur, den vielfach erreichten Leistungsgrenzen von Access, der Tatsache, dass in Access die Steuerung nicht in ein paar gut kommentierten Codezeilen erfolgt sondern über Code, Benutzeroberfläche und Abfragen verteilt ist, und weil immer auch die Benutzeroberfläche angepasst werden muss. Das kann ich kaum jemand anderem zumuten. Das wiederum ist ein hohes Risiko für den Unterhalt und verhindert eine effiziente Datenhaltung.

###Daten in ArtenDb bearbeiten
Will man Daten in der Anwendung selbst erfassen, reicht es nicht immer, die Benutzerorberfläche aus den vorhandenen Datenstrukturen aufzubauen. Grundsätzlich können zwar alle in der betreffenden Datensammlung existierenden Felder und ihr Datentyp ermittelt und daraus eine Eingabeoberfläche generiert werden. Je nach Bedürfnissen müssten aber zusätzlich Feldeigenschaften in einer Feldverwaltung verwaltet werden, um besondere Eigenschaften zu bestimmen wie z.B.:

- Feldtyp (z.B. Text, Auswahlliste)
- Optionen für Auswahllisten
- Ob in Auswahllisten Mehrfachauswahlen möglich sein sollen

Nur Lebensraumkartierungen müssen in der Anwendung selbst erfasst werden können. Alle Arteigenschaften werden von den Autoren in eigener Software entwickelt und in die ArtenDb importiert. Für diese Daten kann auf eine Feldverwaltung verzichtet werden. Sie könnte fakultativ benutzt werden, um von besonderen Features zu profitieren, wie zum Beispiel:

- Felder mit einem gemeinsamen Titel gruppiert anzeigen
- Bemerkungen bzw. Interpretationshilfen zum Feld anbieten

###Daten exportieren

Geplant ist folgendes Vorgehen:

1. Die Benutzerin wählt die gewünschten Arten oder Lebensräume (mit Filter)
2. Sie wählt, ob auch Informationen von synonymen Arten exportiert werden sollen
3. Sie wählt die gewünschten Datensammlungen und daraus die gewünschten Felder
4. Die Daten werden generiert und als csv heruntergeladen

Beziehungen sind wohl separat und pro Beziehungstyp einzeln zu exportieren, da pro Objekt mehrere Zeilen erzeugt werden (wäre aber durchaus nützlich, wenn wahlweise Eigenschaften ergänzt werden können).

<a href="#top">&#8593; top</a>

<a name="Umsetzung"></a>
#Technische Umsetzung
###Verwendete Technologien
Eingesetzt werden:
* Die Datenbank [CouchDb](http://couchdb.apache.org/)
* CouchDb als [CouchApp](http://couchapp.org/page/index). In dieser Form kann die Anwendung auch lokal installiert werden und sie ist ihr eigener Webserver
* [JavaScript](http://de.wikipedia.org/wiki/JavaScript) und [jQuery](http://jquery.com/) für die Programmierung
* [HTML5](http://de.wikipedia.org/wiki/HTML5), [CSS](http://de.wikipedia.org/wiki/Cascading_Style_Sheets), [Bootstrap](http://twitter.github.com/bootstrap/) und [jsTree](http://www.jstree.com/) für die Benutzeroberfläche

###Dokumenten-Datenbank
In der relationalen Datenbank sieht die ideale Datenstruktur von Arteigenschaften so aus: Für jede Datensammlung existiert eine eigene Tabelle. Sie wird 1:1 mit der Taxonomie verbunden. Auch so bleiben viele Felder leer. Fasst man in einer Abfrage verschiedene Datensammlungen zusammen, enthalten die wenigsten Felder Informationen. Diese Struktur ist für eine traditionelle, tabellenbasierte Datenbank wenig geeignet. Für eine Dokumenten-Datenbank hingegen ist sie ideal.

Eine Dokumenten-Datenbank speichert jeden Datensatz in einem eigenen Dokument statt in starren Tabellen. Sie eignet sich hervorragend, um ohne Einbezug des Systemadministrators jederzeit zuvor nicht geplante neue Felder zu ergänzen. Und das ist genau, was die meisten Datensammlungen brauchen!

Sie ist auch ideal, um alle Arten gleich zu verwalten und Gruppen (Flora, Fauna, Moose, Pilze, Flechten, sogar die Lebensräume) nur aufgrund eines Attributs zu unterscheiden (natürlich enthalten die jeweiligen Datensammlungen je nach Gruppe spezifische Eigenschaften). Beziehungen zwischen Arten und Arten oder Arten und Lebensräumen gestalten sich entsprechend einfach.

###Datenstruktur
####Objekte

Die durch die Taxonomische Einheit definierten Objekte (Arten und Lebensräume) werden als eigene Dokumente im [JSON-Format](http://de.wikipedia.org/wiki/JavaScript_Object_Notation) gespeichert (Typ: "Objekt"). Sie enthalten eine id ([GUID](http://de.wikipedia.org/wiki/Globally_Unique_Identifier)).

Im Dokument wird die Taxonomie und alle das Objekt beschreibenden Datensammlungen beschrieben, z.B. mit:
- Name: obligatorisch, muss eineindeutig sein, Schreibweise angelehnt an Literaturzitate aber möglichst kurz
- Allgemeine Beschreibung (ungefähr ein Literaturzitat)
- Datenstand
- Link

Taxonomien haben den "Typ" "Taxonomie", Datensammlungen den Typ "Datensammlung".

Alle Eigenschaften des Objekts werden wiederum hierarchisch unter ihrer Taxonomie oder Datensammlung als "Felder" gespeichert.

Hier als Beispiel die Schlingnatter:
<a name="JsonBeispiel"></a>
```javascript
{
   "_id": "8B825C10-C098-48B1-BAB7-5C6287002635",
   "_rev": "13-56959960fbc41955d37b867d9c9de909",
   "Gruppe": "Fauna",
   "Typ": "Objekt",
   "Aktuelle Taxonomie": {
       "Typ": "Taxonomie",
       "Beschreibung": "Index der Info Fauna. Eigenschaften zu 21542 Arten",
       "Datenstand": "2009",
       "Link": "http://www.cscf.ch/",
       "Felder": {
           "Taxonomie ID": 70158,
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
       "Beschreibung": "Aktuellster Stand pro Artengruppe der Roten Listen. Eigenschaften zu 2284 Arten",
       "Datenstand": "unterschiedlich",
       "Felder": {
           "Europa": "gefährdet",
           "Schweiz aktuell": "verletzlich (VU)",
           "Schweiz Kriterien": "B2a, B2b(iii, iv)",
           "Nordschweiz": "stark gefährdet",
           "Kt Zürich": "vom Aussterben bedroht",
           "Bemerkungen": "Im Mittelland vom Aussterben bedroht",
           "Quelle": "BAFU 2005 (CH), älter (Regionen)"
       }
   },
   "Blaue Liste": {
       "Typ": "Datensammlung",
       "Beschreibung": "Gigon A. et al. (1998): Blaue Listen der erfolgreich erhaltenen oder geförderten Tier- und Pflanzenarten der Roten Listen. Methodik und Anwendung in der nördlichen Schweiz. Veröff. Geobot. Inst. ETH, Stiftung Rübel, Zürich 129: 1-137 + 180 pp. Appendicesn. Eigenschaften zu 207 Arten",
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
       "Beschreibung": "BAFU. Eigenschaften zu 607 Arten",
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
       "Beschreibung": "BAFU und BLW (2008): Umweltziele Landwirtschaft. Hergeleitet aus bestehenden rechtlichen Grundlagen. Eigenschaften zu 374 Arten\r\nUmwelt-Wissen Nr. 0820. Bundesamt für Umwelt, Bern: 221 S.",
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
   "CH Agroscope Zielart": {
       "Typ": "Datensammlung",
       "Beschreibung": "Agroscope (2008). Eigenschaften zu 207 Arten",
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
       "Beschreibung": "Artwerte für den Kanton Zürich. Eigenschaften zu 1530 Arten",
       "Datenstand": "ca. 1995",
       "Link": "http://www.naturschutz.zh.ch",
       "Felder": {
           "Artwert": 8,
           "Artwertberechnung Areal weltweit": "gross (0 Punkte)",
           "Artwertberechnung Anteil am CH-Bestand": "klein: <1/4 (0 Punkte)"
       }
   },
   "ZH AP": {
       "Typ": "Datensammlung",
       "Beschreibung": "Aktionsplan Fauna des Kantons Zürich. Eigenschaften zu 36 Arten",
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
       "Beschreibung": "Einstufung von Arten im Kanton Zürich. Eigenschaften zu 682 Arten",
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
           "Für Aktionsplan vorgeschlagen": true,
           "Bemerkungen": "Höchste Dringlichkeit? Ergänzungen zum bestehenden Konzept (übrige Standorte) ect.; ZH hat grosse Verantwortung: mehr Standorte als Nachbarkantone\r\nErfolgsaussichten (Bemerkung zu Punkt 4): grosse Pop. an Bahnlinien\r\nFörderungsmassnahmen: Massnahmen in einfacher Form vorgeschlagen: konkret Standort ermittelt, für ca. 1/2 klar, was machen, Feinumsetzung fehlt noch; Restliche Pop.: keine Massnahmen-Empfehlungen formuliert.\r\nRealisierbarkeit: Grundeigentümer z.T. nicht einverstanden\r\nProjekt: Naturnetz Pfannenstiel  für Fr. 300000.-- (Geld v.a. von Stiftungen): Schlingnatter im Zentrum, da Schwerpunktvorkommen; früheres Konzept von P. Müller war Grundlage.\r\nJetzt generelle Überlegungen im Kt. ZH machen. (SBB ev. kooperativer, wenn Programm da ist.)",
           "Schutz": "Schutz gemäss Bundesgesetz über die Jagd"
       }
   },
   "ZH AP LiWa": {
       "Typ": "Datensammlung",
       "Beschreibung": "Aktionsplan Lichter Wald des Kantons Zürich. Eigenschaften zu 51 Arten",
       "Datenstand": "2009",
       "Link": "http://www.naturschutz.zh.ch",
       "Felder": {
           "Zielart": true,
           "AP LiWa Artwert": 11
       }
   },
   "ZH AP TWW": {
       "Typ": "Datensammlung",
       "Beschreibung": "Aktionsplan Trockene Wiesen und Weiden des Kantons Zürich. Eigenschaften zu 1113 Arten",
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
       "Beschreibung": "Artengruppen Kt. Zürich. Eigenschaften zu allen Arten",
       "Datenstand": "2012",
       "Link": "http://www.naturschutz.zh.ch",
       "Felder": {
           "GIS-Layer": "Reptilien",
           "Artengruppen-ID in EvAB": 12
       }
   },
   "ZH GIS": {
       "Typ": "Datensammlung",
       "Beschreibung": "GIS-Layer und Projektrelevanzen im Kanton Zürich. Eigenschaften zu allen Arten",
       "Datenstand": "2012",
       "Link": "http://www.naturschutz.zh.ch",
       "Felder": {
           "Betrachtungsdistanz (m)": 3000,
           "Kriterien für Bestimmung der Betrachtungsdistanz": "9"
       }
   }
}
```

Das kann jeder Laie direkt lesen, obwohl es maschinenlesbare Rohdaten sind. Man muss bloss einen Editor verwenden, der die Struktur von JSON-Daten optisch umsetzt.

Versuchen Sie einmal, diese Informationen aus einer relationalen Datenbank abzufragen und so übersichtlich darzustellen. Es wäre nur schon eine Kunst, die diversen Felder nicht anzuzeigen, in denen für diese Art keine Informationen enthalten sind. Die Zusammenfassung aller Datensammlungen in einer einzigen Zeile vernichtet jede strukturelle Information und ist sehr schlecht lesbar. Und dann darf man sich noch mit so interessanten Problemen rumschlagen wie: Wie wird garantiert, dass jeder Feldname _über alle Datensammlungen hinweg_ eindeutig ist? Dies ist in JSON kein Problem, da die Felder aufgrund der vorhandenen Hierarchie enthalten eindeutig sind.

Verglichen mit der Datenstruktur in der relationalen Datenbank wurde hier Komplexität (Dutzende verknüpfter Tabellen) durch Redundanz ersetzt (die Datensammlungen werden in jedem Objekt beschrieben, für welches sie Informationen haben).

####Beziehungen
Beziehungen werden in eigenen Dokumenten gespeichert. Zum Beispiel:
```javascript
{
   "_id": "0000752E-A8C2-40B7-A971-8B2CC55C704B",
   "_rev": "1-fc9a5f78150419f2e51f7dd24bf671a7",
   "Typ": "Beziehung",
   "Partner": [
       {
           "Gruppe": "Lebensräume",
           "Name": "CH Flora Indicativa 2010: Lebensräume: 6.7 Thermophilous forest edges",
           "GUID": "BFB9E6F7-07E4-49D6-ADE6-DD730890EC8F"
       },
       {
           "Gruppe": "Flora",
           "Name": "Lilium carniolicum",
           "GUID": "C9A473A7-244F-460B-905D-63B4AC291DCB"
       }
   ],
   "Datensammlung": {
       "Name": "CH Flora indicativa 2010: Vorkommen von Arten in Lebensräumen"
   },
   "Felder": {
       "Art der Beziehung": "Die Art kommt im Lebensraum vor"
   }
}
```
"Partner" sind die beteiligten Beziehungspartner (eigentlich Objekte, aber im Kontext der Beziehung ist der Begriff "Partner" aussagekräftiger). In der Regel zwei Objekte aus beliebigen Gruppen.

In "Datensammlung" wird wie bei Arten und Lebensräumen die Datensammlung beschrieben, aus der die Informationen stammen.

"Felder" enthält die Informationen über die Art der Beziehung.

Es können auch Beziehungen zwischen mehr als zwei Partnern beschrieben werden. Beispielsweise bestünde eine Fussballmannschaft aus mindestens elf "Partnern". Und in der Lokalzeitung ("Datensammlung") würden Berichte über ihre Spiele publiziert (z.B. JSON-Objekte in "Felder" mit den Feldern "Titel", "Header" und "Artikel").

Wenn für zwei oder mehr Beziehungspartner bzw. Objekte Beziehungen in mehreren Datensammlungen beschrieben werden, wird für jede Datensammlung ein Dokument der Beziehung erstellt. Grund: Es bringt keine Vorteile, alle Beziehungen zwischen denselben Objekten in einem Dokument zu speichern, weil (genau bzw. nur) dies gemeinsam anzuzeigen kaum je ein Bedürfnis ist. Meist sind alle Eigenschaften und/oder Beziehungen _eines_ Objekts oder einer Liste von Objekten gefragt und so werden sie auch in ArtenDb angezeigt und exportiert (dies wäre im Beispiel der Fussballmannschaft wohl anders, aber die Struktur wurde nicht dafür gewählt).

Beziehungen taxonomischer Art wie z.B. "synonym" erhalten zusätzlich zum Typ "Beziehung" einen Untertyp "taxonomisch". So können sie spezifisch angesprochen und z.B. für den Aufbau eines Beziehungsbaums verwendet werden.

<a href="#top">&#8593; top</a>

<a name="Zeitplan"></a>
#Realisierung
###Zeitplan
Das ist grösstenteils ein Freizeitprojekt. Keine Ahnung, wie ich vorwärts komme.

Aktueller Stand:

- Die Ideen sind weit gediehen und im wesentlichen oben dargestellt
- Der Datenexport aus der heutigen ArtenDB ist in einem [eigenen Projekt](https://github.com/barbalex/artendb_import) umgesetzt. Da die Datenstruktur der Kern dieses Projekts ist, war das auch der Hauptteil der Arbeit
- Ich habe mit der Umsetzung begonnen: [http://www.barbalex.iriscouch.com/artendb/_design/artendb/index.html](http://www.barbalex.iriscouch.com/artendb/_design/artendb/index.html)

###Was kann man mit der aktuellen Version machen?

Achtung: Die hier aufgelisteten features beziehen sich auf meine lokale Entwicklerversion. Einzelne können in der Version im Web noch fehlen.

Arten suchen:

- im hierarchischen Verwandschaftsbaum
- mit einem Filterfeld

Eigenschaften anzeigen:

- Für alle in der bisherigen ArtenDb enthaltenen Arten aus den Gruppen Fauna, Flora, Moose, Pilze und Lebensräume
- Alle für diese Gruppen in der bisherigen ArtenDb enthaltenen Datensammlungen inkl. Beziehungen
- Die jeweilige Datemsammlung ist beschrieben (besser als bisher)
- Beziehungen zwischen verwandten Arten werden mit Links dargestellt. Der Link führt zur betreffenden Art
- Felder, die nur einen Web-Link enthalten, werden als Link angezeigt

Daten importieren:
- Datensammlungen (im ersten Entwurf, wird noch verbessert)

**To do**

- Importe: Beziehungen, Taxonomien
- Exporte
- Alternative Taxonomien verwalten und darstellen
- Lebensräume in der Anwendung bearbeiten
- Eventuell: Alle Objekte in der Anwendung bearbeiten

<a href="#top">&#8593; top</a>

<a name="OpenSource"></a>
#Open source
Die für die Anwendung verwendete [Lizenz](https://github.com/barbalex/artendb/blob/master/License.md) ist sehr freizügig. Eine Weiterverbreitung der in der Anwendung enthaltenen Daten(sammlungen) ist aber nur mit Einverständnis der Autoren zulässig.

<a href="#top">&#8593; top</a>
