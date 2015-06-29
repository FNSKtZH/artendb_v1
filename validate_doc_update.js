function(newDoc, oldDoc, userCtx, secObj) {
  // make shure guids of objects are formatted correctly
  var isGuidFormatCorrect = new RegExp('^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$').test(newDoc._id)
  var guidFormatMessage = 'Das Feld "_id" des Objekts muss folgendermassen zusammengesetzt sein:\n- 32 Zeichen in 5 Gruppen,\n- diese jeweils 8, 4, 4, 4 und 12 Zeichen lang,\n- getrennt durch Bindestriche,\n- erlaubt sind Zeichen zwischen 0 bis 9, a bis f und A bis F.\n\nBeispiel: b8b51fb6-fafc-423a-9a90-f3111b00c6bb'

  if (newDoc.Gruppe && !isGuidFormatCorrect) {
    throw({forbidden: guidFormatMessage})
  }
}
