
// import fs from 'fs';
// import does not work the same way as in the browser...
// ...bummer, but we can use require()

// execute the lib.js file in our current directory
require('./lib');

// the next line is executed afterwards
console.log('hey there lib!!! :D');
console.log(' Welcome to NodeJS '.red.bold);

// modules (files) can export values
console.log('lib.js exported:', require('./lib') );

// module exports can be userd locally

const { mod } = require('./lib');
// == const mod = require('./lib).mod;
// or const lib = require('./lib)],
//          mod = lib.mod;

// mod is an exported function, so i can call it
mod();