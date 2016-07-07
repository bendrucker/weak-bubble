'use strict'

var test = require('tape')
var Event = require('weakmap-event')
var bubble = require('./')

test('simple', function (t) {
  t.plan(1)
  var event = Event()
  var state = {
    foo: {
      bar: 'baz'
    }
  }
  var listen = bubble({
    foo: event.listen
  })
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

test('multiple', function (t) {
  t.plan(2)
  var a = Event()
  var b = Event()
  var state = {
    foo: {},
    bar: {}
  }
  var listen = bubble({
    foo: a.listen,
    bar: b.listen
  })
  var unlisten = listen(state, function listener (data) {
    t.deepEqual(data, {hello: 'world'})
  })
  // fires listener
  a.broadcast(state.foo, {hello: 'world'})
  b.broadcast(state.bar, {hello: 'world'})

  // noop since we're only subscribed to bubbled events
  a.broadcast(state, {})

  unlisten()
  // noop because we've unlistened
  a.broadcast(state.foo, {})
})

test('with transform', function (t) {
  t.plan(1)
  var event = Event()
  var state = {
    foo: {
      bar: 'baz'
    }
  }
  var listen = bubble({foo: event.listen}, function (state, data) {
    return state.foo.bar + data.hello
  })
  listen(state, function listener (data) {
    t.equal(data, 'bazworld')
  })
  // fires listener
  event.broadcast(state.foo, {hello: 'world'})
})

test('cancelling from transform', function (t) {
  var event = Event()
  var state = {
    foo: {
      bar: 'baz'
    }
  }
  var listen = bubble({foo: event.listen}, function (state, data) {
    return false
  })
  listen(state, function listener (data) {
    t.fail('uh oh')
  })
  // will stop bubbling
  event.broadcast(state.foo, {hello: 'world'})
  t.end()
})
