<p>Die Arten- und Lebensraumdatenbank existiert schon. Sie kann <a target="_blank" href="http://www.aln.zh.ch/internet/baudirektion/aln/de/naturschutz/naturschutzdaten/tools/arten_db.html#a-content">hier</a> kostenlos heruntergeladen werden.</p>
<p>Als ich in der Fachstelle Naturschutz angefangen habe, existierte bereits eine Version. Sie wurde in den letzten vier Jahren stark ausgebaut und weiterentwickelt. Mittlerweile überlege ich mir, wie sie weiterentwickelt werden könnte. Ausgangspunkt sind ein paar Feststellungen:</p>
<ul>
	<li>Art- und Lebensraumeigenschaften müssten nicht nur die Fachstelle Naturschutz des Kantons Zürich interessieren. Ideal wäre eine von allen in diesem Bereich tätigen Stellen gemeinsam nachgeführte Datenbank</li>
	<li>Die aktuelle DB kann zwar im Internet frei heruntergeladen werden. Sie setzt aber Microsoft Access voraus. Die Anzahl Geräte, welche sie nutzen können, ist daher stark eingeschränkt</li>
	<li>Microsoft Access hat als relationale, dateigebundene Datenbank und als die Anwendung, die sie ist, technische Rahmenbedingungen, die einer Weiterentwicklung im obigen Sinn im Wege stehen</li>
	<li>Bei einer Datenbank, die von verschiedensten Stellen nachgeführt wird, sollte die Benutzeroberfläche dynamisch aus den internen Datenstrukturen aufgebaut werden (siehe unten)</li>  
</ul>
<p>&nbsp;</p>
<h1>Was ist wichtig?</h1>
<p>Für die Benutzerin:</p>
<ul>
	<li>Die Anwendung ist einfach zu bedienen</li>
	<li>Die Datenflut kann bewältigt werden:&nbsp;<br />- Die Benutzerin wählt, welche Daten sie sehen oder exportieren will<br />- Leere Felder werden im Lesemodus nicht angezeigt</li>
	<li>Die Daten sind gut dokumentiert, neue Benutzer finden sich rasch zurecht</li>
	<li>Die Daten sind gut verfügbar:<br />- Von jedem Gerät im Internet<br />- Als Export im csv-Format (ev. weitere)<br />- Über Schnittstellen für GIS, <a target="_blank" href="http://www.aln.zh.ch/internet/baudirektion/aln/de/naturschutz/naturschutzdaten/tools/artenlistentool.html#a-content">Artenlistentool</a>, <a target="_blank" href="http://www.aln.zh.ch/internet/baudirektion/aln/de/naturschutz/naturschutzdaten/tools/evab.html#a-content">EvAB</a>, <a target="_blank" href="news/latest/evabmobile/">EvAB mobile</a>, beliebige Apps</li>
	<li>Exporte, Auswertungen etc. können ohne zusätzlichen Aufwand über alle Artengruppen hinweg erfolgen</li>
</ul>
<p>&nbsp;</p>
<p>Für Datenpfleger und Systemverantwortliche:</p>
<ul>
	<li>Die Komplexität der Datenstruktur ist minimiert</li>
	<li>Neue Datensammlungen können von technisch durchschnittlich begabten Personen mit Hilfe einer Anleitung in wenigen Stunden ergänzt werden<br />&nbsp;</li>
</ul>
<h1>Datensammlungen</h1>
<p>Systematische Informationen über Arten kommen in ganzen Datensammlungen, z.B. „Flora Indicativa 2010“. Solche Datensammlungen haben gemeinsame Eigenschaften wie z.B.:</p>
<ul>
	<li>Dieselbe Herkunft (Autoren, Publikation)</li>
	<li>Meist eine bestimmte Artgruppe (z.B. Flora, Fauna, Schmetterlinge…)</li>
	<li>Innerhalb der Artgruppe eine definierte Auswahl bearbeiteter Arten</li>
	<li>Definierte Auswahl erfasster Informationen</li>
	<li>Definierte Methodik</li>
</ul>
<p>&nbsp;</p>
<p>Datensammlungen sollten in der Regel durch die Autoren nachgeführt werden. Ausser es wird ein Arten- und Lebensraum-Wiki angestrebt (dies könnte zusätzlich ermöglicht werden).</p>
<p>&nbsp;</p>
<p>Um die Artdaten verstehen und verwalten zu können, ist es wichtig, diese Datensammlungen als wesentlichen Teil der Struktur zu behandeln. Das kann folgendermassen geschehen:</p>
<ul>
	<li>Datensammlungen werden eigens beschrieben und gespeichert, u.a. mit:<br />- Quelle<br />- Link<br />- Allgemeine Beschreibung<br />- Nachführungsberechtigte User</li>
	<li>In der Feldverwaltung wird für jedes Feld die zugehörige Datensammlung genannt</li>
</ul>
<p>&nbsp;</p>
<p>In vielen Fällen ist es sinnvoll, die Informationen pro solcher Datensammlung darzustellen bzw. zusammenzufassen. Z.B. bei der Anzeige in der Anwendung oder wenn für Exporte Felder ausgewählt werden.</p>
<p>&nbsp;</p>
<p>Für bestimmte Zwecke ist das Gegenteil interessant: Felder aus verschiedenen Datensammlungen zusammenfassen. Z.B. wenn man über alle Artengruppen den aktuellsten Rote-Liste-Status darstellen will. Um das zu ermöglichen folgende Idee:</p>
<ul>
	<li>In der Feldverwaltung erhalten Felder mit zusammenzufassender Information&nbsp;zusätzlich zum normalen Feldnamen einen zusammenfassenden Feldnamen</li>
	<li>Ein View fasst alle Felder aller Artgruppen mit demselben zusammenfassenden Feldnamen zusammen</li>
	<li>Für den Export von Daten können - neben allen anderen Datensammlungen - auch Felder aus diesem View gewählt werden</li>
	<li>Wird für eine Artengruppe z.B. eine neue Version der Roten Liste erstellt, kann die alte in der Datenbank belassen werden. Die neue wird importiert. In der Feldverwaltung werden die zusammenfassenden Felder angepasst<br />&nbsp;</li>
</ul>
<h1>Artgruppen vereinen</h1>
<p>Heute werden die verschiedenen Gruppen (Flora, Fauna, Moose, Pilze, Flechten, Lebensräume) in unterschiedlichen Tabellen der relationalen Datenbank verwaltet. Das erhöht die Komplexität der Anwendung und erschwert jede Auswertung enorm. Beispielweise müssen alle Beziehungen zu anderen Arten oder Lebensräumen für jede Gruppe separat verwaltet werden... Zumindest in Access kann das aber nicht mehr geändert werden, weil z.B. in der Floratabelle die maximale Anzahl möglicher Indizes erreicht ist (32). Die (schlechte) Variante, alle Informationen in einer einzigen Riesentabelle zu vereinigen, scheitert wiederum an der maximalen Anzahl Felder (255).<br />&nbsp;</p>
<h1>Codierung vereinfachen</h1>
<p>Viele Werte sind heute codiert. Die Felder enthalten unverständliche Codes. Diese werden in einer Codierungstabelle aufgelöst. Damit die Daten benutzergerecht dargestellt werden können, müssen sie für Darstellung und Export decodiert werden. Dieses System ist sehr kompliziert und bringt Access in Formularen und Abfragen an seine Leistungsgrenze. Deshalb werden die Daten momentan codiert exportiert. Auch leistungsfähigere Systeme dürften gebremst werden.</p>
<ul>
	<li>Decodierung vermeiden: Wenn immer möglich uncodierte Werte ins Feld einfügen und Optionslisten in der Feldverwaltung definieren (Arrays)</li>
	<li>Redundanz statt Komplexität: Wo Abkürzungen für Laien unverständlich sind aber allgemein benutzt werden (z.B. die IUCN-Stati in der Roten Liste) wird der decodierte Wert in einem zweiten Feld gespeichert.<br />&nbsp;</li>
</ul>
<h1>Neue Datensammlungen einfach hinzufügen</h1>
<ul>
	<li>Die clientseitigen Datenfelder werden dynamisch aus den für die Art gespeicherten Attributen aufgebaut</li>
	<li>Dazu werden die Feldeigenschaften verwaltet. Unter anderen:
		<ul>
			<li>Datensammlung</li>
			<li>Feldname</li>
			<li>Feldtyp (Text, Auswahlliste, Mehrfachauswahl möglich etc.)</li>
			<li>Optionen für Auswahllisten</li>
		</ul></li>
</ul>
<p>&nbsp;</p>
<p>Will jemand neue Arteigenschaften ergänzen, geht das dann so:</p>
<ul>
	<li>Art- oder Lebensraumeigenschaften vorbereiten</li>
	<li>Informationen über die Felder vorbereiten</li>
	<li>Informationen über die Datensammlung vorbereiten</li>
	<li>Alles importieren</li>
</ul>
<p>fertig!<br />&nbsp;</p>
<h1>Dokumentorientierte Datenbank verwenden</h1>
<ul>
	<li>Die Datenstruktur der Arteigenschaften (1:1, die meisten Felder bleiben leer) ist für eine traditionelle, tabellenbasierte Datenbank wenig geeignet, für eine dokumentenorientierte hingegen ideal</li>
	<li>Eine dokumentbasierte Datenbank eignet sich hervorragend, um ohne Einbezug des Systemadministrators neue Felder zu ergänzen</li>
	<li>Eine dokumentbasierte Datenbank eignet sich hervorragend, um alle Arten gleich zu verwalten und Gruppen (Flora, Fauna, Moose, Pilze, Flechten, sogar die Lebensräume) nur aufgrund eines Attributs zu unterscheiden. Beziehungen zwischen Arten und Lebensräumen sind entsprechend sehr einfach zu verwalten</li>
</ul>