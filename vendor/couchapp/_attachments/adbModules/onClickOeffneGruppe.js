'use strict'

var $ = require('jquery'),
  oeffneGruppe = require('./oeffneGruppe')

module.exports = function () {
  oeffneGruppe($(this).attr('Gruppe'))
}
