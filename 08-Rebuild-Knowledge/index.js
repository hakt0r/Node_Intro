
// cp = require('child_process');
// cp.execSync('rm -rf user token');

const  crypto = require('crypto');

const   level = require('level');
const  userDB = level('user');
const tokenDB = level('token');
const express = require('express');
const     app = express();

app.use( express.json() );

async function generateToken(user,salt='4c65c43sa54d36a5s36a5s34d5643'){
  const token = crypto
  .createHash('sha512')
  .update(`${user.email}:${salt}:${Date.now()}`)
  .digest('base64');
  await tokenDB.put( token, user.email );
  return token;
}

async function getUserByToken(token){
  const userId   = await tokenDB .get( token );
  const userData = await userDB  .get( userId );
  return JSON.parse( userData );
}

app.post('/register', async function(req,res){
  const { email, password, name } = req.body;
  // make sure the user does not already exist
  try {
    await userDB.get( email );
    return res.status(401).send('nonono!')
  } catch (e) {}
  // create the user and send back a token
  const user = { email, password, name };
  await userDB.put( email, JSON.stringify(user) );
  const token = await generateToken(user);
  res.status(200).send(token);
});

app.post('/login',async function(req,res){
  const { email, password } = req.body;
  try {
    const user = JSON.parse(
      await userDB.get( email )
    );
    if ( user.password === password ){
      const token = await generateToken(user);
      res.status(200).send(token);
    } else {
      return res.status(401).send('wrong password');
    }
  } catch (e){
    return res.status(404).send('user not found');
  }
});

async function requireAuth (req,res,next) {
  try {
    req.token = req.headers.authorization;
    req.user = await getUserByToken(req.token);
    next();
  } catch (e){
    res.status(401).send('Not Authorized');
  }
}

app.get(
'/logout',
requireAuth,
async function(req,res){
  await tokenDB.del(req.token);
  res.status(204).send();
});

app.get(
'/unregister',
requireAuth,
async function(req,res){
  await tokenDB.del(req.token);
  await userDB.del(req.user.email);
  res.status(204).send();
});

// Wikipedia 0.1

const articleDB = level('article');

// create article

app.post(
'/article',
requireAuth,
async function(req,res){
  const { title, article } = req.body;
  await articleDB.put( title, article );
  res.status(200).send( article );
});

app.delete(
'/:title',
requireAuth,
async function(req,res){
  await articleDB.del(title);
  res.status(204).send();
});

app.get( '/:title',
async function(req,res){
  const article = await articleDB.get(title);
  res.status(200).send(article);
});

app.get( '/',
async function(req,res){
  const titles = [];
  articleDB.createKeyStream()
  .on('data', title => titles.push(title) )
  .on('close',   () => res.send(titles)   );
});

app.listen(5000, function(){
  console.log('server is running');
});

// req.params -  /delete/:id    => req.params.id
//               /delete/123             === 123
// req.query  -  /delete        => req.query.id
//               /delete/?id=123 


/* levelCheatsheet

  // create database
  const db = level('dbname');

  // create record
  db.put( ID, JSON.stringify(DATA) )

  // find record
  JSON.parse( db.get( ID ) )

  // delete record
  db.del( ID )

*/