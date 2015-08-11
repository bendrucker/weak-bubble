'use strict'

module.exports = function weakBubble (listen, property, transform) {
  transform = transform || identity

  return function listenBubbled (obj, listener) {
    return listen(obj[property], function bubble (data) {
      listener(transform(obj, data))
    })
  }
}

function identity (state, value) {
  return value
}
