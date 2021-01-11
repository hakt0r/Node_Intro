
const crypto = require('crypto');

// import User database
const { User } = require('../db');

// in reality please use a salt genrated by crypto.randomBytes
// OR: BETTER! a quantuum random generator

function generateToken(userId, salt = 'c765a454a7sc534as7c5437$') {
  return crypto
    .createHash('sha512') // << create hash machine
    .update(`${userId}:${Date.now()}:${salt}`) // << input
    .digest('hex'); // hex = a765f57e65a65fec5765a...
}

function findUserByToken(token) {
  return User.findOne({token});
}

module.exports = {
  generateToken,
  findUserByToken
};
