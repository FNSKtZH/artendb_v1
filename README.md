<a name="top"></a>
Die Arten- und Lebensraumdatenbank (ArtenDb) enthält naturschutzrelevante Informationen über Arten aus den Gruppen Fauna, Flora, Moose, Pilze und von Lebensräumen. Sie ermöglicht das Nachschlagen, Importieren, Exportieren und den direkten Zugriff auf die Informationen. 

Ihre Stärke ist der einfache Import von Daten. So wird angestrebt, dass alle benötigten Daten enthalten und möglichst aktuell sind.

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
...sind Erfahrungen, welche in der Fachstelle Naturschutz mit der [bisherigen Datenbank](http://www.aln.zh.ch/internet/baudirektion/aln/de/naturschutz/naturschutzdaten/tools/arten_db.html#a-content) gemacht wurden:

- Bezieht man Daten aus anderen Quellen, ist es schwierig, sie vollständig, fehlerfrei und aktuell zu (er-)halten
- Entscheidend für die Aktualität der Datenbank ist es, die Informationen einfach und mit geringem Aufwand importieren und danach direkt nutzen zu können. Neu erscheinende Datensammlungen müssen rasch und nebenbei ergänzt werden können, d.h. in den paar Minuten, die man im Alltag weniger dringlichen Aufgaben widmen kann
- Art- und Lebensraumeigenschaften interessieren nicht nur die Fachstelle Naturschutz des Kantons Zürich. Ideal wäre eine von allen in diesem Bereich tätigen Stellen gemeinsam nachgeführte Datenbank. Oder mindestens: Ein Ort, an dem frei zugängliche Daten mit wenig Aufwand vereint werden können
- Die aktuelle Datenbank basiert auf Microsoft Access. Eine sinnvolle Weiterentwicklung im Sinne der nachvolgend dargelegten Ideen ist damit nicht möglich

###Das Zielpublikum
...befasst sich mit Arten und Lebensräumen. Es arbeitet primär in den Sachbereichen Naturschutz, Jagd und Fischerei, Gewässer, Wald, Landwirtschaft und Problemarten. Angesprochen sein dürften Fachstellen bei Bund, Kantonen, Gemeinden, Forschungseinrichtungen und freischaffende Fachleute bzw. Ökobüros.

###Ziele für die Benutzerin

- Die Anwendung ist einfach zu bedienen,
- die Datenflut überschaubar,
- möglichst selbsterklärend,
- gut verfügbar:
 - von jedem Gerät im Internet
 - als Export im <a href="http://de.wikipedia.org/wiki/CSV_(Dateiformat)">csv-Format</a> (ev. weitere)
 - über [Schnittstellen](#Schnittstellen) für GIS, [Artenlistentool](http://www.aln.zh.ch/internet/baudirektion/aln/de/naturschutz/naturschutzdaten/tools/artenlistentool.html#a-content), [EvAB](http://www.aln.zh.ch/internet/baudirektion/aln/de/naturschutz/naturschutzdaten/tools/evab.html#a-content), [EvAB mobile](https://github.com/barbalex/EvabMobile), beliebige Apps
- ...und kann ohne zusätzlichen Aufwand über alle Arten- und Lebensraumgruppen hinweg exportiert und ausgewertet werden

###Ziele für Datenpfleger und Systemverantwortliche

- Datensammlungen können in wenigen Minuten importiert werden.<br>Es werden keine besonderen technischen Fähigkeiten vorausgesetzt
- Die Datenstruktur ist bereits in den Rohdaten sichtbar und verständlich
- Der Code ist gut dokumentiert
- Der Code ist offen und Nutzer können eigene Erweiterungen entwickeln

###Was zeichnet ArtenDb aus?
Die wichtigsten Merkmale dürften sein:

- Die verwendeten Begriffe und Datenstrukturen sind auf Eigenschaften von Arten und Lebensräumen zugeschnitten
- Daten können einfach und rasch importiert werden...
- ...weshalb prinzipiell alle beteiligten Stellen ihre Daten an einem Ort und in einem gemeinsamen Format anbieten könnten. Das mag etwas naiv und utopisch sein. Zumindest aber kann man innert Minuten anderswo verfügbare Daten in ArtenDb vereinen und in Auswertungen mit anderen Daten kombinieren

<a href="#top">&#8593; top</a>

<a name="Konzept"></a>
#Fachliches Konzept
###Der Grundgedanke
Die bisherige Access-Datenbank ist über zehn Jahre gewachsen. Nach und nach entstand ein komplexes Instrument, das kaum noch zu verstehen und unterhalten ist und an diverse technische Grenzen stösst.

Ist etwas schwer verständlich, passieren Fehler. Wird es nicht verstanden, nützt es (früher oder später) nichts.

Der Grundgedanke hinter dem fachlichen und strukturellen Konzept der ArtenDb ist daher: Komplexität minimieren. Es gibt ein paar Grundbegriffe: Taxonomie, Objekt, Datensammlung, Beziehung und Eigenschaft. Daraus leiten sich nur noch zwei Grundstrukturen ab: Objekte und ihre Datensammlungen (inklusive Taxonomien, zusammenfassenden Datensammlungen und Beziehungen). Möglichst alles wird darauf zurückgeführt.

###Taxonomien
[Taxonomien](http://de.wikipedia.org/wiki/Taxonomie) klassifizieren <a href="http://de.wikipedia.org/wiki/Objekt_(Programmierung)">Objekte</a> (in der ArtenDb: Arten und Lebensräume) mit einer [Hierarchie](http://de.wikipedia.org/wiki/Hierarchie). Darauf bauen alle Datensammlungen und deren [Eigenschaften](http://de.wikipedia.org/wiki/Eigenschaft) auf. Die Entwicklung von Taxonomien und der Umgang mit unterschiedlichen und sich laufend verändernden Taxonomien sind höchst anspruchsvoll.

Andere geläufige Begriffe: Nomenklatur, Index, Flora, Kartierschlüssel, Lebensraumschlüssel. 

Beispiele: Indizes der nationalen Artdatenzentren, "Flora der Schweiz (Ausgabe 2012)", "Lebensraumkartierung Neeracher Riet 2009", "Flora Europaea (Ellenberg, 1991)".

Die Benutzerin soll die Arten wahlweise nach allen in den Daten enthaltenen Taxonomien darstellen können. Im Standard wird bei Arten die Hierarchie der vom zuständigen nationalen Zentrum verwendeten Taxonomie angezeigt. 

Im Idealfall enthielte die aktuell vom nationalen Zentrum verwendete Taxonomie nur "offizielle" Arten und z.B. keine Synonyme. Stattdessen würden Beziehungen zwischen offiziellen Arten und Arten anderer Taxonomien beschrieben. Da die Daten von den nationalen Zentren unseres Wissens (noch?) nicht so erhältlich sind, ist das in ArtenDb nicht realisiert aber im Design vorgesehen und bei Vorliegen entsprechender Daten direkt umsetzbar.

###Objekte
<a href="http://de.wikipedia.org/wiki/Objekt_(Programmierung)">Objekte</a> bilden die Grundeinheit der Taxonomie. In der ArtenDb sind das Arten oder Lebensräume. Letztere Begriffe werden in der Benutzeroberfläche verwendet. "Objekte" ist eher von technischer und konzeptioneller Bedeutung.

###Gruppen
Arten werden in Gruppen eingeteilt: Fauna, Flora, Moose, Flechten (in ArtenDb noch nicht enthalten) und Pilze. Die nationalen Artdatenzentren sind so organisiert und es hat sich eingebürgert und bewährt.

###Datensammlungen
Systematische Informationen über Arten kommen in ganzen Datensammlungen, z.B. „Flora Indicativa 2010“. Solche Datensammlungen haben gemeinsame Eigenschaften wie z.B.:

- Dieselbe Herkunft (Autoren, Publikation)
- Denselben Zweck: Die Datensammlung wurde in der Regel für einen bestimmten Zweck erarbeitet. Es ist hilfreich, wenn dies beschrieben wird
- Meist eine bestimmte Artgruppe (z.B. Flora, Fauna, Schmetterlinge…)
- Innerhalb der Artgruppe eine definierte Auswahl bearbeiteter Arten
- Definierte Methodik und Auswahl erfasster Informationen
- Verwendung einer bestimmten Taxonomie
- Dasselbe Aktualitäts- bzw. Publikationsdatum

Statt "Datensammlung" könnte auch der Begriff "Publikation" verwendet werden. Damit würde klar:

- Dass ArtenDb an Datensammlungen minimale Qualitätsansprüche stellt, für welche der Autor bürgt. Es muss nicht eine prominent publizierte wissenschaftliche Publikation sein aber die fachliche Qualität sollte dem definierten Zweck entsprechen
- Dass eine aktualisierte Version einer bestehenden Datensammlung in der Regel als neue Datensammlung zu behandeln ist

Datensammlungen sollten nur durch die Autoren nachgeführt werden.

Um Arten- und Lebensraumeigenschaften verstehen und verwalten zu können, ist es wichtig, Datensammlungen als wesentlichen Teil der Struktur zu behandeln. In ArtenDb sind sie Eigenschaften der Objekte. Sie erleichtern dem Benutzer, die Übersicht über die riesige Menge von Eigenschaften zu gewinnen.

Künftig sollen auch Datensammlungen von synonymen Objekten angezeigt und exportiert werden können.

In fast allen Fällen ist es sinnvoll, Eigenschaften und Beziehungen pro Datensammlung darzustellen bzw. zusammenzufassen. Z.B. bei der Anzeige in der Anwendung oder wenn für Exporte Felder ausgewählt werden.

###Zusammenfassende Datensammlungen
Für bestimmte Zwecke ist zusätzlich das Gegenteil interessant: Felder aus verschiedenen Datensammlungen zusammenfassen. Z.B. wenn man über alle Artengruppen den aktuellsten Rote-Liste-Status darstellen will. Er steckt in diversen Datensammlungen, da er für viele Artengruppen separat publiziert wird.

Das soll so erfolgen:

- In den jeweiligen Objekten wird eine zusätzliche Datensammlung mit Untertyp "zusammenfassend" geschaffen
- Die entsprechenden Daten werden zwei mal importiert:
 - Ein mal in die Ursprungs-Datensammlung
 - Ein mal in die zusammenfassende
- Die zusammenfassende Datensammlung kann genau gleich wie alle anderen Datensammlungen in der Anwendung angezeigt, exportiert oder über eine Schnittstelle angezapft werden

Beispiel: Für Heuschrecken wird eine neue Rote Liste publiziert:
- Es wird eine neue Datensammlung geschaffen, z.B. "BAFU (2012): Rote Liste der Heuschrecken" und die Eigenschaften importiert
- Die alte Datensammlung bleibt bestehen, z.B. "BUWAL (1985): Rote Liste der Heuschrecken"
- Entweder es gibt schon die zusammenfassende Datensammlung "Rote Listen (aktuell)". Dann werden die Eigenschaften von "BAFU (2012): Rote Liste der Heuschrecken" nochmals hier hinein importiert. Dabei werden bisherige Rote-Listen-Angaben der entsprechenden Heuschrecken überschrieben
- Oder "Rote Listen (aktuell)" wird jetzt erstmals beschrieben und als zusammenfassend markiert. Dann werden die Rote-Liste-Angaben allenfalls bereits existierender Datensammlungen (im Beispiel diejenige von 1985) in der Reihenfolge ihrer Publikation importiert (falls keine Originaldaten vorliegen: indem sie zuerst von den Ursprungs-Datensammlungen exportiert werden). Zuletzt werden die Daten von "BAFU (2012): Rote Liste der Heuschrecken" nochmals in diese Datensammlung importiert
- Falls einige 1985 beschriebene Arten 2012 nicht mehr beschrieben wurden, bleibt der Rote-Liste-Status von 1985 erhalten. Um dies deutlich zu machen, soll in der zusammenfassenden Datensammlung in einem zusätzlichen Feld "Herkunft" immer der Name der Ursprungs-Datensammlung mitgeliefert werden

Normalerweise würden in ArtenDb zuerst die alten Datensammlungen erfasst und erst später neuere. Es kann aber auch vorkommen, dass nachträglich eine ältere Datensammlung importiert wird, für die bereits eine zusammenfassende Datensammlung mit neueren Daten existiert. In diesem Fall sollte die Benutzerin wählen können, dass in der zusammenfassenden Datensammlung vorhandene Daten nicht überschrieben werden. Oder flexibler: Aus welchen Herkünften stammende zusammenfassende Einträge nicht überschrieben werden sollen (die Idee, das mit einem Aktualitäsdatum für die Datensammlung automatisch abzufangen habe ich verworfen: Sie funktioniert nicht, wenn eine Datensammlung Eigenschaften mit unterschiedlicher Aktualität enthält).

###Art- und Lebensraumeigenschaften
...beschreiben einzelne Objekte. Beispiele: Artwert, Rote-Liste-Status, nationale Priorität.

###Beziehungen
...beschreiben das Verhältnis zwischen zwei oder mehr Objekten. Beispiele: Bindung von Arten an Biotope, Frasspflanzen von Insekten, Wirte von Parasiten. Aber auch taxonomische Beziehungen wie "synonym". Die eine Beziehung beschreibenden Attribute sind spezielle Art- und Lebensraumeigenschaften und wie diese (oft gemeinsam mit ihnen) Teil von Datensammlungen.

###Gruppen vereinen
In der bisherigen, relationalen Datenbank werden die Gruppen (Flora, Fauna, Moose, Pilze, Lebensräume) in unterschiedlichen Tabellen verwaltet. Das erhöht die Komplexität der Anwendung und erschwert jede Auswertung enorm. Beispielweise müssen alle Beziehungen zu anderen Arten oder Lebensräumen für jede Gruppe separat verwaltet werden, d.h. bis zu 10-fach. Und in Auswertungen mittels Union-Abfragen wieder zusammengeführt werden. Zumindest in Access kann das aber nicht mehr geändert werden, weil z.B. in der Floratabelle die maximale Anzahl möglicher Indizes (32) erreicht ist und jede Beziehung einen Index voraussetzt. Die (schlechte) Variante, alle Informationen in einer einzigen Riesentabelle zu vereinigen, scheitert wiederum an der maximalen Anzahl Felder (255) und an der maximalen Datenmenge pro Datensatz (2KB).

###Daten decodieren
Traditionell werden Daten häufig codiert erfasst. Bis 2012 waren auch viele Daten in der bisherigen ArtenDb codiert. Die entsprechenden Felder enthielten für Menschen unverständliche Codes. Sie wurden in einer Codierungstabelle aufgelöst. Damit die Daten verständlich dargestellt werden konnten, mussten sie für Darstellung und Export decodiert werden. Dieses System ist sehr kompliziert und leistungshungrig. Die Rohdaten sind für Menschen nicht mehr lesbar. Deshalb sind codierte Informationen zu vermeiden.

###Datensammlungen aktualisieren
Wie soll eine bestehende Datensammlung aktualisiert werden? Zu bedenken sind u.a.:
- Müssen frühere Auswertungen nachvollzogen bzw. wiederholt werden können? Wenn ja, sollten frühere Datenstände (=Datensammlungen) vollständig erhalten bleiben
- Wird eine Datensammlung periodisch teilweise aktualisiert (im Gegensatz zu vollständig)? Und soll ersichtlich sein, welche Eigenschaften welchen Datenstand haben?

Wenn eine von beiden obigen Fragen mit ja beantwortet wurde, kann z.B. folgendermassen vorgegangen werden:
- Neue Daten als neue Datensammlung erfassen. Z.B. "ZH Artwert (2013)", wobei es schon "ZH Artwert (1995)" gibt und ev. weitere
- Für die Auswertung unter Einbezug aller Artwerte eine zusammenfassende Datensammlung schaffen, z.B. "ZH Artwert (aktuell)"

<a href="#top">&#8593; top</a>

<a name="ui"></a>
#Benutzeroberfläche
###Erscheinungsbild

<img src="https://raw.github.com/barbalex/artendb/master/_attachments/img/eisvogel.png" alt="Beispiel Eisvogel" width="100%">

**Hauptelemente**

Mit den schwarzen Schaltflächen wird die Gruppe gewählt. Danach erscheinen darunter ein Suchfeld und ein Hierarchiebaum. Rechts ist das Formular, in dem Daten angezeigt werden. Navigiert werden kann mit dem Hierarchiebaum und mit dem Suchfeld. Zusätzlich sollen alle Verweise zu Objekten linkbar sein.

**Suchfeld**

Gesucht werden kann nach wissenschaftlichem und nach Deutschem Namen.

**Hierarchiebaum**

Im Baum wird die Hierarchie der Objekte dynamisch aufgebaut - soweit sie in der betreffenden Gruppe vorliegt.

**Formular**

Klickt man auf den Namen einer Taxonomie oder Datensammlung, werden die dazugehörigen Eigenschaften angezeigt: Zuoberst die Beschreibung der Datensammlung. Darunter die Eigenschaften des Objekts oder der Beziehung.<br>Hier ein Beispiel für Arteigenschaften:
<img src="https://raw.github.com/barbalex/artendb/master/_attachments/img/eisvogel_rl.png" alt="Beispiel Eisvogel, Datensammlung Rote Liste" width="100%">

...und eines für Beziehungen:
<img src="https://raw.github.com/barbalex/artendb/master/_attachments/img/eisvogel_beziehung.png" alt="Beispiel Eisvogel, Biotopbindung nach AP FM ZH" width="100%">

Aus der [JSON-Struktur](http://de.wikipedia.org/wiki/JavaScript_Object_Notation) des Dokuments erzeugt ArtenDb dynamisch eine simple Liste aller Felder. true/false Werte werden mit einer Checkbox dargestellt. Text unter 50 Zeichen mit einem Textfeld, darüber mit einer "Textarea". Diese wird beim Anzeigen der Seite an die Länge des Inhalts angepasst. Zahlen werden in einem Zahlenfeld angezeigt.

**Menu**

Das Menu ermöglicht:

- Exporte
- Importe
- Bildersuche in Google
- Suche in Wikipedia
- Informationen über die ArtenDb
- Anzeige des Projektbeschriebs, des Codes und der letzen Änderungen an der Anwendung
- Rückmeldungen an den Entwickler
 
###Neue Datensammlungen hinzufügen
Importiert werden können sollen:
* Taxonomien
* Eigenschaften
* Beziehungen

Will jemand z.B. neue Arteigenschaften ergänzen, geht das so:

1. Die Benutzerin meldet sich an (erstellt beim ersten Mal ein Konto)
2. Sie beschreibt die Datensammlung
3. Sie lädt eine vorbereitete csv-Datei mit den Eigenschaften
4. Sie bezeichnet die für die Verknüpfung der Daten benötigten ID's
5. Der Import wird ausgeführt

fertig!

Die Datenfelder in der Benutzeroberfläche und in Exporten werden dynamisch aus den für die Art gespeicherten Attributen aufgebaut. Somit können neu importierte Eigenschaften anschliessend direkt angezeigt und exportiert werden.

Schon vorhandene Informationen derselben Datensammlung werden überschrieben. Eine Datensammlung kann auch aus allen Objekten entfernt werden, in denen sie enthalten ist.

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

1. Die Benutzerin wählt die gewünschten Objekte. Sie kann dabei nach jedem in den gewählten Gruppen existierenden Feld filtern
2. Sie wählt, ob auch Informationen von synonymen Objekten exportiert werden sollen
3. Sie wählt die gewünschten Eigenschaften
4. Die Datei wird generiert und als .csv heruntergeladen

Beziehungen sind wohl separat und pro Beziehungstyp einzeln zu exportieren, da pro Objekt mehrere Zeilen erzeugt werden (wäre aber durchaus nützlich, wenn wahlweise Eigenschaften ergänzt werden können).

<a href="#top">&#8593; top</a>

<a name="Umsetzung"></a>
#Technische Umsetzung
###Verwendete Technologien
Eingesetzt werden:
- Die Datenbank [CouchDb](http://couchdb.apache.org/)
- CouchDb als [CouchApp](http://couchapp.org/page/index). In dieser Form kann die Anwendung:
 - lokal installiert...
 - und mit anderen ArtenDb's synchronisiert werden
 - und sie ist ihr eigener Webserver: die lokale, synchronisierte Version kann genau so wie diejenige im Web verwendet werden, bloss ist sie leistungsfähiger und netzunabhängig
 - dies ermöglicht es auch, Daten zu integrieren, die man nicht oder nur selektiv teilen möchte
- [JavaScript](http://de.wikipedia.org/wiki/JavaScript) und [jQuery](http://jquery.com/) für die Programmierung
- [HTML5](http://de.wikipedia.org/wiki/HTML5), [CSS](http://de.wikipedia.org/wiki/Cascading_Style_Sheets), [Bootstrap](http://twitter.github.com/bootstrap/) und [jsTree](http://www.jstree.com/) für die Benutzeroberfläche

###Dokumenten-Datenbank
In der relationalen Datenbank sieht die ideale Datenstruktur von Arteigenschaften so aus: Für jede Datensammlung existiert eine eigene Tabelle. Sie wird 1:1 mit der Taxonomie verbunden. Fasst man in einer Abfrage verschiedene Datensammlungen zusammen, enthalten nur noch wenige Felder Informationen. Diese Struktur ist für eine traditionelle, tabellenbasierte Datenbank wenig geeignet. Für eine Dokumenten-Datenbank hingegen ist sie ideal.

Eine Dokumenten-Datenbank speichert jeden Datensatz in einem eigenen Dokument statt in starren Tabellen. Man kann sich das wie eine Karteikarte vorstellen, auf der die Informationen notiert werden. Dieses System eignet sich hervorragend, um ohne Einbezug des Systemadministrators zuvor nicht geplante neue Felder zu ergänzen. Und das ist genau, was die meisten Datensammlungen brauchen.

Eine Dokumenten-Datenbank ist auch ideal, um alle Arten gleich zu verwalten und Gruppen (Flora, Fauna, Moose, Pilze, Flechten, sogar die Lebensräume) nur aufgrund eines Attributs zu unterscheiden (natürlich enthalten die jeweiligen Datensammlungen je nach Gruppe spezifische Eigenschaften). Beziehungen zwischen Objekten gestalten sich entsprechend einfach. Und sie können genau gleich, sozusagen "in der Karteikarte notiert" werden. Simpel, oder?

###Datenstruktur
####Objekte

Die durch die Taxonomische Einheit definierten Objekte (Arten und Lebensräume) werden als Dokumente im [JSON-Format](http://de.wikipedia.org/wiki/JavaScript_Object_Notation) gespeichert. Sie enthalten eine id ([GUID](http://de.wikipedia.org/wiki/Globally_Unique_Identifier)). Nachfolgend der noch beinahe leere Rohbau eines Objekts ohne Datensammlungen. Alle Beispiele stammen von der Europäischen Sumpfschildkröte.
```javascript
{
   "_id": "2B945AD0-F66B-48AD-810C-C2A84BFF6C3E",
   "_rev": "13-cf286524f4c701390885dc1f4fdc968a",
   "Gruppe": "Fauna",
   "Typ": "Objekt"
}
```
- _id ist die id, eine [GUID](http://de.wikipedia.org/wiki/Globally_Unique_Identifier)
- _rev wird von CouchDb intern verwendet, um mit Schreibkonflikten umzugehen
- Gruppe ist Fauna, Flora, Moose, Macromycetes oder Lebensräume
- Typ ist (mindestens momentan) nicht so relevant, weil alle Dokumente Objekte sind

####Datensammlungen

Alle Eigenschaften des Objekts werden hierarchisch unter ihrer Taxonomie oder Datensammlung als "Felder" gespeichert. Die Datensammlung selber wird auch beschrieben, z.B. mit:
- Name: obligatorisch, muss eineindeutig sein, Schreibweise angelehnt an Literaturzitate aber möglichst kurz
- Allgemeine Beschreibung: Vor allem, was für das Verständnis der Daten erforderlich ist
- Datenstand (Datum, als die Daten bezogen wurden)
- Link

Das ist die Taxonomie:
```javascript
"CSCF (2009)": {
   "Typ": "Taxonomie",
   "Beschreibung": "Index der Info Fauna (2009). Eigenschaften von 21542 Tierarten",
   "Datenstand": "2009",
   "Link": "http://www.cscf.ch/",
   "Felder": {
       "Taxonomie ID": 70150,
       "Klasse": "Reptilia",
       "Ordnung": "Chelonii",
       "Familie": "Emydidae",
       "Gattung": "Emys",
       "Art": "orbicularis",
       "Autor": "Linnaeus, 1758",
       "Artname": "Emys orbicularis Linnaeus, 1758",
       "Artname vollständig": "Emys orbicularis Linnaeus, 1758 (Europ. Sumpfschildkröte)",
       "Name Deutsch": "Europ. Sumpfschildkröte",
       "Name Französisch": "Cistude d&#39;Europe",
       "Name Italienisch": "Emide europea",
       "Name Romanisch": "Tartaruga da palì",
       "Name Englisch": "European pond terrapin",
       "Schutz CH": "Schutz gemäss NHG"
   }
}
```
...und das hier eine beliebige Datensammlung:
```javascript
"ZH Artwert (1995)": {
   "Typ": "Datensammlung",
   "Beschreibung": "Artwerte für den Kanton Zürich. Eigenschaften von 1530 Tierarten, 2763 Pflanzenarten und 34 Moosarten",
   "Datenstand": "ca. 1995",
   "Link": "http://www.naturschutz.zh.ch",
   "Felder": {
       "Artwert": 11,
       "Artwertberechnung Areal weltweit": "gross (0 Punkte)",
       "Artwertberechnung Anteil am CH-Bestand": "klein: <1/4 (0 Punkte)"
   }
}
```
Unterschiede zwischen Taxonomie und (gewöhnlicher) Datensammlung:

- Es gibt in jedem Dokument nur eine Taxonomie
- Sie hat den Typ "Taxonomie" statt "Datensammlung"

Lebensraumschlüssel werden auch als Taxonomien behandelt und bezeichnet. Bloss werden im Hierarchiebaum alle angezeigt. Das ist hier nützlicher, weil es bei Lebensräumen sehr viele Taxonomien gibt und man meistens nicht mit der Standard-Taxonomie arbeitet. Es kann z.B. sinnvoll sein, in einem Projekt einen eigenen Lebensraumschlüssel zu entwickeln. Deshalb sollen Lebensräume auch direkt in der Anwendung bearbeitet werden können.

####Beziehungen
Beziehungen werden ähnlich wie Datensammlungen gespeichert:
```javascript
"ZH AP Grundlagen (1995): Art kommt in Lebensraum vor": {
   "Typ": "Beziehung",
   "Beschreibung": "Einstufung von Arten im Kanton Zürich. Eigenschaften von 682 Tierarten und 3156 Pflanzenarten",
   "Datenstand": "ca. 1995",
   "Link": "http://www.naturschutz.zh.ch",
   "Art der Beziehungen": "Art kommt in Lebensraum vor",
   "Beziehungen": [
       {
           "Beziehungspartner": [
               {
                   "Gruppe": "Lebensräume",
                   "Taxonomie": "ZH FNS (1995)",
                   "Name": "03: Seen",
                   "GUID": "A0FC1442-784E-44BA-9FAD-8749AF9D7DCA"
               }
           ]
       },
       {
           "Beziehungspartner": [
               {
                   "Gruppe": "Lebensräume",
                   "Taxonomie": "ZH FNS (1995)",
                   "Name": "04: Weiher, Teiche",
                   "GUID": "8B07E4E6-E768-4CE9-84D6-E490432FD140"
               }
           ]
       }
   ]
}
```
Unterschiede zwischen Beziehungen und (gewöhnlicher) Datensammlung:

- Der Typ heisst "Beziehung"
- Anstatt "Felder" enthält die Eigenschaft "Beziehungen". Darin sind beliebig viele Beziehungen enthalten
- Jede Beziehung enthält im Feld "Beziehungspartner" beliebig viele beteiligte Objekte. Daneben kann sie wie gewöhnliche Datensammlungen weitere beschreibende Felder enthalten. Der Begriff "Beziehungspartner" wird anstelle von "Objekt" verwendet, weil er im Kontext der Beziehung aussagekräftiger ist
- Enthält eine Datensammlung mehrere Arten von Beziehungen, werden ihre Beziehungen in mehrere Eigenschaften des JSON-Dokuments gepackt. Der Name der Eigenschaft weist auf die Art der enthaltenen Beziehungen hin. So wird die Übersichtlichkeit der Daten verbessert. Beispielsweise könnte es neben der Eigenschaft "CH Delarze (2008): Art charakterisiert Lebensraum" auch eine separate Eigenschaft "CH Delarze (2008): Art ist Zielart im Lebensraum" geben. Aufgrund dieser Methodik ist auch der nächste Punkt möglich:
- Beziehungen taxonomischer Art wie z.B. "synonym" erhalten zusätzlich zum Typ "Beziehung" einen Untertyp "taxonomisch". So können sie separat angesprochen, z.B. für den Aufbau eines Beziehungsbaums oder die Darstellung der Datensammlungen auf dem Bildschirm

####Beispiel des vollständigen Objekts
<a name="JsonBeispiel"></a>
```javascript
{
   "_id": "2B945AD0-F66B-48AD-810C-C2A84BFF6C3E",
   "_rev": "12-6b07e244f508d6e30400551c0924da3f",
   "Gruppe": "Fauna",
   "Typ": "Objekt",
   "CSCF (2009)": {
       "Typ": "Taxonomie",
       "Beschreibung": "Index der Info Fauna (2009). Eigenschaften von 21542 Tierarten",
       "Datenstand": "2009",
       "Link": "http://www.cscf.ch/",
       "Felder": {
           "Taxonomie ID": 70150,
           "Klasse": "Reptilia",
           "Ordnung": "Chelonii",
           "Familie": "Emydidae",
           "Gattung": "Emys",
           "Art": "orbicularis",
           "Autor": "Linnaeus, 1758",
           "Artname": "Emys orbicularis Linnaeus, 1758",
           "Artname vollständig": "Emys orbicularis Linnaeus, 1758 (Europ. Sumpfschildkröte)",
           "Name Deutsch": "Europ. Sumpfschildkröte",
           "Name Französisch": "Cistude d&#39;Europe",
           "Name Italienisch": "Emide europea",
           "Name Romanisch": "Tartaruga da palì",
           "Name Englisch": "European pond terrapin",
           "Schutz CH": "Schutz gemäss NHG"
       }
   },
   "CH Rote Listen (unterschiedliche Jahre)": {
       "Typ": "Datensammlung",
       "Beschreibung": "Aktuellster Stand pro Artengruppe der Roten Listen. Eigenschaften von 2284 Tierarten",
       "Datenstand": "unterschiedlich",
       "Felder": {
           "Europa Smaragd": true,
           "Europa": "potentiell gefährdet (NT)",
           "Schweiz aktuell": "vom Aussterben bedroht (CR)",
           "Schweiz Kriterien": "B2a, B2b(iii)",
           "Nordschweiz": "ausgestorben oder verschollen",
           "Kt Zürich": "ausgestorben oder verschollen",
           "Quelle": "BAFU 2005 (CH), älter (Regionen)"
       }
   },
   "CH Prioritäten (2011)": {
       "Typ": "Datensammlung",
       "Beschreibung": "BAFU (2011): Liste der National Prioritären Arten. Eigenschaften von 607 Tierarten, 2595 Pflanzenarten, 934 Pilzarten und 415 Moosarten",
       "Datenstand": "2012.01",
       "Link": "http://www.bafu.admin.ch/publikationen/publikation/01607/index.html?lang=de",
       "Felder": {
           "Priorität": "hoch",
           "Gefährdung": "vom Aussterben bedroht",
           "Verantwortung": "geringe Verantwortung",
           "Massnahmenbedarf": "klar",
           "Bestände überwachen": "nötig",
           "Kenntnisse vorhanden": "ausreichend",
           "Techniken bekannt": "erfolgreiche Techniken sind bekannt",
           "Verbreitung Jura": "nicht vorhanden",
           "Verbreitung Mittelland": "(aktuell) nicht beurteilbar: bisher kein Fund in der betreffenden Region/Kanton/Höhenstufe nachgewiesen",
           "Verbreitung Nordalpen": "nicht vorhanden",
           "Verbreitung westliche Zentralalpen": "nicht vorhanden",
           "Verbreitung östliche Zentralalpen": "nicht vorhanden",
           "Verbreitung Südalpen": "(aktuell) nicht beurteilbar: bisher kein Fund in der betreffenden Region/Kanton/Höhenstufe nachgewiesen",
           "Verbreitung kollin": "letzter Fund aus den Jahren 2000 bis 2010",
           "Verbreitung montan": "nicht vorhanden",
           "Verbreitung subalpin": "nicht vorhanden",
           "Verbreitung alpin": "nicht vorhanden",
           "Verbreitung Kt Zürich": "nicht vorhanden"
       }
   },
   "CH Agroscope Zielart (2008)": {
       "Typ": "Datensammlung",
       "Beschreibung": "Agroscope (2008). Eigenschaften von 207 Tierarten",
       "Datenstand": "2008",
       "Link": "http://www.agroscope.admin.ch",
       "Felder": {
           "1_1 West-Jura": false,
           "1_2 Nord-Jura": false,
           "1_3 Nordostschweiz": false,
           "2_1 West-Mittelland": true,
           "2_2 Ost-Mittelland": true,
           "3_1 West-Nordalpen": true,
           "3_2 Ost-Nordalpen": false,
           "4_1 West-Zentralalpen": false,
           "4_2 Ost-Zentralalpen": false,
           "4_3 Engadin": false,
           "5 Südalpen": true,
           "Collin": true,
           "Montan": false,
           "Subalpin": false,
           "Alpin": false,
           "Rote Liste CH": "ausgestorben oder verschollen",
           "Aufwand für Erfolg": "sehr gross",
           "Beobachtbarkeit": "Die Art ist relativ einfach nachweisbar",
           "Verbreitung Lebensraum Massnahmen": "Unterhalb 500-600 m; der Status der Sumpfschildkröte in der Schweiz ist nicht vollständig geklärt, da es immer wieder Aussetzungen und Umsiedlungen gab, allerdings werden einige Vorkommen als autochthon betrachtet; sich reproduzierende Populationen gibt es in den Kantonen GE, AG, TG. Lebensraum: stehende Gewässer mit starker Ufer- und Wasservegetation und schlammigem Untergrund; Kleinseen, Weiher und Altwässer mit deckungsreicher Ufervegetation. Massnahmen sollten in Absprache mit Fachpersonen (KARCH) erfolgen. Hinweis: Aussetzungen, Wiederansiedlungen und Umsiedlungen sind bewilligungspflichtig! In Regionen, die für eine offizielle Wiederansiedlung geeignet sein könnten, ist sie als Zielart durchaus denkbar, z.B. Gebiete mit vielen stehenden Gewässern und Feuchtzonen."
       }
   },
   "ZH Artwert (1995)": {
       "Typ": "Datensammlung",
       "Beschreibung": "Artwerte für den Kanton Zürich. Eigenschaften von 1530 Tierarten, 2763 Pflanzenarten und 34 Moosarten",
       "Datenstand": "ca. 1995",
       "Link": "http://www.naturschutz.zh.ch",
       "Felder": {
           "Artwert": 11,
           "Artwertberechnung Areal weltweit": "gross (0 Punkte)",
           "Artwertberechnung Anteil am CH-Bestand": "klein: <1/4 (0 Punkte)"
       }
   },
   "ZH AP Grundlagen (1995)": {
       "Typ": "Datensammlung",
       "Beschreibung": "Einstufung von Arten im Kanton Zürich. Eigenschaften von 682 Tierarten und 3156 Pflanzenarten",
       "Datenstand": "ca. 1995",
       "Link": "http://www.naturschutz.zh.ch",
       "Felder": {
           "Dringlichkeit Aktionsplan": "nicht beurteilt",
           "Priorität nach Naturschutz-Gesamtkonzept 1990": "nicht beurteilt",
           "Bestandesentwicklung 1985-2000": "Abnahme",
           "Keine Bestandesabnahme aber Population bedroht": "nicht beurteilt",
           "Fördermassnahmen bekannt": "ja",
           "Geeignete Lebensräume vohanden oder herstellbar": "nein",
           "Überlebensfähige Populationen vorhanden": "nein",
           "Etablierungs-Potential gut": "nein",
           "Ausbreitungs-Potential gut": "ja",
           "Erfolgsaussichten vorhanden": "ja",
           "Nationales Artenschutzprogramm": "nicht beurteilt",
           "Höchste Dringlichkeit": "nicht beurteilt",
           "Verhältnis Aufwand-Ertrag günstig": "nicht beurteilt",
           "Umbrella- oder flagship-species": "nicht beurteilt",
           "Bereits irgendwo Artenschutzprogramme": "nicht beurteilt",
           "Dringlichkeit": "nicht beurteilt",
           "Schutz": "Schutz gemäss Bundesgesetz über die Jagd"
       }
   },
   "ZH AP FM (2010)": {
       "Typ": "Datensammlung",
       "Beschreibung": "Aktionsplan Flachmoore des Kantons Zürich (2010). Eigenschaften von 728 Tierarten, 3500 Pflanzenarten, 57 Moosarten und 60 Lebensräumen. 10219 Beziehungen zwischen Tierarten und Lebensräumen. 664 Beziehungen zwischen Pflanzenarten und Lebensräumen. 79 Beziehungen zwischen Moosarten und Lebensräumen",
       "Datenstand": "2010",
       "Link": "http://www.naturschutz.zh.ch",
       "Felder": {
           "Art ist für AP FM relevant": true,
           "Bindung an Flachmoore": 7,
           "Artwert AP FM": 18,
           "An Strukturen gebunden": true,
           "Bemerkungen": "Ob die Art im Kanton Zürich noch autochthone Bestände besitzt, bleibt nach wie vor fraglich. Die meisten der beobachteten Tiere sind vermutlich auf illegale Aussetzungen zurückzuführen. Nach heutigem Kenntnisstand ist es dennoch nicht ganz auszuschliessen, dass vereinzelt autochthone (Teil-) Populationen oder vereinzelte Individuen überlebt haben könnten.\nAnzahl Populationen: Es ist nach wie vor unbekannt, ob reproduktionsfähige Populationen existieren (eher nicht) und ob noch autochthone Individuen überlebt haben (möglich aber eher unwahrscheinlich).",
           "Artwertberechnung Areal weltweit": "mittel (2 Punkte)",
           "Artwertberechnung Anteil am CH-Bestand": "mittel: 1/4-1/2 (2 Punkte)",
           "Artwertberechnung Gefährdung EU Punkte": 0,
           "Artwertberechnung Gefährdung CH Punkte": 4,
           "Artwertberechnung Gefährdung ZH Punkte": 3,
           "Artwertberechnung neuer Artwert": 11,
           "Artwertberechnung verwendeter Artwert": 11,
           "Ansprüche ans Moor": "Kein eigentlicher Moorbewohner, obwohl sehr gern (v.a. als Jungtier fast obligat) im Schilfröhricht. Eiablagestellen nur an mikroklimatisch begünstigten Stellen (v.a. Böschungen mit xerothermophiler, lückiger Vegetation).",
           "Kleine überlebensfähige Populationen, Anzahl angestrebt": "5+",
           "Ansprüche für Kriterium überlebensfähig": "regelmässige Reproduktion",
           "Regional fördern": true,
           "Regional fördern wo": " Glatt, Thur, Greifensee, Päffikersee, Katzensee",
           "Massnahmen": "Spezialprogramm (muss noch definiert werden)."
       }
   },
   "ZH Artengruppen": {
       "Typ": "Datensammlung",
       "Beschreibung": "Artengruppen Kt. Zürich. Eigenschaften von allen Arten",
       "Datenstand": "2012",
       "Link": "http://www.naturschutz.zh.ch",
       "Felder": {
           "GIS-Layer": "Reptilien",
           "Artengruppen-ID in EvAB": 12
       }
   },
   "ZH GIS": {
       "Typ": "Datensammlung",
       "Beschreibung": "GIS-Layer und Projektrelevanzen im Kanton Zürich. Eigenschaften von allen Arten",
       "Datenstand": "2012",
       "Link": "http://www.naturschutz.zh.ch",
       "Felder": {
           "Betrachtungsdistanz (m)": 500,
           "Kriterien für Bestimmung der Betrachtungsdistanz": "5 (500m als Minimalwert zugeteilt)"
       }
   },
   "CH Agroscope Zielart (2008): Ziel-/Leitart für Lebensraum": {
       "Typ": "Beziehung",
       "Beschreibung": "Agroscope (2008). Eigenschaften von 207 Tierarten",
       "Datenstand": "2008",
       "Link": "http://www.agroscope.admin.ch",
       "Art der Beziehungen": "Ziel-/Leitart für Lebensraum",
       "Beziehungen": [
           {
               "Beziehungspartner": [
                   {
                       "Gruppe": "Lebensräume",
                       "Taxonomie": "CH Agroscope (2008): Ziel- und Leitarten",
                       "Name": "06: Weiher, Tümpel, Pfütze",
                       "GUID": "98DDA55D-7C24-4590-BEDE-9A1B02D77592"
                   }
               ]
           }
       ]
   },
   "ZH AP Grundlagen (1995): Art kommt in Lebensraum vor": {
       "Typ": "Beziehung",
       "Beschreibung": "Einstufung von Arten im Kanton Zürich. Eigenschaften von 682 Tierarten und 3156 Pflanzenarten",
       "Datenstand": "ca. 1995",
       "Link": "http://www.naturschutz.zh.ch",
       "Art der Beziehungen": "Art kommt in Lebensraum vor",
       "Beziehungen": [
           {
               "Beziehungspartner": [
                   {
                       "Gruppe": "Lebensräume",
                       "Taxonomie": "ZH FNS (1995)",
                       "Name": "03: Seen",
                       "GUID": "A0FC1442-784E-44BA-9FAD-8749AF9D7DCA"
                   }
               ]
           },
           {
               "Beziehungspartner": [
                   {
                       "Gruppe": "Lebensräume",
                       "Taxonomie": "ZH FNS (1995)",
                       "Name": "04: Weiher, Teiche",
                       "GUID": "8B07E4E6-E768-4CE9-84D6-E490432FD140"
                   }
               ]
           }
       ]
   },
   "ZH AP FM (2010): Art ist an Lebensraum gebunden": {
       "Typ": "Beziehung",
       "Beschreibung": "Aktionsplan Flachmoore des Kantons Zürich (2010). Eigenschaften von 728 Tierarten, 3500 Pflanzenarten, 57 Moosarten und 60 Lebensräumen. 10219 Beziehungen zwischen Tierarten und Lebensräumen. 664 Beziehungen zwischen Pflanzenarten und Lebensräumen. 79 Beziehungen zwischen Moosarten und Lebensräumen",
       "Datenstand": "2010",
       "Link": "http://www.naturschutz.zh.ch",
       "Art der Beziehungen": "Art ist an Lebensraum gebunden",
       "Beziehungen": [
           {
               "Beziehungspartner": [
                   {
                       "Gruppe": "Lebensräume",
                       "Taxonomie": "ZH FNS (1977): Feuchtgebietskartierung, Lebensräume",
                       "Name": "02: Röhricht",
                       "GUID": "BF31ECDD-A540-4BA9-956C-BE51C3AA346E"
                   }
               ],
               "Biotopbindung": "7"
           }
       ]
   }
}
```
Das kann auch ein Laie direkt lesen, obwohl es maschinenlesbare Rohdaten sind. Man muss bloss einen Editor verwenden, der die Struktur von JSON-Daten optisch umsetzt.

Versuchen Sie einmal, diese Informationen aus einer relationalen Datenbank abzufragen und so übersichtlich darzustellen. Es wäre nur schon eine Kunst, die diversen Felder nicht anzuzeigen, in denen für diese Art keine Informationen enthalten sind (die aber existieren, weil andere Arten mit ihnen beschrieben werden). Die Zusammenfassung aller Datensammlungen in einer einzigen Zeile vernichtet jede strukturelle Information und ist sehr schlecht lesbar. Und dann darf man sich noch mit so interessanten Problemen rumschlagen wie: Wie wird garantiert, dass jeder Feldname _über alle Datensammlungen hinweg_ eindeutig ist? In JSON ist das kein Problem, da die Felder aufgrund der vorhandenen Hierarchie eindeutig sind.

Verglichen mit der Datenstruktur in der relationalen Datenbank wurde hier Komplexität (Dutzende verknüpfter Tabellen) durch Redundanz ersetzt (die Datensammlungen werden in jedem Objekt beschrieben, für welches sie Informationen haben).

###Hierarchien
Die Hierarchien werden momentan folgendermassen aufgebaut:

- Flora: über Familie und Gattung
- Fauna: über Klasse, Ordnung und Familie
- Moose: über Klasse, Familie und Gattung
- Pilze: über Gattung
- Lebensräume: Jedes Objekt kennt seine Position in der Hierarchie. Hier ein Beispiel:

```javascript
"Hierarchie": [
   {
       "Name": "CH Delarze (2008): Lebensräume",
       "GUID": "69D34753-445B-4C55-B3B7-E570F7DC1819"
   },
   {
       "Name": "2: Vegetation der Ufer und der Feuchtgebiete",
       "GUID": "1525DE7D-5B59-4844-BA46-BFA16B8C2574"
   },
   {
       "Name": "2.2: Flachmoore",
       "GUID": "21ED7965-F325-4F85-8793-EE908BCA2B99"
   },
   {
       "Name": "2.2.1: Grossseggenbestände",
       "GUID": "7755D60C-100D-4405-A0E7-7B11D3930F40"
   },
   {
       "Name": "2.2.1.2: Schneidbinsenried",
       "GUID": "8913C6B2-007A-4190-AA69-8CB6EC9F0576"
   }
]
```
Langfristig sollen in allen Gruppen die Objekte ihre Position in der Hierarchie speichern. So ist es möglich, beliebig hierarchisch organisierte Taxonomien zu importieren und anzuzeigen. Vorläufig ist das aber nur bei Lebensräumen nötig.

###Künftige Struktur
Die Struktur wird momentan folgendermassen verbessert:

Objekte enthalten zwei Arrays: Datensammlungen und Beziehungen. Sie enthalten alle zutreffenden Informationen in der heutigen Form. Zusätzlich einen Namen (der im heutigen Objekt der Schlüssel der Eigenschaft ist und daher nicht im Objekt selbst enthalten).

Die Taxonomie erhält auch den Namen und wird mit "Taxonomie" statt mit ihrem Namen beschriftet.

So würde die Europäische Sumpfschildkröte dargestellt:
```javascript
{
	"_id":"2B945AD0-F66B-48AD-810C-C2A84BFF6C3E",
	"_rev":"12-6b07e244f508d6e30400551c0924da3f",
	"Gruppe":"Fauna",
	"Typ":"Objekt",
	"Taxonomie": {
		"Name":"CSCF (2009)",
		"Beschreibung":"Index der Info Fauna (2009). Eigenschaften von 21542 Tierarten",
		"Datenstand":"2009",
		"Link":"http://www.cscf.ch/",
		"Felder": {
			"Taxonomie ID": 70150,
			"Klasse":"Reptilia",
			"Ordnung":"Chelonii",
			"Familie":"Emydidae",
			"Gattung":"Emys",
			"Art":"orbicularis",
			"Autor":"Linnaeus, 1758",
			"Artname":"Emys orbicularis Linnaeus, 1758",
			"Artname vollständig":"Emys orbicularis Linnaeus, 1758 (Europ. Sumpfschildkröte)",
			"Name Deutsch":"Europ. Sumpfschildkröte",
			"Name Französisch":"Cistude d&#39;Europe",
			"Name Italienisch":"Emide europea",
			"Name Romanisch":"Tartaruga da palì",
			"Name Englisch":"European pond terrapin",
			"Schutz CH":"Schutz gemäss NHG"
		}
	},
	"Datensammlungen": [
		{
			"Name":"CH Rote Listen (unterschiedliche Jahre)",
			"Beschreibung":"Aktuellster Stand pro Artengruppe der Roten Listen. Eigenschaften von 2284 Tierarten",
			"Datenstand":"unterschiedlich",
			"Felder": {
				"Europa Smaragd": true,
				"Europa":"potentiell gefährdet (NT)",
				"Schweiz aktuell":"vom Aussterben bedroht (CR)",
				"Schweiz Kriterien":"B2a, B2b(iii)",
				"Nordschweiz":"ausgestorben oder verschollen",
				"Kt Zürich":"ausgestorben oder verschollen",
				"Quelle":"BAFU 2005 (CH), älter (Regionen)"
			}
		},
		{
			"Name":"CH Prioritäten (2011)",
			"Beschreibung":"BAFU (2011): Liste der National Prioritären Arten. Eigenschaften von 607 Tierarten, 2595 Pflanzenarten, 934 Pilzarten und 415 Moosarten",
			"Datenstand":"2012.01",
			"Link":"http://www.bafu.admin.ch/publikationen/publikation/01607/index.html?lang=de",
			"Felder": {
				"Priorität":"hoch",
				"Gefährdung":"vom Aussterben bedroht",
				"Verantwortung":"geringe Verantwortung",
				"Massnahmenbedarf":"klar",
				"Bestände überwachen":"nötig",
				"Kenntnisse vorhanden":"ausreichend",
				"Techniken bekannt":"erfolgreiche Techniken sind bekannt",
				"Verbreitung Jura":"nicht vorhanden",
				"Verbreitung Mittelland":"(aktuell) nicht beurteilbar: bisher kein Fund in der betreffenden Region/Kanton/Höhenstufe nachgewiesen",
				"Verbreitung Nordalpen":"nicht vorhanden",
				"Verbreitung westliche Zentralalpen":"nicht vorhanden",
				"Verbreitung östliche Zentralalpen":"nicht vorhanden",
				"Verbreitung Südalpen":"(aktuell) nicht beurteilbar: bisher kein Fund in der betreffenden Region/Kanton/Höhenstufe nachgewiesen",
				"Verbreitung kollin":"letzter Fund aus den Jahren 2000 bis 2010",
				"Verbreitung montan":"nicht vorhanden",
				"Verbreitung subalpin":"nicht vorhanden",
				"Verbreitung alpin":"nicht vorhanden",
				"Verbreitung Kt Zürich":"nicht vorhanden"
			}
		},
		{
			"Name":"CH Agroscope Zielart (2008)",
			"Beschreibung":"Agroscope (2008). Eigenschaften von 207 Tierarten",
			"Datenstand":"2008",
			"Link":"http://www.agroscope.admin.ch",
			"Felder": {
				"1_1 West-Jura": false,
				"1_2 Nord-Jura": false,
				"1_3 Nordostschweiz": false,
				"2_1 West-Mittelland": true,
				"2_2 Ost-Mittelland": true,
				"3_1 West-Nordalpen": true,
				"3_2 Ost-Nordalpen": false,
				"4_1 West-Zentralalpen": false,
				"4_2 Ost-Zentralalpen": false,
				"4_3 Engadin": false,
				"5 Südalpen": true,
				"Collin": true,
				"Montan": false,
				"Subalpin": false,
				"Alpin": false,
				"Rote Liste CH":"ausgestorben oder verschollen",
				"Aufwand für Erfolg":"sehr gross",
				"Beobachtbarkeit":"Die Art ist relativ einfach nachweisbar",
				"Verbreitung Lebensraum Massnahmen":"Unterhalb 500-600 m; der Status der Sumpfschildkröte in der Schweiz ist nicht vollständig geklärt, da es immer wieder Aussetzungen und Umsiedlungen gab, allerdings werden einige Vorkommen als autochthon betrachtet; sich reproduzierende Populationen gibt es in den Kantonen GE, AG, TG. Lebensraum: stehende Gewässer mit starker Ufer- und Wasservegetation und schlammigem Untergrund; Kleinseen, Weiher und Altwässer mit deckungsreicher Ufervegetation. Massnahmen sollten in Absprache mit Fachpersonen (KARCH) erfolgen. Hinweis: Aussetzungen, Wiederansiedlungen und Umsiedlungen sind bewilligungspflichtig! In Regionen, die für eine offizielle Wiederansiedlung geeignet sein könnten, ist sie als Zielart durchaus denkbar, z.B. Gebiete mit vielen stehenden Gewässern und Feuchtzonen."
			}
		},
		{
			"Name":"ZH Artwert (1995)",
			"Beschreibung":"Artwerte für den Kanton Zürich. Eigenschaften von 1530 Tierarten, 2763 Pflanzenarten und 34 Moosarten",
			"Datenstand":"ca. 1995",
			"Link":"http://www.naturschutz.zh.ch",
			"Felder": {
				"Artwert": 11,
				"Artwertberechnung Areal weltweit":"gross (0 Punkte)",
				"Artwertberechnung Anteil am CH-Bestand":"klein: <1/4 (0 Punkte)"
			}
		},
		{
			"Name":"ZH AP Grundlagen (1995)",
			"Beschreibung":"Einstufung von Arten im Kanton Zürich. Eigenschaften von 682 Tierarten und 3156 Pflanzenarten",
			"Datenstand":"ca. 1995",
			"Link":"http://www.naturschutz.zh.ch",
			"Felder": {
				"Dringlichkeit Aktionsplan":"nicht beurteilt",
				"Priorität nach Naturschutz-Gesamtkonzept 1990":"nicht beurteilt",
				"Bestandesentwicklung 1985-2000":"Abnahme",
				"Keine Bestandesabnahme aber Population bedroht":"nicht beurteilt",
				"Fördermassnahmen bekannt":"ja",
				"Geeignete Lebensräume vohanden oder herstellbar":"nein",
				"Überlebensfähige Populationen vorhanden":"nein",
				"Etablierungs-Potential gut":"nein",
				"Ausbreitungs-Potential gut":"ja",
				"Erfolgsaussichten vorhanden":"ja",
				"Nationales Artenschutzprogramm":"nicht beurteilt",
				"Höchste Dringlichkeit":"nicht beurteilt",
				"Verhältnis Aufwand-Ertrag günstig":"nicht beurteilt",
				"Umbrella- oder flagship-species":"nicht beurteilt",
				"Bereits irgendwo Artenschutzprogramme":"nicht beurteilt",
				"Dringlichkeit":"nicht beurteilt",
				"Schutz":"Schutz gemäss Bundesgesetz über die Jagd"
			}
		},
		{
			"Name":"ZH AP FM (2010)",
			"Beschreibung":"Aktionsplan Flachmoore des Kantons Zürich (2010). Eigenschaften von 728 Tierarten, 3500 Pflanzenarten, 57 Moosarten und 60 Lebensräumen. 10219 Beziehungen zwischen Tierarten und Lebensräumen. 664 Beziehungen zwischen Pflanzenarten und Lebensräumen. 79 Beziehungen zwischen Moosarten und Lebensräumen",
			"Datenstand":"2010",
			"Link":"http://www.naturschutz.zh.ch",
			"Felder": {
				"Art ist für AP FM relevant": true,
				"Bindung an Flachmoore": 7,
				"Artwert AP FM": 18,
				"An Strukturen gebunden": true,
				"Bemerkungen":"Ob die Art im Kanton Zürich noch autochthone Bestände besitzt, bleibt nach wie vor fraglich. Die meisten der beobachteten Tiere sind vermutlich auf illegale Aussetzungen zurückzuführen. Nach heutigem Kenntnisstand ist es dennoch nicht ganz auszuschliessen, dass vereinzelt autochthone (Teil-) Populationen oder vereinzelte Individuen überlebt haben könnten.\nAnzahl Populationen: Es ist nach wie vor unbekannt, ob reproduktionsfähige Populationen existieren (eher nicht) und ob noch autochthone Individuen überlebt haben (möglich aber eher unwahrscheinlich).",
				"Artwertberechnung Areal weltweit":"mittel (2 Punkte)",
				"Artwertberechnung Anteil am CH-Bestand":"mittel: 1/4-1/2 (2 Punkte)",
				"Artwertberechnung Gefährdung EU Punkte": 0,
				"Artwertberechnung Gefährdung CH Punkte": 4,
				"Artwertberechnung Gefährdung ZH Punkte": 3,
				"Artwertberechnung neuer Artwert": 11,
				"Artwertberechnung verwendeter Artwert": 11,
				"Ansprüche ans Moor":"Kein eigentlicher Moorbewohner, obwohl sehr gern (v.a. als Jungtier fast obligat) im Schilfröhricht. Eiablagestellen nur an mikroklimatisch begünstigten Stellen (v.a. Böschungen mit xerothermophiler, lückiger Vegetation).",
				"Kleine überlebensfähige Populationen, Anzahl angestrebt":"5+",
				"Ansprüche für Kriterium überlebensfähig":"regelmässige Reproduktion",
				"Regional fördern": true,
				"Regional fördern wo":" Glatt, Thur, Greifensee, Päffikersee, Katzensee",
				"Massnahmen":"Spezialprogramm (muss noch definiert werden)."
			}
		},
		{
			"Name":"ZH Artengruppen",
			"Beschreibung":"Artengruppen Kt. Zürich. Eigenschaften von allen Arten",
			"Datenstand":"2012",
			"Link":"http://www.naturschutz.zh.ch",
			"Felder": {
					"GIS-Layer":"Reptilien",
					"Artengruppen-ID in EvAB": 12
			}
		},
		{
            "Name": "ZH GIS";
			"Beschreibung":"GIS-Layer und Projektrelevanzen im Kanton Zürich. Eigenschaften von allen Arten",
			"Datenstand":"2012",
			"Link":"http://www.naturschutz.zh.ch",
			"Felder": {
				"Betrachtungsdistanz (m)": 500,
				"Kriterien für Bestimmung der Betrachtungsdistanz":"5 (500m als Minimalwert zugeteilt)"
			}
		}
	]
	"Beziehungen": [
        {
            "Name":"CH Agroscope Zielart (2008): Ziel-/Leitart für Lebensraum",
            "Beschreibung":"Agroscope (2008). Eigenschaften von 207 Tierarten",
            "Datenstand":"2008",
            "Link":"http://www.agroscope.admin.ch",
            "Art der Beziehungen":"Ziel-/Leitart für Lebensraum",
            "Beziehungen": [
                {
                    "Beziehungspartner": [
                        {
                            "Gruppe":"Lebensräume",
                            "Taxonomie":"CH Agroscope (2008): Ziel- und Leitarten",
                            "Name":"06: Weiher, Tümpel, Pfütze",
                            "GUID":"98DDA55D-7C24-4590-BEDE-9A1B02D77592"
                        }
                    ]
                }
            ]
        },
		{
			"Name":"ZH AP Grundlagen (1995): Art kommt in Lebensraum vor",
			"Beschreibung":"Einstufung von Arten im Kanton Zürich. Eigenschaften von 682 Tierarten und 3156 Pflanzenarten",
			"Datenstand":"ca. 1995",
			"Link":"http://www.naturschutz.zh.ch",
			"Art der Beziehungen":"Art kommt in Lebensraum vor",
			"Beziehungen": [
				{
					"Beziehungspartner": [
						{
							"Gruppe":"Lebensräume",
							"Taxonomie":"ZH FNS (1995)",
							"Name":"03: Seen",
							"GUID":"A0FC1442-784E-44BA-9FAD-8749AF9D7DCA"
						}
					]
				},
				{
					"Beziehungspartner": [
						{
							"Gruppe":"Lebensräume",
							"Taxonomie":"ZH FNS (1995)",
							"Name":"04: Weiher, Teiche",
							"GUID":"8B07E4E6-E768-4CE9-84D6-E490432FD140"
						}
					]
				}
			]
		},
		{
			"Name":"ZH AP FM (2010): Art ist an Lebensraum gebunden",
			"Beschreibung":"Aktionsplan Flachmoore des Kantons Zürich (2010). Eigenschaften von 728 Tierarten, 3500 Pflanzenarten, 57 Moosarten und 60 Lebensräumen. 10219 Beziehungen zwischen Tierarten und Lebensräumen. 664 Beziehungen zwischen Pflanzenarten und Lebensräumen. 79 Beziehungen zwischen Moosarten und Lebensräumen",
			"Datenstand":"2010",
			"Link":"http://www.naturschutz.zh.ch",
			"Art der Beziehungen":"Art ist an Lebensraum gebunden",
			"Beziehungen": [
				{
					"Beziehungspartner": [
						{
							"Gruppe":"Lebensräume",
							"Taxonomie":"ZH FNS (1977): Feuchtgebietskartierung, Lebensräume",
							"Name":"02: Röhricht",
							"GUID":"BF31ECDD-A540-4BA9-956C-BE51C3AA346E"
						}
					],
					"Biotopbindung":"7"
				}
			]
		}
	] 	
}
```
###Alternative Struktur für die Taxonomien?
Man könnte dem Dokument auch einen Array für Taxonomien verpassen. Darin würden alle synonymen Taxonomien aufgenommen, da sie ja dasselbe Objekt beschreiben. Die Taxonomie sähe am Beispiel von Thlaspi repens Maire so aus:
```javascript
"Taxonomien": [
	{
		"Name": "SISF Index 2 (2005)",
		"Beschreibung": "D. Aeschimann & C. Heitz: Synonymie-Index der Schweizer Flora (2005). Zweite Auflage. Eigenschaften von 7973 Pflanzenarten. Arten mit NR > 1000000 von der FNS provisorisch ergänzt",
		"Datenstand": "2007.05.08",
		"Link": "http://www.infoflora.ch/de/daten-beziehen/standard-artenliste.html",
		"Felder": {
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
		"Felder": {
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
- Synonyme haben automatisch alle Datensammlungen und Beziehungen aller anderen Synonyme. Kein Aufwand in Exporten, Schnittstellen und der Benutzeroberfläche!
- Das Datenmodell ist einheitlicher und einfacher - eleganter
- Eigentlich ist klar: Synonym = dieselbe Art mit denselben Eigenschaften (die Praxis sieht leider sicher anders aus)

Nachteile:

- Der strukturelle Umbau ist massiv, aufwändig und fehlerträchtig
- An sich ist es korrekt, wenn eine Datensammlung an derjenigen Taxonomie hängt, mit der sie erarbeitet wurde
- Synonymie ist datentechnisch gesehen eine Beziehung wie andere auch (z.B. hierarchisch). Beziehungen würden somit auf zwei unterschiedliche Arten behandelt
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

Vorläufige Schlussfolgerung: Das braucht noch reifliche Überlegung. Ist wohl keine gute Idee.

<a name="Schnittstellen"></a>
###Schnittstellen
CouchDb liefert seine im JSON-Format vorliegenden Daten mittels "views". Diese werden über die URL aufgerufen. Gibt es für die gewünschten Daten einen "view" und kennt man seine URL, kann man die Daten entsprechend einfach abholen. Damit "views" als öffentliche Schnittstellen benutzt werden können, müssen sie daher bloss beschrieben werden.

Genau wie die "views" funktionieren auch die Exporte über die URL: Die Exportfuntion übermittelt die im Formular erfassten Optionen mit der URL an die Datenbank, welche daraufhin kommagetrennte tabellarische Daten liefert. Um von einer anderen Anwendung direkt auf diese Daten zu greifen, muss man nur die Struktur der übermittelten URL studieren und die Daten auf die gleiche Art anfordern.

Mit Hilfe der ["view API"](http://wiki.apache.org/couchdb/HTTP_view_API) von CouchDb kann man bei beiden oben beschriebenen Varianten die Auswahl durch weitere Kriterien beeinflussen. Grundsätzlich werden in ArtenDb möglichst wenige "views" verwendet. Je nach Abfrage wird die URL mit weiteren Kriterien ergänzt. Der externe Zugriff kann gleich erfolgen.

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
- Beziehungen zwischen Arten werden mit Hyperlinks dargestellt
- Felder, die nur einen Web-Link enthalten, werden als Hyperlink angezeigt

Daten importieren:
- Datensammlungen (erster Entwurf, wird noch verbessert)

Daten exportieren:
- Objekte inklusive Taxonomien und Datensammlungen
- Zuerst werden die gewünschten Gruppen gewählt
- Es kann nach JEDEM in diesen Gruppen existierenden Feld gefiltert werden
- In einer übersichtlichen Liste können die gewünschten Felder gewählt werden
- Vor dem Export kann man die getroffene Wahl in einer Vorschau-Tabelle überprüfen

**To do**

- Importe: Beziehungen, Taxonomien
- Exporte: Beziehungen
- Alternative Taxonomien verwalten und darstellen
- Lebensräume in der Anwendung bearbeiten

<a href="#top">&#8593; top</a>

<a name="OpenSource"></a>
#Open source
Die für die Anwendung verwendete [Lizenz](https://github.com/barbalex/artendb/blob/master/License.md) ist sehr freizügig. Eine Weiterverbreitung der in der Anwendung enthaltenen Daten(sammlungen) ist aber nur mit Einverständnis der Autoren zulässig.

<a href="#top">&#8593; top</a>