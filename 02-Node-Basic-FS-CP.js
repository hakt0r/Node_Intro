
require('colors');

const fs = require('fs');

// try to read package.json in text (utf8) format
const file = fs.readFileSync('package.json','utf8');
console.log(file);

// if we don't specify our encoding (file format)
// well get a Buffer... we can turn a buffer into
// a string by using the toString(encoding) method
const rawfile = fs.readFileSync('package.json');
console.log( rawfile.toString('utf8') );
console.log( rawfile );

// we can also write files (surprise!!!!)
fs.writeFileSync('./test.json',`
NodeJS is great,
we will use it for the backend,
this is our fate!
`);

console.log('the file exists now!!!');
console.log("does it? let's check:".yellow.bold);

if ( fs.existsSync('test.json') ){
  console.log("yeah I checked and it's there".green);
} else {
  console.log('nah!'.red);
}

// removing a file :)
fs.rmSync('test.json'); // aaand it's gone...

// NodeJS also has JSON.parse()
console.log(JSON.parse(file).author.red.bold);

// lets read all the files and folder in our current directory
//   = ls
console.log( fs.readdirSync('.') );

// Hey this is cool let's execute an external program
//   to blow students minds :D
// I want to convert my Artwork/logosvg file
// into the different sizes

// import the child_process module
const cp = require('child_process');

// call the execSync to run a script
cp.execSync(`
convert -background transparent -resize 512x512 Artwork/logo.svg Artwork/logo512.png;
convert -background transparent -resize 192x192 Artwork/logo.svg Artwork/logo192.png;
convert -background transparent -resize 64x64   Artwork/logo.svg Artwork/favicon.ico;
`);

// execute ls to get a list of files and folder (=== readdirSync)
//                      without encoding we would get a buffer
const output = cp.execSync(`ls -a`, { encoding: 'utf8' } );
console.log(output.trim().split('\n'));
// because output is a string i can now post-process it
//   1. strip away leading and trailing white-spaces (newline, space)
//   2. split it by lines
//   == i get an array of all files and folders... just like with readdirSync