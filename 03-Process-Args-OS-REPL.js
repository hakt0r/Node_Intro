require('colors');
const fs = require('fs');

/*
  You can start an interactive node
  commandline by simply running "node"
  in your terminal.
  You can exit the repl again by pressing:
    Ctrl-d
*/

// process.arg is an array of ALL the
// arguments to your process

// console.log( process.argv );

// node 03-Process-Args-OS-REPL.js package.json author
// ^^^^ interpter       script ^^^ ^^^ arguments  ^^^^

const [
  interpreter, // first argument is the node application
  script,      // second argument is the path to our script
  ...arguments // the rest is just parameters
] = process.argv;

// console.log(arguments.join(' ').yellow.bold);
const [ thePath, theKey ] = arguments;
const theFile = fs.readFileSync( thePath, 'utf8' );
const theJSON = JSON.parse(theFile);

console.log(theJSON[theKey]);
