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

var listen = bubble({foo: event.listen})
listen(state, function (data) {
  //=> 'DATA!'
})
event.broadcast(state.foo, 'DATA!')
```

## API

#### `bubble(listeners, [transform])` -> `function`

##### listeners

*Required*  
Type: `object`

An object where the keys represent keys in your object and the values are the listen functions from a [weakmap-event](https://github.com/eaze/weakmap-event).

##### transform

Type: `function`  
Arguments: `state, data`

An optional function called with the state and event data. By default, the event data is forwarded up. By passing in a function, you can add or remove properties or return entirely different data.

If you return `false`, the listeners will not be called.


## License

MIT © [Ben Drucker](http://bendrucker.me)
