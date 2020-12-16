
require('isomorphic-fetch');

const url = 'http://192.168.0.150:5000'

fetch(
  `${url}/login`,
  {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      id: 'anx',
      password: 'asdasd',
    })
  }
).then( r => r.json() )
.then( d => console.log(data) )
