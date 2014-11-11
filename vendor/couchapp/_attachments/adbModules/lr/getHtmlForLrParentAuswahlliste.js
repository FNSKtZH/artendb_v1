// baut die Auswahlliste auf, mit der ein Parent ausgewählt werden soll
// bekommt die id des LR, von dem aus ein neuer LR erstellt werden soll
// In der Auswahlliste sollen nur LR aus derselben Taxonomie gewählt werden können
// plus man soll auch einen neue Taxonomie beginnen können

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $ = require('jquery'),
    _ = require('underscore');

module.exports = function (taxonomieName, callback) {
    // lr holen
    var $db = $.couch.db('artendb');
    $db.view('artendb/lr?include_docs=true', {
        success: function (lr) {
            var taxonomieObjekte,
                object,
                neueTaxonomie,
                objectHtml,
                html = "",
                i;

            // reduzieren auf die LR der Taxonomie
            taxonomieObjekte = _.filter(lr.rows, function (row) {
                return row.doc.Taxonomie.Name === taxonomieName;
            });
            // einen Array von Objekten schaffen mit id und Name
            taxonomieObjekte = _.map(taxonomieObjekte, function (row) {
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
            taxonomieObjekte = _.sortBy(taxonomieObjekte, function (objekt) {
                return objekt.Sortier;
            });
            neueTaxonomie = {};
            neueTaxonomie.id = 0;
            neueTaxonomie.Name = "Neue Taxonomie beginnen";
            // neueTaxonomie als erstes Objekt in den Array einfügen
            taxonomieObjekte.unshift(neueTaxonomie);

            // jetzt die Optionenliste für $("#lr_parent_waehlen_optionen") aufbauen
            for (i = 0; i < taxonomieObjekte.length; i++) {
                objectHtml = '';
                if (i === 1) {
                    objectHtml += '<p>...oder den hierarchisch übergeordneten Lebensraum wählen:</p>';
                }
                objectHtml += '<div class="radio"><label>';
                objectHtml += '<input type="radio" name="parent_optionen" id="';
                objectHtml += taxonomieObjekte[i].id;
                objectHtml += '" value="';
                objectHtml += taxonomieObjekte[i].Name;
                objectHtml += '">';
                objectHtml += taxonomieObjekte[i].Name;
                objectHtml += '</label></div>';
                html += objectHtml;
            }

            return callback(html);
        },
        error: function () {
            console.log('getHtmlForLrParentAuswahlliste: lr nicht erhalten');
        }
    });
};