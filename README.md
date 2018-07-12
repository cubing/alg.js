# `alg.js`

A library for parsing and transforming puzzle algorithms ("algs")

# Usage

Here's how to use `alg.js`:

    var oll = alg.parse("[F: [R, U]]");
    console.log(oll);
    
    var expanded = alg.expand(oll);
    console.log(alg.algToString((oll)));

Here's how to get set up in different environments:

## Online

Try it at https://npm.runkit.com/alg

## Browser

Note: for the time being you need to get `alg.js` via `npm`. In the future, there will be easier ways of getting it directly.

    <script src="alg.js"></script>
    <script>
      alg.parse("[F: [R, U]]");
      console.log(oll);
    </script>

## `npm`

`test.js`:

    var alg = require("alg");

    var oll = alg.parse("[F: [R, U]]")
    console.log(oll);

Run:

    npm install alg
    node test.js

## ES6 & TypeScript

`alg.js` works with ES6 and TypeScript out of the box:

    import {expand, parse, algToString} from "alg"

    var oll = parse("[F: [R, U]]");
    console.log(oll);

    var expanded = expand(oll);
    console.log(algToString((oll)));
