'use strict'

module.exports = function weakBubble (listen, property) {
  return function listenBubbled (obj, listener) {
    return listen(obj[property], listener)
  }
}
