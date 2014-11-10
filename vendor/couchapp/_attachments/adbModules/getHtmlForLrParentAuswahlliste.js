// baut die Auswahlliste auf, mit der ein Parent ausgewählt werden soll
// bekommt die id des LR, von dem aus ein neuer LR erstellt werden soll
// In der Auswahlliste sollen nur LR aus derselben Taxonomie gewählt werden können
// plus man soll auch einen neue Taxonomie beginnen können

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/


'use strict';

var $ = require('jquery'),
    _ = require('underscore');

module.exports = function ($, taxonomie_name, callback) {

    // lr holen
    var $db = $.couch.db("artendb");
    $db.view('artendb/lr?include_docs=true', {
        success: function (lr) {
            var taxonomie_objekte,
                object,
                neue_taxonomie,
                object_html,
                html = "",
                i;
            // reduzieren auf die LR der Taxonomie
            taxonomie_objekte = _.filter(lr.rows, function (row) {
                return row.doc.Taxonomie.Name === taxonomie_name;
            });
            // einen Array von Objekten schaffen mit id und Name
            taxonomie_objekte = _.map(taxonomie_objekte, function (row) {
                object = {};
                object.id = row.doc._id;
                if (row.doc.Taxonomie.Eigenschaften && row.doc.Taxonomie.Eigenschaften.Einheit) {
                    if (row.doc.Taxonomie.Eigenschaften.Label) {
                        object.Name = row.doc.Taxonomie.Eigenschaften.Label + ": " + row.doc.Taxonomie.Eigenschaften.Einheit;
                    } else {
                        object.Name = row.doc.Taxonomie.Eigenschaften.Einheit;
                    }
                    if (row.doc.Taxonomie.Eigenschaften.Hierarchie && row.doc.Taxonomie.Eigenschaften.Hierarchie.length === 1) {
                        // das ist das oberste Objekt, soll auch zuoberst einsortiert werden
                        // oft hat es als einziges keinen label und würde daher zuunterst sortiert!
                        object.Sortier = "0";
                    } else {
                        // mittels Array sortieren
                        object.Sortier = object.Name;
                    }
                }
                return object;
            });
            // jetzt nach Name sortieren
            taxonomie_objekte = _.sortBy(taxonomie_objekte, function (objekt) {
                return objekt.Sortier;
            });
            neue_taxonomie = {};
            neue_taxonomie.id = 0;
            neue_taxonomie.Name = "Neue Taxonomie beginnen";
            // neueTaxonomie als erstes Objekt in den Array einfügen
            taxonomie_objekte.unshift(neue_taxonomie);

            // jetzt die Optionenliste für $("#lr_parent_waehlen_optionen") aufbauen
            for (i = 0; i < taxonomie_objekte.length; i++) {
                object_html = '';
                if (i === 1) {
                    object_html += '<p>...oder den hierarchisch übergeordneten Lebensraum wählen:</p>';
                }
                object_html += '<div class="radio"><label>';
                object_html += '<input type="radio" name="parent_optionen" id="';
                object_html += taxonomie_objekte[i].id;
                object_html += '" value="';
                object_html += taxonomie_objekte[i].Name;
                object_html += '">';
                object_html += taxonomie_objekte[i].Name;
                object_html += '</label></div>';
                html += object_html;
            }

            return callback(html);
        },
        error: function () {
            console.log('getHtmlForLrParentAuswahlliste: lr nicht erhalten');
        }
    });
};