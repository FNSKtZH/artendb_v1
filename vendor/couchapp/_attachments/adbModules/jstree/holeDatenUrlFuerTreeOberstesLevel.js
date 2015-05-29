'use strict'

var $ = require('jquery')

module.exports = function () {
  var url

  if (window.adb.gruppe === 'Lebensräume') {
    url = $(window.location).attr('protocol') + '//' + $(window.location).attr('host') + '/artendb/_design/artendb/_list/baumLr/baumLr?startkey=[1]&endkey=[1,{},{},{},{},{}]&group_level=6'
  } else {
    url = $(window.location).attr('protocol') + '//' + $(window.location).attr('host') + '/artendb/_design/artendb/_list/baum' + window.adb.gruppe + '/baum' + window.adb.gruppe + '?group_level=1'
  }
  return url
}
