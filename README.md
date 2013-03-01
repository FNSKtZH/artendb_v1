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
- ...weshalb prinzipiell alle beteiligten Stellen ihre Daten an einem Ort und in einem gemeinsamen Format anbieten könnten. Das mag etwas naiv und utopisch sein. Zumindest aber kann man innert Minuten anderswo verfügbare Daten in ArtenDb vereinen und in Auswertungen mit anderen Daten kombinieren

<a href="#top">&#8593; top</a>

<a name="Konzept"></a>
#Fachliches Konzept
###Der Grundgedanke
Die bisherige Access-Datenbank ist über zehn Jahre gewachsen. Nach und nach entstand ein komplexes Monstrum, das kaum noch zu verstehen und unterhalten war.

Ist etwas schwer verständlich, passieren Fehler. Wird es nicht verstanden, nützt es (früher oder später) nichts.

Der Grundgedanke hinter dem fachlichen und strukturellen Konzept der ArtenDb ist daher: Komplexität minimieren. Es gibt ein paar Grundbegriffe: Taxonomie, Objekt, Datensammlung, Eigenschaft und Beziehung. Daraus leiten sich nur noch zwei Grundstrukturen ab: Objekte und ihre Datensammlungen (inklusive Taxonomien, zusammenfassenden Datensammlungen und Beziehungen). Möglichst alles wird darauf zurückgeführt.

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
- Denselben Zweck: Die Datensammlung wurde in der Regel für einen bestimmten Zweck erarbeitet. Es ist hilfreich, wenn dies beschrieben wird
- Meist eine bestimmte Artgruppe (z.B. Flora, Fauna, Schmetterlinge…)
- Innerhalb der Artgruppe eine definierte Auswahl bearbeiteter Arten
- Definierte Methodik und Auswahl erfasster Informationen
- Verwendung einer bestimmten Taxonomie
- Dasselbe Aktualitäts- bzw. Publikationsdatum

Möglicherweise würde statt "Datensammlung" besser der Begriff "Publikation" verwendet. Damit würde klar:

- dass ArtenDb an Datensammlungen hohe Qualitätsansprüche stellt, für welche der Autor bürgt. Es muss nicht eine prominent platzierte wisschenschaftliche Publikation sein aber die fachliche Qualität sollte immer auf den definierten Zweck ausgerichtet sein
- dass eine aktualisierte Version einer bereits bestehenden Datensammlung in der Regel als neue Datensammlung zu behandeln ist

Datensammlungen sollten nur durch die Autoren nachgeführt werden.

Um Arten- und Lebensraumeigenschaften verstehen und verwalten zu können, ist es wichtig, Datensammlungen als wesentlichen Teil der Struktur zu behandeln. In ArtenDb sind sie Eigenschaften der Objekte. Sie erleichtern dem Benutzer, die Übersicht über die riesige Menge von Eigenschaften zu gewinnen.

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

Die durch die Taxonomische Einheit definierten Objekte (Arten und Lebensräume) werden als eigene Dokumente im [JSON-Format](http://de.wikipedia.org/wiki/JavaScript_Object_Notation) gespeichert (Typ: "Objekt"). Sie enthalten eine id ([GUID](http://de.wikipedia.org/wiki/Globally_Unique_Identifier)).

Im Dokument wird die Taxonomie und alle das Objekt beschreibenden Datensammlungen beschrieben, z.B. mit:
- Name: obligatorisch, muss eineindeutig sein, Schreibweise angelehnt an Literaturzitate aber möglichst kurz
- Allgemeine Beschreibung (ungefähr ein Literaturzitat)
- Datenstand
- Link

Taxonomien haben den "Typ" "Taxonomie", Datensammlungen den Typ "Datensammlung".

Alle Eigenschaften des Objekts werden wiederum hierarchisch unter ihrer Taxonomie oder Datensammlung als "Felder" gespeichert.

Hier als Beispiel der Siebenschläfer:
<a name="JsonBeispiel"></a>
```javascript
{
   "_id": "509CCEB1-51BF-4629-B1FD-1B100BFDF3AD",
   "_rev": "6-ce53932746590810687420298ffe3620",
   "Gruppe": "Fauna",
   "Typ": "Objekt",
   "CSCF (2009)": {
       "Typ": "Taxonomie",
       "Beschreibung": "Index der Info Fauna (2009). Eigenschaften von 21542 Tierarten",
       "Datenstand": "2009",
       "Link": "http://www.cscf.ch/",
       "Felder": {
           "Taxonomie ID": 70810,
           "Klasse": "Mammalia",
           "Ordnung": "Rodentia",
           "Familie": "Gliridae (nae)",
           "Gattung": "Glis",
           "Art": "glis",
           "Autor": "(Linnaeus, 1766)",
           "Artname": "Glis glis (Linnaeus, 1766)",
           "Artname vollständig": "Glis glis (Linnaeus, 1766) (Siebenschläfer)",
           "Name Deutsch": "Siebenschläfer",
           "Name Französisch": "Loir",
           "Name Italienisch": "Ghiro",
           "Name Romanisch": "Durmigliet grisch",
           "Name Englisch": "Fat dormouse",
           "Schutz CH": "kantonal zu schützende Arten"
       }
   },
   "CH Rote Listen (unterschiedliche Jahre)": {
       "Typ": "Datensammlung",
       "Beschreibung": "Aktuellster Stand pro Artengruppe der Roten Listen. Eigenschaften von 2284 Tierarten",
       "Datenstand": "unterschiedlich",
       "Felder": {
           "Europa": "nicht gefährdet",
           "Schweiz aktuell": "nicht gefährdet",
           "Nordschweiz": "nicht gefährdet",
           "Kt Zürich": "nicht gefährdet"
       }
   },
   "ZH Artwert (1995)": {
       "Typ": "Datensammlung",
       "Beschreibung": "Artwerte für den Kanton Zürich. Eigenschaften von 1530 Tierarten, 2763 Pflanzenarten und 34 Moosarten",
       "Datenstand": "ca. 1995",
       "Link": "http://www.naturschutz.zh.ch",
       "Felder": {
           "Artwert": 0,
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
           "Bestandesentwicklung 1985-2000": "nicht beurteilt",
           "Keine Bestandesabnahme aber Population bedroht": "nicht beurteilt",
           "Fördermassnahmen bekannt": "nicht beurteilt",
           "Geeignete Lebensräume vohanden oder herstellbar": "nicht beurteilt",
           "Überlebensfähige Populationen vorhanden": "nicht beurteilt",
           "Etablierungs-Potential gut": "nicht beurteilt",
           "Ausbreitungs-Potential gut": "nicht beurteilt",
           "Erfolgsaussichten vorhanden": "nicht beurteilt",
           "Nationales Artenschutzprogramm": "nicht beurteilt",
           "Höchste Dringlichkeit": "nicht beurteilt",
           "Verhältnis Aufwand-Ertrag günstig": "nicht beurteilt",
           "Umbrella- oder flagship-species": "nicht beurteilt",
           "Bereits irgendwo Artenschutzprogramme": "nicht beurteilt",
           "Dringlichkeit": "nicht beurteilt",
           "Schutz": "kantonal zu schützende Arten"
       }
   },
   "ZH Artengruppen": {
       "Typ": "Datensammlung",
       "Beschreibung": "Artengruppen Kt. Zürich. Eigenschaften von allen Arten",
       "Datenstand": "2012",
       "Link": "http://www.naturschutz.zh.ch",
       "Felder": {
           "GIS-Layer": "Saeugetiere",
           "Artengruppen-ID in EvAB": 13
       }
   },
   "ZH GIS": {
       "Typ": "Datensammlung",
       "Beschreibung": "GIS-Layer und Projektrelevanzen im Kanton Zürich. Eigenschaften von allen Arten",
       "Datenstand": "2012",
       "Link": "http://www.naturschutz.zh.ch",
       "Felder": {
           "Betrachtungsdistanz (m)": 3000,
           "Berücksichtigen wenn in Betrachtungsdistanz nicht ausgewiesen": true,
           "Kriterien für Bestimmung der Betrachtungsdistanz": "12"
       }
   }
}
```

Das kann jeder Laie direkt lesen, obwohl es maschinenlesbare Rohdaten sind. Man muss bloss einen Editor verwenden, der die Struktur von JSON-Daten optisch umsetzt.

Versuchen Sie einmal, diese Informationen aus einer relationalen Datenbank abzufragen und so übersichtlich darzustellen. Es wäre nur schon eine Kunst, die diversen Felder nicht anzuzeigen, in denen für diese Art keine Informationen enthalten sind. Die Zusammenfassung aller Datensammlungen in einer einzigen Zeile vernichtet jede strukturelle Information und ist sehr schlecht lesbar. Und dann darf man sich noch mit so interessanten Problemen rumschlagen wie: Wie wird garantiert, dass jeder Feldname _über alle Datensammlungen hinweg_ eindeutig ist? Dies ist in JSON kein Problem, da die Felder aufgrund der vorhandenen Hierarchie eindeutig sind.

Verglichen mit der Datenstruktur in der relationalen Datenbank wurde hier Komplexität (Dutzende verknüpfter Tabellen) durch Redundanz ersetzt (die Datensammlungen werden in jedem Objekt beschrieben, für welches sie Informationen haben).

Zur Verdeutlichung nachfolgend Teilauszüge und Ergänzungen:

Das ist die Taxonomie des Siebenschläfers:
```javascript
"CSCF (2009)": {
   "Typ": "Taxonomie",
   "Beschreibung": "Index der Info Fauna (2009). Eigenschaften von 21542 Tierarten",
   "Datenstand": "2009",
   "Link": "http://www.cscf.ch/",
   "Felder": {
       "Taxonomie ID": 70810,
       "Klasse": "Mammalia",
       "Ordnung": "Rodentia",
       "Familie": "Gliridae (nae)",
       "Gattung": "Glis",
       "Art": "glis",
       "Autor": "(Linnaeus, 1766)",
       "Artname": "Glis glis (Linnaeus, 1766)",
       "Artname vollständig": "Glis glis (Linnaeus, 1766) (Siebenschläfer)",
       "Name Deutsch": "Siebenschläfer",
       "Name Französisch": "Loir",
       "Name Italienisch": "Ghiro",
       "Name Romanisch": "Durmigliet grisch",
       "Name Englisch": "Fat dormouse",
       "Schutz CH": "kantonal zu schützende Arten"
   }
}
```
...und das hier eine beliebige Datensammlung:
```javascript
"CH Rote Listen (unterschiedliche Jahre)": {
   "Typ": "Datensammlung",
   "Beschreibung": "Aktuellster Stand pro Artengruppe der Roten Listen. Eigenschaften von 2284 Tierarten",
   "Datenstand": "unterschiedlich",
   "Felder": {
       "Europa": "nicht gefährdet",
       "Schweiz aktuell": "nicht gefährdet",
       "Nordschweiz": "nicht gefährdet",
       "Kt Zürich": "nicht gefährdet"
   }
}
```
Unterschiede zwischen Taxonomie und (gewöhnlicher) Datensammlung:

- Es gibt in jedem Dokument nur eine Taxonomie
- Sie hat den Typ "Taxonomie"

####Beziehungen
Beziehungen werden ähnlich wie Datensammlungen gespeichert. Hier ein Auszug aus einer anderen Art:
```javascript
"CH Delarze (2008): Art charakterisiert Lebensraum": {
    "Typ": "Beziehung",
    "Beschreibung": "Delarze R. & Gonseth Y. (2008): Lebensräume der Schweiz. 791 Beziehungen zwischen 279 Lebensräumen und Tierarten",
    "Beziehungen": [
        {
            "Beziehungspartner": [
                {
                    "Gruppe": "Lebensräume",
                    "Taxonomie": "CH Delarze (2008): Lebensräume",
                    "Name": "4.5.1: Fromentalwiese",
                    "GUID": "A899856C-2D28-4768-A0E4-85C626B6358A"
                }
            ],
            "Art der Beziehung": "Art charakterisiert Lebensraum"
        }
    ]
}
```
Unterschiede zwischen Beziehungen und (gewöhnlicher) Datensammlung:

- Der Typ heisst "Beziehung"
- Anstatt "Felder" enthält die Beziehung "Beziehungen". Darin sind beliebig viele Beziehungen enthalten
- Jede Beziehung enthält im Feld "Beziehungspartner" beliebig viele beteiligte Objekte. Daneben kann sie wie gewöhnliche Datensammlungen weitere beschreibende Felder enthalten. Der Begriff "Beziehungspartner" wird anstelle von "Objekt" verwendet, weil er im Kontext der Beziehung aussagekräftiger ist
- Nicht immer werden alle Beziehungen der Datensammlung in eine einzige Eigenschaft des JSON-Dokuments gepackt: Enthält eine Datensammlung mehrere Arten von Beziehungen, werden sie in unterschiedliche JSON-Eigenschaften geschrieben. Die Art der Beziehung kommt im jeweiligen Namen der Eigenschaft zum Ausdruck. So wird die Übersichtlichkeit der Daten verbessert. Beispielsweise könnte es neben der Eigenschaft "CH Delarze (2008): Art charakterisiert Lebensraum" auch eine separate Eigenschaft "CH Delarze (2008): Art ist Zielart im Lebensraum" geben. Aufgrund dieser Methodik ist auch der nächste Punkt möglich:
- Beziehungen taxonomischer Art wie z.B. "synonym" erhalten zusätzlich zum Typ "Beziehung" einen Untertyp "taxonomisch". So können sie separat angesprochen, z.B. für den Aufbau eines Beziehungsbaums oder die Darstellung der Datensammlungen auf dem Bildschirm

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
- Objekte inklusive Taxonomien und Datensammlungen
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
