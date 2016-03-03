'use strict'

var extend = require('xtend')
var map = require('map-values')

module.exports = weakBubble

function weakBubble (events, transform) {
  events = extend(events)
  transform = transform || identity

  return function listenBubbled (obj, listener) {
    var listeners = map(events, function (listen, key) {
      return listen(obj[key], function bubble (data) {
        listener(transform(obj, data))
      })
    })

    return function unlisten () {
      map(listeners, function (off) {
        off()
      })
    }
  }
}

function identity (state, value) {
  return value
}
