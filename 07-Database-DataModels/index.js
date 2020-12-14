
const express = require('express'); 
const level   = require('level');
const messageDB = level('messages');

const app = express();

app.use( express.json() );

app.post( '/sendMessage', async (req,res)=>{
  const {from,to,message} = req.body;
  let messages = "";
  try {
    messages = await messageDB.get(to);
  } catch ( error ){}
  messages += `${from}: ${message}\n`;
  await messageDB.put(to,messages);
  res.send({status:'ok'});
});

app.get( '/messages', async (req,res)=>{
  try {
    const messages = await messageDB.get(req.body.to);
    res.send(messages);
  } catch ( error ){
    res
    .status(404)
    .send(error);
  }
});

app.listen(4444);