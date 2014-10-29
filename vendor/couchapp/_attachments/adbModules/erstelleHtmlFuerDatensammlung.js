// erstellt die HTML für eine Datensammlung
// benötigt von der art bzw. den lr die entsprechende Datensammlung

/*jslint node: true, browser: true, nomen: true */


'use strict';

var returnFunction = function (ds_typ, art, datensammlung) {
    var html_datensammlung,
        hierarchie_string,
        array_string,
        ds_name,
        ersetzeUngueltigeZeichenInIdNamen = require('./ersetzeUngueltigeZeichenInIdNamen'),
        erstelleHtmlFuerDatensammlungBeschreibung = require('./erstelleHtmlFuerDatensammlungBeschreibung'),
        erstelleHtmlFuerFeld = require('./erstelleHtmlFuerFeld');
    ds_name = ersetzeUngueltigeZeichenInIdNamen(datensammlung.Name);
    // Accordion-Gruppe und -heading anfügen
    html_datensammlung = '<div class="panel panel-default"><div class="panel-heading panel-heading-gradient">';
    // bei LR: Symbolleiste einfügen
    if (art.Gruppe === "Lebensräume" && ds_typ === "Taxonomie") {
        html_datensammlung += '<div class="btn-toolbar bearb_toolbar"><div class="btn-group btn-group-sm"><button type="button" class="btn btn-default lr_bearb lr_bearb_bearb" data-toggle="tooltip" title="bearbeiten"><i class="glyphicon glyphicon-pencil"></i></button><button type="button" class="btn btn-default lr_bearb lr_bearb_schuetzen disabled" title="schützen"><i class="glyphicon glyphicon-ban-circle"></i></button><button type="button" class="btn btn-default lr_bearb lr_bearb_neu disabled" title="neuer Lebensraum"><i class="glyphicon glyphicon-plus"></i></button><button type="button" data-toggle="modal" data-target="#rueckfrage_lr_loeschen" class="btn btn-default lr_bearb lr_bearb_loeschen disabled" title="Lebensraum löschen"><i class="glyphicon glyphicon-trash"></i></button></div></div>';
    }
    // die id der Gruppe wird mit dem Namen der Datensammlung gebildet. Hier müssen aber leerzeichen entfernt werden
    html_datensammlung += '<h4 class="panel-title"><a class="Datensammlung accordion-toggle" data-toggle="collapse" data-parent="#panel_art" href="#collapse' + ds_name + '">';
    // Titel für die Datensammlung einfügen
    html_datensammlung += datensammlung.Name;
    // header abschliessen
    html_datensammlung += '</a></h4></div>';
    // body beginnen
    html_datensammlung += '<div id="collapse' + ds_name + '" class="panel-collapse collapse ' + art.Gruppe + ' ' + ds_typ + '"><div class="panel-body">';
    // Datensammlung beschreiben
    html_datensammlung += erstelleHtmlFuerDatensammlungBeschreibung(datensammlung);
    // Felder anzeigen
    // zuerst die GUID, aber nur bei der Taxonomie
    if (ds_typ === "Taxonomie") {
        html_datensammlung += erstelleHtmlFuerFeld("GUID", art._id, ds_typ, "Taxonomie");
    }
    _.each(datensammlung.Eigenschaften, function (feldwert, feldname) {
        if (feldname === "GUID") {
            // dieses Feld nicht anzeigen. Es wird _id verwendet
            // dieses Feld wird künftig nicht mehr importiert
        } else if (((feldname === "Offizielle Art" || feldname === "Eingeschlossen in" || feldname === "Synonym von") && art.Gruppe === "Flora") || (feldname === "Akzeptierte Referenz" && art.Gruppe === "Moose")) {
            // dann den Link aufbauen lassen
            html_datensammlung += window.adb.generiereHtmlFürLinkZuGleicherGruppe(feldname, art._id, feldwert.Name);
        } else if ((feldname === "Gültige Namen" || feldname === "Eingeschlossene Arten" || feldname === "Synonyme") && art.Gruppe === "Flora") {
            // das ist ein Array von Objekten
            html_datensammlung += window.adb.generiereHtmlFürLinksZuGleicherGruppe(feldname, feldwert);
        } else if ((feldname === "Artname" && art.Gruppe === "Flora") || (feldname === "Parent" && art.Gruppe === "Lebensräume")) {
            // dieses Feld nicht anzeigen
        } else if (feldname === "Hierarchie" && art.Gruppe === "Lebensräume" && _.isArray(feldwert)) {
            // Namen kommagetrennt anzeigen
            hierarchie_string = window.adb.erstelleHierarchieFürFeldAusHierarchieobjekteArray(feldwert);
            html_datensammlung += window.adb.generiereHtmlFürTextarea(feldname, hierarchie_string, ds_typ, datensammlung.Name.replace(/"/g, "'"));
        } else if (_.isArray(feldwert)) {
            // dieses Feld enthält einen Array von Werten
            array_string = feldwert.toString();
            html_datensammlung += window.adb.generiereHtmlFürTextarea(feldname, array_string, ds_typ, datensammlung.Name.replace(/"/g, "'"));
        } else {
            html_datensammlung += erstelleHtmlFuerFeld (feldname, feldwert, ds_typ, datensammlung.Name.replace(/"/g, "'"));
        }
    });
    // body und Accordion-Gruppe abschliessen
    html_datensammlung += '</div></div></div>';
    return html_datensammlung;
};

module.exports = returnFunction;