window.adb = window.adb || {};

window.adb.erstelleHierarchieFürFeldAusHierarchieobjekteArray = function(hierarchie_array) {
    'use strict';
    if (!_.isArray(hierarchie_array)) {
        return "";
    }
    // Namen kommagetrennt anzeigen
    var hierarchie_string = "";
    _.each(hierarchie_array, function(hierarchie_objekt, index) {
        if (index > 0) {
            hierarchie_string += "\n";
        }
        hierarchie_string += hierarchie_objekt.Name;
    });
    return hierarchie_string;
};

// generiert den html-Inhalt für einzelne Links in Flora
window.adb.generiereHtmlFürLinkZuGleicherGruppe = function(feld_name, id, artname) {
    'use strict';
    var html_container;
    html_container = '<div class="form-group"><label class="control-label">';
    html_container += feld_name;
    html_container += ':</label><p class="form-control-static controls feldtext"><a href="#" class="LinkZuArtGleicherGruppe" ArtId="';
    html_container += id;
    html_container += '">';
    html_container += artname;
    html_container += '</a></p></div>';
    return html_container;
};

// generiert den html-Inhalt für Serien von Links in Flora
window.adb.generiereHtmlFürLinksZuGleicherGruppe = function(feldname, objekt_liste) {
    'use strict';
    var html_container;
    html_container = '<div class="form-group"><label class="control-label">';
    html_container += feldname;
    html_container += ':</label><span class="feldtext controls">';
    _.each(objekt_liste, function(objekt, index) {
        if (index > 0) {
            html_container += ', ';
        }
        html_container += '<p class="form-control-static controls"><a href="#" class="LinkZuArtGleicherGruppe" ArtId="';
        html_container += objekt.GUID;
        html_container += '">';
        html_container += objekt.Name;
        html_container += '</a></p>';
    });
    html_container += '</span></div>';
    return html_container;
};

// generiert den html-Inhalt für einzelne Links in Flora
window.adb.generiereHtmlFürWwwLink = function(feldname, feldwert, ds_typ, ds_name) {
    'use strict';
    var html_container;
    html_container = '<div class="form-group">\n\t<label class="control-label" for="';
    html_container += feldname;
    html_container += '">';
    html_container += feldname;
    html_container += ':</label>\n\t';
    // jetzt Link beginnen, damit das Feld klickbar wird
    html_container += '<p><a href="';
    html_container += feldwert;
    html_container += '"><input class="controls form-control input-sm" dsTyp="'+ds_typ+'" dsName="'+ds_name+'" id="';
    html_container += feldname;
    html_container += '" name="';
    html_container += feldname;
    html_container += '" type="text" value="';
    html_container += feldwert;
    html_container += '" readonly="readonly" style="cursor:pointer;">';
    // Link abschliessen
    html_container += '</a></p>';
    html_container += '\n</div>';
    return html_container;
};

// generiert den html-Inhalt für einzelne Links in Flora
window.adb.generiereHtmlFürObjektlink = function(feldname, feldwert, url) {
    'use strict';
    var html_container;
    html_container = '<div class="form-group"><label class="control-label">';
    html_container += feldname;
    html_container += ':';
    html_container += '</label>';
    html_container += '<p class="form-control-static feldtext controls"><a href="';
    html_container += url;
    html_container += '" target="_blank">';
    html_container += feldwert;
    html_container += '</a></p></div>';
    return html_container;
};

// generiert den html-Inhalt für Textinputs
window.adb.generiereHtmlFürTextinput = function(feldname, feldwert, input_typ, ds_typ, ds_name) {
    'use strict';
    var html_container;
    html_container = '<div class="form-group">\n\t<label class="control-label" for="';
    html_container += feldname;
    html_container += '">';
    html_container += feldname;
    html_container += ':</label>\n\t<input class="controls form-control input-sm" id="';
    html_container += feldname;
    html_container += '" name="';
    html_container += feldname;
    html_container += '" type="';
    html_container += input_typ;
    html_container += '" value="';
    html_container += feldwert;
    html_container += '" readonly="readonly" dsTyp="'+ds_typ+'" dsName="'+ds_name+'">\n</div>';
    return html_container;
};

// generiert den html-Inhalt für Textarea
window.adb.generiereHtmlFürTextarea = function(feldname, feldwert, ds_typ, ds_name) {
    'use strict';
    var html_container;
    html_container = '<div class="form-group"><label class="control-label" for="';
    html_container += feldname;
    html_container += '">';
    html_container += feldname;
    html_container += ':</label><textarea class="controls form-control" id="';
    html_container += feldname;
    html_container += '" name="';
    html_container += feldname;
    html_container += '" readonly="readonly" dsTyp="'+ds_typ+'" dsName="'+ds_name+'">';
    html_container += feldwert;
    html_container += '</textarea></div>';
    return html_container;
};

// generiert den html-Inhalt für ja/nein-Felder
window.adb.generiereHtmlFürBoolean = function(feldname, feldwert, ds_typ, ds_name) {
    'use strict';
    var html_container;
    html_container = '<div class="form-group"><label class="control-label" for="';
    html_container += feldname;
    html_container += '">';
    html_container += feldname;
    html_container += ':</label><input type="checkbox" id="';
    html_container += feldname;
    html_container += '" name="';
    html_container += feldname;
    html_container += '"';
    if (feldwert === true) {
        html_container += ' checked="true"';
    }
    html_container += '" readonly="readonly" disabled="disabled" dsTyp="'+ds_typ+'" dsName="'+ds_name+'"></div>';
    return html_container;
};

// begrenzt die maximale Höhe des Baums auf die Seitenhöhe, wenn nötig
window.adb.setzeTreehöhe = function() {
    'use strict';
    var window_height = $(window).height();
    if ($(window).width() > 1000 && !$("body").hasClass("force-mobile")) {
        $(".baum").css("max-height", window_height - 161);
    } else {
        // Spalten sind untereinander. Baum 91px weniger hoch, damit Formulare zum raufschieben immer erreicht werden können
        $(".baum").css("max-height", window_height - 252);
    }
};

// setzt die Höhe von textareas so, dass der Text genau rein passt
window.adb.fitTextareaToContent = function(id, max_height) {
    'use strict';
    var text = id && id.style ? id : document.getElementById(id);
    max_height = max_height || document.documentElement.clientHeight;
    if (!text) {
        return;
    }

    /* Accounts for rows being deleted, pixel value may need adjusting */
    if (text.clientHeight == text.scrollHeight) {
        text.style.height = "30px";
    }

    var adjustedHeight = text.clientHeight;
    if (!max_height || max_height > adjustedHeight) {
        adjustedHeight = Math.max(text.scrollHeight, adjustedHeight);
    }
    if (max_height) {
        adjustedHeight = Math.min(max_height, adjustedHeight);
    }
    if (adjustedHeight > text.clientHeight) {
        text.style.height = adjustedHeight + "px";
    }
};

// kontrollieren, ob die erforderlichen Felder etwas enthalten
// wenn ja wird true retourniert, sonst false
window.adb.validiereSignup = function(woher) {
    'use strict';
    var email,
        passwort,
        passwort2;
    // zunächst alle Hinweise ausblenden (falls einer von einer früheren Prüfung her noch eingeblendet wäre)
    $(".hinweis").hide();
    // erfasste Werte holen
    email = $("#Email_"+woher).val();
    passwort = $("#Passwort_"+woher).val();
    passwort2 = $("#Passwort2_"+woher).val();
    // prüfen
    if (!email) {
        $("#Emailhinweis_"+woher).show();
        setTimeout(function() {
            $("#Email_"+woher).focus();
        }, 50);  // need to use a timer so that .blur() can finish before you do .focus()
        return false;
    } else if (!passwort) {
        $("#Passworthinweis_"+woher).show();
        setTimeout(function() {
            $("#Passwort_"+woher).focus();
        }, 50);  // need to use a timer so that .blur() can finish before you do .focus()
        return false;
    } else if (!passwort2) {
        $("#Passwort2hinweis_"+woher).show();
        setTimeout(function() {
            $("#Passwort2_"+woher).focus();
        }, 50);  // need to use a timer so that .blur() can finish before you do .focus()
        return false;
    } else if (passwort !== passwort2) {
        $("#Passwort2hinweisFalsch_"+woher).show();
        setTimeout(function() {
            $("#Passwort2_"+woher).focus();
        }, 50);  // need to use a timer so that .blur() can finish before you do .focus()
        return false;
    }
    return true;
};

window.adb.erstelleKonto = function(woher) {
    'use strict';
    // User in _user eintragen
    $.couch.signup({
        name: $('#Email_'+woher).val()
    },
    $('#Passwort_'+woher).val(), {
        success : function() {
            localStorage.Email = $('#Email_'+woher).val();
            if (woher === "art") {
                window.adb.bearbeiteLrTaxonomie();
            }
            window.adb.passeUiFürAngemeldetenUserAn(woher);
            // Werte aus Feldern entfernen
            $("#Email_"+woher).val("");
            $("#Passwort_"+woher).val("");
            $("#Passwort2_"+woher).val("");
        },
        error : function() {
            var praefix = "importieren_";
            if (woher === "art") {
                praefix = "";
            }
            $("#"+praefix+woher+"_anmelden_fehler_text").html("Fehler: Das Konto wurde nicht erstellt");
            $("#"+praefix+woher+"_anmelden_fehler")
                .alert()
                .show();
        }
    });
};

window.adb.meldeUserAn = function(woher) {
    'use strict';
    var email = $('#Email_'+woher).val(),
        passwort = $('#Passwort_'+woher).val();
    if (window.adb.validiereUserAnmeldung(woher)) {
        $.couch.login({
            name : email,
            password : passwort,
            success : function(r) {
                localStorage.Email = $('#Email_'+woher).val();
                if (woher === "art") {
                    window.adb.bearbeiteLrTaxonomie();
                }
                window.adb.passeUiFürAngemeldetenUserAn(woher);
                // Werte aus Feldern entfernen
                $("#Email_"+woher).val("");
                $("#Passwort_"+woher).val("");
                $("#art_anmelden").show();
                // admin-Funktionen
                if (r.roles.indexOf("_admin") !== -1) {
                    // das ist ein admin
                    console.log("hallo admin");
                    localStorage.admin = true;
                } else {
                    delete localStorage.admin;
                }
                window.adb.blendeMenus();
            },
            error: function() {
                var präfix = "importieren_";
                if (woher === "art") {
                    präfix = "";
                }
                // zuerst allfällige bestehende Hinweise ausblenden
                $(".hinweis").hide();
                $("#"+präfix+woher+"_anmelden_fehler_text")
                    .html("Anmeldung gescheitert.<br>Sie müssen ev. ein Konto erstellen?")
                    .alert()
                    .show();
            }
        });
    }
};

window.adb.blendeMenus = function() {
    'use strict';
    if (localStorage.admin) {
        $("#menu_btn")
            .find(".admin")
            .show();
    } else {
        $("#menu_btn")
            .find(".admin")
            .hide();
    }
};

window.adb.meldeUserAb = function() {
    'use strict';
    // IE8 kann nicht deleten
    try {
        delete localStorage.Email;
    }
    catch (e) {
        localStorage.Email = undefined;
    }
    $(".art_anmelden_titel").text("Anmelden");
    $(".importieren_anmelden_titel").text("1. Anmelden");
    $(".alert").hide();
    $(".hinweis").hide();
    $(".well.anmelden").show();
    $(".Email").show();
    $(".Passwort").show();
    $(".anmelden_btn").show();
    $(".abmelden_btn").hide();
    // ausschalten, soll später bei Organisation möglich werden
    // $(".konto_erstellen_btn").show();
    $(".konto_speichern_btn").hide();
    $("#art_anmelden").hide();
    window.adb.schuetzeLrTaxonomie();
    // falls dieser User admin war: vergessen
    delete localStorage.admin;
    // für diesen Nutzer passende Menus anzeigen
    window.adb.blendeMenus();
};

window.adb.passeUiFürAngemeldetenUserAn = function(woher) {
    'use strict';
    var präfix = "importieren_";
    if (woher === "art") {
        präfix = "";
    }
    $("#art_anmelden_titel").text(localStorage.Email + " ist angemeldet");
    $(".importieren_anmelden_titel").text("1. " + localStorage.Email + " ist angemeldet");
    if (woher !== "art") {
        $("#" + präfix + woher + "_anmelden_collapse").collapse('hide');
        $("#importieren_" + woher + "_ds_beschreiben_collapse").collapse('show');
    }
    $(".alert").hide();
    $(".hinweis").hide();
    $(".well.anmelden").hide();
    $(".Email").hide();
    $(".Passwort").hide();
    $(".anmelden_btn").hide();
    $(".abmelden_btn").show();
    $(".konto_erstellen_btn").hide();
    $(".konto_speichern_btn").hide();
    // in LR soll Anmelde-Accordion nicht sichtbar sein
    $("#art_anmelden").hide();
};

// prüft, ob der Benutzer angemeldet ist
// ja: retourniert true
// nein: retourniert false und öffnet die Anmeldung
// welche anmeldung hängt ab, woher die Prüfung angefordert wurde
// darum erwartet die Funktion den parameter woher
window.adb.pruefeAnmeldung = function(woher) {
    'use strict';
    if (!localStorage.Email) {
        setTimeout(function() {
            window.adb.zurueckZurAnmeldung(woher);
        }, 600);
        return false;
    }
    return true;
};

window.adb.zurueckZurAnmeldung = function(woher) {
    'use strict';
    var präfix = "importieren_";

    // Bei LR muss der Anmeldungsabschnitt eingeblendet werden
    if (woher === "art") {
        präfix = "";
        $("#art_anmelden").show();
    }

    // Mitteilen, dass Anmeldung nötig ist
    $("#"+präfix+woher+"_anmelden_hinweis")
        .alert()
        .show();
    $("#"+präfix+woher+"_anmelden_hinweis_text").html("Um Daten zu bearbeiten, müssen Sie angemeldet sein");
    $("#"+präfix+woher+"_anmelden_collapse").collapse('show');
    $(".anmelden_btn").show();
    $(".abmelden_btn").hide();
    // ausschalten, soll später bei Organisationen möglich werden
    //$(".konto_erstellen_btn").show();
    $(".konto_speichern_btn").hide();
    $("#Email_"+woher).focus();
};


window.adb.validiereUserAnmeldung = function(woher) {
    'use strict';
    var email = $('#Email_'+woher).val(),
        passwort = $('#Passwort_'+woher).val();
    if (!email) {
        setTimeout(function() {
            $('#Email_'+woher).focus();
        }, 50);  // need to use a timer so that .blur() can finish before you do .focus()
        $("#Emailhinweis_"+woher).show();
        return false;
    } else if (!passwort) {
        setTimeout(function() {
            $('#Passwort_'+woher).focus();
        }, 50);  // need to use a timer so that .blur() can finish before you do .focus()
        $("#Passworthinweis_"+woher).show();
        return false;
    }
    return true;
};

// wenn BsName geändert wird
// suchen, ob schon eine Datensammlung mit diesem Namen existiert
// und sie von jemand anderem importiert wurde
// und sie nicht zusammenfassend ist
window.adb.handleBsNameChange = function() {
    'use strict';
    var that = this,
        bs_key = _.find(window.adb.ds_namen_eindeutig, function(key) {
            return key[0] === that.value && key[2] !== localStorage.Email && !key[1];
        });
    if (bs_key) {
        $("#importieren_bs_ds_beschreiben_hinweis2")
            .alert()
            .removeClass("alert-success")
            .removeClass("alert-danger")
            .addClass("alert-info")
            .show();
        $("#importieren_bs_ds_beschreiben_hinweis_text2").html('Es existiert schon eine gleich heissende und nicht zusammenfassende Beziehungssammlung.<br>Sie wurde von jemand anderem importiert. Daher müssen Sie einen anderen Namen verwenden.');
        setTimeout(function() {
            $("#importieren_bs_ds_beschreiben_hinweis2")
                .alert()
                .hide();
        }, 30000);
        $("#BsName")
            .val("")
            .focus();
    } else {
        $("#importieren_bs_ds_beschreiben_hinweis2")
            .alert()
            .hide();
    }
};

// Wenn DsImportiertVon geändert wird
// kontrollieren, dass es die email der angemeldeten Person ist
window.adb.handleDsImportiertVonChange = function() {
    'use strict';
    var $importieren_ds_ds_beschreiben_hinweis2 = $("#importieren_ds_ds_beschreiben_hinweis2");
    $("#DsImportiertVon").val(localStorage.Email);
    $importieren_ds_ds_beschreiben_hinweis2
        .alert()
        .show()
        .html('"importiert von" ist immer die email-Adresse der angemeldeten Person');
    setTimeout(function() {
        $importieren_ds_ds_beschreiben_hinweis2
            .alert()
            .hide();
    }, 10000);
};

// Wenn BsImportiertVon geändert wird
// Kontrollieren, dass es die email der angemeldeten Person ist
window.adb.handleBsImportiertVonChange = function() {
    'use strict';
    $("#BsImportiertVon").val(localStorage.Email);
    $("#importieren_bs_ds_beschreiben_hinweis2")
        .alert()
        .removeClass("alert-success")
        .removeClass("alert-danger")
        .addClass("alert-info")
        .show();
    $("#importieren_bs_ds_beschreiben_hinweis_text2").html('"importiert von" ist immer die email-Adresse der angemeldeten Person');
    setTimeout(function() {
        $("#importieren_bs_ds_beschreiben_hinweis2")
            .alert()
            .hide();
    }, 10000);
};

// wenn BsZusammenfassend geändert wird
// BsUrsprungsBs_div zeigen oder verstecken
window.adb.handleBsZusammenfassendChange = function() {
    'use strict';
    if ($(this).prop('checked')) {
        $("#BsUrsprungsBs_div").show();
    } else {
        $("#BsUrsprungsBs_div").hide();
    }
};

// wenn DsZusammenfassend geändert wird
// DsUrsprungsDs zeigen oder verstecken
window.adb.handleDsZusammenfassendChange = function() {
    'use strict';
    if ($(this).prop('checked')) {
        $("#DsUrsprungsDs_div").show();
    } else {
        $("#DsUrsprungsDs_div").hide();
    }
};

// Wenn BsWählen geändert wird
window.adb.handleBsWählenChange = function() {
    'use strict';
    var handleBsWaehlenChange = require('./modules/handleBsWaehlenChange');
    handleBsWaehlenChange ($, this);
};

// wenn DsFile geändert wird
window.adb.handleDsFileChange = function() {
    'use strict';
    if (typeof event.target.files[0] === "undefined") {
        // vorhandene Datei wurde entfernt
        $("#DsTabelleEigenschaften").hide();
        $("#importieren_ds_ids_identifizieren_hinweis_text").hide();
        $("#DsImportieren").hide();
        $("#DsEntfernen").hide();
    } else {
        var file = event.target.files[0],
            reader = new FileReader();

        reader.onload = function(event) {
            window.adb.dsDatensätze = $.csv.toObjects(event.target.result);
            window.adb.erstelleTabelle(window.adb.dsDatensätze, "DsFelder_div", "DsTabelleEigenschaften");
        };
        reader.readAsText(file);
    }
};

// wenn BsFile geändert wird
window.adb.handleBsFileChange = function() {
    'use strict';
    if (typeof event.target.files[0] === "undefined") {
        // vorhandene Datei wurde entfernt
        $("#BsTabelleEigenschaften").hide();
        $("#importieren_bs_ids_identifizieren_hinweis_text").hide();
        $("#BsImportieren").hide();
        $("#BsEntfernen").hide();
    } else {
        var file = event.target.files[0],
            reader = new FileReader();
        reader.onload = function(event) {
            window.adb.bsDatensätze = $.csv.toObjects(event.target.result);
            window.adb.erstelleTabelle(window.adb.bsDatensätze, "BsFelder_div", "BsTabelleEigenschaften");
        };
        reader.readAsText(file);
    }
};

// wenn btn_resize geklickt wird
window.adb.handleBtnResizeClick = function() {
    'use strict';
    var windowHeight = $(window).height(),
        $body = $("body");
    $body.toggleClass("force-mobile");
    if ($body.hasClass("force-mobile")) {
        // Spalten sind untereinander. Baum 91px weniger hoch, damit Formulare zum raufschieben immer erreicht werden können
        $(".baum").css("max-height", windowHeight - 252);
        // button rechts ausrichten
        $("#btn_resize")
            .css("margin-right", "0px")
            .attr("data-original-title", "in zwei Spalten anzeigen");
    } else {
        $(".baum").css("max-height", windowHeight - 161);
        // button an anderen Schaltflächen ausrichten
        $("#btn_resize")
            .css("margin-right", "6px")
            .attr("data-original-title", "ganze Breite nutzen");
    }
};

// wenn menu_btn geklickt wird
// Menu: Links zu Google Bilder und Wikipedia nur aktiv setzen, wenn Art oder Lebensraum angezeigt wird
window.adb.handleMenuBtnClick = function() {
    'use strict';
    if (localStorage.art_id) {
        $("#GoogleBilderLink_li").removeClass("disabled");
        $("#WikipediaLink_li").removeClass("disabled");
    } else {
        $("#GoogleBilderLink_li").addClass("disabled");
        $("#WikipediaLink_li").addClass("disabled");
    }
};

// wenn ds_importieren geklickt wird
// testen, ob der Browser das Importieren unterstützt
// wenn nein, Meldung bringen (macht die aufgerufene Funktion)
window.adb.handleDs_ImportierenClick = function() {
    'use strict';
    var zeigeFormular = require('./modules/zeigeFormular');
    if(window.adb.isFileAPIAvailable()) {
        zeigeFormular ("importieren_ds");
        // Ist der User noch angemeldet? Wenn ja: Anmeldung überspringen
        if (window.adb.pruefeAnmeldung("ds")) {
            $("#importieren_ds_ds_beschreiben_collapse").collapse('show');
        }
    }
};

// wenn bs_importieren geklickt wird
// testen, ob der Browser das Importieren unterstützt
// wenn nein, Meldung bringen (macht die aufgerufene Funktion)
window.adb.handleBs_ImportierenClick = function() {
    'use strict';
    var zeigeFormular = require('./modules/zeigeFormular');
    if(window.adb.isFileAPIAvailable()) {
        zeigeFormular ("importieren_bs");
        // Ist der User noch angemeldet? Wenn ja: Anmeldung überspringen
        if (window.adb.pruefeAnmeldung("bs")) {
            $("#importieren_bs_ds_beschreiben_collapse").collapse('show');
        }
    }
};

window.adb.handleMenuAdminClick = function() {
    'use strict';
    var zeigeFormular = require('./modules/zeigeFormular');
    zeigeFormular ("admin");
};

window.adb.ergänzePilzeZhgis = function() {
    'use strict';
    $("#admin_pilze_zhgis_ergänzen_rückmeldung").html("Daten werden analysiert...");
    var $db = $.couch.db("artendb");
    $db.view('artendb/macromycetes?include_docs=true', {
        success: function(data) {
            var ds_zhgis = {},
                ergänzt = 0,
                fehler = 0,
                zhgis_schon_da = 0;
            ds_zhgis.Name = "ZH GIS";
            ds_zhgis.Beschreibung = "GIS-Layer und Betrachtungsdistanzen für das Artenlistentool, Artengruppen für EvAB, im Kanton Zürich. Eigenschaften aller Arten";
            ds_zhgis.Datenstand = "dauernd nachgeführt";
            ds_zhgis.Link = "http://www.naturschutz.zh.ch";
            ds_zhgis["importiert von"] = "alex@gabriel-software.ch";
            ds_zhgis.Eigenschaften = {};
            ds_zhgis.Eigenschaften["GIS-Layer"] = "Pilze";
            _.each(data.rows, function(row) {
                var pilz = row.doc,
                    zhgis_in_ds;
                if (!pilz.Eigenschaftensammlungen) {
                    pilz.Eigenschaftensammlungen = [];
                }
                zhgis_in_ds = _.find(pilz.Eigenschaftensammlungen, function(ds) {
                    return ds.Name === "ZH GIS";
                });
                // nur ergänzen, wenn ZH GIS noch nicht existiert
                if (!zhgis_in_ds) {
                    pilz.Eigenschaftensammlungen.push(ds_zhgis);
                    pilz.Eigenschaftensammlungen = _.sortBy(pilz.Eigenschaftensammlungen, function(ds) {
                        return ds.Name;
                    });
                    $db.saveDoc(pilz, {
                        success: function() {
                            ergänzt ++;
                            $("#admin_pilze_zhgis_ergänzen_rückmeldung").html("Total: " + data.rows.length + ". Ergänzt: " + ergänzt + ", Fehler: " + fehler + ", 'ZH GIS' schon enthalten: " + zhgis_schon_da);
                        },
                        error: function() {
                            fehler ++;
                            $("#admin_pilze_zhgis_ergänzen_rückmeldung").html("Total: " + data.rows.length + ". Ergänzt: " + ergänzt + ", Fehler: " + fehler + ", 'ZH GIS' schon enthalten: " + zhgis_schon_da);
                        }
                    });
                } else {
                    zhgis_schon_da ++;
                    $("#admin_pilze_zhgis_ergänzen_rückmeldung").html("Total: " + data.rows.length + ". Ergänzt: " + ergänzt + ", Fehler: " + fehler + ", 'ZH GIS' schon enthalten: " + zhgis_schon_da);
                }
            });
        }
    });
};

window.adb.korrigiereArtwertnameInFlora = function() {
    'use strict';
    $("#admin_korrigiere_artwertname_in_flora_rückmeldung").html("Daten werden analysiert...");
    var $db = $.couch.db("artendb");
    $db.view('artendb/flora?include_docs=true', {
        success: function(data) {
            var korrigiert = 0,
                fehler = 0,
                save;
            _.each(data.rows, function(row) {
                var art = row.doc,
                    ds_artwert,
                    daten = {};
                if (art.Eigenschaftensammlungen) {
                    ds_artwert = _.find(art.Eigenschaftensammlungen, function(ds) {
                       return ds.Name === "ZH Artwert (1995)";
                    });
                    //if (ds_artwert && ds_artwert.Eigenschaften && ds_artwert.Eigenschaften["Artwert KT ZH"]) {
                    if (ds_artwert && ds_artwert.Eigenschaften) {
                        save = false;
                        // loopen und neu aufbauen, damit die Reihenfolge der keys erhalten bleibt (hoffentlich)
                        _.each(ds_artwert.Eigenschaften, function(value, key) {
                            if (key === "Artwert KT ZH") {
                                key = "Artwert";
                                save = true;
                            }
                            daten[key] = value;
                        });
                        if (save) {
                            ds_artwert.Eigenschaften = daten;
                            $db.saveDoc(art, {
                                success: function() {
                                    korrigiert ++;
                                    $("#admin_korrigiere_artwertname_in_flora_rückmeldung").html("Total: " + data.rows.length + ". Korrigiert: " + korrigiert + ", Fehler: " + fehler);
                                },
                                error: function() {
                                    fehler ++;
                                    $("#admin_korrigiere_artwertname_in_flora_rückmeldung").html("Total: " + data.rows.length + ". Korrigiert: " + korrigiert + ", Fehler: " + fehler);
                                }
                            });
                        }
                    }
                }
            });
            if (korrigiert === 0) {
                $("#admin_korrigiere_artwertname_in_flora_rückmeldung").html("Es gibt offenbar keine Felder mehr mit Namen 'Artwert KT ZH'");
            }
        }
    });
};

window.adb.korrigiereDsNameFloraChRoteListe1991 = function() {
    'use strict';
    var $admin_korrigiere_ds_name_ch_rote_liste_1991_rückmeldung = $("#admin_korrigiere_ds_name_ch_rote_liste_1991_rückmeldung");
    $admin_korrigiere_ds_name_ch_rote_liste_1991_rückmeldung.html("Daten werden analysiert...");
    var $db = $.couch.db("artendb");
    $db.view('artendb/flora?include_docs=true', {
        success: function(data) {
            var korrigiert = 0,
                fehler = 0,
                save;
            _.each(data.rows, function(row) {
                var art = row.doc,
                    ds;
                if (art.Eigenschaftensammlungen) {
                    ds = _.find(art.Eigenschaftensammlungen, function(ds) {
                        return ds.Name === "CH Rote Liste (1991)";
                    });
                    if (ds) {
                        ds.Name = "CH Rote Listen Flora (1991)";
                        $db.saveDoc(art, {
                            success: function() {
                                korrigiert ++;
                                $admin_korrigiere_ds_name_ch_rote_liste_1991_rückmeldung.html("Floraarten: " + data.rows.length + ". Umbenannt: " + korrigiert + ", Fehler: " + fehler);
                            },
                            error: function() {
                                fehler ++;
                                $admin_korrigiere_ds_name_ch_rote_liste_1991_rückmeldung.html("Floraarten: " + data.rows.length + ". Umbenannt: " + korrigiert + ", Fehler: " + fehler);
                            }
                        });
                    }
                }
            });
            if (korrigiert === 0) {
                $("#admin_korrigiere_artwertname_in_flora_rückmeldung").html("Es gibt offenbar keine Datensammlungen mehr mit Namen 'CH Rote Liste (1991)'");
            }
        }
    });
};

window.adb.nenneDsUm = function() {
    'use strict';
    var $admin_korrigiere_ds_name_ch_rückmeldung = $("#admin_korrigiere_ds_name_rückmeldung"),
        $admin_korrigiere_ds_name_name_vorher = $("#admin_korrigiere_ds_name_name_vorher"),
        $admin_korrigiere_ds_name_name_nachher = $("#admin_korrigiere_ds_name_name_nachher"),
        name_vorher = $admin_korrigiere_ds_name_name_vorher.val(),
        name_nachher = $admin_korrigiere_ds_name_name_nachher.val();
    if (!name_vorher) {
        $admin_korrigiere_ds_name_ch_rückmeldung.html("Bitte Name vorher erfassen");
        $admin_korrigiere_ds_name_name_vorher.focus();
        return;
    }
    if (!name_nachher) {
        $admin_korrigiere_ds_name_ch_rückmeldung.html("Bitte Name nachher erfassen");
        $admin_korrigiere_ds_name_name_nachher.focus();
        return;
    }
    $admin_korrigiere_ds_name_ch_rückmeldung.html("Daten werden analysiert...");
    var $db = $.couch.db("artendb");
    $db.view('artendb/ds_bs_guid?startkey=["' + name_vorher + '"]&endkey=["' + name_vorher + '",{}]&include_docs=true', {
        success: function(data) {
            var korrigiert = 0,
                fehler = 0,
                save;
            if (data.rows.length === 0) {
                $admin_korrigiere_ds_name_ch_rückmeldung.html("Es gibt keine Datensammlung namens " + name_vorher);
                return;
            }
            _.each(data.rows, function(row) {
                var art = row.doc,
                    ds,
                    bs,
                    save = false;
                // Datensammlung mit diesem Namen suchen
                if (art.Eigenschaftensammlungen && art.Eigenschaftensammlungen.length > 0) {
                    ds = _.find(art.Eigenschaftensammlungen, function(ds_) {
                        if (ds_.Name) {
                            return ds_.Name === name_vorher;
                        }
                    });
                    if (ds) {
                        ds.Name = name_nachher;
                        save = true;
                    }
                }
                // Beziehungssammlung mit diesem Namen suchen
                if (art.Beziehungssammlungen && art.Beziehungssammlungen.length > 0) {
                    bs = _.find(art.Beziehungssammlungen, function(ds_) {
                        if (ds_.Name) {
                            return ds_.Name === name_vorher;
                        }
                    });
                    if (bs) {
                        bs.Name = name_nachher;
                        save = true;
                    }
                }
                // Datensatz speichern, wenn nötig
                if (save) {
                    $db.saveDoc(art, {
                        success: function() {
                            korrigiert ++;
                            $admin_korrigiere_ds_name_ch_rückmeldung.html("Arten mit dieser Datensammlung: " + data.rows.length + ". Umbenannt: " + korrigiert + ", Fehler: " + fehler);
                        },
                        error: function() {
                            fehler ++;
                            $admin_korrigiere_ds_name_ch_rückmeldung.html("Arten mit dieser Datensammlung: " + data.rows.length + ". Umbenannt: " + korrigiert + ", Fehler: " + fehler);
                        }
                    });
                }
            });
            if (korrigiert === 0) {
                $("#admin_korrigiere_artwertname_in_flora_rückmeldung").html("Es gibt offenbar keine Datensammlungen mehr mit Namen '" + name_vorher + "'");
            }
        }
    });
};

window.adb.baueDsZuEigenschaftenUm = function() {
    'use strict';
    var $admin_baue_ds_zu_eigenschaften_um_rückmeldung = $("#admin_baue_ds_zu_eigenschaften_um_rückmeldung"),
        $db = $.couch.db("artendb");
    $admin_baue_ds_zu_eigenschaften_um_rückmeldung.html("Daten werden analysiert...");
    $db.view('artendb/all_docs?include_docs=true', {
        success: function(data) {
            var korrigiert = 0,
                fehler = 0,
                save;
            if (data.rows.length === 0) {
                $admin_baue_ds_zu_eigenschaften_um_rückmeldung.html("Keine Daten erhalten");
                return;
            }
            _.each(data.rows, function(row) {
                var art = row.doc,
                    datensammlungen,
                    beziehungssammlungen,
                    ds_daten,
                    tax_daten,
                    save = false;
                // Datensammlungen umbenennen
                // ds und bs entfernen, danach in der richtigen Reihenfolge hinzufügen
                // damit die Reihenfolge bewahrt bleibt
                if (art.Taxonomie && art.Taxonomie.Daten) {
                    tax_daten = art.Taxonomie.Daten;
                    delete art.Taxonomie.Daten;
                    art.Taxonomie.Eigenschaften = tax_daten;
                    save = true;
                }
                if (art.Datensammlungen) {
                    datensammlungen = art.Datensammlungen;
                    _.each(datensammlungen, function(ds) {
                        if (ds.Daten) {
                            ds_daten = ds.Daten;
                            delete ds.Daten;
                            ds.Eigenschaften = ds_daten;
                        }
                    });
                    delete art.Datensammlungen;
                    if (art.Beziehungssammlungen) {
                        beziehungssammlungen = art.Beziehungssammlungen;
                        delete art.Beziehungssammlungen;
                    } else {
                        beziehungssammlungen = {};
                    }
                    art.Eigenschaftensammlungen = datensammlungen;
                    art.Beziehungssammlungen = beziehungssammlungen;
                    save = true;
                }
                if (save) {
                    $db.saveDoc(art, {
                        success: function() {
                            korrigiert ++;
                            $admin_baue_ds_zu_eigenschaften_um_rückmeldung.html("Anzahl Dokumente in DB: " + data.rows.length + ". Umbenannt: " + korrigiert + ", Fehler: " + fehler);
                        },
                        error: function() {
                            fehler ++;
                            $admin_baue_ds_zu_eigenschaften_um_rückmeldung.html("Anzahl Dokumente in DB: " + data.rows.length + ". Umbenannt: " + korrigiert + ", Fehler: " + fehler);
                        }
                    });
                }

            });
            if (korrigiert === 0) {
                $admin_baue_ds_zu_eigenschaften_um_rückmeldung.html("Es gibt offenbar keine Datensammlungen mehr, die umbenannt werden müssen");
            }
        }
    });
};

/*window.adb.baueDsZuEigenschaftenUm = function() {
 'use strict';
 var $admin_baue_ds_zu_eigenschaften_um_rückmeldung = $("#admin_baue_ds_zu_eigenschaften_um_rückmeldung"),
 $db = $.couch.db("artendb");
 $admin_baue_ds_zu_eigenschaften_um_rückmeldung.html("Daten werden analysiert...");
 //$db.view('artendb/all_docs?include_docs=true', {
 $db.view('artendb/all_docs', {
 success: function(data) {
 var korrigiert = 0,
 fehler = 0,
 save;
 if (data.rows.length === 0) {
 $admin_baue_ds_zu_eigenschaften_um_rückmeldung.html("Keine Daten erhalten");
 return;
 }
 _.each(data.rows, function(row) {
 $db.openDoc(row.key, {
 success: function(art) {
 var datensammlungen,
 beziehungssammlungen,
 ds_daten,
 tax_daten,
 save = false;
 // Datensammlungen umbenennen
 // ds und bs entfernen, danach in der richtigen Reihenfolge hinzufügen
 // damit die Reihenfolge bewahrt bleibt
 if (art.Taxonomie && art.Taxonomie.Daten) {
 tax_daten = art.Taxonomie.Daten;
 delete art.Taxonomie.Daten;
 art.Taxonomie.Eigenschaften = tax_daten;
 save = true;
 }
 if (art.Datensammlungen) {
 datensammlungen = art.Datensammlungen;
 _.each(datensammlungen, function(ds) {
 if (ds.Daten) {
 ds_daten = ds.Daten;
 delete ds.Daten;
 ds.Eigenschaften = ds_daten;
 }
 });
 delete art.Datensammlungen;
 if (art.Beziehungssammlungen) {
 beziehungssammlungen = art.Beziehungssammlungen;
 delete art.Beziehungssammlungen;
 } else {
 beziehungssammlungen = {};
 }
 art.Eigenschaftensammlungen = datensammlungen;
 art.Beziehungssammlungen = beziehungssammlungen;
 save = true;
 }
 if (save) {
 $db.saveDoc(art, {
 success: function() {
 korrigiert ++;
 $admin_baue_ds_zu_eigenschaften_um_rückmeldung.html("Anzahl Dokumente in DB: " + data.rows.length + ". Umbenannt: " + korrigiert + ", Fehler: " + fehler);
 },
 error: function() {
 fehler ++;
 $admin_baue_ds_zu_eigenschaften_um_rückmeldung.html("Anzahl Dokumente in DB: " + data.rows.length + ". Umbenannt: " + korrigiert + ", Fehler: " + fehler);
 }
 });
 }
 },
 error: function() {
 fehler ++;
 $admin_baue_ds_zu_eigenschaften_um_rückmeldung.html("Anzahl Dokumente in DB: " + data.rows.length + ". Umbenannt: " + korrigiert + ", Fehler: " + fehler);
 }
 });

 });
 if (korrigiert === 0) {
 $admin_baue_ds_zu_eigenschaften_um_rückmeldung.html("Es gibt offenbar keine Datensammlungen mehr, die umbenannt werden müssen");
 }
 }
 });
 };*/

// wenn importieren_ds_ds_beschreiben_collapse geöffnet wird
window.adb.handleImportierenDsDsBeschreibenCollapseShown = function() {
    'use strict';
    // mitgeben, woher die Anfrage kommt, weil ev. angemeldet werden muss
    window.adb.bereiteImportieren_ds_beschreibenVor("ds");
    $("#DsImportiertVon").val(localStorage.Email);
};

// wenn importieren_bs_ds_beschreiben_collapse geöffnet wird
window.adb.handleImportierenBsDsBeschreibenCollapseShown = function() {
    'use strict';
    // mitgeben, woher die Anfrage kommt, weil ev. angemeldet werden muss
    window.adb.bereiteImportieren_bs_beschreibenVor("bs");
    $("#BsImportiertVon").val(localStorage.Email);
};

// wenn importieren_ds_daten_uploaden_collapse geöffnet wird
window.adb.handleImportierenDsDatenUploadenCollapseShown = function() {
    'use strict';
    if (!window.adb.pruefeAnmeldung("ds")) {
        $(this).collapse('hide');
    } else {
        $('#DsFile').fileupload();
    }
    $('html, body').animate({
        scrollTop: $("#importieren_ds_daten_uploaden_collapse").offset().top
    }, 2000);
};

// wenn importieren_bs_daten_uploaden_collapse geöffnet wird
window.adb.handleImportierenBsDatenUpladenCollapseShown = function() {
    'use strict';
    if (!window.adb.pruefeAnmeldung("bs")) {
        $(this).collapse('hide');
    } else {
        $('#BsFile').fileupload();
    }
    $('html, body').animate({
        scrollTop: $("#importieren_bs_daten_uploaden_collapse").offset().top
    }, 2000);
};

// wenn importieren_ds_ids_identifizieren_collapse geöffnet wird
window.adb.handleImportierenDsIdsIdentifizierenCollapseShown = function() {
    'use strict';
    if (!window.adb.pruefeAnmeldung("ds")) {
        $(this).collapse('hide');
    }
    $('html, body').animate({
        scrollTop: $("#importieren_ds_ids_identifizieren_collapse").offset().top
    }, 2000);
};

// wenn importieren_bs_ids_identifizieren_collapse geöffnet wird
window.adb.handleImportierenBsIdsIdentifizierenCollapseShown = function() {
    'use strict';
    if (!window.adb.pruefeAnmeldung("bs")) {
        $(this).collapse('hide');
    }
    $('html, body').animate({
        scrollTop: $("#importieren_bs_ids_identifizieren_collapse").offset().top
    }, 2000);
};

// wenn importieren_ds_import_ausfuehren_collapse geöffnet wird
window.adb.handleImportierenDsImportAusführenCollapseShown = function() {
    'use strict';
    if (!window.adb.pruefeAnmeldung("ds")) {
        $(this).collapse('hide');
    }
    $('html, body').animate({
        scrollTop: $("#importieren_ds_import_ausfuehren_collapse").offset().top
    }, 2000);
};

// wenn importieren_bs_import_ausfuehren_collapse geöffnet wird
window.adb.handleImportierenBsImportAusführenCollapseShown = function() {
    'use strict';
    if (!window.adb.pruefeAnmeldung("bs")) {
        $(this).collapse('hide');
    }
    $('html, body').animate({
        scrollTop: $("#importieren_bs_import_ausfuehren_collapse").offset().top
    }, 2000);
};

// wenn DsWählen geändert wird
window.adb.handleDsWählenChange = function() {
    'use strict';
    var ds_name = this.value,
        wählbar = false,
        $DsAnzDs = $("#DsAnzDs"),
        $DsAnzDs_label = $("#DsAnzDs_label"),
        $DsName = $("#DsName"),
        $importieren_ds_ds_beschreiben_error = $("#importieren_ds_ds_beschreiben_error");
    // allfälligen Alert schliessen
    $importieren_ds_ds_beschreiben_error
        .alert()
        .hide();
    // wählbar setzen
    // wählen kann man nur, was man selber importiert hat - oder admin ist
    if ($("#"+this.id+" option:selected").attr("waehlbar") === "true") {
        wählbar = true;
    } else if (Boolean(localStorage.admin)) {
        wählbar = true;
    }
    if (wählbar) {
        // zuerst alle Felder leeren
        $('#importieren_ds_ds_beschreiben_collapse textarea, #importieren_ds_ds_beschreiben_collapse input').each(function() {
            $(this).val('');
        });
        $DsAnzDs.html("");
        $DsAnzDs_label.html("");
        if (ds_name) {
            _.each(window.adb.ds_von_objekten.rows, function(ds_von_objekten_row) {
                if (ds_von_objekten_row.key[1] === ds_name) {
                    $DsName.val(ds_name);
                    _.each(ds_von_objekten_row.key[4], function(feldwert, feldname) {
                        if (feldname === "Ursprungsdatensammlung") {
                            $("#DsUrsprungsDs").val(feldwert);
                        } else if (feldname !== "importiert von") {
                            $("#Ds" + feldname).val(feldwert);
                        }
                    });
                    if (ds_von_objekten_row.key[2] === true) {
                        $("#DsZusammenfassend").prop('checked', true);
                        // Feld für Ursprungs-DS anzeigen
                        $("#DsUrsprungsDs_div").show();
                    } else {
                        // sicherstellen, dass der Haken im Feld entfernt wird, wenn nach der zusammenfassenden eine andere DS gewählt wird
                        $("#DsZusammenfassend").prop('checked', false);
                        // und Feld für Ursprungs-DS verstecken
                        $("#DsUrsprungsDs_div").hide();
                    }
                    // wenn die ds/bs kein "importiert von" hat ist der Wert null
                    // verhindern, dass null angezeigt wird
                    if (ds_von_objekten_row.key[3]) {
                        $("#DsImportiertVon").val(ds_von_objekten_row.key[3]);
                    } else {
                        $("#DsImportiertVon").val("");
                    }
                    $DsAnzDs_label.html("Anzahl Arten/Lebensräume");
                    $DsAnzDs.html(ds_von_objekten_row.value);
                    // dafür sorgen, dass textareas genug gross sind
                    $('#importieren_ds')
                        .find('textarea')
                        .each(function() {
                            window.adb.fitTextareaToContent(this, document.documentElement.clientHeight);
                        });
                    $DsName.focus();
                }
                // löschen-Schaltfläche einblenden
                $("#DsLoeschen").show();
            });
        } else {
            // löschen-Schaltfläche ausblenden
            $("#DsLoeschen").hide();
        }
    } else {
        // melden, dass diese BS nicht bearbeitet werden kann
        $("#importieren_ds_ds_beschreiben_error_text")
            .html("Sie können nur Datensammlungen verändern, die Sie selber importiert haben.<br>Ausnahme: Zusammenfassende Datensammlungen.");
        $importieren_ds_ds_beschreiben_error
            .alert()
            .show();
        $('html, body').animate({
            scrollTop: $("#DsWaehlen").offset().top
        }, 2000);
    }
};

// wenn DsName geändert wird
// suchen, ob schon eine Datensammlung mit diesem Namen existiert
// und sie von jemand anderem importiert wurde
// und sie nicht zusammenfassend ist
window.adb.handleDsNameChange = function() {
    'use strict';
    var that = this,
        ds_key = _.find(window.adb.ds_namen_eindeutig, function(key) {
            return key[0] === that.value && key[2] !== localStorage.Email && !key[1];
        }),
        $importieren_ds_ds_beschreiben_hinweis2 = $("#importieren_ds_ds_beschreiben_hinweis2");
    if (ds_key) {
        $importieren_ds_ds_beschreiben_hinweis2
            .alert()
            .show()
            .html('Es existiert schon eine gleich heissende und nicht zusammenfassende Datensammlung.<br>Sie wurde von jemand anderem importiert. Daher müssen Sie einen anderen Namen verwenden.');
        setTimeout(function() {
            $importieren_ds_ds_beschreiben_hinweis2
                .alert()
                .hide();
        }, 30000);
        $("#DsName")
            .val("")
            .focus();
    } else {
        $importieren_ds_ds_beschreiben_hinweis2
            .alert()
            .hide();
    }
};

// wenn DsLöschen geklickt wird
window.adb.handleDsLöschenClick = function() {
    'use strict';
    // Rückmeldung anzeigen
    $("#importieren_ds_ds_beschreiben_hinweis")
        .alert()
        .show()
        .html("Bitte warten: Die Datensammlung wird entfernt...");
    window.adb.entferneDatensammlungAusAllenObjekten($("#DsName").val());
};

// wenn BsLoeschen geklickt wird
window.adb.handleBsLöschenClick = function() {
    'use strict';
    // Rückmeldung anzeigen
    $("#importieren_bs_ds_beschreiben_hinweis")
        .alert()
        .removeClass("alert-success")
        .removeClass("alert-danger")
        .addClass("alert-info")
        .show();
    $("#importieren_bs_ds_beschreiben_hinweis_text").html("Bitte warten: Die Beziehungssammlung wird entfernt...");
    window.adb.entferneBeziehungssammlungAusAllenObjekten($("#BsName").val());
};

// wenn exportieren geklickt wird
window.adb.handleExportierenClick = function() {
    'use strict';
    var zeigeFormular = require('./modules/zeigeFormular');
    zeigeFormular ("export");
    delete window.adb.exportieren_objekte;
};

// wenn exportieren_alt geklickt wird
window.adb.handleExportierenAltClick = function() {
    'use strict';
    window.open("_list/export_alt_mit_synonymen_standardfelder/all_docs_mit_synonymen_fuer_alt?include_docs=true");
};

// wenn .feld_waehlen geändert wird
// kontrollieren, ob mehr als eine Beziehungssammlung angezeigt wird
// und pro Beziehung eine Zeile ausgegeben wird. 
// Wenn ja: reklamieren und rückgängig machen
window.adb.handleFeldWählenChange = function() {
    'use strict';
    if ($("#export_bez_in_zeilen").prop('checked')) {
        var bez_ds_checked = [],
            that = this;
        $("#exportieren_felder_waehlen_felderliste")
            .find(".feld_waehlen")
            .each(function() {
                if ($(this).prop('checked') && $(this).attr('dstyp') === "Beziehung") {
                    bez_ds_checked.push($(this).attr('datensammlung'));
                }
            });
        // eindeutige Liste der dsTypen erstellen
        bez_ds_checked = _.union(bez_ds_checked);
        if (bez_ds_checked && bez_ds_checked.length > 1) {
            $('#meldung_zuviele_bs').modal();
            $(that).prop('checked', false);
        } else {
            window.adb.exportZurücksetzen();
        }
    }
};

// wenn .feld_waehlen_alle_von_ds geändert wird
// wenn checked: alle unchecken, sonst alle checken
window.adb.handleFeldWählenAlleVonDs = function() {
    'use strict';
    var ds = $(this).attr('datensammlung'),
        status = false;
    if ($(this).prop('checked')) {
        status = true;
    }
    $('[datensammlung="' + ds + '"]').each(function() {
        $(this).prop('checked', status);
    });
};

// wenn exportieren_ds_objekte_waehlen_gruppe geändert wird
window.adb.handleExportierenDsObjekteWählenGruppeChange = function() {
    'use strict';
    window.adb.erstelleListeFürFeldwahl();
};

// ist nötig, weil index.html nicht requiren kann
window.adb.handleExportFeldFilternChange = function() {
    'use strict';
    console.log('this: ', this);
    var that = this,
        handleExportFeldFilternChange = require('./modules/handleExportFeldFilternChange');
    handleExportFeldFilternChange($, that);
};

// wenn exportieren_exportieren angezeigt wird
// zur Schaltfläche Vorschau scrollen
window.adb.handleExportierenExportierenShow = function() {
    'use strict';
    // Fehlermeldung verstecken, falls sie noch offen war
    $("#exportieren_exportieren_error_text")
        .alert()
        .hide();
    $('html, body').animate({
        scrollTop: $("#exportieren_exportieren_tabelle_aufbauen").offset().top
    }, 2000);
};

// wenn .btn.lr_bearb_bearb geklickt wird
window.adb.handleBtnLrBearbBearbKlick = function() {
    'use strict';
    if (!$(this).hasClass('disabled')) {
        window.adb.bearbeiteLrTaxonomie();
    }
};

// wenn .btn.lr_bearb_schuetzen geklickt wird
window.adb.handleBtnLrBearbSchuetzenClick = function() {
    'use strict';
    if (!$(this).hasClass('disabled')) {
        window.adb.schuetzeLrTaxonomie();
        // Einstellung merken, damit auch nach Datensatzwechsel die Bearbeitbarkeit bleibt
        delete localStorage.lr_bearb;
    }
};

// wenn .btn.lr_bearb_neu geklickt wird
window.adb.handleBtnLrBearbNeuClick = function() {
    'use strict';
    var html,
        getHtmlForLrParentAuswahlliste = require('./modules/getHtmlForLrParentAuswahlliste');
    if (!$(this).hasClass('disabled')) {
        getHtmlForLrParentAuswahlliste($("#Taxonomie").val(), function (html) {
            $("#lr_parent_waehlen_optionen").html(html);
            // jetzt das modal aufrufen
            // höhe Anpassen funktioniert leider nicht über css mit calc
            $('#lr_parent_waehlen').modal();
            $('#lr_parent_waehlen_optionen').css('max-height', $(window).height()-100);
        });
    }
};

// wenn #lr_parent_waehlen_optionen [name="parent_optionen"] geändert wird
window.adb.handleLrParentOptionenChange = function() {
    'use strict';
    var handleLrParentOptionenChange = require('./modules/handleLrParentOptionenChange');
    handleLrParentOptionenChange($, this);
};

// wenn rueckfrage_lr_loeschen_ja geklickt wird
window.adb.handleRückfrageLrLöschenJaClick = function() {
    'use strict';
    // zuerst die id des Objekts holen
    var uri = new Uri($(location).attr('href')),
        id = uri.getQueryParamValue('id'),
        hash = uri.anchor();
    // wenn browser history nicht unterstützt, erstellt history.js eine hash
    // dann muss die id durch die id in der hash ersetzt werden
    if (hash) {
        var uri2 = new Uri(hash);
        id = uri2.getQueryParamValue('id');
    }
    // Objekt selbst inkl. aller hierarchisch darunter liegende Objekte ermitteln und löschen
    var $db = $.couch.db("artendb");
    $db.view('artendb/hierarchie?key="' + id + '"&include_docs=true', {
        success: function(data) {
            // daraus einen Array von docs machen
            var doc_array = _.map(data.rows, function(row) {
                return row.doc;
            });
            // und diese Dokumente nun löschen
            window.adb.löscheMassenMitObjektArray(doc_array);
            // vorigen node ermitteln
            var voriger_node = $.jstree._reference("#" + id)._get_prev("#" + id);
            // node des gelöschten LR entfernen
            $.jstree._reference("#" + id).delete_node("#" + id);
            // vorigen node öffnen
            if (voriger_node) {
                $.jstree._reference(voriger_node).select_node(voriger_node);
            } else {
                window.adb.öffneGruppe("Lebensräume");
            }
        }
    });
};

// Wenn #art .Lebensräume.Taxonomie .controls geändert wird
window.adb.handleLrTaxonomieControlsChange = function() {
    'use strict';
    window.adb.speichern($(this).val(), this.id, $(this).attr('dsName'), $(this).attr('dsTyp'));
};

// wenn .Lebensräume.Taxonomie geöffnet wird
window.adb.handlePanelbodyLrTaxonomieShown = function() {
    'use strict';
    if (localStorage.lr_bearb == "true") {
        window.adb.bearbeiteLrTaxonomie();
    }
};

// wenn #exportieren_exportieren_collapse geöffnet wird
window.adb.handleExportierenExportierenCollapseShown = function() {
    'use strict';
    var that = this;
    // nur ausführen, wenn exportieren_exportieren_collapse offen ist
    // komischerweise wurde dieser Code immer ausgelöst, wenn bei Lebensräumen F5 gedrückt wurde!
    if ($("#exportieren_exportieren_collapse").is(":visible")) {
        if (window.adb.handleExportierenObjekteWaehlenCollapseShown(that)) {
            // Gruppe ist gewählt, weitermachen
            // Tabelle und Herunterladen-Schaltfläche ausblenden
            $("#exportieren_exportieren_tabelle").hide();
            $(".exportieren_exportieren_exportieren").hide();
            // filtert und baut danach die Vorschautabelle auf
            window.adb.filtereFürExport();
        }
    }
};

window.adb.handleExportierenObjekteWaehlenCollapseShown = function(that) {
    'use strict';
    var gruppen_gewählt = window.adb.fürExportGewählteGruppen();
    if (gruppen_gewählt.length === 0) {
        // keine Gruppe gewählt
        window.adb.erstelleListeFürFeldwahl();
        // und den panel schliessen
        $(that).collapse('hide');
        return false;
    } else {
        return true;
    }
};

// wenn #exportieren_objekte_Taxonomien_zusammenfassen geklickt wird
window.adb.handleExportierenObjekteTaxonomienZusammenfassenClick = function(that) {
    'use strict';
    var gruppe_ist_gewählt = false;
    if ($(that).hasClass("active")) {
        window.adb.fasseTaxonomienZusammen = false;
        $(that).html("Alle Taxonomien zusammenfassen");
    } else {
        window.adb.fasseTaxonomienZusammen = true;
        $(that).html("Taxonomien einzeln behandeln");
    }
    // Felder neu aufbauen, aber nur, wenn eine Gruppe gewählt ist
    $("#exportieren_objekte_waehlen_gruppen_collapse")
        .find(".exportieren_ds_objekte_waehlen_gruppe")
        .each(function() {
            if ($(that).prop('checked')) {
                gruppe_ist_gewählt = true;
            }
        });
    if (gruppe_ist_gewählt) {
        window.adb.erstelleListeFürFeldwahl();
    }
};

// wenn #exportieren_exportieren_exportieren geklickt wird
window.adb.handleExportierenExportierenExportierenClick = function() {
    'use strict';
    if (window.adb.isFileAPIAvailable()) {
        var exportstring = window.adb.erstelleExportString(window.adb.exportieren_objekte),
            blob = new Blob([exportstring], {type: "text/csv;charset=utf-8;"}),
            d = new Date(),
            month = d.getMonth()+1,
            day = d.getDate(),
            output = d.getFullYear() + '-' + (month<10 ? '0' : '') + month + '-' + (day<10 ? '0' : '') + day;
        saveAs(blob, output + "_export.csv");
    }
};

// wenn .panel geöffnet wird
// Höhe der textareas an Textgrösse anpassen
window.adb.handlePanelShown = function() {
    'use strict';
    $(this).find('textarea').each(function() {
        window.adb.fitTextareaToContent(this.id);
    });
};

// wenn .LinkZuArtGleicherGruppe geklickt wird
window.adb.handleLinkZuArtGleicherGruppeClick = function(id) {
    'use strict';
    $(".suchen").val("");
    $("#tree" + window.adb.Gruppe)
        .jstree("clear_search")
        .jstree("deselect_all")
        .jstree("close_all", -1)
        .jstree("select_node", "#" + id);
};

// wenn Fenstergrösse verändert wird
window.adb.handleResize = function() {
    'use strict';
    window.adb.setzeTreehöhe();
    // Höhe der Textareas korrigieren
    $('#forms').find('textarea').each(function() {
        window.adb.fitTextareaToContent(this.id);
    });
};

// wenn .anmelden_btn geklickt wird
window.adb.handleAnmeldenBtnClick = function(that) {
    'use strict';
    // es muss mitgegeben werden, woher die Anmeldung kam, damit die email aus dem richtigen Feld geholt werden kann
    var bs_ds = that.id.substring(that.id.length-2);
    if (bs_ds === "rt") {
        bs_ds = "art";
    }
    window.adb.meldeUserAn(bs_ds);
};

// wenn .Email keyup
window.adb.handleEmailKeyup = function() {
    'use strict';
    //allfällig noch vorhandenen Hinweis ausblenden
    $(".Emailhinweis").hide();
};

// wenn .Passwort keyup
window.adb.handlePasswortKeyup = function() {
    'use strict';
    //allfällig noch vorhandenen Hinweis ausblenden
    $(".Passworthinweis").hide();
};

// wenn .Passwort2 keyup
window.adb.handlePasswort2Keyup = function() {
    'use strict';
    //allfällig noch vorhandenen Hinweis ausblenden
    $(".Passworthinweis2").hide();
};

// wenn .konto_erstellen_btn geklickt wird
window.adb.handleKontoErstellenBtnClick = function(that) {
    'use strict';
    var bs_ds = that.id.substring(that.id.length-2);
    if (bs_ds === "rt") {
        bs_ds = "art";
    }
    $(".signup").show();
    $(".anmelden_btn").hide();
    $(".abmelden_btn").hide();
    $(".konto_erstellen_btn").hide();
    $(".konto_speichern_btn").show();
    $(".importieren_anmelden_fehler").hide();
    setTimeout(function() {
        $("#Email_" + bs_ds).focus();
    }, 50);  // need to use a timer so that .blur() can finish before you do .focus()
};

// wenn .konto_speichern_btn geklickt wird
window.adb.handleKontoSpeichernBtnClick = function(that) {
    'use strict';
    var bs_ds = that.id.substring(that.id.length-2);
    if (bs_ds === "rt") {
        bs_ds = "art";
    }
    if (window.adb.validiereSignup(bs_ds)) {
        window.adb.erstelleKonto(bs_ds);
        // Anmeldefenster zurücksetzen
        $(".signup").hide();
        $(".anmelden_btn").hide();
        $(".abmelden_btn").show();
        $(".konto_erstellen_btn").hide();
        $(".konto_speichern_btn").hide();
    }
};

// wenn .gruppe geklickt wird
window.adb.handleÖffneGruppeClick = function() {
    'use strict';
    window.adb.öffneGruppe($(this).attr("Gruppe"));
};

// wenn #DsFelder geändert wird
window.adb.handleDsFelderChange = function() {
    'use strict';
    window.adb.meldeErfolgVonIdIdentifikation("Ds");
};

// wenn #BsFelder geändert wird
window.adb.handleBsFelderChange = function() {
    'use strict';
    window.adb.meldeErfolgVonIdIdentifikation("Bs");
};

// wenn #DsId geändert wird
window.adb.handleDsIdChange = function() {
    'use strict';
    window.adb.meldeErfolgVonIdIdentifikation("Ds");
};

// wenn #BsId geändert wird
window.adb.handleBsIdChange = function() {
    'use strict';
    window.adb.meldeErfolgVonIdIdentifikation("Bs");
};

// wenn in textarea keyup oder focus
window.adb.handleTextareaKeyupFocus = function() {
    'use strict';
    window.adb.fitTextareaToContent(this.id);
};

// übernimmt eine Array mit Objekten
// und den div, in dem die Tabelle eingefügt werden soll
// plus einen div, in dem die Liste der Felder angzeigt wird (falls dieser div mitgeliefert wird)
// baut damit eine Tabelle auf und fügt sie in den übergebenen div ein
window.adb.erstelleTabelle = function(Datensätze, felder_div, tabellen_div) {
    'use strict';
    var html = "",
        Feldname = "",
        html_ds_felder_div = "",
        erste_10_ds,
        $tabellen_div = $("#"+tabellen_div);
    if (Datensätze.length > 10) {
        html += "Vorschau der ersten 10 von " + Datensätze.length + " Datensätzen:";
    } else if (Datensätze.length > 1) {
        html += "Vorschau der " + Datensätze.length + " Datensätze:";
    } else {
        html += "Vorschau des einzigen Datensatzes:";
    }
    // Tabelle initiieren
    html += '<div class="table-responsive"><table class="table table-bordered table-striped table-condensed table-hover">';
    // Titelzeile aufbauen
    // Zeile anlegen
    // gleichzeitig Feldliste für Formular anlegen
    if (felder_div) {
        if (felder_div === "DsFelder_div") {
            Feldname = "DsFelder";
        } else if (felder_div === "BsFelder_div") {
            Feldname = "BsFelder";
        }
    }
    html_ds_felder_div += '<label class="control-label" for="'+Feldname+'">Feld mit eindeutiger ID<br>in den Importdaten</label>';
    html_ds_felder_div += '<select multiple class="controls form-control input-sm" id="'+Feldname+'" style="height:' + ((Object.keys(Datensätze[0]).length*19)+9)  + 'px">';
    html += "<thead><tr>";

    // durch die Felder des ersten Datensatzes zirkeln
    _.each(Datensätze[0], function(feldwert, feldname) {
        // Spalte anlegen
        html += "<th>" + feldname + "</th>";
        // Option für Feldliste anfügen
        html_ds_felder_div += '<option value="' + feldname + '">' + feldname + '</option>';
    });
    // Titelzeile abschliessen
    html += "</tr></thead><tbody>";
    // Feldliste abschliessen
    html_ds_felder_div += '</select>';
    if (felder_div) {
        // nur, wenn ein felder_div übergeben wurde
        $("#"+felder_div).html(html_ds_felder_div);
    }

    // Tabellenzeilen aufbauen
    // nur die ersten 10 Datensätze anzeigen
    erste_10_ds = _.first(Datensätze, 10);

    _.each(erste_10_ds, function(datensatz) {
        // Zeile anlegen
        html += "<tr>";
        // durch die Felder zirkeln
        _.each(datensatz, function(feldwert, feldname) {
            // Spalte anlegen
            html += "<td>";
            if (feldwert === null) {
                // Null-Werte als leer anzeigen
                html += "";
            } else if (typeof feldwert === "object") {
                html += JSON.stringify(feldwert);
            } else if (feldwert || feldwert === 0) {
                html += feldwert;
            } else if (feldwert === false) {
                // dafür sogen, dass false auch angezeigt wird
                // ohne diese Zeile bleibt das Feld sonst leer
                html += feldwert;
            } else {
                // nullwerte als leerwerte (nicht) anzeigen
                html += "";
            }
            // Spalte abschliessen
            html += "</td>";
        });
        // Zeile abschliessen
        html += "</tr>";
    });

    // Tabelle abschliessen
    html += '</tbody></table></div>';
    // html in div einfügen
    $tabellen_div
        .html(html)
        .css("margin-top", "20px")
        // sichtbar stellen
        .show();
    // fenster scrollen
    $('html, body').animate({
        scrollTop: $tabellen_div.offset().top
    }, 2000);
};

// erhält dbs = "Ds" oder "Bs"
window.adb.meldeErfolgVonIdIdentifikation = function(dbs) {
    'use strict';
    var $dbsFelderSelected = $("#"+dbs+"Felder option:selected"),
        $dbsIdSelected = $("#"+dbs+"Id option:selected"),
        ids_von_datensätzen = [],
        mehrfach_vorkommende_ids = [],
        ids_von_nicht_importierbaren_datensätzen = [];

    if ($dbsFelderSelected.length && $dbsIdSelected.length) {
        // beide ID's sind gewählt
        window.adb[dbs+"FelderId"] = $dbsFelderSelected.val();
        window.adb.DsId = $dbsIdSelected.val();
        window.adb[dbs+"Id"] = $dbsIdSelected.val();
        // das hier wird später noch für den Inmport gebraucht > globale Variable machen
        window.adb.ZuordbareDatensätze = [];
        $("#importieren_"+dbs.toLowerCase()+"_ids_identifizieren_hinweis_text")
            .alert()
            .html("Bitte warten, die Daten werden analysiert.<br>Das kann eine Weile dauern...")
            .removeClass("alert-success")
            .removeClass("alert-danger")
            .addClass("alert-info")
            .show();
        $('html, body').animate({
            scrollTop: $("#importieren_" + dbs.toLowerCase() + "_ids_identifizieren_collapse").offset().top
        }, 2000);

        // Dokumente aus der Gruppe der Datensätze holen
        // durch alle loopen. Dabei einen Array von Objekten bilden mit id und guid
        // kontrollieren, ob eine id mehr als einmal vorkommt
        var $db = $.couch.db("artendb");
        if (window.adb.DsId === "guid") {
            $db.view('artendb/all_docs', {
                success: function(data) {
                    var name_des_id_felds = window.adb[dbs+"FelderId"];
                    // durch die importierten Datensätze loopen
                    _.each(window.adb[dbs.toLowerCase()+"Datensätze"], function(import_datensatz) {
                        if (ids_von_datensätzen.indexOf(import_datensatz[name_des_id_felds]) === -1) {
                            // diese ID wurde noch nicht hinzugefügt > hinzufügen
                            ids_von_datensätzen.push(import_datensatz[name_des_id_felds]);
                            // prüfen, ob die ID zugeordnet werden kann
                            var zugehöriges_objekt = _.find(data.rows, function(objekt_row) {
                                return objekt_row.key === import_datensatz[name_des_id_felds];
                            });
                            if (zugehöriges_objekt) {
                                window.adb.ZuordbareDatensätze.push(import_datensatz[name_des_id_felds]);
                            } else {
                                // diese ID konnte nicht hinzugefügt werden. In die Liste der nicht hinzugefügten aufnehmen
                                ids_von_nicht_importierbaren_datensätzen.push(import_datensatz[name_des_id_felds]);
                            }
                        } else {
                            // diese ID wurden schon hinzugefügt > mehrfach!
                            mehrfach_vorkommende_ids.push(import_datensatz[name_des_id_felds]);
                        }
                    });
                    window.adb.meldeErfolgVonIdIdentifikation_02(mehrfach_vorkommende_ids, ids_von_datensätzen, ids_von_nicht_importierbaren_datensätzen, dbs);
                }
            });
        } else {
            $db.view('artendb/gruppe_id_taxonomieid?startkey=["' + window.adb.DsId + '"]&endkey=["' + window.adb.DsId + '",{},{}]', {
                success: function(data) {
                    var name_des_id_felds = window.adb[dbs+"FelderId"];
                    // durch die importierten Datensätze loopen
                    _.each(window.adb[dbs.toLowerCase()+"Datensätze"], function(import_datensatz) {
                        if (ids_von_datensätzen.indexOf(import_datensatz[name_des_id_felds]) === -1) {
                            // diese ID wurde noch nicht hinzugefügt > hinzufügen
                            ids_von_datensätzen.push(import_datensatz[name_des_id_felds]);
                            // prüfen, ob die ID zugeordnet werden kann
                            var zugehöriges_objekt = _.find(data.rows, function(objekt_row) {
                                return objekt_row.key[2] === import_datensatz[name_des_id_felds];
                            });
                            if (zugehöriges_objekt) {
                                var Objekt = {};
                                Objekt.Id = parseInt(import_datensatz[name_des_id_felds], 10);
                                Objekt.Guid = zugehöriges_objekt.key[1];
                                window.adb.ZuordbareDatensätze.push(Objekt);
                            } else {
                                // diese ID konnte nicht hinzugefügt werden. In die Liste der nicht hinzugefügten aufnehmen
                                ids_von_nicht_importierbaren_datensätzen.push(import_datensatz[name_des_id_felds]);
                            }
                        } else {
                            // diese ID wurden schon hinzugefügt > mehrfach!
                            mehrfach_vorkommende_ids.push(import_datensatz[name_des_id_felds]);
                        }
                    });
                    window.adb.meldeErfolgVonIdIdentifikation_02(mehrfach_vorkommende_ids, ids_von_datensätzen, ids_von_nicht_importierbaren_datensätzen, dbs);
                }
            });
        }
    }
};

window.adb.meldeErfolgVonIdIdentifikation_02 = function(mehrfach_vorkommende_ids, ids_von_datensätzen, ids_von_nicht_importierbaren_datensätzen, dbs) {
    'use strict';
    var $importieren_dbs_ids_identifizieren_hinweis_text = $("#importieren_"+dbs.toLowerCase()+"_ids_identifizieren_hinweis_text");
    $importieren_dbs_ids_identifizieren_hinweis_text.alert();
    // rückmelden: Falls mehrfache ID's, nur das rückmelden und abbrechen
    if (mehrfach_vorkommende_ids.length && dbs !== "Bs") {
        $importieren_dbs_ids_identifizieren_hinweis_text
            .html("Die folgenden ID's kommen mehrfach vor: " + mehrfach_vorkommende_ids + "<br>Bitte entfernen oder korrigieren Sie die entsprechenden Zeilen")
            .removeClass("alert-info")
            .removeClass("alert-success")
            .addClass("alert-danger");
    } else if (window.adb.ZuordbareDatensätze.length < ids_von_datensätzen.length) {
        // rückmelden: Total x Datensätze. y davon enthalten die gewählte ID. q davon können zugeordnet werden
        if (window.adb.ZuordbareDatensätze.length > 0) {
            // ein Teil der Datensätze kann importiert werden. Als Hinweis melden
            $importieren_dbs_ids_identifizieren_hinweis_text
                .removeClass("alert-danger")
                .removeClass("alert-success")
                .addClass("alert-info");
        } else {
            // keine Datensätze können importier werden. Als Misserfolg melden
            $importieren_dbs_ids_identifizieren_hinweis_text
                .removeClass("alert-info")
                .removeClass("alert-success")
                .addClass("alert-danger");
        }
        if (dbs === "Bs") {
            $importieren_dbs_ids_identifizieren_hinweis_text.html("Die Importtabelle enthält " + window.adb[dbs.toLowerCase()+"Datensätze"].length + " Beziehungen von " + ids_von_datensätzen.length + " Arten:<br>Beziehungen von " + ids_von_datensätzen.length + " Arten enthalten einen Wert im Feld \"" + window.adb[dbs+"FelderId"] + "\"<br>" + window.adb.ZuordbareDatensätze.length + " können zugeordnet und importiert werden<br>ACHTUNG: Beziehungen von " + ids_von_nicht_importierbaren_datensätzen.length + " Arten mit den folgenden Werten im Feld \"" + window.adb[dbs+"FelderId"] + "\" können NICHT zugeordnet und importiert werden: " + ids_von_nicht_importierbaren_datensätzen);
        } else {
            $importieren_dbs_ids_identifizieren_hinweis_text.html("Die Importtabelle enthält " + window.adb[dbs.toLowerCase()+"Datensätze"].length + " Datensätze:<br>" + ids_von_datensätzen.length + " enthalten einen Wert im Feld \"" + window.adb[dbs+"FelderId"] + "\"<br>" + window.adb.ZuordbareDatensätze.length + " können zugeordnet und importiert werden<br>ACHTUNG: " + ids_von_nicht_importierbaren_datensätzen.length + " Datensätze mit den folgenden Werten im Feld \"" + window.adb[dbs+"FelderId"] + "\" können NICHT zugeordnet und importiert werden: " + ids_von_nicht_importierbaren_datensätzen);
        }
        $("#"+dbs+"Importieren").show();
        $("#"+dbs+"Entfernen").show();
    } else {
        // rückmelden: Total x Datensätze. y davon enthalten die gewählte ID. q davon können zugeordnet werden
        $importieren_dbs_ids_identifizieren_hinweis_text
            .removeClass("alert-info")
            .removeClass("alert-danger")
            .addClass("alert-success");
        if (dbs === "Bs") {
            $importieren_dbs_ids_identifizieren_hinweis_text.html("Die Importtabelle enthält " + window.adb[dbs.toLowerCase()+"Datensätze"].length + " Beziehungen von " + ids_von_datensätzen.length + " Arten:<br>Beziehungen von " + ids_von_datensätzen.length + " Arten enthalten einen Wert im Feld \"" + window.adb[dbs+"FelderId"] + "\"<br>Beziehungen von " + window.adb.ZuordbareDatensätze.length + " Arten können zugeordnet und importiert werden");
        } else {
            $importieren_dbs_ids_identifizieren_hinweis_text.html("Die Importtabelle enthält " + window.adb[dbs.toLowerCase()+"Datensätze"].length + " Datensätze:<br>" + ids_von_datensätzen.length + " enthalten einen Wert im Feld \"" + window.adb[dbs+"FelderId"] + "\"<br>" + window.adb.ZuordbareDatensätze.length + " können zugeordnet und importiert werden");
        }
        $("#"+dbs+"Importieren").show();
        $("#"+dbs+"Entfernen").show();
    }
    $importieren_dbs_ids_identifizieren_hinweis_text.show();
    $('html, body').animate({
        scrollTop: $("#importieren_" + dbs.toLowerCase() + "_ids_identifizieren_collapse").offset().top
    }, 2000);
};

// bekommt das Objekt mit den Datensätzen (window.adb.dsDatensätze) und die Liste der zu aktualisierenden Datensätze (window.adb.ZuordbareDatensätze)
// holt sich selber die in den Feldern erfassten Infos der Datensammlung
window.adb.importiereDatensammlung = function() {
    'use strict';
    var datensammlung,
        anzahl_felder,
        anz_ds = window.adb.dsDatensätze.length,
        // Der Verlauf soll angezeigt werden, daher braucht es einen zähler
        anz_ds_importiert = 0,
        DsImportiert = $.Deferred(),
        $DsName = $("#DsName"),
        $DsBeschreibung = $("#DsBeschreibung"),
        nr,
        rückmeldung_intro,
        rückmeldung_links = "",
        rückmeldung,
        $DsDatenstand = $("#DsDatenstand"),
        $DsLink = $("#DsLink"),
        $DsUrsprungsDs = $("#DsUrsprungsDs"),
        $importieren_ds_import_ausfuehren_hinweis = $("#importieren_ds_import_ausfuehren_hinweis"),
        $importieren_ds_import_ausfuehren_hinweis_text = $("#importieren_ds_import_ausfuehren_hinweis_text"),
        erste_10_ids;
    // prüfen, ob ein DsName erfasst wurde. Wenn nicht: melden
    if (!$DsName.val()) {
        $("#meldung_individuell_label").html("Namen fehlt");
        $("#meldung_individuell_text").html("Bitte geben Sie der Datensammlung einen Namen");
        $("#meldung_individuell_schliessen").html("schliessen");
        $('#meldung_individuell').modal();
        $DsName.focus();
        return false;
    }

    // changes feed einrichten
    // versucht, view als Filter zu verwenden, oder besser, den expliziten Filter dsimport mit dsname als Kriterium
    // Ergebnis: bei view kamen alle changes, auch design doc. Bei dsimport kam nichts.
    /*var changes_options = {};
    changes_options.dsname = $DsName.val();
    changes_options.filter = "artendb/dsimport";
    window.adb.queryChangesStartingNow();

    // listener einrichten, der meldet, wenn ein Datensatz aktualisiert wurde
    $(document).bind('longpoll-data', function(event, data) {
        anzDsImportiert = anzDsImportiert + data.results.length;
        var prozent = Math.round(anzDsImportiert/anzDs*100);
        $("#DsImportierenProgressbar").css('width', prozent +'%').attr('aria-valuenow', prozent);
        if (anzDsImportiert >= anzDs-1 && anzDsImportiert <= anzDs) {
            // Rückmeldung in Feld anzeigen:
            $importieren_ds_import_ausfuehren_hinweis.css('display', 'block');
        }
    });*/

    // listener einrichten, der meldet, wenn ein Datensatz aktualisiert wurde
    $(document).bind('adb.ds_hinzugefügt', function() {
        anz_ds_importiert++;
        var prozent = Math.round(anz_ds_importiert/anz_ds*100),
            rückmeldung;
        $("#DsImportierenProgressbar")
            .css('width', prozent +'%')
            .attr('aria-valuenow', prozent);
        $("#DsImportierenProgressbarText").html(prozent + "%");
        $importieren_ds_import_ausfuehren_hinweis.removeClass("alert-success").removeClass("alert-danger").addClass("alert-info");
        rückmeldung = "Die Daten wurden importiert.<br>Die Indexe werden aktualisiert...";
        $importieren_ds_import_ausfuehren_hinweis_text.html(rückmeldung);
        $('html, body').animate({
            scrollTop: $importieren_ds_import_ausfuehren_hinweis.offset().top
        }, 2000);
        if (anz_ds_importiert === anz_ds) {
            // die Indexe
            var $db = $.couch.db("artendb");
            $db.view('artendb/lr', {
                success: function() {
                    // melden, dass views aktualisiert wurden
                    $importieren_ds_import_ausfuehren_hinweis.removeClass("alert-info").removeClass("alert-danger").addClass("alert-success");
                    rückmeldung = "Die Daten wurden importiert.<br>";
                    rückmeldung += "Die Indexe wurden aktualisiert.<br><br>";
                    rückmeldung += "Nachfolgend Links zu Objekten mit importierten Daten, damit Sie das Resultat überprüfen können:<br>";
                    $importieren_ds_import_ausfuehren_hinweis_text.html(rückmeldung + rückmeldung_links);
                    // Rückmeldungs-links behalten, falls der Benutzer direkt anschliessend entfernt
                    window.adb.rückmeldung_links = rückmeldung_links;
                    $('html, body').animate({
                        scrollTop: $importieren_ds_import_ausfuehren_hinweis.offset().top
                    }, 2000);
                }
            });
        }
    });
    _.each(window.adb.dsDatensätze, function(ds_datensatz) {
        // Datensammlung als Objekt gründen
        datensammlung = {};
        datensammlung.Name = $DsName.val();
        if ($DsBeschreibung.val()) {
            datensammlung.Beschreibung = $DsBeschreibung.val();
        }
        if ($DsDatenstand.val()) {
            datensammlung.Datenstand = $DsDatenstand.val();
        }
        if ($DsLink.val()) {
            datensammlung.Link = $DsLink.val();
        }
        // falls die Datensammlung zusammenfassend ist
        if ($("#DsZusammenfassend").prop('checked')) {
            datensammlung.zusammenfassend = true;
        }
        if ($DsUrsprungsDs.val()) {
            datensammlung.Ursprungsdatensammlung = $DsUrsprungsDs.val();
        }
        datensammlung["importiert von"] = localStorage.Email;
        // Felder der Datensammlung als Objekt gründen
        datensammlung.Eigenschaften = {};
        // Felder anfügen, wenn sie Werte enthalten
        anzahl_felder = 0;
        _.each(ds_datensatz, function(feldwert, feldname) {
            // nicht importiert wird die ID und leere Felder
            // und keine Taxonomie ID, wenn sie nur wegen der Identifikation mitgeliefert wurde
            //if (feldname !== window.adb.DsFelderId && feldwert !== "" && feldwert !== null && (window.adb.DsId !== "guid" && feldname !== "Taxonomie ID")) {
            if (feldname !== window.adb.DsFelderId && feldwert !== "" && feldwert !== null) {
                if (feldwert === -1) {
                    // Access macht in Abfragen mit Wenn-Klausel aus true -1 > korrigieren
                    datensammlung.Eigenschaften[feldname] = true;
                } else if (feldwert == "true") {
                    // true/false nicht als string importieren
                    datensammlung.Eigenschaften[feldname] = true;
                } else if (feldwert == "false") {
                    datensammlung.Eigenschaften[feldname] = false;
                } else if (feldwert == parseInt(feldwert, 10)) {
                    // Ganzzahlen als Zahlen importieren
                    datensammlung.Eigenschaften[feldname] = parseInt(feldwert, 10);
                } else if (feldwert == parseFloat(feldwert)) {
                    // Bruchzahlen als Zahlen importieren
                    datensammlung.Eigenschaften[feldname] = parseFloat(feldwert);
                } else {
                    // Normalfall
                    datensammlung.Eigenschaften[feldname] = feldwert;
                }
                anzahl_felder += 1;
            }
        });
        // entsprechenden Index öffnen
        // sicherstellen, dass Daten vorkommen. Gibt sonst einen Fehler
        if (anzahl_felder > 0) {
            // Datenbankabfrage ist langsam. Extern aufrufen,
            // sonst überholt die for-Schlaufe und Datensammlung ist bis zur saveDoc-Ausführung eine andere!
            var guid;
            if (window.adb.DsId === "guid") {
                // die in der Tabelle mitgelieferte id ist die guid
                guid = ds_datensatz[window.adb.DsFelderId];
            } else {
                var ds_datensatz_mit_richtiger_id = _.find(window.adb.ZuordbareDatensätze, function(datensatz) {
                    return datensatz.Id == ds_datensatz[window.adb.DsFelderId];
                });
                guid = ds_datensatz_mit_richtiger_id.Guid;
            }
            // kann sein, dass der guid oben nicht zugeordnet werden konnte. Dann nicht anfügen
            if (guid) {
                console.log("füge ds zu objekt");
                window.adb.fügeDatensammlungZuObjekt(guid, datensammlung);
            }
        }
    });
    // Für 10 Kontrollbeispiele die Links aufbauen
    if (window.adb.DsId === "guid") {
        erste_10_ids = _.first(window.adb.ZuordbareDatensätze, 10);
    } else {
        erste_10_ids = _.pluck(_.first(window.adb.ZuordbareDatensätze, 10), "Guid");
    }
    _.each(erste_10_ids, function(id, index) {
        nr = index + 1;
        rückmeldung_links += '<a href="' + $(location).attr("protocol") + '//' + $(location).attr("host") + $(location).attr("pathname") + '?id=' + id + '"  target="_blank">Beispiel ' + nr + '</a><br>';
    });

    // Rückmeldung in Feld anzeigen
    $importieren_ds_import_ausfuehren_hinweis.removeClass("alert-success").removeClass("alert-danger").addClass("alert-info");
    rückmeldung = "Die Daten werden importiert...";
    $importieren_ds_import_ausfuehren_hinweis_text.html(rückmeldung);
    $importieren_ds_import_ausfuehren_hinweis.css('display', 'block');
    $('html, body').animate({
        scrollTop: $importieren_ds_import_ausfuehren_hinweis.offset().top
    }, 2000);
    DsImportiert.resolve();
};

// wird momentan nicht benutzt
window.adb.queryChangesStartingNow = function(options) {
    'use strict';
    options = options || {};
    options.since = "now";
    if (options.filter) {
        // der Filter bremst die Abfrage - das ist schlecht, weil dann bereits DS aktualisiert wurden!
        // daher für die Erstabfrage entfernen
        var filter = options.filter;
        var dsname = options.dsname;
        delete options.view;
        delete options.dsname;
    }
    $.ajax({
        type: "get",
        url: "/artendb/_changes",
        dataType: "json",
        data: options
    })
    .done(function(data) {
        $(document).trigger('longpoll-data', data, data.last_seq);
        options.feed = "longpoll";
        options.since = data.last_seq;
        if (filter) {
            options.filter = filter;
            options.dsname = dsname;
        }
        $.ajax({
            type: "get",
            url: "/artendb/_changes",
            dataType: "json",
            data: options
        })
        .done(function(data2) {
            if (data2.results.length > 0 ) {
                $(document).trigger('longpoll-data2', data2);
            }
            options.since = data2.last_seq;
            // dafür sorgen, dass weiter beobachtet wird
            window.adb.queryChanges(options);
        });
    });
};

// wird momentan nicht benutzt
window.adb.queryChanges = function(options) {
    'use strict';
    options = options || {};
    options.since = options.since || "now";
    options.feed = options.feed || "longpoll";
    $.ajax({
        type: "get",
        url: "/artendb/_changes",
        dataType: "json",
        data: options
    })
    .done(function(data) {
        if (data.results.length > 0 ) {
            $(document).trigger('longpoll-data', data);
        }
        options.since = data.last_seq;
        window.adb.queryChanges(options);
    });
};

// bekommt das Objekt mit den Datensätzen (window.adb.bsDatensätze) und die Liste der zu aktualisierenden Datensätze (window.adb.ZuordbareDatensätze)
// holt sich selber die in den Feldern erfassten Infos der Datensammlung
window.adb.importiereBeziehungssammlung = function() {
    'use strict';
    var anzahl_felder,
        anzahl_beziehungssammlungen = window.adb.bsDatensätze.length,
        anz_bs_importiert = 0,
        erste_10_ids,
        nr,
        rückmeldung,
        rückmeldung_intro,
        rückmeldung_links = "",
        bs_importiert = $.Deferred(),
        $BsName = $("#BsName"),
        $BsBeschreibung = $("#BsBeschreibung"),
        $BsDatenstand = $("#BsDatenstand"),
        $BsLink = $("#BsLink"),
        $BsUrsprungsBs = $("#BsUrsprungsBs"),
        $importieren_bs_import_ausfuehren_hinweis = $("#importieren_bs_import_ausfuehren_hinweis"),
        $importieren_bs_import_ausfuehren_hinweis_text = $("#importieren_bs_import_ausfuehren_hinweis_text");
    // prüfen, ob ein BsName erfasst wurde. Wenn nicht: melden
    if (!$BsName.val()) {
        $("#meldung_individuell_label").html("Namen fehlt");
        $("#meldung_individuell_text").html("Bitte geben Sie der Beziehungssammlung einen Namen");
        $("#meldung_individuell_schliessen").html("schliessen");
        $('#meldung_individuell').modal();
        $BsName.focus();
        return false;
    }

    // Rückmeldung in Feld anzeigen:
    rückmeldung = "Die Daten werden importiert...";
    $importieren_bs_import_ausfuehren_hinweis_text.html(rückmeldung);
    $importieren_bs_import_ausfuehren_hinweis
        .removeClass("alert-success")
        .removeClass("alert-danger")
        .addClass("alert-info");
    $importieren_bs_import_ausfuehren_hinweis.alert().show();
    $('html, body').animate({
        scrollTop: $importieren_bs_import_ausfuehren_hinweis.offset().top
    }, 2000);

    // listener einrichten, der meldet, wenn ein Datensatz aktualisiert wurde
    $(document).bind('adb.bs_hinzugefügt', function() {
        anz_bs_importiert++;
        var prozent = Math.round(anz_bs_importiert/anzahl_beziehungssammlungen*100);
        $("#BsImportierenProgressbar")
            .css('width', prozent +'%')
            .attr('aria-valuenow', prozent);
        $("#BsImportierenProgressbarText").html(prozent + "%");
        $importieren_bs_import_ausfuehren_hinweis
            .removeClass("alert-success")
            .removeClass("alert-danger")
            .addClass("alert-info")
            .show();
        rückmeldung = "Die Daten werden importiert...<br>Die Indexe werden aktualisiert...";
        $importieren_bs_import_ausfuehren_hinweis_text.html(rückmeldung);
        $('html, body').animate({
            scrollTop: $importieren_bs_import_ausfuehren_hinweis.offset().top
        }, 2000);
        if (anz_bs_importiert === anzahl_beziehungssammlungen) {
            // Indices aktualisieren
            var $db = $.couch.db("artendb");
            $db.view('artendb/lr', {
                success: function() {
                    // melden, dass Indexe aktualisiert wurden
                    $importieren_bs_import_ausfuehren_hinweis
                        .removeClass("alert-info")
                        .removeClass("alert-danger")
                        .addClass("alert-success")
                        .show();
                    rückmeldung = "Die Daten wurden importiert.<br>";
                    rückmeldung += "Die Indexe wurden neu aufgebaut.<br><br>";
                    rückmeldung += "Nachfolgend Links zu Objekten mit importierten Daten, damit Sie das Resultat überprüfen können:<br>";
                    $importieren_bs_import_ausfuehren_hinweis_text.html(rückmeldung + rückmeldung_links);
                    // Rückmeldungs-links behalten, falls der Benutzer direkt anschliessend entfernt
                    window.adb.rückmeldung_links = rückmeldung_links;
                    $('html, body').animate({
                        scrollTop: $importieren_bs_import_ausfuehren_hinweis.offset().top
                    }, 2000);
                }
            });
        }
    });

    // zuerst: Veranlassen, dass die Beziehungspartner in window.adb.bsDatensätze in einen Array der richtigen Form umgewandelt werden
    $.when(window.adb.bereiteBeziehungspartnerFürImportVor())
        .then(function() {
            setTimeout(function() {
                anzahl_beziehungssammlungen = 0;
                var beziehungssammlung,
                    beziehungssammlung_vorlage = {};
                beziehungssammlung_vorlage.Name = $BsName.val();
                if ($BsBeschreibung.val()) {
                    beziehungssammlung_vorlage.Beschreibung = $BsBeschreibung.val();
                }
                if ($BsDatenstand.val()) {
                    beziehungssammlung_vorlage.Datenstand = $BsDatenstand.val();
                }
                if ($BsLink.val()) {
                    beziehungssammlung_vorlage.Link = $BsLink.val();
                }
                // falls die Datensammlung zusammenfassend ist
                if ($("#BsZusammenfassend").prop('checked')) {
                    beziehungssammlung_vorlage.zusammenfassend = true;
                }
                if ($BsUrsprungsBs.val()) {
                    beziehungssammlung_vorlage.Ursprungsdatensammlung = $BsUrsprungsBs.val();
                }
                beziehungssammlung_vorlage["importiert von"] = localStorage.Email;
                beziehungssammlung_vorlage.Beziehungen = [];
                // zunächst den Array von Objekten in ein Objekt mit Eigenschaften = ObjektGuid und darin Array mit allen übrigen Daten verwandeln
                var bs_datensätze_objekt = _.groupBy(window.adb.bsDatensätze, function(objekt) {
                    // id in guid umwandeln
                    var guid;
                    if (window.adb.BsId === "guid") {
                        // die in der Tabelle mitgelieferte id ist die guid
                        guid = objekt[window.adb.BsFelderId];
                    } else {
                        for (var q = 0; q < window.adb.ZuordbareDatensätze.length; q++) {
                            // in den zuordbaren Datensätzen nach dem Objekt mit der richtigen id suchen
                            if (window.adb.ZuordbareDatensätze[q].Id == objekt[window.adb.BsFelderId]) {
                                // und die guid auslesen
                                guid = window.adb.ZuordbareDatensätze[q].Guid;
                                break;
                            }
                        }
                    }
                    objekt.GUID = guid;
                    return objekt.GUID;
                });
                // jetzt durch die GUID's loopen und die jeweiligen Beziehungen anhängen
                $.each(bs_datensätze_objekt, function(importdaten_objekt_id, importdaten_felder_array) {
                    var beziehungen = [];
                    anzahl_beziehungssammlungen += 1;
                    // Beziehungssammlung als Objekt gründen, indem die Vorlage kopiert wird
                    beziehungssammlung = jQuery.extend(true, {}, beziehungssammlung_vorlage);
                    _.each(importdaten_felder_array, function(importdaten_feld) {
                        // durch die Felder der Beziehungen loopen
                        anzahl_felder = 0;
                        // Felder der Beziehungssammlung als Objekt gründen
                        var beziehung = {};
                        _.each(importdaten_feld, function(feldwert, feldname) {
                            // durch die Felder der Beziehung loopen
                            // nicht importiert wird die GUID und leere Felder
                            if (feldname !== "GUID" && feldwert !== "" && feldwert !== null) {
                                if (feldwert === -1) {
                                    // Access macht in Abfragen mit Wenn-Klausel aus true -1 > korrigieren
                                    beziehung[feldname] = true;
                                } else if (feldwert == "true") {
                                    // true/false nicht als string importieren
                                    beziehung[feldname] = true;
                                } else if (feldwert == "false") {
                                    beziehung[feldname] = false;
                                } else if (feldwert == parseInt(feldwert, 10)) {
                                    // Ganzzahlen als Zahlen importieren
                                    beziehung[feldname] = parseInt(feldwert, 10);
                                } else if (feldwert == parseFloat(feldwert)) {
                                    // Bruchzahlen als Zahlen importieren
                                    beziehung[feldname] = parseFloat(feldwert);
                                } else if (feldname == "Beziehungspartner") {
                                    beziehung[feldname] = [];
                                    // durch Beziehungspartner loopen und GUIDS mit Objekten ersetzen
                                    _.each(feldwert, function(beziehungspartner_feld) {
                                        beziehung[feldname].push(window.adb.bezPartner_objekt[beziehungspartner_feld]);
                                    });
                                } else {
                                    // Normalfall
                                    beziehung[feldname] = feldwert;
                                }
                                anzahl_felder++;
                            }
                        });
                        if (anzahl_felder > 0) {
                            beziehungen.push(beziehung);
                        }
                    });
                    // entsprechenden Index öffnen
                    // sicherstellen, dass Daten vorkommen. Gibt sonst einen Fehler
                    if (beziehungen.length > 0) {
                        // Datenbankabfrage ist langsam. Extern aufrufen, 
                        // sonst überholt die for-Schlaufe und Beziehungssammlung ist bis zur saveDoc-Ausführung eine andere!
                        window.adb.fügeBeziehungenZuObjekt(importdaten_objekt_id, beziehungssammlung, beziehungen);
                    }
                });

                // Für 10 Kontrollbeispiele die Links aufbauen
                if (window.adb.BsId === "guid") {
                    erste_10_ids = _.first(window.adb.ZuordbareDatensätze, 10);
                } else {
                    erste_10_ids = _.pluck(_.first(window.adb.ZuordbareDatensätze, 10), "Guid");
                }
                _.each(erste_10_ids, function(id, index) {
                    nr = index +1;
                    rückmeldung_links += '<a href="' + $(location).attr("protocol") + '//' + $(location).attr("host") + $(location).attr("pathname") + '?id=' + id + '"  target="_blank">Beispiel ' + nr + '</a><br>';
                });
                bs_importiert.resolve();
            }, 1000);
        });
    return bs_importiert.promise();
};

window.adb.bereiteBeziehungspartnerFürImportVor = function() {
    'use strict';
    var alle_bez_partner_array = [],
        bez_partner_array,
        beziehungspartner_vorbereitet = $.Deferred();
    window.adb.bezPartner_objekt = {};

    _.each(window.adb.bsDatensätze, function(bs_datensatz) {
        if (bs_datensatz.Beziehungspartner) {
            // bs_datensatz.Beziehungspartner ist eine kommagetrennte Liste von guids
            // diese Liste in Array verwandeln
            bez_partner_array = bs_datensatz.Beziehungspartner.split(", ");
            // und in window.adb.bsDatensätze nachführen
            bs_datensatz.Beziehungspartner = bez_partner_array;
            // und vollständige Liste aller Beziehungspartner nachführen
            alle_bez_partner_array = _.union(alle_bez_partner_array, bez_partner_array);
        }
    });
    // jetzt wollen wir ein Objekt bauen, das für alle Beziehungspartner das auszutauschende Objekt enthält
    // danach für jede guid Gruppe, Taxonomie (bei LR) und Name holen und ein Objekt draus machen
    var $db = $.couch.db("artendb");
    $db.view('artendb/all_docs?keys=' + encodeURI(JSON.stringify(alle_bez_partner_array)) + '&include_docs=true', {
        success: function(data) {
            var objekt;
            var bez_partner;
            _.each(data.rows, function(data_row) {
                objekt = data_row.doc;
                bez_partner = {};
                bez_partner.Gruppe = objekt.Gruppe;
                if (objekt.Gruppe === "Lebensräume") {
                    bez_partner.Taxonomie = objekt.Taxonomie.Eigenschaften.Taxonomie;
                    if (objekt.Taxonomie.Eigenschaften.Taxonomie.Label) {
                        bez_partner.Name = objekt.Taxonomie.Eigenschaften.Label + ": " + objekt.Taxonomie.Eigenschaften.Taxonomie.Einheit;
                    } else {
                        bez_partner.Name = objekt.Taxonomie.Eigenschaften.Einheit;
                    }
                } else {
                    bez_partner.Name = objekt.Taxonomie.Eigenschaften["Artname vollständig"];
                }
                bez_partner.GUID = objekt._id;
                window.adb.bezPartner_objekt[objekt._id] = bez_partner;
            });
        }
    });
    beziehungspartner_vorbereitet.resolve();
    return beziehungspartner_vorbereitet.promise();
};

// bekommt das Objekt mit den Datensätzen (window.adb.dsDatensätze) und die Liste der zu aktualisierenden Datensätze (window.adb.ZuordbareDatensätze)
// holt sich selber den in den Feldern erfassten Namen der Datensammlung
window.adb.entferneDatensammlung = function() {
    'use strict';
    var guid_array = [],
        guid_array_2 = [],
        guid,
        ds_entfernt = $.Deferred(),
        a,
        batch,
        batch_grösse,
        anz_vorkommen_von_ds = window.adb.ZuordbareDatensätze.length,
        anz_vorkommen_von_ds_entfernt = 0,
        rückmeldung,
        $importieren_ds_import_ausfuehren_hinweis_text = $("#importieren_ds_import_ausfuehren_hinweis_text"),
        $importieren_ds_import_ausfuehren_hinweis = $("#importieren_ds_import_ausfuehren_hinweis");

    // listener einrichten, der meldet, wenn ei Datensatz entfernt wurde
    $(document).bind('adb.ds_entfernt', function() {
        anz_vorkommen_von_ds_entfernt++;
        var prozent = Math.round((anz_vorkommen_von_ds-anz_vorkommen_von_ds_entfernt)/anz_vorkommen_von_ds*100);
        $("#DsImportierenProgressbar")
            .css('width', prozent +'%')
            .attr('aria-valuenow', prozent);
        $("#DsImportierenProgressbarText").html(prozent + "%");
        $importieren_ds_import_ausfuehren_hinweis.removeClass("alert-success").removeClass("alert-danger").addClass("alert-info");
        rückmeldung = "Eigenschaftensammlungen werden entfernt...<br>Die Indexe werden neu aufgebaut...";
        $importieren_ds_import_ausfuehren_hinweis_text.html(rückmeldung);
        $('html, body').animate({
            scrollTop: $importieren_ds_import_ausfuehren_hinweis_text.offset().top
        }, 2000);
        if (anz_vorkommen_von_ds_entfernt === anz_vorkommen_von_ds) {
            // die Indexe aktualisieren
            var $db = $.couch.db("artendb");
            $db.view('artendb/lr', {
                success: function() {
                    // melden, dass Indexe aktualisiert wurden
                    $importieren_ds_import_ausfuehren_hinweis.removeClass("alert-info").removeClass("alert-danger").addClass("alert-success");
                    rückmeldung = "Die Eigenschaftensammlungen wurden entfernt.<br>";
                    rückmeldung += "Die Indexe wurden aktualisiert.";
                    if (window.adb.rückmeldung_links) {
                        rückmeldung += "<br><br>Nachfolgend Links zu Objekten mit importierten Daten, damit Sie das Resultat überprüfen können:<br>";
                        rückmeldung += window.adb.rückmeldung_links;
                        delete window.adb.rückmeldung_links;
                    }
                    $importieren_ds_import_ausfuehren_hinweis_text.html(rückmeldung);
                    $('html, body').animate({
                        scrollTop: $importieren_ds_import_ausfuehren_hinweis_text.offset().top
                    }, 2000);
                }
            });
        }
    });

    _.each(window.adb.dsDatensätze, function(datensatz) {
        // zuerst die id in guid übersetzen
        if (window.adb.DsId === "guid") {
            // die in der Tabelle mitgelieferte id ist die guid
            guid = datensatz.GUID;
        } else {
            // in den zuordbaren Datensätzen nach dem Objekt mit der richtigen id suchen
            // und die guid auslesen
            guid = _.find(window.adb.ZuordbareDatensätze, function(datensatz) {
                return datensatz.Id == datensatz[window.adb.DsFelderId];
            }).Guid;
            /* TODO: löschen, wenn obiger Code getestet ist
            for (q = 0; q < window.adb.ZuordbareDatensätze.length; q++) {
                // in den zuordbaren Datensätzen nach dem Objekt mit der richtigen id suchen
                if (window.adb.ZuordbareDatensätze[q].Id == datensatz[window.adb.DsFelderId]) {
                    // und die guid auslesen
                    guid = window.adb.ZuordbareDatensätze[q].Guid;
                    break;
                }
            }*/
        }
        // Einen Array der id's erstellen
        guid_array.push(guid);
    });
    // alle docs gleichzeitig holen
    // aber batchweise
    batch = 150;
    batch_grösse = 150;
    for (a=0; a<batch; a++) {
        if (a < guid_array.length) {
            guid_array_2.push(guid_array[a]);
            if (a === (batch-1)) {
                window.adb.entferneDatensammlung_2($("#DsName").val(), guid_array_2, (a-batch_grösse));
                guid_array_2 = [];
                batch += batch_grösse;
            }
        } else {
            window.adb.entferneDatensammlung_2($("#DsName").val(), guid_array_2, (a - batch_grösse));
            break;
        }
    }
    return ds_entfernt.promise();
};

window.adb.entferneDatensammlung_2 = function(ds_name, guid_array, verzögerungs_faktor) {
    'use strict';
    // alle docs holen
    setTimeout(function() {
        var $db = $.couch.db("artendb");
        $db.view('artendb/all_docs?keys=' + encodeURI(JSON.stringify(guid_array)) + '&include_docs=true', {
            success: function(data) {
                var Objekt;
                _.each(data.rows, function(data_row) {
                    Objekt = data_row.doc;
                    window.adb.entferneDatensammlungAusObjekt(ds_name, Objekt);
                });
            }
        });
    }, verzögerungs_faktor*40);
};

window.adb.entferneDatensammlungAusObjekt = function(ds_name, objekt) {
    'use strict';
    if (objekt.Eigenschaftensammlungen && objekt.Eigenschaftensammlungen.length > 0) {
        /* hat nicht funktioniert
        var datensammlung = _.find(objekt.Eigenschaftensammlungen, function(datensammlung) {
            return datensammlung.Name === ds_name;
        });
        objekt.Eigenschaftensammlungen = _.without(Objekt.Eigenschaftensammlungen, datensammlung);
        $db = $.couch.db("artendb");
        $db.saveDoc(objekt);*/
        for (var i=0; i<objekt.Eigenschaftensammlungen.length; i++) {
            if (objekt.Eigenschaftensammlungen[i].Name === ds_name) {
                objekt.Eigenschaftensammlungen.splice(i,1);
                var $db = $.couch.db("artendb");
                $db.saveDoc(objekt);
                // mitteilen, dass eine ds entfernt wurde
                $(document).trigger('adb.ds_entfernt');
                // TODO: Scheitern abfangen (trigger adb.ds_nicht_entfernt)
                break;
            }
        }
    }
};

// bekommt das Objekt mit den Datensätzen (window.adb.bsDatensätze) und die Liste der zu aktualisierenden Datensätze (window.adb.ZuordbareDatensätze)
// holt sich selber den in den Feldern erfassten Namen der Beziehungssammlung
window.adb.entferneBeziehungssammlung = function() {
    'use strict';
    var guid_array = [],
        guid_array_2 = [],
        guid,
        bs_name = $("#BsName").val(),
        bs_entfernt = $.Deferred(),
        q,
        a,
        batch = 150,
        batch_grösse = 150,
        anz_vorkommen_von_bs_entfernt = 0,
        anz_vorkommen_von_bs = window.adb.ZuordbareDatensätze.length,
        rückmeldung,
        $importieren_bs_import_ausfuehren_hinweis = $("#importieren_bs_import_ausfuehren_hinweis"),
        $importieren_bs_import_ausfuehren_hinweis_text = $("#importieren_bs_import_ausfuehren_hinweis_text");

    // listener einrichten, der meldet, wenn ei Datensatz entfernt wurde
    $(document).bind('adb.bs_entfernt', function() {
        anz_vorkommen_von_bs_entfernt++;
        var prozent = Math.round((anz_vorkommen_von_bs-anz_vorkommen_von_bs_entfernt)/anz_vorkommen_von_bs*100);
        $("#BsImportierenProgressbar")
            .css('width', prozent +'%')
            .attr('aria-valuenow', prozent);
        $("#BsImportierenProgressbarText").html(prozent + "%");

        if (anz_vorkommen_von_bs_entfernt === anz_vorkommen_von_bs) {
            // die Indexe aktualisieren
            var $db = $.couch.db("artendb");
            $db.view('artendb/lr', {
                success: function() {
                    // melden, dass Indexe aktualisiert wurden
                    $importieren_bs_import_ausfuehren_hinweis
                        .removeClass("alert-info")
                        .removeClass("alert-danger")
                        .addClass("alert-success");
                    rückmeldung = "Die Beziehungssammlungen wurden entfernt.<br>";
                    rückmeldung += "Die Indexe wurden aktualisiert.";
                    if (window.adb.rückmeldung_links) {
                        rückmeldung += "<br><br>Nachfolgend Links zu Objekten mit importierten Daten, damit Sie das Resultat überprüfen können:<br>";
                        rückmeldung += window.adb.rückmeldung_links;
                        delete window.adb.rückmeldung_links;
                    }
                    $importieren_bs_import_ausfuehren_hinweis_text.html(rückmeldung);
                    $('html, body').animate({
                        scrollTop: $importieren_bs_import_ausfuehren_hinweis_text.offset().top
                    }, 2000);
                }
            });
        }
    });

    // rückmelden, dass es passiert
    $importieren_bs_import_ausfuehren_hinweis
        .removeClass("alert-success")
        .removeClass("alert-danger")
        .addClass("alert-info");
    rückmeldung = "Beziehungssammlungen werden entfernt...<br>Die Indexe werden aktualisiert...";
    $importieren_bs_import_ausfuehren_hinweis_text.html(rückmeldung);
    $('html, body').animate({
        scrollTop: $importieren_bs_import_ausfuehren_hinweis_text.offset().top
    }, 2000);

    _.each(window.adb.bsDatensätze, function(bs_datensatz) {
        // zuerst die id in guid übersetzen
        if (window.adb.BsId === "guid") {
            // die in der Tabelle mitgelieferte id ist die guid
            guid = bs_datensatz.GUID;
        } else {
            for (q = 0; q < window.adb.ZuordbareDatensätze.length; q++) {
                // in den zuordbaren Datensätzen nach dem Objekt mit der richtigen id suchen
                if (window.adb.ZuordbareDatensätze[q].Id == bs_datensatz[window.adb.BsFelderId]) {
                    // und die guid auslesen
                    guid = window.adb.ZuordbareDatensätze[q].Guid;
                    break;
                }
            }
        }
        // Einen Array der id's erstellen
        guid_array.push(guid);
    });

    // guid_array auf die eindeutigen guids reduzieren
    guid_array = _.union(guid_array);

    // alle docs gleichzeitig holen
    // aber batchweise
    for (a=0; a<batch; a++) {
        if (a < guid_array.length) {
            guid_array_2.push(guid_array[a]);
            if (a === (batch-1)) {
                window.adb.entferneBeziehungssammlung_2(bs_name, guid_array_2, (a-batch_grösse));
                guid_array_2 = [];
                batch += batch_grösse;
            }
        } else {
            window.adb.entferneBeziehungssammlung_2(bs_name, guid_array_2, (a-batch_grösse));
            bs_entfernt.resolve();
            break;
        }
        // RückmeldungsLinks in Feld anzeigen:
        $importieren_bs_import_ausfuehren_hinweis
            .removeClass("alert-success")
            .removeClass("alert-danger")
            .addClass("alert-info")
            .css('display', 'block');
        $importieren_bs_import_ausfuehren_hinweis_text.html("Die Beziehungssammlungen werden entfernt...<br>Die Indexe werden aktualisiert...");
    }
    return bs_entfernt.promise();
};

window.adb.entferneBeziehungssammlung_2 = function(bs_name, guid_array, verzögerungs_faktor) {
    'use strict';
    // alle docs holen
    setTimeout(function() {
        var $db = $.couch.db("artendb");
        $db.view('artendb/all_docs?keys=' + encodeURI(JSON.stringify(guid_array)) + '&include_docs=true', {
            success: function(data) {
                var objekt,
                    f;
                _.each(data.rows, function(data_row) {
                    objekt = data_row.doc;
                    window.adb.entferneBeziehungssammlungAusObjekt(bs_name, objekt);
                });
            }
        });
    }, verzögerungs_faktor*40);
};

window.adb.entferneBeziehungssammlungAusObjekt = function(bs_name, objekt) {
    'use strict';
    if (objekt.Beziehungssammlungen && objekt.Beziehungssammlungen.length > 0) {
        for (var i=0; i<objekt.Beziehungssammlungen.length; i++) {
            if (objekt.Beziehungssammlungen[i].Name === bs_name) {
                objekt.Beziehungssammlungen.splice(i,1);
                var $db = $.couch.db("artendb");
                $db.saveDoc(objekt);
                // mitteilen, dass eine bs entfernt wurde
                $(document).trigger('adb.bs_entfernt');
                break;
            }
        }
    }
};

// fügt der Art eine Datensammlung hinzu
// wenn dieselbe schon vorkommt, wird sie überschrieben
window.adb.fügeDatensammlungZuObjekt = function(guid, datensammlung) {
    'use strict';
    var $db = $.couch.db("artendb");
    $db.openDoc(guid, {
        success: function(doc) {
            // sicherstellen, dass Eigenschaftensammlung existiert
            if (!doc.Eigenschaftensammlungen) {
                doc.Eigenschaftensammlungen = [];
            }
            // falls dieselbe Datensammlung schon existierte: löschen
            // trifft z.B. zu bei zusammenfassenden
            doc.Eigenschaftensammlungen = _.reject(doc.Eigenschaftensammlungen, function(es) {
                return es.Name === datensammlung.Name;
            });
            // Datensammlung anfügen
            doc.Eigenschaftensammlungen.push(datensammlung);
            // sortieren
            // Eigenschaftensammlungen nach Name sortieren
            doc.Eigenschaftensammlungen = window.adb.sortiereObjektarrayNachName(doc.Eigenschaftensammlungen);
            // in artendb speichern
            $db.saveDoc(doc);
            // mitteilen, dass ein ds importiert wurde
            $(document).trigger('adb.ds_hinzugefügt');
            // TODO: Scheitern des Speicherns abfangen (trigger adb.ds_nicht_hinzugefügt)
        }
    });
};

// fügt der Art eine Datensammlung hinzu
// wenn dieselbe schon vorkommt, wird sie überschrieben
window.adb.fügeBeziehungenZuObjekt = function(guid, beziehungssammlung, beziehungen) {
    'use strict';
    var $db = $.couch.db("artendb");
    $db.openDoc(guid, {
        success: function(doc) {
            // prüfen, ob die Beziehung schon existiert
            if (doc.Beziehungssammlungen && doc.Beziehungssammlungen.length > 0) {
                var hinzugefügt = false,
                    i,
                    h;
                for (i in doc.Beziehungssammlungen) {
                    if (doc.Beziehungssammlungen[i].Name === beziehungssammlung.Name) {
                        for (h=0; h<beziehungen.length; h++) {
                            if (!_.contains(doc.Beziehungssammlungen[i].Beziehungen, beziehungen[h])) {
                                doc.Beziehungssammlungen[i].Beziehungen.push(beziehungen[h]);
                            }
                        }
                        // Beziehungen nach Name sortieren
                        doc.Beziehungssammlungen[i].Beziehungen = window.adb.sortiereBeziehungenNachName(doc.Beziehungssammlungen[i].Beziehungen);
                        hinzugefügt = true;
                        break;
                    }
                }
                if (!hinzugefügt) {
                    // die Beziehungssammlung existiert noch nicht
                    beziehungssammlung.Beziehungen = [];
                    _.each(beziehungen, function(beziehung) {
                        beziehungssammlung.Beziehungen.push(beziehung);
                    });
                    // Beziehungen nach Name sortieren
                    beziehungssammlung.Beziehungen = window.adb.sortiereBeziehungenNachName(beziehungssammlung.Beziehungen);
                    doc.Beziehungssammlungen.push(beziehungssammlung);
                }
            } else {
                // Beziehungssammlung anfügen
                beziehungssammlung.Beziehungen = [];
                _.each(beziehungen, function(beziehung) {
                    beziehungssammlung.Beziehungen.push(beziehung);
                });
                // Beziehungen nach Name sortieren
                beziehungssammlung.Beziehungen = window.adb.sortiereBeziehungenNachName(beziehungssammlung.Beziehungen);
                doc.Beziehungssammlungen = [];
                doc.Beziehungssammlungen.push(beziehungssammlung);
            }
            // Beziehungssammlungen nach Name sortieren
            doc.Beziehungssammlungen = window.adb.sortiereObjektarrayNachName(doc.Beziehungssammlungen);
            // in artendb speichern
            $db.saveDoc(doc);
            // mitteilen, dass eine bs importiert wurde
            $(document).trigger('adb.bs_hinzugefügt');
            // TODO: Scheitern des Speicherns abfangen (trigger adb.bs_nicht_hinzugefügt)
        }
    });
};

// übernimmt den Namen einer Datensammlung
// öffnet alle Dokumente, die diese Datensammlung enthalten und löscht die Datensammlung
window.adb.entferneDatensammlungAusAllenObjekten = function(ds_name) {
    'use strict';
    var ds_entfernt = $.Deferred(),
        anz_vorkommen_von_ds,
        anz_vorkommen_von_ds_entfernt = 0,
        $importieren_ds_ds_beschreiben_hinweis = $("#importieren_ds_ds_beschreiben_hinweis"),
        $db = $.couch.db("artendb"),
        rückmeldung;
    $db.view('artendb/ds_guid?startkey=["' + ds_name + '"]&endkey=["' + ds_name + '",{}]', {
        success: function(data) {
            anz_vorkommen_von_ds = data.rows.length;

            // listener einrichten, der meldet, wenn ei Datensatz entfernt wurde
            $(document).bind('adb.ds_entfernt', function() {
                anz_vorkommen_von_ds_entfernt++;
                rückmeldung = "Eigenschaftensammlungen werden entfernt...<br>Die Indexe werden aktualisiert...";
                $importieren_ds_ds_beschreiben_hinweis
                    .removeClass("alert-success").removeClass("alert-danger").addClass("alert-info")
                    .html(rückmeldung);
                $('html, body').animate({
                    scrollTop: $importieren_ds_ds_beschreiben_hinweis.offset().top
                }, 2000);
                if (anz_vorkommen_von_ds_entfernt === anz_vorkommen_von_ds) {
                    // die Indexe aktualisieren
                    $db.view('artendb/lr', {
                        success: function() {
                            // melden, dass Indexe aktualisiert wurden
                            rückmeldung = "Die Eigenschaftensammlungen wurden entfernt.<br>";
                            rückmeldung += "Die Indexe wurden aktualisiert.";
                            $importieren_ds_ds_beschreiben_hinweis
                                .removeClass("alert-info").removeClass("alert-danger").addClass("alert-success")
                                .html(rückmeldung);
                            $('html, body').animate({
                                scrollTop: $importieren_ds_ds_beschreiben_hinweis.offset().top
                            }, 2000);
                        }
                    });
                }
            });

            // Eigenschaftensammlungen entfernen
            _.each(data.rows, function(data_row) {
                // guid und DsName übergeben
                window.adb.entferneDatensammlungAusDokument(data_row.key[1], ds_name);
            });
            ds_entfernt.resolve();
        }
    });
    return ds_entfernt.promise();
};

// übernimmt den Namen einer Beziehungssammlung
// öffnet alle Dokumente, die diese Beziehungssammlung enthalten und löscht die Beziehungssammlung
window.adb.entferneBeziehungssammlungAusAllenObjekten = function(bs_name) {
    'use strict';
    var bs_entfernt = $.Deferred(),
        anz_vorkommen_von_bs_entfernt = 0,
        anz_vorkommen_von_bs,
        $importieren_bs_ds_beschreiben_hinweis = $("#importieren_bs_ds_beschreiben_hinweis"),
        $importieren_bs_ds_beschreiben_hinweis_text = $("#importieren_bs_ds_beschreiben_hinweis_text"),
        $db = $.couch.db("artendb"),
        rückmeldung;
    $db.view('artendb/bs_guid?startkey=["' + bs_name + '"]&endkey=["' + bs_name + '",{}]', {
        success: function(data) {
            anz_vorkommen_von_bs = data.rows.length;
            // listener einrichten, der meldet, wenn ein Datensatz entfernt wurde
            $(document).bind('adb.bs_entfernt', function() {
                anz_vorkommen_von_bs_entfernt++;
                $importieren_bs_ds_beschreiben_hinweis
                    .removeClass("alert-success")
                    .removeClass("alert-danger")
                    .addClass("alert-info");
                rückmeldung = "Beziehungssammlungen werden entfernt...<br>Die Indexe werden aktualisiert...";
                $importieren_bs_ds_beschreiben_hinweis_text.html(rückmeldung);
                $('html, body').animate({
                    scrollTop: $importieren_bs_ds_beschreiben_hinweis_text.offset().top
                }, 2000);
                if (anz_vorkommen_von_bs_entfernt === anz_vorkommen_von_bs) {
                    // die Indexe aktualisieren
                    $db.view('artendb/lr', {
                        success: function() {
                            // melden, dass Indexe aktualisiert wurden
                            $importieren_bs_ds_beschreiben_hinweis
                                .removeClass("alert-info")
                                .removeClass("alert-danger")
                                .addClass("alert-success");
                            rückmeldung = "Die Beziehungssammlungen wurden entfernt.<br>";
                            rückmeldung += "Die Indexe wurden aktualisiert.";
                            $importieren_bs_ds_beschreiben_hinweis_text.html(rückmeldung);
                            $('html, body').animate({
                                scrollTop: $importieren_bs_ds_beschreiben_hinweis_text.offset().top
                            }, 2000);
                        }
                    });
                }
            });

            _.each(data.rows, function(data_row) {
                // guid und DsName übergeben
                window.adb.entferneBeziehungssammlungAusDokument(data_row.key[1], bs_name);
            });
            bs_entfernt.resolve();
        }
    });
    return bs_entfernt.promise();
};

// übernimmt die id des zu verändernden Dokuments
// und den Namen der Datensammlung, die zu entfernen ist
// entfernt die Datensammlung
window.adb.entferneDatensammlungAusDokument = function(id, ds_name) {
    'use strict';
    var $db = $.couch.db("artendb");
    $db.openDoc(id, {
        success: function(doc) {
            // Datensammlung entfernen
            doc.Eigenschaftensammlungen = _.reject(doc.Eigenschaftensammlungen, function(datensammlung) {
                return datensammlung.Name === ds_name
            });
            // in artendb speichern
            $db.saveDoc(doc);
            // mitteilen, dass eine ds entfernt wurde
            $(document).trigger('adb.ds_entfernt');
            // TODO: Scheitern abfangen (trigger adb.ds_nicht_entfernt)
        }
    });
};

// übernimmt die id des zu verändernden Dokuments
// und den Namen der Beziehungssammlung, die zu entfernen ist
// entfernt die Beziehungssammlung
window.adb.entferneBeziehungssammlungAusDokument = function(id, bs_name) {
    'use strict';
    var $db = $.couch.db("artendb");
    $db.openDoc(id, {
        success: function(doc) {
            // Beziehungssammlung entfernen
            doc.Beziehungssammlungen = _.reject(doc.Beziehungssammlungen, function(beziehungssammlung) {
                return beziehungssammlung.Name === bs_name
            });
            // in artendb speichern
            $db.saveDoc(doc);
            // mitteilen, dass eine ds entfernt wurde
            $(document).trigger('adb.bs_entfernt');
            // TODO: Scheitern abfangen (trigger adb.ds_nicht_entfernt)
        }
    });
};

// prüft die URL. wenn eine id übergeben wurde, wird das entprechende Objekt angezeigt
window.adb.öffneUri = function() {
    'use strict';
    // parameter der uri holen
    var uri = new Uri($(location).attr('href')),
        id = uri.getQueryParamValue('id'),
        // wenn browser history nicht unterstützt, erstellt history.js eine hash
        // dann muss die id durch die id in der hash ersetzt werden
        hash = uri.anchor(),
        uri2;

    if (hash) {
        uri2 = new Uri(hash);
        id = uri2.getQueryParamValue('id');
    }
    if (id) {
        // Gruppe ermitteln
        var $db = $.couch.db("artendb");
        $db.openDoc(id, {
            success: function(objekt) {
                var erstelleBaum = require('./modules/erstelleBaum');
                // window.adb.Gruppe setzen. Nötig, um im Menu die richtigen Felder einzublenden
                window.adb.Gruppe = objekt.Gruppe;
                $(".baum.jstree").jstree("deselect_all");
                // den richtigen Button aktivieren
                $('[gruppe="'+objekt.Gruppe+'"]').button('toggle');
                $("#Gruppe_label").html("Gruppe:");
                // tree aufbauen, danach Datensatz initiieren
                $.when(erstelleBaum($)).then(function() {
                    var oeffneBaumZuId = require('./modules/oeffneBaumZuId');
                    oeffneBaumZuId ($, id);
                });
            }
        });
    }
    // dafür sorgen, dass die passenden Menus angezeigt werden
    window.adb.blendeMenus();
};

// übernimmt anfangs drei arrays: taxonomien, datensammlungen und beziehungssammlungen
// verarbeitet immer den ersten array und ruft sich mit den übrigen selber wieder auf
window.adb.erstelleExportfelder = function(taxonomien, datensammlungen, beziehungssammlungen) {
    'use strict';
    var html_felder_wählen = '',
        html_filtern = '',
        ds_typ,
        x,
        dsbs_von_objekten = [],
        dsbs_von_objekt,
        ds_felder_objekt,
        html,
        Autolinker = require('autolinker'),
        ersetzeUngueltigeZeichenInIdNamen = require('./modules/ersetzeUngueltigeZeichenInIdNamen');

    // Eigenschaftensammlungen vorbereiten
    // Struktur von window.adb.ds_bs_von_objekten ist jetzt: [ds_typ, ds.Name, ds.zusammenfassend, ds["importiert von"], Felder_array]
    // erst mal die nicht benötigten Werte entfernen
    _.each(window.adb.ds_bs_von_objekten.rows, function(object_with_array_in_key) {
        dsbs_von_objekten.push([object_with_array_in_key.key[1], object_with_array_in_key.key[4]]);
    });
    // Struktur von dsbs_von_objekten ist jetzt: [ds.Name, felder_objekt]
    // jetzt gibt es Mehrfacheinträge, diese entfernen
    dsbs_von_objekten = _.union(dsbs_von_objekten);

    if (taxonomien && datensammlungen && beziehungssammlungen) {
        ds_typ = "Taxonomie";
        html_felder_wählen += '<h3>Taxonomie</h3>';
        html_filtern += '<h3>Taxonomie</h3>';
    } else if (taxonomien && datensammlungen) {
        ds_typ = "Datensammlung";
        html_felder_wählen += '<h3>Eigenschaftensammlungen</h3>';
        html_filtern += '<h3>Eigenschaftensammlungen</h3>';
    } else {
        ds_typ = "Beziehung";
        // bei "felder wählen" soll man auch wählen können, ob pro Beziehung eine Zeile oder alle Beziehungen in ein Feld geschrieben werden sollen
        // das muss auch erklärt sein
        html_felder_wählen += '<h3>Beziehungssammlungen</h3><div class="export_zum_titel_gehoerig"><div class="well well-sm" style="margin-top:9px;"><b>Sie können aus zwei Varianten wählen</b> <a href="#" class="show_next_hidden">...mehr</a><ol class="adb-hidden"><li>Pro Beziehung eine Zeile (Standardeinstellung):<ul><li>Für jede Art oder Lebensraum wird pro Beziehung eine neue Zeile erzeugt</li><li>Anschliessende Auswertungen sind so meist einfacher auszuführen</li><li>Dafür können Sie aus maximal einer Beziehungssammlung Felder wählen (aber wie gewohnt mit beliebig vielen Feldern aus Taxonomie(n) und Eigenschaftensammlungen ergänzen)</li></ul></li><li>Pro Art/Lebensraum eine Zeile und alle Beziehungen kommagetrennt in einem Feld:<ul><li>Von allen Beziehungen der Art oder des Lebensraums wird der Inhalt des Feldes kommagetrennt in das Feld der einzigen Zeile geschrieben</li><li>Sie können Felder aus beliebigen Beziehungssammlungen gleichzeitig exportieren</li></ul></li></ol></div><div class="radio"><label><input type="radio" id="export_bez_in_zeilen" checked="checked" name="export_bez_wie">Pro Beziehung eine Zeile</label></div><div class="radio"><label><input type="radio" id="export_bez_in_feldern" name="export_bez_wie">Pro Art/Lebensraum eine Zeile und alle Beziehungen kommagetrennt in einem Feld</label></div></div><hr>';
        html_filtern += '<h3>Beziehungssammlungen</h3>';
    }
    _.each(taxonomien, function(taxonomie, index) {
        if (index > 0) {
            html_felder_wählen += '<hr>';
            html_filtern += '<hr>';
        }

        html_felder_wählen += '<h5>' + taxonomie.Name;
        html_filtern += '<h5>' + taxonomie.Name;
        // informationen zur ds holen
        dsbs_von_objekt = _.find(dsbs_von_objekten, function(array) {
            return array[0] === taxonomie.Name;
        });
        if (dsbs_von_objekt && dsbs_von_objekt[1]) {
            html_felder_wählen += ' <a href="#" class="show_next_hidden_export">...mehr</a>';
            html_filtern += ' <a href="#" class="show_next_hidden_export">...mehr</a>';
            // ds-titel abschliessen
            html_felder_wählen += '</h5>';
            html_filtern += '</h5>';
            // Felder der ds darstellen
            html_felder_wählen += '<div class="adb-hidden">';
            html_filtern += '<div class="adb-hidden">';
            ds_felder_objekt = dsbs_von_objekt[1];
            _.each(ds_felder_objekt, function(feldwert, feldname) {
                if (feldname === "zusammenfassend") {
                    // nicht sagen, woher die Infos stammen, weil das Objekt-abhängig ist
                    html = '<div class="ds_beschreibung_zeile"><div>Zus.-fassend:</div><div>Diese Datensammlung fasst die Daten mehrerer Eigenschaftensammlungen in einer zusammen</div></div>';
                    html_felder_wählen += html;
                    html_filtern += html;
                } else if (feldname !== "Ursprungsdatensammlung") {
                    html = '<div class="ds_beschreibung_zeile"><div>' + feldname + ':</div><div>' + Autolinker.link(feldwert) + '</div></div>';
                    html_felder_wählen += html;
                    html_filtern += html;
                }
            });
            html_felder_wählen += '</div>';
            html_filtern += '</div>';
        } else {
            // ds-titel abschliessen
            html_felder_wählen += '</h5>';
            html_filtern += '</h5>';
        }

        // jetzt die checkbox um alle auswählen zu können
        // aber nur, wenn mehr als 1 Feld existieren
        if ((taxonomie.Eigenschaften && _.size(taxonomie.Eigenschaften) > 1) || (taxonomie.Beziehungen && _.size(taxonomie.Beziehungen) > 1)) {
            html_felder_wählen += '<div class="checkbox"><label>';
            html_felder_wählen += '<input class="feld_waehlen_alle_von_ds" type="checkbox" DsTyp="'+ds_typ+'" Datensammlung="' + taxonomie.Name + '"><em>alle</em>';
            html_felder_wählen += '</div></label>';
        }
        html_felder_wählen += '<div class="felderspalte">';


        html_filtern += '<div class="felderspalte">';
        for (x in (taxonomie.Eigenschaften || taxonomie.Beziehungen)) {
            // felder wählen
            html_felder_wählen += '<div class="checkbox"><label>';
            html_felder_wählen += '<input class="feld_waehlen" type="checkbox" DsTyp="'+ds_typ+'" Datensammlung="' + taxonomie.Name + '" Feld="' + x + '">' + x;
            html_felder_wählen += '</div></label>';
            // filtern
            html_filtern += '<div class="form-group">';
            html_filtern += '<label class="control-label" for="exportieren_objekte_waehlen_ds_' + ersetzeUngueltigeZeichenInIdNamen (x) + '"';
            // Feldnamen, die mehr als eine Zeile belegen: Oben ausrichten
            if (x.length > 28) {
                html_filtern += ' style="padding-top:0px"';
            }
            html_filtern += '>' + x + '</label>';
            //if (taxonomie.Feldtyp === "boolean") {
            if ((taxonomie.Eigenschaften && (taxonomie.Eigenschaften[x] === "boolean")) || (taxonomie.Beziehungen && (taxonomie.Beziehungen[x] === "boolean"))) {
                // in einer checkbox darstellen
                // readonly markiert, dass kein Wert erfasst wurde
                html_filtern += '<input class="controls form-control export_feld_filtern form-control" type="checkbox" id="exportieren_objekte_waehlen_ds_' + ersetzeUngueltigeZeichenInIdNamen (x) + '" DsTyp="' + ds_typ + '" Eigenschaft="' + taxonomie.Name + '" Feld="' + x + '" readonly>';
            } else {
                // in einem input-feld darstellen
                html_filtern += '<input class="controls form-control export_feld_filtern form-control input-sm" type="text" id="exportieren_objekte_waehlen_ds_' + ersetzeUngueltigeZeichenInIdNamen (x) + '" DsTyp="' + ds_typ + '" Eigenschaft="' + taxonomie.Name + '" Feld="' + x + '">';
            }
            html_filtern += '</div>';
        }
        // Spalten abschliessen
        html_felder_wählen += '</div>';
        html_filtern += '</div>';
    });
    // linie voranstellen
    html_felder_wählen = '<hr>' + html_felder_wählen;
    html_filtern = '<hr>' + html_filtern;
    if (beziehungssammlungen) {
        $("#exportieren_felder_waehlen_felderliste").html(html_felder_wählen);
        $("#exportieren_objekte_waehlen_ds_felderliste").html(html_filtern);
        window.adb.erstelleExportfelder(datensammlungen, beziehungssammlungen);
    } else if (datensammlungen) {
        $("#exportieren_felder_waehlen_felderliste").append(html_felder_wählen);
        $("#exportieren_objekte_waehlen_ds_felderliste").append(html_filtern);
        window.adb.erstelleExportfelder(datensammlungen);
    } else {
        $("#exportieren_felder_waehlen_felderliste").append(html_felder_wählen);
        $("#exportieren_objekte_waehlen_ds_felderliste")
            .append(html_filtern)
            .find("input[type='checkbox']").each(function() {
               this.indeterminate = true;
            });
    }
};

window.adb.erstelleExportString = function(exportobjekte) {
    'use strict';
    var string_titelzeile = "",
        string_zeilen = "",
        string_zeile;
    _.each(exportobjekte, function(exportobjekt) {
        // aus unerklärlichem Grund blieb stringTitelzeile leer, wenn nur ein Datensatz gefiltert wurde
        // daher bei jedem Datensatz prüfen, ob eine Titelzeile erstellt wurde und wenn nötig ergänzen
        if (string_titelzeile === "" || string_titelzeile === ",") {
            string_titelzeile = "";
            // durch Spalten loopen
            _.each(exportobjekt, function(feld, index) {
                if (string_titelzeile !== "") {
                    string_titelzeile += ',';
                }
                string_titelzeile += '"' + index + '"';
            });
        }

        if (string_zeilen !== "") {
            string_zeilen += '\n';
        }
        string_zeile = "";
        // durch die Felder loopen
        _.each(exportobjekt, function(feld) {
            if (string_zeile !== "") {
                string_zeile += ',';
            }
            // null-Werte als leere Werte
            if (feld === null) {
                string_zeile += "";
            } else if (typeof feld === "number") {
                // Zahlen ohne Anführungs- und Schlusszeichen exportieren
                string_zeile += feld;
            } else if (typeof feld === "object") {
                // Anführungszeichen sind Feldtrenner und müssen daher ersetzt werden
                string_zeile += '"' + JSON.stringify(feld).replace(/"/g, "'") + '"';
            } else {
                string_zeile += '"' + feld + '"';
            }
        });
        string_zeilen += string_zeile;
    });
    return string_titelzeile + "\n" + string_zeilen;
};

// baut im Formular "export" die Liste aller Eigenschaften auf
// window.adb.fasseTaxonomienZusammen steuert, ob Taxonomien alle einzeln oder unter dem Titel Taxonomien zusammengefasst werden
// bekommt den Namen der Gruppe
window.adb.erstelleListeFürFeldwahl = function() {
    'use strict';
    var export_gruppen = [],
        gruppen = [],
        $exportieren_objekte_waehlen_gruppen_hinweis_text = $("#exportieren_objekte_waehlen_gruppen_hinweis_text"),
        $exportieren_nur_objekte_mit_eigenschaften_checkbox = $("#exportieren_nur_objekte_mit_eigenschaften_checkbox"),
        $exportieren_nur_objekte_mit_eigenschaften = $("#exportieren_nur_objekte_mit_eigenschaften"),
        $exportieren_exportieren_collapse = $("#exportieren_exportieren_collapse"),
        $exportieren_felder_waehlen_collapse = $("#exportieren_felder_waehlen_collapse"),
        $exportieren_objekte_waehlen_ds_collapse = $("#exportieren_objekte_waehlen_ds_collapse");
    // falls noch offen: folgende Bereiche schliessen
    if ($exportieren_exportieren_collapse.is(':visible')) {
        $exportieren_exportieren_collapse.collapse('hide');
    }
    if ($exportieren_felder_waehlen_collapse.is(':visible')) {
        $exportieren_felder_waehlen_collapse.collapse('hide');
    }
    if ($exportieren_objekte_waehlen_ds_collapse.is(':visible')) {
        $exportieren_objekte_waehlen_ds_collapse.collapse('hide');
    }

    // Beschäftigung melden
    $exportieren_objekte_waehlen_gruppen_hinweis_text
        .alert()
        .removeClass("alert-success")
        .removeClass("alert-danger")
        .addClass("alert-info")
        .show()
        .html("Eigenschaften werden ermittelt...");
    // scrollen, damit Hinweis sicher ganz sichtbar ist
    $('html, body').animate({
        scrollTop: $exportieren_objekte_waehlen_gruppen_hinweis_text.offset().top
    }, 2000);
    // gewählte Gruppen ermitteln
    // globale Variable enthält die Gruppen. Damit nach AJAX-Abfragen bestimmt werden kann, ob alle Daten vorliegen
    // globale Variable sammelt arrays mit den Listen der Felder pro Gruppe
    var export_felder_arrays = [];
    var $db = $.couch.db("artendb");
    $(".exportieren_ds_objekte_waehlen_gruppe").each(function() {
        if ($(this).prop('checked')) {
            export_gruppen.push($(this).val());
        }
    });
    /*if (export_gruppen.length > 1) {
        // wenn mehrere Gruppen gewählt werden
        // Option exportieren_nur_objekte_mit_eigenschaften ausblenden
        // und false setzen
        // sonst kommen nur die DS einer Gruppe
        $exportieren_nur_objekte_mit_eigenschaften_checkbox.addClass("adb-hidden");
        $exportieren_nur_objekte_mit_eigenschaften.prop('checked', false);
    } else {
        if ($exportieren_nur_objekte_mit_eigenschaften_checkbox.hasClass("adb-hidden")) {
            $exportieren_nur_objekte_mit_eigenschaften_checkbox.removeClass("adb-hidden")
            $exportieren_nur_objekte_mit_eigenschaften.prop('checked', true);
        }
    }*/
    if (export_gruppen.length > 0) {
        // gruppen einzeln abfragen
        gruppen = export_gruppen;
        _.each(gruppen, function(gruppe) {
            // Felder abfragen
            $db.view('artendb/felder?group_level=5&startkey=["'+gruppe+'"]&endkey=["'+gruppe+'",{},{},{},{}]', {
                success: function(data) {
                    export_felder_arrays = _.union(export_felder_arrays, data.rows);
                    //console.log("Die Gruppe " + gruppe + " hat soviele Felder = " + data.rows.length);
                    // eine Gruppe aus export_gruppen entfernen
                    export_gruppen.splice(0,1);
                    if (export_gruppen.length === 0) {
                        // alle Gruppen sind verarbeitet
                        window.adb.erstelleListeFürFeldwahl_2(export_felder_arrays);
                    }
                }
            });
        });
    } else {
        // letzte Rückmeldung anpassen
        $exportieren_objekte_waehlen_gruppen_hinweis_text.html("bitte eine Gruppe wählen")
            .removeClass("alert-info")
            .removeClass("alert-success")
            .addClass("alert-danger");
        // Felder entfernen
        $("#exportieren_felder_waehlen_felderliste").html("");
        $("#exportieren_objekte_waehlen_ds_felderliste").html("");
    }
    // Tabelle ausblenden, falls sie eingeblendet war
    $("#exportieren_exportieren_tabelle").hide();
};

window.adb.erstelleListeFürFeldwahl_2 = function(export_felder_arrays) {
    'use strict';
    var felder_objekt = {},
        hinweis_taxonomien,
        taxonomien,
        datensammlungen,
        beziehungssammlungen;

    // in export_felder_arrays ist eine Liste der Felder, die in dieser Gruppe enthalten sind
    // sie kann aber Mehrfacheinträge enthalten, die sich in der Gruppe unterscheiden
    // Muster: Gruppe, Typ der Datensammlung, Name der Datensammlung, Name des Felds
    // Mehrfacheinträge sollen entfernt werden

    // dazu muss zuerst die Gruppe entfernt werden
    _.each(export_felder_arrays, function(export_felder) {
        export_felder.key.splice(0,1);
    });

    // jetzt nur noch eineindeutige Array-Objekte (=Eigenschaftensammlungen) belassen
    export_felder_arrays = _.union(export_felder_arrays);
    // jetzt den Array von Objekten nach key sortieren
    export_felder_arrays = _.sortBy(export_felder_arrays, function(object) {
        return object.key;
    });

    // Im Objekt "FelderObjekt" werden die Felder aller gewählten Gruppen gesammelt
    felder_objekt = window.adb.ergänzeFelderObjekt(felder_objekt, export_felder_arrays);

    // bei allfälligen "Taxonomie(n)" Feldnamen sortieren
    if (felder_objekt["Taxonomie(n)"] && felder_objekt["Taxonomie(n)"].Eigenschaften) {
        felder_objekt["Taxonomie(n)"].Eigenschaften = window.adb.sortKeysOfObject(felder_objekt["Taxonomie(n)"].Eigenschaften);
    }

    // Taxonomien und Datensammlungen aus dem FelderObjekt extrahieren
    taxonomien = [];
    datensammlungen = [];
    beziehungssammlungen = [];

    _.each(felder_objekt, function(ds) {
        if (typeof ds === "object" && ds.Typ) {
            // das ist Datensammlung oder Taxonomie
            if (ds.Typ === "Datensammlung") {
                datensammlungen.push(ds);
            } else if (ds.Typ === "Taxonomie") {
                taxonomien.push(ds);
            } else if (ds.Typ === "Beziehung") {
                beziehungssammlungen.push(ds);
            }
        }
    });

    $.when(window.adb.holeDatensammlungenFürExportfelder()).done(function() {
        window.adb.erstelleExportfelder(taxonomien, datensammlungen, beziehungssammlungen);
    });

    // kontrollieren, ob Taxonomien zusammengefasst werden
    if ($("#exportieren_objekte_Taxonomien_zusammenfassen").hasClass("active")) {
        hinweis_taxonomien = "Die Eigenschaften wurden aufgebaut<br>Alle Taxonomien sind zusammengefasst";
    } else {
        hinweis_taxonomien = "Die Eigenschaften wurden aufgebaut<br>Alle Taxonomien werden einzeln dargestellt";
    }
    // Ergebnis rückmelden
    $("#exportieren_objekte_waehlen_gruppen_hinweis_text")
        .alert()
        .removeClass("alert-info")
        .removeClass("alert-danger")
        .addClass("alert-success")
        .show()
        .html(hinweis_taxonomien);
};

// holt eine Liste aller Datensammlungen, wenn nötig
// speichert sie in einer globalen Variable, damit sie wiederverwendet werden kann
window.adb.holeDatensammlungenFürExportfelder = function() {
    'use strict';
    var exfe_geholt = $.Deferred();
    if (window.adb.ds_bs_von_objekten) {
        exfe_geholt.resolve();
    } else {
        var $db = $.couch.db("artendb");
        $db.view('artendb/ds_von_objekten?group_level=5', {
            success: function(data) {
                // Daten in Objektvariable speichern > Wenn Ds ausgewählt, Angaben in die Felder kopieren
                window.adb.ds_bs_von_objekten = data;
                exfe_geholt.resolve();
            }
        });
    }
    return exfe_geholt.promise();
};

// Nimmt ein FelderObjekt entgegen. Das ist entweder leer (erste Gruppe) oder enthält schon Felder (ab der zweiten Gruppe)
// Nimmt ein Array mit Feldern entgegen
// mit der Struktur: {"key":["Flora","Datensammlung","Blaue Liste (1998)","Anwendungshäufigkeit zur Erhaltung"],"value":null}
// ergänzt das FelderObjekt um diese Felder
// retourniert das ergänzte FelderObjekt
// das FelderObjekt enthält alle gewünschten Felder. Darin sind nullwerte
window.adb.ergänzeFelderObjekt = function(felder_objekt, felder_array) {
    'use strict';
    var ds_typ,
        ds_name,
        feldname,
        feldtyp;
    _.each(felder_array, function(feld_objekt) {
        if (feld_objekt.key) {
            // Gruppe wurde entfernt, so sind alle keys um 1 kleiner als ursprünglich
            ds_typ = feld_objekt.key[0];
            ds_name = feld_objekt.key[1];
            feldname = feld_objekt.key[2];
            feldtyp = feld_objekt.key[3];
            if (ds_typ === "Objekt") {
                // das ist eine Eigenschaft des Objekts
                //FelderObjekt[FeldName] = null;    // NICHT HINZUFÜGEN, DIESE FELDER SIND SCHON IM FORMULAR FIX DRIN
            } else if (window.adb.fasseTaxonomienZusammen && ds_typ === "Taxonomie") {
                // Datensammlungen werden zusammengefasst. DsTyp muss "Taxonomie(n)" heissen und die Felder aller Taxonomien sammeln
                // Wenn Datensammlung noch nicht existiert, gründen
                if (!felder_objekt["Taxonomie(n)"]) {
                    felder_objekt["Taxonomie(n)"] = {};
                    felder_objekt["Taxonomie(n)"].Typ = ds_typ;
                    felder_objekt["Taxonomie(n)"].Name = "Taxonomie(n)";
                    felder_objekt["Taxonomie(n)"].Eigenschaften = {};
                }
                // Feld ergänzen
                // als Feldwert den Feldtyp übergeben
                felder_objekt["Taxonomie(n)"].Eigenschaften[feldname] = feldtyp;
            } else if (ds_typ === "Datensammlung" || ds_typ === "Taxonomie") {
                // Wenn Datensammlung oder Taxonomie noch nicht existiert, gründen
                if (!felder_objekt[ds_name]) {
                    felder_objekt[ds_name] = {};
                    felder_objekt[ds_name].Typ = ds_typ;
                    felder_objekt[ds_name].Name = ds_name;
                    felder_objekt[ds_name].Eigenschaften = {};
                }
                // Feld ergänzen
                // als Feldwert den Feldtyp übergeben
                felder_objekt[ds_name].Eigenschaften[feldname] = feldtyp;
            } else if (ds_typ === "Beziehung") {
                // Wenn Beziehungstyp noch nicht existiert, gründen
                if (!felder_objekt[ds_name]) {
                    felder_objekt[ds_name] = {};
                    felder_objekt[ds_name].Typ = ds_typ;
                    felder_objekt[ds_name].Name = ds_name;
                    felder_objekt[ds_name].Beziehungen = {};
                }
                // Feld ergänzen
                // als Feldwert den Feldtyp übergeben
                felder_objekt[ds_name].Beziehungen[feldname] = feldtyp;
            }
        }
    });
    return felder_objekt;
};

// wird aufgerufen durch eine der zwei Schaltflächen: "Vorschau anzeigen", "direkt exportieren"
// direkt: list-funktion aufrufen, welche die Daten direkt herunterlädt
window.adb.filtereFürExport = function(direkt) {
    'use strict';
    // Array von Filterobjekten bilden
    var filterkriterien = [],
        // Objekt bilden, in das die Filterkriterien integriert werden, da ein array schlecht über die url geliefert wird
        filterkriterien_objekt = {},
        filter_objekt,
        gruppen_array = [],
        gruppen = "",
        gewählte_felder = [],
        anz_gewählte_felder_aus_dsbs = 0,
        gewählte_felder_objekt = {},
        anz_ds_gewählt = 0,
        $exportieren_exportieren_hinweis_text = $("#exportieren_exportieren_hinweis_text"),
        html_filterkriterien;

    // kontrollieren, ob eine Gruppe gewählt wurde
    if (window.adb.fürExportGewählteGruppen().length === 0) {
        return;
    }

    // Beschäftigung melden
    if (!direkt) {
        $exportieren_exportieren_hinweis_text
            .alert()
            .show()
            .html("Die Daten werden vorbereitet...");
    }

    // zum Hinweistext scrollen
    $('html, body').animate({
        scrollTop: $exportieren_exportieren_hinweis_text.offset().top
    }, 2000);
    // gewählte Gruppen ermitteln
    $("#exportieren_exportieren_exportieren_fuer_alt").addClass("adb-hidden-strictly");
    $(".exportieren_ds_objekte_waehlen_gruppe").each(function() {
        if ($(this).prop('checked')) {
            gruppen_array.push($(this).attr('view'));
            if (gruppen) {
                gruppen += ",";
            }
            gruppen += $(this).val();
        }
    });
    var gruppenliste = gruppen.split(",");
    if (gruppenliste.indexOf("Flora") >= 0 && gruppenliste.indexOf("Fauna") >= 0) {
        // Wenn Flora und Fauna gewählt: Schaltfläche für den Export für das ALT anzeigen
        $("#exportieren_exportieren_exportieren_fuer_alt").removeClass("adb-hidden-strictly");
    }
    // durch alle Filterfelder loopen
    // wenn ein Feld einen Wert enthält, danach filtern
    $("#exportieren_objekte_waehlen_ds_collapse").find(".export_feld_filtern").each(function() {
        var that = this,
            $this = $(this);
        if (that.type === "checkbox") {
            if (!$this.prop('readonly')) {
                filter_objekt = {};
                filter_objekt.DsTyp = $this.attr('dstyp');
                filter_objekt.DsName = $this.attr('eigenschaft');
                filter_objekt.Feldname = $this.attr('feld');
                filter_objekt.Filterwert = $this.prop("checked");
                filter_objekt.Vergleichsoperator = "=";
                filterkriterien.push(filter_objekt);
            } else {
                // übrige checkboxen ignorieren
            }
        } else if (this.value || this.value === 0) {
            // Filterobjekt zurücksetzen
            filter_objekt = {};
            filter_objekt.DsTyp = $this.attr('dstyp');
            filter_objekt.DsName = $this.attr('eigenschaft');
            filter_objekt.Feldname = $this.attr('feld');
            // Filterwert in Kleinschrift verwandeln, damit Gross-/Kleinschrift nicht wesentlich ist (Vergleichswerte werden von filtereFürExport später auch in Kleinschrift verwandelt)
            filter_objekt.Filterwert = window.adb.ermittleVergleichsoperator(this.value)[1];
            filter_objekt.Vergleichsoperator = window.adb.ermittleVergleichsoperator(this.value)[0];
            filterkriterien.push(filter_objekt);
        }
    });

    // den array dem objekt zuweisen
    filterkriterien_objekt.filterkriterien = filterkriterien;
    // gewählte Felder ermitteln
    $(".exportieren_felder_waehlen_objekt_feld.feld_waehlen").each(function() {
        if ($(this).prop('checked')) {
            // feldObjekt erstellen
            var feldObjekt = {};
            feldObjekt.DsName = "Objekt";
            feldObjekt.Feldname = $(this).attr('feldname');
            gewählte_felder.push(feldObjekt);
        }
    });
    $("#exportieren_felder_waehlen_felderliste").find(".feld_waehlen").each(function() {
        if ($(this).prop('checked')) {
            // feldObjekt erstellen
            var feldObjekt = {};
            feldObjekt.DsTyp = $(this).attr('dstyp');
            if (feldObjekt.DsTyp !== "Taxonomie") {
                anz_ds_gewählt++;
            }
            feldObjekt.DsName = $(this).attr('datensammlung');
            feldObjekt.Feldname = $(this).attr('feld');
            gewählte_felder.push(feldObjekt);
            anz_gewählte_felder_aus_dsbs++;
        }
    });
    // den array dem objekt zuweisen
    gewählte_felder_objekt.felder = gewählte_felder;

    // Wenn keine Felder gewählt sind: Melden und aufhören
    if (gewählte_felder_objekt.felder.length === 0) {
        // Beschäftigungsmeldung verstecken
        $exportieren_exportieren_hinweis_text
            .alert()
            .hide();
        $("#exportieren_exportieren_error_text_text")
            .html("Keine Eigenschaften gewählt<br>Bitte wählen Sie Eigenschaften, die exportiert werden sollen");
        $("#exportieren_exportieren_error_text")
            .alert()
            .show();
        return;
    }

    // html für filterkriterien aufbauen
    html_filterkriterien = "Gewählte Filterkriterien:<ul>";
    if ($("#exportieren_synonym_infos").prop('checked')) {
        html_filterkriterien += "<li>inklusive Informationen von Synonymen</li>";
    } else {
        html_filterkriterien += "<li>Informationen von Synonymen ignorieren</li>";
    }
    if (filterkriterien.length > 0) {
        _.each(filterkriterien, function(filterkriterium) {
            html_filterkriterien += "<li>";
            html_filterkriterien += "Feld \"" + filterkriterium.Feldname + "\" ";
            if (filterkriterium.Vergleichsoperator !== "kein") {
                html_filterkriterien += filterkriterium.Vergleichsoperator + " \"";
            } else {
                html_filterkriterien += "enthält \"";
            }
            html_filterkriterien += filterkriterium.Filterwert;
            html_filterkriterien += "\"</li>";
        });
        html_filterkriterien += "</ul>";
    } else if (anz_gewählte_felder_aus_dsbs > 0) {
        // wenn Filterkriterien erfasst wurde, werden sowieso nur Datensätze angezeigt, in denen Daten vorkommen
        // daher ist die folgende Info nur interesssant, wenn kein Filter gesetzt wurde
        // und natürlich auch nur, wenn Felder aus DS/BS gewählt wurden
        if ($("#exportieren_nur_objekte_mit_eigenschaften").prop('checked')) {
            html_filterkriterien += "<li>Nur Datensätze exportieren, die in den gewählten Eigenschaften- und Beziehungssammlungen Informationen enthalten</li>";
        } else {
            html_filterkriterien += "<li>Auch Datensätze exportieren, die in den gewählten Eigenschaften- und Beziehungssammlungen keine Informationen enthalten</li>";
        }
    }
    $("#exportieren_exportieren_filterkriterien")
        .html(html_filterkriterien)
        .show();

    // jetzt das filterObjekt übergeben
    if (direkt === "direkt") {
        window.adb.übergebeFilterFürDirektExport(gruppen, gruppen_array, anz_ds_gewählt, filterkriterien_objekt, gewählte_felder_objekt);
    } if (direkt === "für_alt") {
        window.adb.übergebeFilterFürExportFürAlt(gruppen, gruppen_array, anz_ds_gewählt, filterkriterien_objekt, gewählte_felder_objekt);
    }else {
        window.adb.übergebeFilterFürExportMitVorschau(gruppen, gruppen_array, anz_ds_gewählt, filterkriterien_objekt, gewählte_felder_objekt);
    }
};

window.adb.übergebeFilterFürExportFürAlt = function(gruppen, gruppen_array, anz_ds_gewählt, filterkriterien_objekt, gewählte_felder_objekt) {
    'use strict';
    // Alle Felder abfragen
    var fTz = "false",
        queryParam;
    // window.adb.fasseTaxonomienZusammen steuert, ob Taxonomien alle einzeln oder unter dem Titel Taxonomien zusammengefasst werden
    if (window.adb.fasseTaxonomienZusammen) {
        fTz = "true";
    }
    if ($("#exportieren_synonym_infos").prop('checked')) {
        queryParam = "export_alt_mit_synonymen_direkt/all_docs_mit_synonymen_fuer_alt?include_docs=true&filter=" + encodeURIComponent(JSON.stringify(filterkriterien_objekt)) + "&felder=" + encodeURIComponent(JSON.stringify(gewählte_felder_objekt)) + "&fasseTaxonomienZusammen=" + fTz + "&gruppen=" + gruppen;
    } else {
        queryParam = "export_alt_direkt/all_docs_fuer_alt?include_docs=true&filter=" + encodeURIComponent(JSON.stringify(filterkriterien_objekt)) + "&felder=" + encodeURIComponent(JSON.stringify(gewählte_felder_objekt)) + "&fasseTaxonomienZusammen=" + fTz + "&gruppen=" + gruppen;
    }
    if ($("#exportieren_nur_objekte_mit_eigenschaften").prop('checked') && anz_ds_gewählt > 0) {
        // prüfen, ob mindestens ein Feld aus ds gewählt ist
        // wenn ja: true, sonst false
        queryParam += "&nur_objekte_mit_eigenschaften=true";
    } else {
        queryParam += "&nur_objekte_mit_eigenschaften=false";
    }
    if ($("#export_bez_in_zeilen").prop('checked')) {
        queryParam += "&bez_in_zeilen=true";
    } else {
        queryParam += "&bez_in_zeilen=false";
    }
    window.open('_list/' + queryParam);
};

window.adb.übergebeFilterFürDirektExport = function(gruppen, gruppen_array, anz_ds_gewählt, filterkriterien_objekt, gewählte_felder_objekt) {
    'use strict';
    // Alle Felder abfragen
    var fTz = "false",
        queryParam,
        view_name,
        list_name,
        gruppenliste = gruppen.split(",");
    // window.adb.fasseTaxonomienZusammen steuert, ob Taxonomien alle einzeln oder unter dem Titel Taxonomien zusammengefasst werden
    if (window.adb.fasseTaxonomienZusammen) {
        fTz = "true";
    }
    if ($("#exportieren_synonym_infos").prop('checked')) {
        list_name = "export_mit_synonymen_direkt";
        if (gruppenliste.length > 1) {
            view_name = "all_docs_mit_synonymen";
        } else {
            // den view der Gruppe nehmen, das ist viel schneller
            if (gruppenliste[0] === "Lebensräume") {
                view_name = "lr_mit_synonymen";
            } else {
                view_name = gruppenliste[0].toLowerCase() + "_mit_synonymen";
            }
        }
    } else {
        list_name = "export_direkt";
        if (gruppenliste.length > 1) {
            view_name = "all_docs";
        } else {
            // den view der Gruppe nehmen, das ist viel schneller
            if (gruppenliste[0] === "Lebensräume") {
                view_name = "lr";
            } else {
                view_name = gruppenliste[0].toLowerCase();
            }

        }
    }

    queryParam = list_name + "/" + view_name + "?include_docs=true&filter=" + encodeURIComponent(JSON.stringify(filterkriterien_objekt)) + "&felder=" + encodeURIComponent(JSON.stringify(gewählte_felder_objekt)) + "&fasseTaxonomienZusammen=" + fTz + "&gruppen=" + gruppen;

    if ($("#exportieren_nur_objekte_mit_eigenschaften").prop('checked') && anz_ds_gewählt > 0) {
        // prüfen, ob mindestens ein Feld aus ds gewählt ist
        // wenn ja: true, sonst false
        queryParam += "&nur_objekte_mit_eigenschaften=true";
    } else {
        queryParam += "&nur_objekte_mit_eigenschaften=false";
    }
    if ($("#export_bez_in_zeilen").prop('checked')) {
        queryParam += "&bez_in_zeilen=true";
    } else {
        queryParam += "&bez_in_zeilen=false";
    }
    window.open('_list/' + queryParam);
};

window.adb.übergebeFilterFürExportMitVorschau = function(gruppen, gruppen_array, anz_ds_gewählt, filterkriterien_objekt, gewählte_felder_objekt) {
    'use strict';
    // Alle Felder abfragen
    var fTz = "false",
        anz_gruppen_abgefragt = 0,
        dbParam,
        queryParam;
    // window.adb.fasseTaxonomienZusammen steuert, ob Taxonomien alle einzeln oder unter dem Titel Taxonomien zusammengefasst werden
    if (window.adb.fasseTaxonomienZusammen) {
        fTz = "true";
    }
    // globale Variable vorbereiten
    window.adb.exportieren_objekte = [];
    // in anz_gruppen_abgefragt wird gezählt, wieviele Gruppen schon abgefragt wurden
    // jede Abfrage kontrolliert nach Erhalt der Daten, ob schon alle Gruppen abgefragt wurden und macht weiter, wenn ja
    _.each(gruppen_array, function(gruppe) {
        if ($("#exportieren_synonym_infos").prop('checked')) {
            dbParam = "artendb/export_mit_synonymen";
            queryParam = gruppe + "_mit_synonymen?include_docs=true&filter=" + encodeURIComponent(JSON.stringify(filterkriterien_objekt)) + "&felder=" + encodeURIComponent(JSON.stringify(gewählte_felder_objekt)) + "&fasseTaxonomienZusammen=" + fTz + "&gruppen=" + gruppen;
        } else {
            dbParam = "artendb/export";
            queryParam = gruppe + "?include_docs=true&filter=" + encodeURIComponent(JSON.stringify(filterkriterien_objekt)) + "&felder=" + encodeURIComponent(JSON.stringify(gewählte_felder_objekt)) + "&fasseTaxonomienZusammen=" + fTz + "&gruppen=" + gruppen;
        }
        if ($("#exportieren_nur_objekte_mit_eigenschaften").prop('checked') && anz_ds_gewählt > 0) {
            // prüfen, ob mindestens ein Feld aus ds gewählt ist
            // wenn ja: true, sonst false
            queryParam += "&nur_objekte_mit_eigenschaften=true";
        } else {
            queryParam += "&nur_objekte_mit_eigenschaften=false";
        }
        if ($("#export_bez_in_zeilen").prop('checked')) {
            queryParam += "&bez_in_zeilen=true";
        } else {
            queryParam += "&bez_in_zeilen=false";
        }
        var $db = $.couch.db("artendb");
        $db.list(dbParam, queryParam, {
            success: function(data) {
                // alle Objekte in data in window.adb.exportieren_objekte anfügen
                window.adb.exportieren_objekte = _.union(window.adb.exportieren_objekte, data);
                // speichern, dass eine Gruppe abgefragt wurde
                anz_gruppen_abgefragt++;
                if (anz_gruppen_abgefragt === gruppen_array.length) {
                    // alle Gruppen wurden abgefragt, jetzt kann es weitergehen
                    // Ergebnis rückmelden
                    $("#exportieren_exportieren_hinweis_text")
                        .alert()
                        .show()
                        .html(window.adb.exportieren_objekte.length + " Objekte sind gewählt");
                    window.adb.baueTabelleFürExportAuf();
                }
            },
            error: function() {
                console.log('error in $db.list');
            }
        });
    });
};

window.adb.baueTabelleFürExportAuf = function() {
    'use strict';
    var hinweis = "";
    if (window.adb.exportieren_objekte.length > 0) {
        window.adb.erstelleTabelle(window.adb.exportieren_objekte, "", "exportieren_exportieren_tabelle");
        $(".exportieren_exportieren_exportieren").show();
        // zur Tabelle scrollen
        $('html, body').animate({
            scrollTop: $("#exportieren_exportieren_exportieren").offset().top
        }, 2000);
    } else if (window.adb.exportieren_objekte && window.adb.exportieren_objekte.length === 0) {
        $("#exportieren_exportieren_error_text_text")
            .html("Keine Daten gefunden<br>Bitte passen Sie die Filterkriterien an");
        $("#exportieren_exportieren_error_text")
            .alert()
            .show();
        $('html, body').animate({
            scrollTop: $("#exportieren_exportieren_exportieren").offset().top
        }, 2000);

    }
    // Beschäftigungsmeldung verstecken
    $("#exportieren_exportieren_hinweis_text")
        .alert()
        .hide();
};

window.adb.fürExportGewählteGruppen = function() {
    'use strict';
    var gruppen = [];
    $(".exportieren_ds_objekte_waehlen_gruppe").each(function() {
        if ($(this).prop('checked')) {
            gruppen.push($(this).attr('feldname'));
        }
    });
    return gruppen;
};

// woher wird bloss benötigt, wenn angemeldet werden muss
window.adb.bereiteImportieren_ds_beschreibenVor = function(woher) {
    'use strict';
    if (!window.adb.pruefeAnmeldung("woher")) {
        $('#importieren_ds_ds_beschreiben_collapse').collapse('hide');
    } else {
        $("#DsName").focus();
        // Daten holen, wenn nötig
        if (window.adb.ds_von_objekten) {
            window.adb.bereiteImportieren_ds_beschreibenVor_02();
        } else {
            var $db = $.couch.db("artendb");
            $db.view('artendb/ds_von_objekten?startkey=["Datensammlung"]&endkey=["Datensammlung",{},{},{},{}]&group_level=5', {
                success: function(data) {
                    // Daten in Objektvariable speichern > Wenn Ds ausgewählt, Angaben in die Felder kopieren
                    window.adb.ds_von_objekten = data;
                    window.adb.bereiteImportieren_ds_beschreibenVor_02();
                }
            });
        }
    }
};

// DsNamen in Auswahlliste stellen
// veränderbare sind normal, übrige grau
window.adb.bereiteImportieren_ds_beschreibenVor_02 = function() {
    'use strict';
    var html,
        ds_namen = [];
    // in diesem Array werden alle keys gesammelt
    // diesen Array als globale Variable gestalten: Wir benutzt, wenn DsName verändert wird
    window.adb.DsKeys = _.map(window.adb.ds_von_objekten.rows, function(row) {
        return row.key;
    });
    // brauche nur drei keys
    // email: leider gibt es Null-Werte
    window.adb.ds_namen_eindeutig = _.map(window.adb.DsKeys, function(ds_key) {
        return [ds_key[1], ds_key[2], ds_key[3] || "alex@gabriel-software.ch"];
    });
    // Objektarray reduzieren auf eindeutige Namen
    window.adb.ds_namen_eindeutig = _.reject(window.adb.ds_namen_eindeutig, function(objekt) {
        var position_in_ds_namen = _.indexOf(ds_namen, objekt[0]);
        if (position_in_ds_namen === -1) {
            ds_namen.push(objekt[0]);
            return false;
        } else {
            return true;
        }
    });
    // nach DsNamen sortieren
    window.adb.ds_namen_eindeutig = _.sortBy(window.adb.ds_namen_eindeutig, function(key) {
        return key[0];
    });
    // mit leerer Zeile beginnen
    html = "<option value='' waehlbar=true></option>";
    // Namen der Datensammlungen als Optionen anfügen
    _.each(window.adb.ds_namen_eindeutig, function(ds_name_eindeutig) {
        // veränderbar sind nur selbst importierte und zusammenfassende
        if (ds_name_eindeutig[2] === localStorage.Email || ds_name_eindeutig[1] || Boolean(localStorage.admin)) {
            // veränderbare sind normal = schwarz
            html += "<option value='" + ds_name_eindeutig[0] + "' class='adb_gruen_fett' waehlbar=true>" + ds_name_eindeutig[0] + "</option>";
        } else {
            // nicht veränderbare sind grau
            html += "<option value='" + ds_name_eindeutig[0] + "' class='adb_grau_normal' waehlbar=false>" + ds_name_eindeutig[0] + "</option>";
        }
    });
    $("#DsWaehlen").html(html);
    $("#DsUrsprungsDs").html(html);
};

// woher wird bloss benötigt, wenn angemeldet werden muss
window.adb.bereiteImportieren_bs_beschreibenVor = function(woher) {
    'use strict';
    if (!window.adb.pruefeAnmeldung("woher")) {
        $('#importieren_bs_ds_beschreiben_collapse').collapse('hide');
    } else {
        $("#BsName").focus();
        // anzeigen, dass Daten geladen werden. Nein: Blitzt bloss kurz auf
        //$("#BsWaehlen").html("<option value='null'>Bitte warte, die Liste wird aufgebaut...</option>");
        // Daten holen, wenn nötig
        if (window.adb.bs_von_objekten) {
            window.adb.bereiteImportieren_bs_beschreibenVor_02();
        } else {
            var $db = $.couch.db("artendb");
            $db.view('artendb/ds_von_objekten?startkey=["Beziehungssammlung"]&endkey=["Beziehungssammlung",{},{},{},{}]&group_level=5', {
                success: function(data) {
                    // Daten in Objektvariable speichern > Wenn Ds ausgewählt, Angaben in die Felder kopieren
                    window.adb.bs_von_objekten = data;
                    window.adb.bereiteImportieren_bs_beschreibenVor_02();
                }
            });
        }
    }
};

window.adb.bereiteImportieren_bs_beschreibenVor_02 = function() {
    'use strict';
    var html,
        bs_namen = [];
    // in diesem Array werden alle keys gesammelt
    // diesen Array als globale Variable gestalten: Wir benutzt, wenn DsName verändert wird
    window.adb.BsKeys = _.map(window.adb.bs_von_objekten.rows, function(row) {
        return row.key;
    });

    // brauche nur drei keys
    window.adb.ds_namen_eindeutig = _.map(window.adb.BsKeys, function(bs_key) {
        return [bs_key[1], bs_key[2], bs_key[3]];
    });
    // Objektarray reduzieren auf eindeutige Namen
    window.adb.ds_namen_eindeutig = _.reject(window.adb.ds_namen_eindeutig, function(objekt) {
        var position_in_bs_namen = _.indexOf(bs_namen, objekt[0]);
        if (position_in_bs_namen === -1) {
            bs_namen.push(objekt[0]);
            return false;
        } else {
            return true;
        }
    });

    // nach DsNamen sortieren
    window.adb.ds_namen_eindeutig = _.sortBy(window.adb.ds_namen_eindeutig, function(key) {
        return key[0];
    });
    // mit leerer Zeile beginnen
    html = "<option value='' waehlbar=true></option>";
    // Namen der Datensammlungen als Optionen anfügen
    _.each(window.adb.ds_namen_eindeutig, function(ds_name_eindeutig) {
        // veränderbar sind nur selbst importierte und zusammenfassende
        if (ds_name_eindeutig[2] === localStorage.Email || ds_name_eindeutig[1] || Boolean(localStorage.admin)) {
            // veränderbare sind normal = schwarz
            html += "<option value='" + ds_name_eindeutig[0] + "' class='adb_gruen_fett' waehlbar=true>" + ds_name_eindeutig[0] + "</option>";
        } else {
            // nicht veränderbare sind grau
            html += "<option value='" + ds_name_eindeutig[0] + "' class='adb_grau_normal' waehlbar=false>" + ds_name_eindeutig[0] + "</option>";
        }
    });
    $("#BsWaehlen").html(html);
    $("#BsUrsprungsBs").html(html);
};

window.adb.isFileAPIAvailable = function() {
    'use strict';
    // Check for the various File API support.
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        // Great success! All the File APIs are supported.
        return true;
    } else {
        // source: File API availability - //caniuse.com/#feat=fileapi
        // source: <output> availability - //html5doctor.com/the-output-element/
        var html = "Für den Datenimport benötigen Sie mindestens einen der folgenden Browser:<br>";
        html += "(Stand März 2014)<br>";
        html += "- Google Chrome: 31 oder neuer<br>";
        html += "- Chrome auf Android: 33 oder neuer<br>";
        html += "- Mozilla Firefox: 28 oder neuer<br>";
        html += "- Firefox auf Android: 26 oder neuer<br>";
        html += "- Safari: 7.0 oder neuer<br>";
        html += "- iOs Safari: 6.0 oder neuer<br>";
        html += "- Opera: 20 oder neuer<br>";
        html += "- Internet Explorer: 10 oder neuer<br>";
        html += "- Internet Explorer mobile: bis Version 10 nicht<br>";
        html += "- Android Standardbrowser: Android 4.4 oder neuer<br>";
        $("#fileApiMeldungText").html(html);
        $('#fileApiMeldung').modal();
        return false;
    }
};

window.adb.sortiereObjektarrayNachName = function(objektarray) {
    'use strict';
    // Beziehungssammlungen bzw. Datensammlungen nach Name sortieren
    objektarray.sort(function(a, b) {
        var aName = a.Name,
            bName = b.Name;
        if (aName && bName) {
            return (aName.toLowerCase() == bName.toLowerCase()) ? 0 : (aName.toLowerCase() > bName.toLowerCase()) ? 1 : -1;
        } else {
            return (aName == bName) ? 0 : (aName > bName) ? 1 : -1;
        }
    });
    return objektarray;
};

// übernimmt einen Array mit den Beziehungen
// gibt diesen sortiert zurück
window.adb.sortiereBeziehungenNachName = function(beziehungen) {
    'use strict';
// Beziehungen nach Name sortieren
    beziehungen.sort(function(a, b) {
        var aName,
            bName;
        _.each(a.Beziehungspartner, function(beziehungspartner) {
            if (beziehungspartner.Gruppe === "Lebensräume") {
                // sortiert werden soll bei Lebensräumen zuerst nach Taxonomie, dann nach Name
                aName = beziehungspartner.Gruppe + beziehungspartner.Taxonomie + beziehungspartner.Name;
            } else {
                aName = beziehungspartner.Gruppe + beziehungspartner.Name;
            }
        });
        _.each(b.Beziehungspartner, function(beziehungspartner) {
            if (beziehungspartner.Gruppe === "Lebensräume") {
                bName = beziehungspartner.Gruppe + beziehungspartner.Taxonomie + beziehungspartner.Name;
            } else {
                bName = beziehungspartner.Gruppe + beziehungspartner.Name;
            }
        });
        if (aName && bName) {
            return (aName.toLowerCase() == bName.toLowerCase()) ? 0 : (aName.toLowerCase() > bName.toLowerCase()) ? 1 : -1;
        } else {
            return (aName == bName) ? 0 : (aName > bName) ? 1 : -1;
        }
    });
    return beziehungen;
};

// sortiert nach den keys des Objekts
// resultat nicht garantiert!
window.adb.sortKeysOfObject = function(o) {
    'use strict';
    var sorted = {},
        key,
        a = [];

    for (key in o) {
        if (o.hasOwnProperty(key)) {
            a.push(key);
        }
    }

    a.sort();

    for (key = 0; key < a.length; key++) {
        sorted[a[key]] = o[a[key]];
    }
    return sorted;
};

window.adb.exportZurücksetzen = function() {
    'use strict';
    var $exportieren_exportieren_collapse = $("#exportieren_exportieren_collapse");
    // Export ausblenden, falls sie eingeblendet war
    if ($exportieren_exportieren_collapse.css("display") !== "none") {
        $exportieren_exportieren_collapse.collapse('hide');
    }
    $("#exportieren_exportieren_tabelle").hide();
    $(".exportieren_exportieren_exportieren").hide();
    $("#exportieren_exportieren_error_text")
        .alert()
        .hide();
};

window.adb.öffneGruppe = function(Gruppe) {
    'use strict';
    var erstelleBaum = require('./modules/erstelleBaum');
    // Gruppe als globale Variable speichern, weil sie an vielen Orten benutzt wird
    window.adb.Gruppe = Gruppe;
    $(".suchfeld").val("");
    $("#Gruppe_label").html("Gruppe:");
    $(".suchen")
        .hide()
        .val("");
    $("#forms").hide();
    var treeMitteilung = "hole Daten...";
    if (window.adb.Gruppe === "Macromycetes") {
        treeMitteilung = "hole Daten (das dauert bei Pilzen länger...)";
    }
    $("#treeMitteilung")
        .html(treeMitteilung)
        .show();
    erstelleBaum($);
    // keine Art mehr aktiv
    delete localStorage.art_id;
};

// schreibt Änderungen in Feldern in die Datenbank
// wird vorläufig nur für LR Taxonomie verwendet
window.adb.speichern = function(feldwert, feldname, ds_name, ds_typ) {
    'use strict';
    // zuerst die id des Objekts holen
    var uri = new Uri($(location).attr('href')),
        id = uri.getQueryParamValue('id'),
        // wenn browser history nicht unterstützt, erstellt history.js eine hash
        // dann muss die id durch die id in der hash ersetzt werden
        hash = uri.anchor(),
        uri2;
    if (hash) {
        uri2 = new Uri(hash);
        id = uri2.getQueryParamValue('id');
    }
    // sicherstellen, dass boolean, float und integer nicht in Text verwandelt werden
    feldwert = window.adb.convertToCorrectType(feldwert);
    var $db = $.couch.db("artendb");
    $db.openDoc(id, {
        success: function(object) {
            // prüfen, ob Einheit eines LR verändert wurde. Wenn ja: Name der Taxonomie anpassen
            if (feldname === "Einheit" && object.Taxonomie.Eigenschaften.Einheit === object.Taxonomie.Eigenschaften.Taxonomie) {
                // das ist die Wurzel der Taxonomie
                // somit ändert auch der Taxonomiename
                // diesen mitgeben
                // Einheit ändert und Taxonomiename muss auch angepasst werden
                object.Taxonomie.Name = feldwert;
                object.Taxonomie.Eigenschaften.Taxonomie = feldwert;
                // TODO: prüfen, ob die Änderung zulässig ist (Taxonomiename eindeutig) --- VOR DEM SPEICHERN
                // TODO: allfällige Beziehungen anpassen
            }
            // den übergebenen Wert im übergebenen Feldnamen speichern
            object.Taxonomie.Eigenschaften[feldname] = feldwert;
            $db.saveDoc(object, {
                success: function(data) {
                    var initiiereArt = require('./modules/initiiereArt'),
                        ersetzeUngueltigeZeichenInIdNamen = require('./modules/ersetzeUngueltigeZeichenInIdNamen');
                    object._rev = data.rev;
                    // prüfen, ob Label oder Name eines LR verändert wurde. Wenn ja: Hierarchie aktualisieren
                    if (feldname === "Label" || feldname === "Einheit") {
                        if (feldname === "Einheit" && object.Taxonomie.Eigenschaften.Einheit === object.Taxonomie.Eigenschaften.Taxonomie) {
                            // das ist die Wurzel der Taxonomie
                            // somit ändert auch der Taxonomiename
                            // diesen mitgeben
                            // Einheit ändert und Taxonomiename muss auch angepasst werden
                            window.adb.aktualisiereHierarchieEinesLrInklusiveSeinerChildren(null, object, true, feldwert);
                            // Feld Taxonomie und Beschriftung des Accordions aktualisiern
                            // dazu neu initiieren, weil sonst das Accordion nicht verändert wird
                            initiiereArt ($, id);
                            // Taxonomie anzeigen
                            $('#' + ersetzeUngueltigeZeichenInIdNamen(feldwert)).collapse('show');
                        } else {
                            window.adb.aktualisiereHierarchieEinesLrInklusiveSeinerChildren(null, object, true, false);
                        }
                        // node umbenennen
                        var neuer_nodetext;
                        if (feldname === "Label") {
                            // object hat noch den alten Wert für Label, neuen verwenden
                            neuer_nodetext = window.adb.erstelleLrLabelName(feldwert, object.Taxonomie.Eigenschaften.Einheit);
                        } else {
                            // object hat noch den alten Wert für Einheit, neuen verwenden
                            neuer_nodetext = window.adb.erstelleLrLabelName(object.Taxonomie.Eigenschaften.Label, feldwert);
                        }
                        $("#tree" + window.adb.Gruppe).jstree("rename_node", "#" + object._id, neuer_nodetext);
                    }
                },
                error: function() {
                    $("#meldung_individuell_label").html("Fehler");
                    $("#meldung_individuell_text").html("Die letzte Änderung im Feld "+feldname+" wurde nicht gespeichert");
                    $("#meldung_individuell_schliessen").html("schliessen");
                    $('#meldung_individuell').modal();
                }
            });
        },
        error: function() {
            $("#meldung_individuell_label").html("Fehler");
            $("#meldung_individuell_text").html("Die letzte Änderung im Feld "+feldname+" wurde nicht gespeichert");
            $("#meldung_individuell_schliessen").html("schliessen");
            $('#meldung_individuell').modal();
        }
    });
};

window.adb.convertToCorrectType = function(feldwert) {
    'use strict';
    var type = window.adb.myTypeOf(feldwert);
    if (type === "boolean") {
        return Boolean(feldwert);
    } else if (type === "float") {
        return parseFloat(feldwert);
    } else if (type === "integer") {
        return parseInt(feldwert);
    } else {
        return feldwert;
    }
};

// Hilfsfunktion, die typeof ersetzt und ergänzt
// typeof gibt bei input-Feldern immer String zurück!
window.adb.myTypeOf = function(wert) {
    'use strict';
    if (typeof wert === "boolean") {
        return "boolean";
    } else if (parseInt(wert) && parseFloat(wert) && parseInt(wert) != parseFloat(wert) && parseInt(wert) == wert) {
        // es ist eine Float
        return "float";
    // verhindern, dass führende Nullen abgeschnitten werden
    } else if (parseInt(wert) == wert && wert.toString().length === Math.ceil(parseInt(wert)/10)) {
        // es ist eine Integer
        return "integer";
    } else {
        // als String behandeln
        return "string";
    }
};

window.adb.bearbeiteLrTaxonomie = function() {
    'use strict';
    // Benutzer muss anmelden
    if (!window.adb.pruefeAnmeldung("art")) {
        return false;
    }

    // Einstellung merken, damit auch nach Datensatzwechsel die Bearbeitbarkeit bleibt
    localStorage.lr_bearb = true;

    // Anmeldung: zeigen, aber geschlossen
    $("#art_anmelden_collapse").collapse('hide');
    $("#art_anmelden").show();

    // alle Felder schreibbar setzen
    $(".Lebensräume.Taxonomie").find(".controls").each(function() {
        // einige Felder nicht bearbeiten
        if ($(this).attr('id') !== "GUID" && $(this).attr('id') !== "Parent" && $(this).attr('id') !== "Taxonomie" && $(this).attr('id') !== "Hierarchie") {
            var parent = $(this).parent();
            $(this).attr('readonly', false);
            if (parent.attr('href')) {
                parent.attr('href', '#');
                // Standardverhalten beim Klicken von Links verhindern
                parent.attr('onclick', 'return false;');
                // Mauspointer nicht mehr als Finger
                this.style.cursor = '';
            }
        }
    });

    // Schreibbarkeit in den Symbolen anzeigen
    $('.lr_bearb').removeClass('disabled');
    $(".lr_bearb_bearb").addClass('disabled');
};

window.adb.schuetzeLrTaxonomie = function() {
    'use strict';
    // alle Felder schreibbar setzen
    $(".Lebensräume.Taxonomie .controls").each(function() {
        var parent = $(this).parent();
        $(this).attr('readonly', true);
        if (parent.attr('href')) {
            var feldWert = $(this).val();
            if (typeof feldWert === "string" && feldWert.slice(0, 7) === "//") {
                parent.attr('href', feldWert);
                // falls onclick besteht, entfernen
                parent.removeAttr("onclick");
                // Mauspointer nicht mehr als Finger
                this.style.cursor = 'pointer';
            }
        }
    });
    $('.lr_bearb').addClass('disabled');
    $(".lr_bearb_bearb").removeClass('disabled');
    $("#art_anmelden").hide();
};

// aktualisiert die Hierarchie eines Arrays von Objekten (in dieser Form: Lebensräumen, siehe wie der Name der parent-objekte erstellt wird)
// der Array kann das Resultat einer Abfrage aus der DB sein (object[i] = dara.rows[i].doc)
// oder aus dem Import einer Taxonomie stammen
// diese Funktion wird benötigt, wenn eine neue Taxonomie importiert wird
// Momentan nicht verwendet
window.adb.aktualisiereHierarchieEinerLrTaxonomie = function(object_array) {
    'use strict';
    var object,
        hierarchie,
        parent;
    _.each(object_array, function(object) {
        hierarchie = [];
        parent = object.Taxonomie.Eigenschaften.Parent;
        // als Start sich selben zur Hierarchie hinzufügen
        hierarchie.push(window.adb.erstelleHierarchieobjektAusObjekt(object));
        if (parent) {
            object.Taxonomie.Eigenschaften.Hierarchie = window.adb.ergänzeParentZuLrHierarchie(object_array, object._id, hierarchie);
            $db.saveDoc(object);
        }
    });
};

// aktualisiert die Hierarchie eines Objekts (in dieser Form: Lebensraum)
// ist aktualisiereHierarchiefeld true, wird das Feld in der UI aktualisiert
// diese Funktion wird benötigt, wenn ein neuer LR erstellt wird
// LR kann mitgegeben werden, muss aber nicht
// wird mitgegeben, wenn an den betreffenden lr nichts ändert und nicht jedes mal die LR aus der DB neu abgerufen werden sollen
// manchmal ist es aber nötig, die LR neu zu holen, wenn dazwischen an LR geändert wird!
window.adb.aktualisiereHierarchieEinesNeuenLr = function(lr, object, aktualisiere_hierarchiefeld) {
    'use strict';
    if (lr) {
        window.adb.aktualisiereHierarchieEinesNeuenLr_2(lr, object, aktualisiere_hierarchiefeld);
    } else {
        var $db = $.couch.db("artendb");
        $db.view('artendb/lr?include_docs=true', {
            success: function(data) {
                window.adb.aktualisiereHierarchieEinesNeuenLr_2(data, object, aktualisiere_hierarchiefeld);
            }
        });
    }
};

window.adb.aktualisiereHierarchieEinesNeuenLr_2 = function(LR, object) {
    'use strict';
    var object_array,
        hierarchie = [],
        parent_object;

    object_array = _.map(LR.rows, function(row) {
        return row.doc;
    });
    if (!object.Taxonomie) {
        object.Taxonomie = {};
    }
    if (!object.Taxonomie.Eigenschaften) {
        object.Taxonomie.Eigenschaften = {};
    }
    parent_object = _.find(object_array, function(obj) {
        return obj._id === object.Taxonomie.Eigenschaften.Parent.GUID;
    });
    // object.Name setzen
    object.Taxonomie.Name = parent_object.Taxonomie.Name;
    // object.Taxonomie.Eigenschaften.Taxonomie setzen
    object.Taxonomie.Eigenschaften.Taxonomie = parent_object.Taxonomie.Eigenschaften.Taxonomie;
    // als Start sich selben zur Hierarchie hinzufügen
    hierarchie.push(window.adb.erstelleHierarchieobjektAusObjekt(object));
    object.Taxonomie.Eigenschaften.Hierarchie = window.adb.ergänzeParentZuLrHierarchie(object_array, object.Taxonomie.Eigenschaften.Parent.GUID, hierarchie);
    // save ohne open: _rev wurde zuvor übernommen
    $db.saveDoc(object, {
        success: function() {
            var erstelleBaum = require('./modules/erstelleBaum');
            $.when(erstelleBaum($)).then(function() {
                var oeffneBaumZuId = require('./modules/oeffneBaumZuId');
                oeffneBaumZuId ($, object._id);
                $('#lr_parent_waehlen').modal('hide');
            });
        },
        error: function() {
            var initiiereArt = require('./modules/initiiereArt');
            $("#meldung_individuell_label").html("Fehler");
            $("#meldung_individuell_text").html("Die Hierarchie des Lebensraums konnte nicht erstellt werden");
            $("#meldung_individuell_schliessen").html("schliessen");
            $('#meldung_individuell').modal();
            initiiereArt ($, object._id);
        }
    });
};

// aktualisiert die Hierarchie eines Objekts (in dieser Form: Lebensraum)
// und auch den parent
// prüft, ob dieses Objekt children hat
// wenn ja, wird deren Hierarchie auch aktualisiert
// ist aktualisiereHierarchiefeld true, wird das Feld in der UI aktualisiert
// wird das Ergebnis der DB-Abfrage mitgegeben, wird die Abfrage nicht wiederholt
// diese Funktion wird benötigt, wenn Namen oder Label eines bestehenden LR verändert wird
window.adb.aktualisiereHierarchieEinesLrInklusiveSeinerChildren = function(lr, object, aktualisiereHierarchiefeld, einheit_ist_taxonomiename) {
    'use strict';
    if (lr) {
        window.adb.aktualisiereHierarchieEinesLrInklusiveSeinerChildren_2(lr, object, aktualisiereHierarchiefeld, einheit_ist_taxonomiename);
    } else {
        var $db = $.couch.db("artendb");
        $db.view('artendb/lr?include_docs=true', {
            success: function(lr) {
                window.adb.aktualisiereHierarchieEinesLrInklusiveSeinerChildren_2(lr, object, aktualisiereHierarchiefeld, einheit_ist_taxonomiename);
            }
        });
    }
};

window.adb.aktualisiereHierarchieEinesLrInklusiveSeinerChildren_2 = function(lr, objekt, aktualisiereHierarchiefeld, einheit_ist_taxonomiename) {
    'use strict';
    var hierarchie = [],
        parent = objekt.Taxonomie.Eigenschaften.Parent,
        object_array = _.map(lr.rows, function(row) {
            return row.doc;
        });
    if (!objekt.Taxonomie) {
        objekt.Taxonomie = {};
    }
    if (!objekt.Taxonomie.Eigenschaften) {
        objekt.Taxonomie.Eigenschaften = {};
    }
    // als Start sich selber zur Hierarchie hinzufügen
    hierarchie.push(window.adb.erstelleHierarchieobjektAusObjekt(objekt));
    if (parent.GUID !== objekt._id) {
        objekt.Taxonomie.Eigenschaften.Hierarchie = window.adb.ergänzeParentZuLrHierarchie(object_array, objekt.Taxonomie.Eigenschaften.Parent.GUID, hierarchie);
    } else {
        // aha, das ist die Wurzel des Baums
        objekt.Taxonomie.Eigenschaften.Hierarchie = hierarchie;
    }
    if (aktualisiereHierarchiefeld) {
        $("#Hierarchie").val(window.adb.erstelleHierarchieFürFeldAusHierarchieobjekteArray(objekt.Taxonomie.Eigenschaften.Hierarchie));
    }
    // jetzt den parent aktualisieren
    if (objekt.Taxonomie.Eigenschaften.Hierarchie.length > 1) {
        // es gibt höhere Ebenen
        // das vorletzte Hierarchieobjekt wählen. das ist length -2, weil length bei 1 beginnt, die Objekte aber von 0 an nummeriert werden
        objekt.Taxonomie.Eigenschaften.Parent = objekt.Taxonomie.Eigenschaften.Hierarchie[objekt.Taxonomie.Eigenschaften.Hierarchie.length-2];
    } else if (objekt.Taxonomie.Eigenschaften.Hierarchie.length === 1) {
        // das ist die oberste Ebene
        objekt.Taxonomie.Eigenschaften.Parent = objekt.Taxonomie.Eigenschaften.Hierarchie[0];
    }
    if (einheit_ist_taxonomiename) {
        // Einheit ändert und Taxonomiename muss auch angepasst werden
        objekt.Taxonomie.Name = einheit_ist_taxonomiename;
        objekt.Taxonomie.Eigenschaften.Taxonomie = einheit_ist_taxonomiename;
    }
    $db.saveDoc(objekt, {
        success: function() {
            var doc;
            // kontrollieren, ob das Objekt children hat. Wenn ja, diese aktualisieren
            _.each(lr.rows, function(lr_row) {
                doc = lr_row.doc;
                if (doc.Taxonomie && doc.Taxonomie.Eigenschaften && doc.Taxonomie.Eigenschaften.Parent && doc.Taxonomie.Eigenschaften.Parent.GUID && doc.Taxonomie.Eigenschaften.Parent.GUID === objekt._id && doc._id !== objekt._id) {
                    // das ist ein child
                    // auch aktualisieren
                    // lr mitgeben, damit die Abfrage nicht wiederholt werden muss
                    window.adb.aktualisiereHierarchieEinesLrInklusiveSeinerChildren_2(lr, doc, false, einheit_ist_taxonomiename);
                }
            });
        }
    });
};

// Baut den Hierarchiepfad für einen Lebensraum auf
// das erste Element - der Lebensraum selbst - wird mit der Variable "Hierarchie" übergeben
// ruft sich selbst rekursiv auf, bis das oberste Hierarchieelement erreicht ist
window.adb.ergänzeParentZuLrHierarchie = function(objekt_array, parentGUID, Hierarchie) {
    'use strict';
    var parent_objekt,
        hierarchie_ergänzt;
    _.each(objekt_array, function(object) {
        if (object._id === parentGUID) {
            parent_objekt = window.adb.erstelleHierarchieobjektAusObjekt(object);
            Hierarchie.push(parent_objekt);
            if (object.Taxonomie.Eigenschaften.Parent.GUID !== object._id) {
                // die Hierarchie ist noch nicht zu Ende - weitermachen
                hierarchie_ergänzt = window.adb.ergänzeParentZuLrHierarchie(objekt_array, object.Taxonomie.Eigenschaften.Parent.GUID, Hierarchie);
                return Hierarchie;
            } else {
                // jetzt ist die Hierarchie vollständig
                // sie ist aber verkehrt - umkehren
                return Hierarchie.reverse();
            }
        }
    });
};

window.adb.erstelleHierarchieobjektAusObjekt = function(objekt) {
    'use strict';
    var hierarchieobjekt = {};
    hierarchieobjekt.Name = window.adb.erstelleLrLabelNameAusObjekt(objekt);
    hierarchieobjekt.GUID = objekt._id;
    return hierarchieobjekt;
};

window.adb.erstelleLrLabelNameAusObjekt = function(objekt) {
    'use strict';
    var label = objekt.Taxonomie.Eigenschaften.Label || "",
        einheit = objekt.Taxonomie.Eigenschaften.Einheit || "";
    return window.adb.erstelleLrLabelName(label, einheit);
};

window.adb.erstelleLrLabelName = function(label, einheit) {
    'use strict';
    if (label && einheit) {
        return label + ": " + einheit;
    } else if (einheit) {
        return einheit;
    } else {
        // aha, ein neues Objekt, noch ohne Label und Einheit
        return "unbenannte Einheit";
    }
};

// löscht Datensätze in Massen
// nimmt einen Array von Objekten entgegen
// baut daraus einen neuen array auf, in dem die Objekte nur noch die benötigten Informationen haben
// aktualisiert die Objekte mit einer einzigen Operation
window.adb.löscheMassenMitObjektArray = function(object_array) {
    'use strict';
    var objekte_mit_objekte,
        objekte = [],
        new_objekt;
    _.each(object_array, function(object) {
        new_objekt = {};
        new_objekt._id = object._id;
        new_objekt._rev = object._rev;
        new_objekt._deleted = true;
        objekte.push(new_objekt);
    });
    objekte_mit_objekte = {};
    objekte_mit_objekte.docs = objekte;
    $.ajax({
        type: "POST",
        url: "../../_bulk_docs",
        contentType: "application/json", 
        data: JSON.stringify(objekte_mit_objekte)
    });
};

// erhält einen filterwert
// dieser kann zuvorderst einen Vergleichsoperator enthalten oder auch nicht
// retourniert einen Array mit 0 Vergleichsoperator und 1 filterwert
window.adb.ermittleVergleichsoperator = function(filterwert) {
    'use strict';
    var vergleichsoperator;
    if (filterwert.indexOf(">=") === 0) {
        vergleichsoperator = ">=";
        if (filterwert.indexOf(" ") === 2) {
            filterwert = filterwert.slice(3);
        } else {
            filterwert = filterwert.slice(2);
        }
    } else if (filterwert.indexOf("<=") === 0) {
        vergleichsoperator = "<=";
        if (filterwert.indexOf(" ") === 2) {
            filterwert = filterwert.slice(3);
        } else {
            filterwert = filterwert.slice(2);
        }
    } else if (filterwert.indexOf(">") === 0) {
        vergleichsoperator = ">";
        if (filterwert.indexOf(" ") === 1) {
            filterwert = filterwert.slice(2);
        } else {
            filterwert = filterwert.slice(1);
        }
    } else if (filterwert.indexOf("<") === 0) {
        vergleichsoperator = "<";
        if (filterwert.indexOf(" ") === 1) {
            filterwert = filterwert.slice(2);
        } else {
            filterwert = filterwert.slice(1);
        }
    } else if (filterwert.indexOf("=") === 0) {
        // abfangen, falls jemand "=" eingibt
        vergleichsoperator = "=";
        if (filterwert.indexOf(" ") === 1) {
            filterwert = filterwert.slice(2);
        } else {
            filterwert = filterwert.slice(1);
        }
    } else {
        vergleichsoperator = "kein";
    }
    return [vergleichsoperator, filterwert];
};

// kontrolliert den verwendeten Browser
// Quelle: //stackoverflow.com/questions/13478303/correct-way-to-use-modernizr-to-detect-ie
window.adb.browserDetect = {
    init: function() {
        this.browser = this.searchString(this.dataBrowser) || "Other";
        this.version = this.searchVersion(navigator.userAgent) ||       this.searchVersion(navigator.appVersion) || "Unknown";
    },

    searchString: function(data) {
        for (var i=0 ; i < data.length ; i++)   
        {
            var dataString = data[i].string;
            this.versionSearchString = data[i].subString;

            if (dataString.indexOf(data[i].subString) != -1)
            {
                return data[i].identity;
            }
        }
    },

    searchVersion: function(dataString) {
        var index = dataString.indexOf(this.versionSearchString);
        if (index == -1) return;
        return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
    },

    dataBrowser: [
        { string: navigator.userAgent, subString: "Chrome",  identity: "Chrome" },
        { string: navigator.userAgent, subString: "MSIE",     identity: "Explorer" },
        { string: navigator.userAgent, subString: "Firefox", identity: "Firefox" },
        { string: navigator.userAgent, subString: "Safari",  identity: "Safari" },
        { string: navigator.userAgent, subString: "Opera",   identity: "Opera" }
    ]

};

/*
* Bootstrap file uploader
* Quelle: //jasny.github.io/bootstrap/javascript.html#fileupload
*/
/**
* Bootstrap.js by @mdo and @fat, extended by @ArnoldDaniels.
* plugins: bootstrap-fileupload.js
* Copyright 2012 Twitter, Inc.
* //apache.org/licenses/LICENSE-2.0.txt
*/
!function(e){var t=function(t,n){this.$element=e(t),this.type=this.$element.data("uploadtype")||(this.$element.find(".thumbnail").length>0?"image":"file"),this.$input=this.$element.find(":file");if(this.$input.length===0)return;this.name=this.$input.attr("name")||n.name,this.$hidden=this.$element.find('input[type=hidden][name="'+this.name+'"]'),this.$hidden.length===0&&(this.$hidden=e('<input type="hidden" />'),this.$element.prepend(this.$hidden)),this.$preview=this.$element.find(".fileupload-preview");var r=this.$preview.css("height");this.$preview.css("display")!="inline"&&r!="0px"&&r!="none"&&this.$preview.css("line-height",r),this.original={exists:this.$element.hasClass("fileupload-exists"),preview:this.$preview.html(),hiddenVal:this.$hidden.val()},this.$remove=this.$element.find('[data-dismiss="fileupload"]'),this.$element.find('[data-trigger="fileupload"]').on("click.fileupload",e.proxy(this.trigger,this)),this.listen()};t.prototype={listen:function(){this.$input.on("change.fileupload",e.proxy(this.change,this)),e(this.$input[0].form).on("reset.fileupload",e.proxy(this.reset,this)),this.$remove&&this.$remove.on("click.fileupload",e.proxy(this.clear,this))},change:function(e,t){if(t==="clear")return;var n=e.target.files!==undefined?e.target.files[0]:e.target.value?{name:e.target.value.replace(/^.+\\/,"")}:null;if(!n){this.clear();return}this.$hidden.val(""),this.$hidden.attr("name",""),this.$input.attr("name",this.name);if(this.type==="image"&&this.$preview.length>0&&(typeof n.type!="undefined"?n.type.match("image.*"):n.name.match(/\.(gif|png|jpe?g)$/i))&&typeof FileReader!="undefined"){var r=new FileReader,i=this.$preview,s=this.$element;r.onload=function(e){i.html('<img src="'+e.target.result+'" '+(i.css("max-height")!="none"?'style="max-height: '+i.css("max-height")+';"':"")+" />"),s.addClass("fileupload-exists").removeClass("fileupload-new")},r.readAsDataURL(n)}else this.$preview.text(n.name),this.$element.addClass("fileupload-exists").removeClass("fileupload-new")},clear:function(e){this.$hidden.val(""),this.$hidden.attr("name",this.name),this.$input.attr("name","");if(navigator.userAgent.match(/msie/i)){var t=this.$input.clone(!0);this.$input.after(t),this.$input.remove(),this.$input=t}else this.$input.val("");this.$preview.html(""),this.$element.addClass("fileupload-new").removeClass("fileupload-exists"),e&&(this.$input.trigger("change",["clear"]),e.preventDefault ? e.preventDefault() : e.returnValue = false)},reset:function(e){this.clear(),this.$hidden.val(this.original.hiddenVal),this.$preview.html(this.original.preview),this.original.exists?this.$element.addClass("fileupload-exists").removeClass("fileupload-new"):this.$element.addClass("fileupload-new").removeClass("fileupload-exists")},trigger:function(e){this.$input.trigger("click"),e.preventDefault ? e.preventDefault() : e.returnValue = false}},e.fn.fileupload=function(n){return this.each(function(){var r=e(this),i=r.data("fileupload");i||r.data("fileupload",i=new t(this,n)),typeof n=="string"&&i[n]()})},e.fn.fileupload.Constructor=t,e(document).on("click.fileupload.data-api",'[data-provides="fileupload"]',function(t){var n=e(this);if(n.data("fileupload"))return;n.fileupload(n.data());var r=e(t.target).closest('[data-dismiss="fileupload"],[data-trigger="fileupload"]');r.length>0&&(r.trigger("click.fileupload"),t.preventDefault())})}(window.jQuery);