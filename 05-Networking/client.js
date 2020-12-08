
const net = require('net')

const connection =
  net.connect(
    4000, 'localhost',
    () => {
      console.log('connected');
      connection.write(`GET / HTTP/1.0\r\n\r\n`);
});

connection.on( 'data', data => {
  console.log( data.toString() )
});