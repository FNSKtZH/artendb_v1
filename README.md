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
- Entscheidend für die Aktualität der Datenbank ist es, die Informationen einfach und mit geringem Aufwand importieren und danach direkt nutzen zu können. Neu erscheinende Datensammlungen müssen rasch und nebenbei ergänzt werden können, d.h. in den paar Minuten, die man im Alltag weniger prioritären Aufgaben widmen kann
- Art- und Lebensraumeigenschaften interessieren nicht nur die Fachstelle Naturschutz des Kantons Zürich. Ideal wäre eine von allen in diesem Bereich tätigen Stellen gemeinsam nachgeführte Datenbank. Oder mindestens: Ein Ort, an dem frei zugängliche Daten mit wenig Aufwand vereint werden können
- Die aktuelle Datenbank basiert auf Microsoft Access. Eine sinnvolle Weiterentwicklung und breite Verfügbarkeit sind damit nicht möglich

###Das Zielpublikum
...befasst sich mit Arten und Lebensräumen. Es arbeitet primär in den Sachbereichen Naturschutz, Jagd und Fischerei, Gewässer, Wald, Landwirtschaft und Problemarten. Angesprochen sein dürften Fachstellen bei Bund, Kantonen, Gemeinden, Forschungseinrichtungen und freischaffende Fachleute bzw. Ökobüros.

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

- Datensammlungen können in wenigen Minuten importiert werden. Es werden keine besonderen technischen Fähigkeiten vorausgesetzt
- Die Datenstruktur ist bereits in den Rohdaten sichtbar und verständlich
- Der Code ist gut dokumentiert
- Der Code ist offen und Nutzer können eigene Erweiterungen entwickeln

###Was zeichnet ArtenDb aus?
Die wichtigsten Merkmale dürften sein:

- Die verwendeten Begriffe und Datenstrukturen sind auf Eigenschaften von Arten und Lebensräumen zugeschnitten
- Daten können einfach und rasch importiert werden...
- ...weshalb prinzipiell alle beteiligten Stellen ihre Daten an einem Ort und in einem gemeinsamen Format anbieten könnten. Das mag etwas naiv und utopisch sein. Zumindest aber kann man innert Minuten anderswo verfügbare Daten in ArtenDb vereinen und gemeinsam in Auswertungen verwenden

<a href="#top">&#8593; top</a>

<a name="Konzept"></a>
#Fachliches Konzept
###Der Grundgedanke
Die bisherige Access-Datenbank ist über zehn Jahre gewachsen. Irgendwann entpuppte sie sich als komplexes Monstrum, dass kaum noch zu verstehen und zu unterhalten war.

Ist etwas schwer verständlich, passieren Fehler. Wird es nicht verstanden, nützt es nichts.

Der Grundgedanke hinter dem fachlichen und strukturellen Konzept der ArtenDb ist daher: Komplexität minimieren. Es gibt ein paar Grundbegriffe und daraus abgeleitete Datenstrukturen: Taxonomie, Objekt, Datensammlung, Eigenschaft und Beziehung. Möglichst alles soll darauf zurückgeführt werden.

###Taxonomien
[Taxonomien](http://de.wikipedia.org/wiki/Taxonomie) klassifizieren <a href="http://de.wikipedia.org/wiki/Objekt_(Programmierung)">Objekte</a> (in der ArtenDb: Arten und Lebensräume) mit einer [Hierarchie](http://de.wikipedia.org/wiki/Hierarchie). Darauf bauen alle Datensammlungen und deren [Eigenschaften](http://de.wikipedia.org/wiki/Eigenschaft) auf. Die Entwicklung von Taxonomien und der Umgang mit unterschiedlichen und sich laufend verändernden Taxonomien sind höchst anspruchsvoll.

Andere geläufige Begriffe: Nomenklatur, Index, Flora, Kartierschlüssel, Lebensraumschlüssel. 

Beispiele: Indizes der nationalen Artdatenzentren, "Flora der Schweiz (Ausgabe 2012)", "Lebensraumkartierung Neeracher Riet 2009", "Flora Europaea (Ellenberg, 1991)".

Taxonomien werden in der JSON-Struktur gleich verwaltet wie Datensammlungen. Bloss heisst ihr Typ "Taxonomie" (statt "Datensammlung") und pro Objekt wird immer genau eine Taxonomie beschrieben.

Taxonomische Beziehungen, z.B. "synonym", werden (künftig) ähnlich wie andere Beziehungen verwaltet.

Die Benutzerin soll die Arten wahlweise nach allen in den Daten enthaltenen Taxonomien darstellen können. Im Standard wird bei Arten die Hierarchie der vom zuständigen nationalen Zentrum verwendeten Taxonomie angezeigt. 

Im Idealfall enthielte die aktuell vom nationalen Zentrum verwendete Taxonomie nur "offizielle" Arten und z.B. keine Synonyme. Stattdessen würden Beziehungen zwischen offiziellen Arten und Arten anderer Taxonomien beschrieben. Da die Daten von den nationalen Zentren unseres Wissens (noch?) nicht so erhältlich sind, ist das in ArtenDb leider nicht realisiert aber im Design vorgesehen und bei Vorliegen entsprechender Daten direkt umsetzbar.

In der ArtenDb werden Lebensraumschlüssel auch als Taxonomien behandelt und bezeichnet. Bloss werden im Hierarchiebaum alle Taxonomien angezeigt. Das ist hier nützlicher, weil es bei Lebensräumen sehr viele Taxonomien gibt und man meistens nicht mit der Standard-Taxonomie arbeitet. Es kann z.B. sinnvoll sein, in einem Projekt einen eigenen Lebensraumschlüssel zu entwickeln. Deshalb sollen Lebensräume auch direkt in der Anwendung bearbeitet werden können.

###Objekte
<a href="http://de.wikipedia.org/wiki/Objekt_(Programmierung)">Objekte</a> bilden die Grundeinheit der Taxonomie. In der ArtenDb sind das Arten oder Lebensräume. Letztere Begriffe werden in der Benutzeroberfläche verwendet. "Objekte" ist eher von technischer und konzeptioneller Bedeutung.

###Gruppen
Arten werden in Gruppen eingeteilt: Fauna, Flora, Moose und Pilze. Die nationalen Artdatenzentren sind so organisiert und es hat sich eingebürgert und bewährt.

###Datensammlungen
Systematische Informationen über Arten kommen in ganzen Datensammlungen, z.B. „Flora Indicativa 2010“. Solche Datensammlungen haben gemeinsame Eigenschaften wie z.B.:

- Dieselbe Herkunft (Autoren, Publikation)
- Meist eine bestimmte Artgruppe (z.B. Flora, Fauna, Schmetterlinge…)
- Innerhalb der Artgruppe eine definierte Auswahl bearbeiteter Arten
- Definierte Methodik und Auswahl erfasster Informationen
- Verwendung einer bestimmten Taxonomie
- Dassselbe Aktualitäts- bzw. Publikationsdatum

Möglicherweise würde statt "Datensammlung" besser der Begriff "Publikation" verwendet. Damit würde klar, dass eine aktualisierte Version einer bereits bestehenden Datensammlung in der Regel als neue Datensammlung zu behandeln ist.

Datensammlungen sollten nur durch die Autoren nachgeführt werden.

Um Arten- und Lebensraumeigenschaften verstehen und verwalten zu können, ist es wichtig, Datensammlungen als wesentlichen Teil der Struktur zu behandeln. In ArtenDb sind Datensammlungen Eigenschaften der Objekte. Sie erleichtern dem Benutzer, die Übersicht über die riesige Menge von Eigenschaften zu gewinnen, welche in der ArtenDb vorhanden sind.

In ArtenDb sollen künftig auch Datensammlungen von synonymen Objekten angezeigt und exportiert werden können.

In fast allen Fällen ist es sinnvoll, Eigenschaften und Beziehungen pro Datensammlung darzustellen bzw. zusammenzufassen. Z.B. bei der Anzeige in der Anwendung oder wenn für Exporte Felder ausgewählt werden.

###Zusammenfassende Datensammlungen
Für bestimmte Zwecke ist zusätzlich das Gegenteil interessant: Felder aus verschiedenen Datensammlungen zusammenfassen. Z.B. wenn man über alle Artengruppen den aktuellsten Rote-Liste-Status darstellen will. Er steckt in diversen Datensammlungen, da er für viele Artengruppen separat publiziert wird.

Das soll so erfolgen:

- In den jeweiligen Objekten (Arten und Lebensräumen) wird eine zusätzliche Datensammlung mit Untertyp "zusammenfassend" geschaffen
- Die entsprechenden Daten werden zwei mal importiert:
 - Ein mal in die Ursprungs-Datensammlung
 - Ein mal in die zusammenfassende
- Die zusammenfassende Datensammlung kann genau gleich wie alle anderen Datensammlungen in der Anwendung angezeigt, exportiert oder über eine Schnittstelle angezapft werden

Beispiel: Für Heuschrecken wird eine neue Rote Liste publiziert:
- Es wird eine neue Datensammlung geschaffen, z.B. "BAFU (2012): Rote Liste der Heuschrecken" und die Eigenschaften importiert
- Die alte Datensammlung bleibt bestehen, z.B. "BUWAL (1985): Rote Liste der Heuschrecken"
- Entweder es gibt schon die zusammenfassende Datensammlung "Rote Listen (aktuell)". Dann werden die Eigenschaften von "BAFU (2012): Rote Liste der Heuschrecken" hier hinein nochmals importiert. Dabei werden bisherige Rote-Listen-Angaben der entsprechenden Heuschrecken überschrieben
- Oder "Rote Listen (aktuell)" wird jetzt erstmals beschrieben und als zusammenfassend markiert. Dann werden die Rote-Liste-Angaben allenfalls bereits existierender Datensammlungen (im Beispiel diejenige von 1985) in der Reihenfolge ihrer Publikation importiert (falls keine Originaldaten vorliegen: indem sie zuerst von den Ursprungs-Datensammlungen exportiert werden). Zuletzt werden die Daten von "BAFU (2012): Rote Liste der Heuschrecken" nochmals in diese Datensammlung importiert
- Falls einige 1985 beschriebene Arten 2012 nicht mehr beschrieben wurden, bleibt der Rote-Liste-Status von 1985 erhalten. Um dies deutlich zu machen, soll in der zusammenfassenden Datensammlung in einem zusätzlichen Feld "Herkunft" immer der Name der Ursprungs-Datensammlung mitgeliefert werden

Normalerweise würden in ArtenDb zuerst die alten Datensammlungen erfasst und erst später neuere. Es kann aber auch vorkommen, dass nachträglich eine ältere Datensammlung importiert wird, für die bereits eine zusammenfassende Datensammlung mit neueren Daten existiert. In diesem Fall sollte die Benutzerin wählen können, dass in der zusammenfassenden Datensammlung vorhandene Daten nicht überschrieben werden. Oder flexibler: Aus welchen Herkünften stammende zusammenfassende Einträge nicht überschrieben werden sollen (die Idee, das mit einem Aktualitäsdatum für die Datensammlung automatisch abzufangen habe ich verworfen: Sie funktioniert nicht, wenn eine Datensammlung Eigenschaften mit unterschiedlicher Aktualität enthält).

###Art- und Lebensraumeigenschaften
...beschreiben einzelne Objekte. Beispiele: Artwert, Rote-Liste-Status, nationale Priorität.

###Beziehungen
...beschreiben das Verhältnis zwischen zwei oder mehr Objekten. Beispiele: Bindung von Arten an Biotope, Frasspflanzen von Insekten, Wirte von Parasiten. Aber auch taxonomische Beziehungen wie "synonym". Die eine Beziehung beschreibenden Attribute sind spezielle Art- und Lebensraumeigenschaften und wie diese (oft gemeinsam mit ihnen) Teil von Datensammlungen.

###Gruppen vereinen
In der bisherigen, relationalen Datenbank werden die Gruppen (Flora, Fauna, Moose, Pilze, Lebensräume) in unterschiedlichen Tabellen verwaltet. Das erhöht die Komplexität der Anwendung und erschwert jede Auswertung enorm. Beispielweise müssen alle Beziehungen zu anderen Arten oder Lebensräumen für jede Gruppe separat verwaltet werden, d.h. bis zu 10-fach. Und müssen in Auswertungen mittels Union-Abfragen wieder zusammengeführt werden. Zumindest in Access kann das aber nicht mehr geändert werden, weil z.B. in der Floratabelle die maximale Anzahl möglicher Indizes (32) erreicht ist und jede Beziehung einen Index voraussetzt. Die (schlechte) Variante, alle Informationen in einer einzigen Riesentabelle zu vereinigen, scheitert wiederum an der maximalen Anzahl Felder (255) und an der maximalen Datenmenge pro Datensatz (2KB).

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

Im Baum wird dynamisch die Hierarchie der Objekte aufgebaut - soweit sie in der betreffenden Gruppe vorliegt.

**Formular**

Klickt man auf den Namen einer Taxonomie oder Datensammlung, werden die dazugehörigen Eigenschaften angezeigt: Zuoberst die Beschreibung der Datensammlung. Darunter die Eigenschaften des Objekts oder der Beziehung.<br>Hier ein Beispiel für Arteigenschaften:
<img src="https://raw.github.com/barbalex/artendb/master/_attachments/img/eisvogel_rl.png" alt="Beispiel Eisvogel, Datensammlung Rote Liste" width="100%">

...und eines für Beziehungen:
<img src="https://raw.github.com/barbalex/artendb/master/_attachments/img/eisvogel_beziehung.png" alt="Beispiel Eisvogel, Biotopbindung nach AP FM ZH" width="100%">

Aus der [JSON-Struktur](http://de.wikipedia.org/wiki/JavaScript_Object_Notation) des Datensatzes erzeugt ArtenDb dynamisch eine simple Liste aller Felder. true/false Werte werden mit einer Checkbox dargestellt. Text unter 50 Zeichen mit einem Textfeld. Längerer Text mit einer "Textarea". Diese wird beim Anzeigen der Seite an die Länge des Inhalts angepasst. Zahlen werden in einem Zahlenfeld angezeigt.

In der Taxonomie werden Synonyme und eingeschlossene Arten als kommagetrennte Liste von Links angezeigt.

Künftig sollen zuunterst auch Datensammlungen von synonymen Objekten angezeigt werden.

**Menu**

Das Menu ermöglicht:

- Exporte
- Importe
- Bildersuche
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

Die Datenfelder in der Benutzeroberfläche und in Exporten werden dynamisch aus den für die Art gespeicherten Attributen aufgebaut. Somit können soeben importierte Eigenschaften direkt angezeigt und exportiert werden.

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
* Die Datenbank [CouchDb](http://couchdb.apache.org/)
* CouchDb als [CouchApp](http://couchapp.org/page/index). In dieser Form kann die Anwendung auch lokal installiert werden und sie ist ihr eigener Webserver
* [JavaScript](http://de.wikipedia.org/wiki/JavaScript) und [jQuery](http://jquery.com/) für die Programmierung
* [HTML5](http://de.wikipedia.org/wiki/HTML5), [CSS](http://de.wikipedia.org/wiki/Cascading_Style_Sheets), [Bootstrap](http://twitter.github.com/bootstrap/) und [jsTree](http://www.jstree.com/) für die Benutzeroberfläche

###Dokumenten-Datenbank
In der relationalen Datenbank sieht die ideale Datenstruktur von Arteigenschaften so aus: Für jede Datensammlung existiert eine eigene Tabelle. Sie wird 1:1 mit der Taxonomie verbunden. Fasst man in einer Abfrage verschiedene Datensammlungen zusammen, enthalten nur noch wenige Felder Informationen. Diese Struktur ist für eine traditionelle, tabellenbasierte Datenbank wenig geeignet. Für eine Dokumenten-Datenbank hingegen ist sie ideal.

Eine Dokumenten-Datenbank speichert jeden Datensatz in einem eigenen Dokument statt in starren Tabellen. Man kann sich das wie eine Karteikarte vorstellen, auf der die Informationen notiert werden. Dieses System eignet sich hervorragend, um ohne Einbezug des Systemadministrators zuvor nicht geplante neue Felder zu ergänzen. Und das ist genau, was die meisten Datensammlungen brauchen.

Eine Dokumenten-Datenbank ist auch ideal, um alle Arten gleich zu verwalten und Gruppen (Flora, Fauna, Moose, Pilze, Flechten, sogar die Lebensräume) nur aufgrund eines Attributs zu unterscheiden (natürlich enthalten die jeweiligen Datensammlungen je nach Gruppe spezifische Eigenschaften). Beziehungen zwischen Objekten gestalten sich entsprechend einfach.

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
   "_rev": "13-231cd4663a63ec118fa4672042c0d5b3",
   "Gruppe": "Fauna",
   "Typ": "Objekt",
   "CSCF (2009)": {
       "Typ": "Taxonomie",
       "Beschreibung": "Index der Info Fauna (2009). Eigenschaften von 21542 Tierarten",
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
   "CH Rote Listen (unterschiedliche Jahre)": {
       "Typ": "Datensammlung",
       "Beschreibung": "Aktuellster Stand pro Artengruppe der Roten Listen. Eigenschaften von 2284 Tierarten",
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
   "Blaue Liste (1998)": {
       "Typ": "Datensammlung",
       "Beschreibung": "Gigon A. et al. (1998): Blaue Listen der erfolgreich erhaltenen oder geförderten Tier- und Pflanzenarten der Roten Listen. Methodik und Anwendung in der nördlichen Schweiz. Veröff. Geobot. Inst. ETH, Stiftung Rübel, Zürich 129: 1-137 + 180 pp. Appendicesn. Eigenschaften von 207 Tierarten und 885 Pflanzenarten",
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
   "CH Prioritäten (2011)": {
       "Typ": "Datensammlung",
       "Beschreibung": "BAFU (2011): Liste der National Prioritären Arten. Eigenschaften von 607 Tierarten, 2595 Pflanzenarten, 934 Pilzarten und 415 Moosarten",
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
   "CH Umweltziele LW (2008)": {
       "Typ": "Datensammlung",
       "Beschreibung": "BAFU und BLW (2008): Umweltziele Landwirtschaft. Hergeleitet aus bestehenden rechtlichen Grundlagen. Eigenschaften von 374 Tierarten, 731 Pflanzenarten und 99 Moosarten. 2046 Beziehungen zwischen Lebensräumen und Tierarten. 3080 Beziehungen zwischen Lebensräumen und Pflanzenarten. 602 Beziehungen zwischen Lebensräumen und Moosarten\r\nUmwelt-Wissen Nr. 0820. Bundesamt für Umwelt, Bern: 221 S.",
       "Datenstand": "2008",
       "Link": "http://www.bafu.admin.ch/publikationen/publikation/00097/index.html?lang=de",
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
   "CH Agroscope Zielart (2008)": {
       "Typ": "Datensammlung",
       "Beschreibung": "Agroscope (2008). Eigenschaften von 207 Tierarten",
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
   "ZH Artwert (1995)": {
       "Typ": "Datensammlung",
       "Beschreibung": "Artwerte für den Kanton Zürich. Eigenschaften von 1530 Tierarten, 2763 Pflanzenarten und 34 Moosarten",
       "Datenstand": "ca. 1995",
       "Link": "http://www.naturschutz.zh.ch",
       "Felder": {
           "Artwert": 8,
           "Artwertberechnung Areal weltweit": "gross (0 Punkte)",
           "Artwertberechnung Anteil am CH-Bestand": "klein: <1/4 (0 Punkte)"
       }
   },
   "ZH AP Fauna": {
       "Typ": "Datensammlung",
       "Beschreibung": "Aktionsplan Fauna des Kantons Zürich. Eigenschaften von 36 Tierarten",
       "Datenstand": "2007",
       "Link": "http://www.naturschutz.zh.ch",
       "Felder": {
           "Status": "erstellt",
           "Beginn im Jahr": 2004,
           "Stand Umsetzung": "noch keine Umsetzung",
           "Link zum AP-Bericht": "http://www.aln.zh.ch/internet/baudirektion/aln/de/naturschutz/artenfoerderung/ap_fa/schlingnatter.html"
       }
   },
   "ZH AP Grundlagen (1995)": {
       "Typ": "Datensammlung",
       "Beschreibung": "Einstufung von Arten im Kanton Zürich. Eigenschaften von 682 Tierarten und 3156 Pflanzenarten",
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
   "ZH AP LiWa (2009)": {
       "Typ": "Datensammlung",
       "Beschreibung": "Aktionsplan Lichter Wald des Kantons Zürich. Eigenschaften von 51 Tierarten und 609 Pflanzenarten",
       "Datenstand": "2009",
       "Link": "http://www.naturschutz.zh.ch",
       "Felder": {
           "Zielart": true,
           "AP LiWa Artwert": 11
       }
   },
   "ZH AP TWW (2011)": {
       "Typ": "Datensammlung",
       "Beschreibung": "Aktionsplan Trockene Wiesen und Weiden des Kantons Zürich. Eigenschaften von 1113 Tierarten, 1199 Pflanzenarten, 38 Moosarten, 31 Lebensräumen sowie 5006 Beziehungen zwischen Pflanzenarten und Lebensräumen",
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
           "Betrachtungsdistanz (m)": 3000,
           "Kriterien für Bestimmung der Betrachtungsdistanz": "9"
       }
   }
}
```

Das kann jeder Laie direkt lesen, obwohl es maschinenlesbare Rohdaten sind. Man muss bloss einen Editor verwenden, der die Struktur von JSON-Daten optisch umsetzt.

Versuchen Sie einmal, diese Informationen aus einer relationalen Datenbank abzufragen und so übersichtlich darzustellen. Es wäre nur schon eine Kunst, die diversen Felder nicht anzuzeigen, in denen für diese Art keine Informationen enthalten sind. Die Zusammenfassung aller Datensammlungen in einer einzigen Zeile vernichtet jede strukturelle Information und ist sehr schlecht lesbar. Und dann darf man sich noch mit so interessanten Problemen rumschlagen wie: Wie wird garantiert, dass jeder Feldname _über alle Datensammlungen hinweg_ eindeutig ist? Dies ist in JSON kein Problem, da die Felder aufgrund der vorhandenen Hierarchie eindeutig sind.

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

Hinweis: Die Struktur der Beziehungen wird nächstens umgebaut. Statt in eigenen Dokumenten sollen Beziehungen ähnlich wie Datensammlungen im Dokument des Objekts enthalten sein. Die Information über die Beziehungspartner wird wie die übrigen Eigenschaften der Beziehung in der Eigenschaft "Felder" enthalten sein. Das hat folgende Vorteile:

- Die Daten sind viel besser lesbar
- Die Informationen zusammenzuziehen erfordert VIEL weniger Datenbankzugriffe
- Konzeptionell und in der Anwendung entstehen viele Synergien mit Datensammlungen und Taxonomien

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
- Datensammlungen (erster Entwurf, wird noch verbessert)

Daten exportieren:
- Objekte inklusive Datensammlungen
- Zuerst werden die gewünschten Gruppen gewählt
- Es kann nach JEDEM in diesen Gruppen existierenden Feld gefiltert werden
- In einer übersichtlichen Liste können die gewünschten Felder gewählt werden 

**To do**

- Importe: Beziehungen, Taxonomien
- Exporte: Beziehungen
- Alternative Taxonomien verwalten und darstellen
- Lebensräume in der Anwendung bearbeiten
- Eventuell: Alle Objekte in der Anwendung bearbeiten

<a href="#top">&#8593; top</a>

<a name="OpenSource"></a>
#Open source
Die für die Anwendung verwendete [Lizenz](https://github.com/barbalex/artendb/blob/master/License.md) ist sehr freizügig. Eine Weiterverbreitung der in der Anwendung enthaltenen Daten(sammlungen) ist aber nur mit Einverständnis der Autoren zulässig.

<a href="#top">&#8593; top</a>
