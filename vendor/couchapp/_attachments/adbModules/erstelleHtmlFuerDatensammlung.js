// erstellt die HTML für eine Datensammlung
// benötigt von der art bzw. den lr die entsprechende Datensammlung

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var _ = require('underscore');

module.exports = function (dsTyp, art, datensammlung) {
    var htmlDatensammlung,
        hierarchieString,
        arrayString,
        dsName,
        ersetzeUngueltigeZeichenInIdNamen                   = require('./ersetzeUngueltigeZeichenInIdNamen'),
        erstelleHtmlFuerDatensammlungBeschreibung           = require('./erstelleHtmlFuerDatensammlungBeschreibung'),
        erstelleHtmlFuerFeld                                = require('./erstelleHtmlFuerFeld'),
        generiereHtmlFuerTextarea                           = require('./generiereHtmlFuerTextarea'),
        generiereHtmlFuerLinksZuGleicherGruppe              = require('./generiereHtmlFuerLinksZuGleicherGruppe'),
        erstelleHierarchieFuerFeldAusHierarchieobjekteArray = require('./erstelleHierarchieFuerFeldAusHierarchieobjekteArray'),
        generiereHtmlFuerLinkZuGleicherGruppe               = require('./generiereHtmlFuerLinkZuGleicherGruppe');

    dsName = ersetzeUngueltigeZeichenInIdNamen(datensammlung.Name);

    // Accordion-Gruppe und -heading anfügen
    htmlDatensammlung = '<div class="panel panel-default"><div class="panel-heading panel-heading-gradient">';
    // bei LR: Symbolleiste einfügen
    if (art.Gruppe === "Lebensräume" && dsTyp === "Taxonomie") {
        htmlDatensammlung += '<div class="btn-toolbar bearb_toolbar"><div class="btn-group btn-group-sm"><button type="button" class="btn btn-default lrBearb lr_bearb_bearb" data-toggle="tooltip" title="bearbeiten"><i class="glyphicon glyphicon-pencil"></i></button><button type="button" class="btn btn-default lrBearb lr_bearb_schuetzen disabled" title="schützen"><i class="glyphicon glyphicon-ban-circle"></i></button><button type="button" class="btn btn-default lrBearb lr_bearb_neu disabled" title="neuer Lebensraum"><i class="glyphicon glyphicon-plus"></i></button><button type="button" data-toggle="modal" data-target="#rueckfrage_lr_loeschen" class="btn btn-default lrBearb lr_bearb_loeschen disabled" title="Lebensraum löschen"><i class="glyphicon glyphicon-trash"></i></button></div></div>';
    }
    // die id der Gruppe wird mit dem Namen der Datensammlung gebildet. Hier müssen aber leerzeichen entfernt werden
    htmlDatensammlung += '<h4 class="panel-title"><a class="Datensammlung accordion-toggle" data-toggle="collapse" data-parent="#panel_art" href="#collapse' + dsName + '">';
    // Titel für die Datensammlung einfügen
    htmlDatensammlung += datensammlung.Name;
    // header abschliessen
    htmlDatensammlung += '</a></h4></div>';
    // body beginnen
    htmlDatensammlung += '<div id="collapse' + dsName + '" class="panel-collapse collapse ' + art.Gruppe + ' ' + dsTyp + '"><div class="panel-body">';
    // Datensammlung beschreiben
    htmlDatensammlung += erstelleHtmlFuerDatensammlungBeschreibung(datensammlung);
    // Felder anzeigen
    // zuerst die GUID, aber nur bei der Taxonomie
    if (dsTyp === "Taxonomie") {
        htmlDatensammlung += erstelleHtmlFuerFeld("GUID", art._id, dsTyp, "Taxonomie");
    }
    _.each(datensammlung.Eigenschaften, function (feldwert, feldname) {
        if (feldname === "GUID") {
            // dieses Feld nicht anzeigen. Es wird _id verwendet
            // dieses Feld wird künftig nicht mehr importiert
        } else if (((feldname === "Offizielle Art" || feldname === "Eingeschlossen in" || feldname === "Synonym von") && art.Gruppe === "Flora") || (feldname === "Akzeptierte Referenz" && art.Gruppe === "Moose")) {
            // dann den Link aufbauen lassen
            htmlDatensammlung += generiereHtmlFuerLinkZuGleicherGruppe(feldname, art._id, feldwert.Name);
        } else if ((feldname === "Gültige Namen" || feldname === "Eingeschlossene Arten" || feldname === "Synonyme") && art.Gruppe === "Flora") {
            // das ist ein Array von Objekten
            htmlDatensammlung += generiereHtmlFuerLinksZuGleicherGruppe(feldname, feldwert);
        } else if ((feldname === "Artname" && art.Gruppe === "Flora") || (feldname === "Parent" && art.Gruppe === "Lebensräume")) {
            // dieses Feld nicht anzeigen
        } else if (feldname === "Hierarchie" && art.Gruppe === "Lebensräume" && _.isArray(feldwert)) {
            // Namen kommagetrennt anzeigen
            hierarchieString   = erstelleHierarchieFuerFeldAusHierarchieobjekteArray(feldwert);
            htmlDatensammlung += generiereHtmlFuerTextarea(feldname, hierarchieString, dsTyp, datensammlung.Name.replace(/"/g, "'"));
        } else if (_.isArray(feldwert)) {
            // dieses Feld enthält einen Array von Werten
            arrayString = feldwert.toString();
            htmlDatensammlung += generiereHtmlFuerTextarea(feldname, arrayString, dsTyp, datensammlung.Name.replace(/"/g, "'"));
        } else {
            htmlDatensammlung += erstelleHtmlFuerFeld(feldname, feldwert, dsTyp, datensammlung.Name.replace(/"/g, "'"));
        }
    });
    // body und Accordion-Gruppe abschliessen
    htmlDatensammlung += '</div></div></div>';
    return htmlDatensammlung;
};