
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
   (broadcast) SERVER: {Date.now()} {ANYTHING}\n
*/

const connections = new Set();

const onConnection = connection => {
  
  connection.counter = ++counter;
  console.log( 'incoming connection', connection.counter );

  connections.add(connection);

  connection.on( 'data', data => {

    console.log( connection.counter, data.toString().trim() );

    Array.from(connections).forEach( otherClient => {
      if ( otherClient != connection )
        otherClient.write(data);
    });

  });

  connection.on( 'close', error => {
    connections.delete(connection);
  })

}

const server = net.createServer(onConnection);
// onConnection will be fired whenever a client
// connects to our server

server.listen(4000); // < 1024 are reserved