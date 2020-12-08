
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

const onConnection = connection => {
  
  connection.counter = ++counter;
  console.log( 'incoming connection', connection.counter );

  connection.on( 'data', data => {
    if ( data.toString().match(/\r\n\r\n$/) )
      connection.write(
        `HTTP/1.1 200 OK\r\n\r\n` +
        `hi\r\n\r\n`
      );
      connection.end();
  });
}

const server = net.createServer(onConnection);
// onConnection will be fired whenever a client
// connects to our server

server.listen(4000); // < 1024 are reserved