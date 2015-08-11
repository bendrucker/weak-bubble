# weak-bubble [![Build Status](https://travis-ci.org/bendrucker/weak-bubble.svg?branch=master)](https://travis-ci.org/bendrucker/weak-bubble)

> Bubble weakmap-events up without explicit re-broadcasting


## Install

```
$ npm install --save weak-bubble
```


## Usage

```js
var event = require('weakmap-event')()
var bubble = require('weak-bubble')
var state = {
  foo: {}
}

var listen = bubble(event.listen, 'foo')
listen(state, function (data) {
  //=> 'DATA!'
})
event.broadcast(state.foo, 'DATA!')
```

## API

#### `bubble(listen, property, [transform])` -> `function`

##### listen

*Required*  
Type: `function`

The listen function from a [weakmap-event](https://github.com/eaze/weakmap-event).

##### property

*Required*  
Type: `string`

A child property on the state. Your code should broadcast on your weakmapped event somewhere using this child state as the key.

##### transform

Type: `function`  
Arguments: `state, data`

An optional function called with the state and event data. By default, the event data is forwarded up. By passing in a function, you can add or remove properties or return entirely different data.


## License

MIT © [Ben Drucker](http://bendrucker.me)
