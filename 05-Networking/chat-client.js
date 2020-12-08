
const net      = require('net');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('name: ', name => {
  const connection =
    net.connect(
      4000, 'localhost',
      () => {
        console.log('connected');

        rl.question('chat: ', message => {
          connection.write( name + ': ' + message );
        });
  });
  connection.on( 'data', data => {
    console.log( data.toString() )
  });
});
  