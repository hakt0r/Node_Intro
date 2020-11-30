
require('colors');
// colors extends strings in genral once it loaded
// like a powerup for strings

console.log('lib imported');

// instead of export we have module.exports

module.exports = {
  this:123,
  is: 321,
  a: 324,
  mod: function(){ console.log(
    ' lib.js says hi '
    .yellow
    .bgMagenta
    .bold
  )}
};