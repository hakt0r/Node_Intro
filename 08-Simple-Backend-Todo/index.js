
const express = require('express');
const     app = express();
const  routes = require('./routes');

const { readAuth } = require('./middlewares');

app.use( express.json() );
app.use( readAuth );

app.use( '/',     routes.auth );
app.use( '/todo', routes.todo );

app.listen(5000,'127.0.0.1',()=>{
  console.log("backend ready")
});