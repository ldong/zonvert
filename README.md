# README

Author: Lin Dong

Date: April 06, 2015

## Instruction

1. `npm install` to install all the dependenies of the project

2. `node index.js -c ~/.jshintrc -d ./test/src -o ./test/build`

This will convert `AMD` to `CMD` javascript file.

## Example

Convert input

```js
define(["underscore", "backbone"],
    function(_, Backbone) {
        var exports = Backbone.Controller.extend({
          // your code
        });
        return exports;
    }
);
```

to output

```js
var _ = require("underscore");
var Backbone = require("Backbone");
var exports = Backbone.Collection.extend({
  // your code
});
module.exports = exports;

```

You can customize [`~/.jshintrc`](http://jshint.com/docs/options/) to fit your needs

