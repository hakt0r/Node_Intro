const express = require('express');
const { checkAuth } = require('../middlewares');
const { generateToken } = require('../services/auth');

const { User } = require('../db');

const router = (module.exports = express.Router());

router.post('/register', async (req, res) => {
  const { id:email, password } = req.body;
  // try to get user from db
  const userExists = await User.findOne({email});
  console.log(userExists);
  // if user exists we wont allow that user
  // to be registered twice
  if ( userExists ) {
    return res.status(401).send('Not Authorized');
  }
  // create user
  const user = new User({
    email,
    password,
    token: generateToken(email)
  });
  // save user to db
  try {
    await user.save();
  } catch (e) {
    console.error(e);
    return res.status(400).send('Bad Request');
  }
  // reply with new token
  res.send({ token: user.token });
});

router.post('/login', async (req, res) => {
  const { id:email, password } = req.body;
  // check if user id and password were provided
  if ( !email || !password ) return res.status(400).send('Bad Request');

  let user = await User.findOne({email});

  if ( ! user )
    return res.status(401).send('Not Authorized');
 
  if ( user.password !== password )
    return res.status(401).send('Not Authorized');

  user.token = generateToken(email);
  await user.save();

  res.send({ token: user.token });
});

router.post('/logout', checkAuth, async (req, res) => {
  const { user } = req;
  user.token = false;
  await user.save();
  res.status(204).send();
});

router.post('/unregister', checkAuth, async ({ user }, res) => {
  await user.delete();
  res.status(204).send();
});
