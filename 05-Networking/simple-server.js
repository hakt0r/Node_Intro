
/*
  A server is an application that
   waits for incoming network requests
   and connections and then talks
   to them.
*/

// https -> http -> tcp -> ip

const net = require('net');

let counter = 0;

/*
  Anx
   |
  Server
   | | |
   @ @ @

   // Protocol:
   CLIENT: {ANYTHING}\n
   SERVER: {Date.now()}\n
*/

const onConnection = connection => {
  connection.counter = ++counter;
  console.log( 'incoming connection', connection.counter );
  connection.on( 'data', data => {
    console.log( connection.counter, data.toString().trim() );
    connection.write( Date.now() + '\n' );
  });
}

const server = net.createServer(onConnection);
// onConnection will be fired whenever a client
// connects to our server

server.listen(4000); // < 1024 are reserved