
const axios = require('axios');

const url = 'http://localhost:5000';

async function test(){
  const response = await axios.post(
  `${url}/register`, {
    email: '123123',
    password: 'password1',
    name: 'asd'
  })

  const token = response.data;

  await axios.get( `${url}/unregister`, {
    headers: {
      Authorization: token
    }
  })

  console.log('ok')
}

test();