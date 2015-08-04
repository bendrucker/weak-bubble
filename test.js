'use strict'

var test = require('tape')
var Event = require('weakmap-event')
var bubble = require('./')

test(function (t) {
  t.plan(1)
  var event = Event()
  var state = {
    foo: {
      bar: 'baz'
    }
  }
  var listen = bubble(event.listen, 'foo')
  var unlisten = listen(state, function listener (data) {
    t.deepEqual(data, {hello: 'world'})
  })
  // fires listener
  event.broadcast(state.foo, {hello: 'world'})
  // noop since we're only subscribed to bubbled events
  event.broadcast(state, {})

  unlisten()
  // noop because we've unlistened
  event.broadcast(state.foo, {})
})
