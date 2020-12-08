const express = require('express');
const     app = express();

// this will make all the files in the "public"
// directory available on the server
app.use( express.static('public') );

// define a simple html page and return as a string
app.get( '/hello.html', (req,res)=> {
  // req.params ( /user/:userId )
  // req.body   ( json-body of the incoming request )
  // req.query  ( url query parameters )
  res.send(`
  <html>
    <head><title>Hello Node!</title></head>
    <body>Hello ${req.query.user}</body>
  </html>
  `);
});

// important for recieving json requests
//   - get req.body (else it is undefined)
app.use( express.json() );

// recieve json data from the client
// respond with json as well
app.post( '/myPostRoute/', (req,res)=> {
  console.log('frontend posted',req.body);
  console.log('token',req.headers.authorization);
  res.json({ thankYou: 'very much', ...req.body });
});

app.listen(1234);