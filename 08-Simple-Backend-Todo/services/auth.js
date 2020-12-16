
const crypto = require('crypto');
const  level = require('level');
const userDB = level('users');

// in reality please use a salt genrated by crypto.randomBytes
// OR: BETTER! a quantuum random generator

function generateToken ( userId, salt = "c765a454a7sc534as7c5437$" ) {
  return crypto
  .createHash('sha512')                      // << create hash machine
  .update(`${userId}:${Date.now()}:${salt}`) // << input
  .digest("hex");                            // hex = a765f57e65a65fec5765a...
};

function findUserByToken ( token ) {
  return new Promise( ( resolve, reject ) => {
    let foundUser = false;
    const stream = userDB.createValueStream();

    stream.on('data', function ( data ) {
      const user = JSON.parse( data );
      if ( user.token === token ){
        foundUser = true;
        stream.destroy();
        resolve(user);
      }
    });

    stream.on('close', function(){
      if ( ! foundUser ) reject('User not found');
    });
  });
}

module.exports = {
  generateToken,
  findUserByToken,
  userDB
};
