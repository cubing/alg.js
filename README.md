# alg.js

A library for parsing and transforming puzzle algorithms ("algs"). Experimental spinout project from [twisty.js](https://github.com/cubing/twisty.js).

Install:

    > npm install alg

Use:

    > var alg = require("alg");
    > alg.cube.stringToAlg("R U R'")
    [ { type: 'move',
        base: 'R',
        amount: 1,
        location:
         { first_line: 1,
           last_line: 1,
           first_column: 0,
           last_column: 1 } },
      { type: 'move',
        base: 'U',
        amount: 1,
        location:
         { first_line: 1,
           last_line: 1,
           first_column: 2,
           last_column: 3 } },
      { type: 'move',
        base: 'R',
        amount: -1,
        location:
         { first_line: 1,
           last_line: 1,
           first_column: 4,
           last_column: 6 } } ]