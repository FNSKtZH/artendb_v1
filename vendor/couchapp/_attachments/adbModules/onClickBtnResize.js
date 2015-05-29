// wenn btnResize geklickt wird

'use strict'

var $ = require('jquery')

module.exports = function () {
  var windowHeight = $(window).height(),
    $body = $('body')

  $body.toggleClass('force-mobile')
  if ($body.hasClass('force-mobile')) {
    // Spalten sind untereinander. Baum 91px weniger hoch, damit Formulare zum raufschieben immer erreicht werden können
    $('.baum').css('max-height', windowHeight - 252)
    // button rechts ausrichten
    $('#btnResize')
      .css('margin-right', '0px')
      .attr('data-original-title', 'in zwei Spalten anzeigen')
  } else {
    $('.baum').css('max-height', windowHeight - 161)
    // button an anderen Schaltflächen ausrichten
    $('#btnResize')
      .css('margin-right', '6px')
      .attr('data-original-title', 'ganze Breite nutzen')
  }
}
