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

#### `bubble(listen, property)` -> `function`

##### listen

*Required*  
Type: `function`

The listen function from a [weakmap-event](https://github.com/eaze/weakmap-event).

##### property

*Required*  
Type: `string`

A child property on the state. Your code should broadcast on your weakmapped event somewhere using this child state as the key.


## License

MIT © [Ben Drucker](http://bendrucker.me)
