
const express       = require('express');
const { checkAuth } = require('../middlewares');
const { userDB }    = require('../services/auth');
 
const router = module.exports = express.Router();

router.use( checkAuth );

router.get( '/', async ({user},res)=> {
  res.send(user.todos);
});

router.post( '/', async (req,res)=> {
  const { body, user } = req;
  const { text = "", date = Date.now(), status = false } = body;
  const todo = { text, date, status, id: Date.now() };
  user.todos.push( todo );
  await userDB.put( user.id, JSON.stringify(user) );
  res.send(todo);
});

router.patch( '/:todoId', async (req,res)=> {
  const { user, body, params } = req;
  const todoId = Number( params.todoId );
  let     todo = user.todos.find( t => t.id === todoId );

  if ( ! todo )
    return res.status(404).send('Not Found!!!!111elf');

  const { text, date, status } = body;

  if (   text != undefined ) todo.text   = text;
  if (   date != undefined ) todo.date   = date;
  if ( status != undefined ) todo.status = status;

  await userDB.put( user.id, JSON.stringify(user) );
  res.send(todo);
});

router.delete( '/:todoId', async ({params,user},res)=> {

  const todoId = Number( params.todoId );
  user.todos = user.todos.filter( t => t.id !== todoId );

  await userDB.put( user.id, JSON.stringify(user) );
  res.status(204).send();
});