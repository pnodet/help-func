# help-func
> Small js package I use to help me deal with functions

[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo)
[![GitHub workflow status](https://img.shields.io/github/workflow/status/pnxdxt/help-func/CI)](https://github.com/pnxdxt/help-func)
[![npm bundle size](https://img.shields.io/bundlephobia/min/help-func)](https://bundlephobia.com/package/help-func)
[![npm downloads](https://img.shields.io/npm/dt/help-func)](https://www.npmjs.com/package/help-func)

## Install
```
$ npm install help-func
```
## Import

This package is pure [ESM](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules). It cannot be `require()`'d from CommonJS.

Use `import foo from 'foo'` instead of `const foo = require('foo')` to import the package.

```js
// Load entire build
import * as helpFunc from 'help-func';

// Load by method
import {debounce} from 'help-func';
```
If the package is used in an async context, you could use [`await import(…)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#dynamic_imports) from CommonJS instead of `require(…)`.

**You also need to make sure you're on the latest minor version of Node.js. At minimum Node.js 12.20, 14.14, or 16.0.**

Read more here: [sindresorhus/esm-package](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c)


## Usage

```js

debounce([1,2,3], (element) => typeof element === 'string');
//=> false

debounce(['1', '2', '3'], (element) => typeof element === 'string');
//=> true
```

## Functions


`delay` : Invokes `func` after `wait` milliseconds. Any additional arguments are provided to `func` when it's invoked.

`safelyRun` : 

`debounce` : Returns a function that will only run `n` milliseconds after it stops being called.

`negate` : Creates a function that negates the result of the predicate `func`.

`overArgs` : Creates a function that invokes `func` with its arguments transformed.

`waitTime` : 

`waitFor` : 

`retry` : 

`mock` : Mock promise, useful for testing asynchronous functions.

`mockFactory` :

## License

MIT © [Paul Nodet](https://pnodet.com)
