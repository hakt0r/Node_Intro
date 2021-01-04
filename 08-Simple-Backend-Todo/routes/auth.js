
const express           = require('express');
const { checkAuth }     = require('../middlewares');
const { generateToken } = require('../services/auth');
const { userDB }        = require('../services/auth');

const router = module.exports = express.Router();

router.post( '/register', async (req,res) => {
  const { id, password } = req.body;
  // check if user id and password were provided
  if ( ! id || ! password )
    return res.status(400).send('Bad Request');
  // if we can actually get a user with this id,
  // it means that the userId is already taken
  try {
    if ( await userDB.get(id) ){
      return res.status(401).send('Not Authorized');
    }
  } catch ( error ){}
  // create user
  const user = {
    id,
    password,
    token: generateToken(id),
    todos: []
  };
  // save user to db
  await userDB.put( id, JSON.stringify(user) );
  // reply with new token
  res.send({ token: user.token });
});

router.post( '/login', async (req,res)=> {
  let user;
  const { id, password } = req.body;
  // check if user id and password were provided
  if ( ! id || ! password )
    return res.status(400).send('Bad Request');
  
  try {
    // check if user exists in the database
    user = JSON.parse( await userDB.get(id) );
  } catch ( error ){
    // else return a not found error
    return res.status(401).send('Not Authorized');
  }

  if ( user.password !== password ){
    return res.status(401).send('Not Authorized');
  }

  user.token = generateToken(id);
  await userDB.put( id, JSON.stringify(user) );
  res.send({ token: user.token });
});

router.post( '/logout', checkAuth, async (req,res)=> {
  const { user } = req;
  user.token = false;
  await userDB.put( user.id, JSON.stringify(user) );
  res.status(204).send();
});

router.post( '/unregister', checkAuth, async ({user},res)=> {
  await userDB.del(user.id);
  res.status(204).send();
});