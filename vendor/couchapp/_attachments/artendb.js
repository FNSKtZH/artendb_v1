function erstelleBaum() {
	var baum, fauna_children;
	fauna_children = [];
	$db = $.couch.db("artendb");
	$db.view('artendb/baum_fauna_klasse?group=true', {
		success: function (fauna_klasse) {
			$db.view('artendb/baum_fauna_ordnung?group=true', {
				success: function (fauna_ordnung) {
					$db.view('artendb/baum_fauna_familie?group=true', {
						success: function (fauna_familie) {
							$db.view('artendb/baum_fauna_gattung?group=true', {
								success: function (fauna_gattung) {
									$db.view('artendb/baum_fauna_art', {
										success: function (fauna_art) {
											var child_klasse, klasse, child_ordnung, children_ordnung, ordnung, child_familie, children_familie, familie, child_gattung, children_gattung, gattung, child_art, children_art, art;
											for (i in fauna_klasse.rows) {
												klasse = fauna_klasse.rows[i].key;
												children_ordnung = [];
												for (k in fauna_ordnung.rows) {
													if (fauna_ordnung.rows[k].key[0] === klasse) {
														ordnung = fauna_ordnung.rows[k].key[1];
														children_familie = [];
														for (l in fauna_familie.rows) {
															if (fauna_familie.rows[l].key[0] === klasse && fauna_familie.rows[l].key[1] === ordnung) {
																familie = fauna_familie.rows[l].key[2];
																children_gattung = [];
																for (m in fauna_gattung.rows) {
																	if (fauna_gattung.rows[m].key[0] === klasse && fauna_gattung.rows[m].key[1] === ordnung && fauna_gattung.rows[m].key[2] === familie) {
																		gattung = fauna_gattung.rows[m].key[3];
																		children_art = [];
																		for (n in fauna_art.rows) {
																			if (fauna_art.rows[n].key[0] === klasse && fauna_art.rows[n].key[1] === ordnung && fauna_art.rows[n].key[2] === familie && fauna_art.rows[n].key[3] === gattung) {
																				art = fauna_art.rows[n].key[4];
																				child_art = {
																						"data": art,
																						"attr": {"typ":"fauna_art", "id": fauna_art.rows[n].value}
																					};
																				children_art.push(child_art);
																			}
																		}
																		child_gattung = {
																				"data": gattung,
																				"attr": {"typ":"fauna_gattung"},
																				"children": children_art
																			};
																		children_gattung.push(child_gattung);
																	}
																}
																child_familie = {
																		"data": familie,
																		"attr": {"typ":"fauna_familie"},
																		"children": children_gattung
																	};
																children_familie.push(child_familie);
															}
														}
														child_ordnung = {
																"data": ordnung,
																"attr": {"typ":"fauna_ordnung"},
																"children": children_familie
															};
														children_ordnung.push(child_ordnung);
													}
												}
												child_klasse = {
														"data": klasse,
														"attr": {"typ":"fauna_klasse"},
														"children": children_ordnung
													};
												fauna_children.push(child_klasse);
											}
											baum = [
													{
														"data": "Fauna", 
														"attr": {"typ":"Gruppe"},
														"children": fauna_children
													},
													{
														"data": "Flora", 
														"attr": {"typ":"Gruppe"}
													},
													{
														"data": "Moose", 
														"attr": {"typ":"Gruppe"}
													}
												];
											//alert(JSON.stringify(baum));
											erstelleTree(baum);
										}
									});
								}
							});
						}
					});
				}
			});
		}
	});
}

function erstelleTree(baum) {
	$("#tree").jstree({
		"json_data": {
			"data": baum
		},
		"core": {
			"open_parents": true,	//wird ein node programmatisch geöffnet, öffnen sich alle parents
			"strings": {	//Deutsche Übersetzungen
				"loading": "hole Daten..."
			}
		},
		"ui": {
			"select_limit": 1,	//nur ein Datensatz kann aufs mal gewählt werden
			"selected_parent_open": true,	//wenn Code einen node wählt, werden alle parents geöffnet
			"select_prev_on_delete": true
		},
		"search": {
			"case_insensitive": true,
			"show_only_matches": true
		},
		"themes": {
			"icons": false
		},
		"plugins" : ["themes", "json_data", "ui", "search"]
	})
	.bind("select_node.jstree", function (e, data) {
		var node;
		node = data.rslt.obj;
		jQuery.jstree._reference(node).open_node(node);
		if (node.attr("typ") === "fauna_art") {
			//verhindern, dass bereits offene Seiten nochmals geöffnet werden
			if (!$("#art").is(':visible') || localStorage.art_id !== node.attr("id")) {
				localStorage.art_id = node.attr("id");
				initiiere_art(node.attr("id"));
			}
		}
		setTimeout("setzeTreehoehe()", 200);
	})
	.bind("loaded.jstree", function (event, data) {
		$("#suchen").show();
	});
}

function initiiere_art(id) {
	$db = $.couch.db("artendb");
	$db.openDoc(id, {
		success: function (art) {
			$("#art").html(JSON.stringify(art));
		},
		error: function () {
			melde("Fehler: Art konnte nicht geöffnet werden");
		}
	});
}

function setzeTreehoehe() {
	if (($("#tree").height() + 157) > $(window).height()) {
		$("#tree").height($(window).height() - 157);
	} else if ($('#tree').hasScrollBar()) {
		$("#tree").height($(window).height() - 157);
	}
}

(function($) {
    $.fn.hasScrollBar = function() {
        return this.get(0).scrollHeight > this.height();
    }
})(jQuery);