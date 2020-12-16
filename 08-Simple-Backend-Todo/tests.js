
require('colors')
const cp = require('child_process');

const axios = require('axios');
axios.defaults.baseURL = 'http://localhost:5000/';

// delete the user database
// cp.execSync('rm -rf users');

const login = async ()=> {
  const response = await axios.post('/login',{
    id: 'anx',
    password: 'asdasd'
  });
  return response;
}

const testRegister = async ()=> {
  try {
    const response = await axios.post('/register',{
      id: 'anx1',
      password: 'asdasd'
    });
    axios.defaults.headers.common.authorization = response.data.token;
    console.error( 'register'.green.bold, response.data.token );
  } catch ( error ) {
    console.error( 'register'.red.bold, error.message );
  }
}

const testLogin = async ()=> {
  try {
    const response = await axios.post('/login',{
      id: 'anx1',
      password: 'asdasd'
    });
    axios.defaults.headers.common.authorization = response.data.token;
    console.error( 'login'.green.bold, response.data.token );
  } catch ( error ) {
    console.error( 'login'.red.bold, error.message );
  }
}

const testUnregister = async ()=> {
  try {
    const response = await axios.post('/unregister',{});
    console.error( 'unregister'.green.bold );
  } catch ( error ) {
    console.error( 'unregister'.red.bold, error.message );
  }
}

const testTodoList = async (expect)=> {
  try {
    const response = await axios.get('/todo/',{});
    const json = JSON.stringify(response.data);
    if ( expect !== json )
      throw new Error(`Unexpected result: ${expect} != ${json}`);
    console.error( 'GET /todo/'.green.bold, response.data );
  } catch ( error ) {
    console.error( 'GET /todo/'.red.bold, error.message );
  }
}

const testTodoCreate = async ()=> {
  try {
    const response = await axios.post('/todo/',{ text:'test123' });
    const { id, text, date, status } = response.data;
    if ( id     === undefined ) throw new Error(`Missing id property`);
    if ( date   === undefined ) throw new Error(`Missing date property`);
    if ( text   === undefined ) throw new Error(`Missing text property`);
    if ( status === undefined ) throw new Error(`Missing status property`);
    if ( text   !== 'test123' ) throw new Error(`Expected text = test123, got:${response.data.text}`);
    if ( status !== false     ) throw new Error(`Expected status = false, got ${response.data.status}`);
    // check if our todo made it onto the list
    const listResponse = await axios.get('/todo/');
    const json1 = JSON.stringify(response.data);
    const json2 = JSON.stringify(listResponse.data[0]);
    if ( json1 !== json2 ) throw new Error(`Todo created but not listed`);
    console.error( 'POST /todo/'.green.bold );
    return id;
  } catch ( error ) {
    console.error( 'POST /todo/'.red.bold, error.message );
  }
}

const testTodoEdit = async (todoId)=> {
  try {
    const response = await axios.patch(`/todo/${todoId}`,{
      text: 'changed',
      status: true
    });
    const { text, status } = response.data;
    if ( text   !== 'changed' ) throw new Error(`Expected text = changed, got:${response.data.text}`);
    if ( status !== true      ) throw new Error(`Expected status = true, got ${response.data.status}`);        
    console.error( 'PATCH /todo/'.green.bold );
  } catch ( error ) {
    console.error( 'PATCH /todo/'.red.bold, error.message );
  }
}

const testTodoDelete = async (todoId)=> {
  try {
    const response = await axios.delete(`/todo/${todoId}`);
    
    // check if our todo was actually deleted
    const listResponse = await axios.get('/todo/');
    if ( listResponse.data.length !== 0 )
      throw new Error(`Todo not deleted from list`);
    
    console.error( 'DELETE /todo/'.green.bold );
  } catch ( error ) {
    console.error( 'DELETE /todo/'.red.bold, error.message );
  }
}

const testLoginMustFail = async ()=> {
  try {
    const response = await axios.post('/login',{
      id: 'anx1',
      password: 'asdasd'
    });
    console.error( 'login does not fail after unregister'.red.bold );
  } catch ( error ) {
    console.error( 'login fails after unregister'.green.bold );
  }
}

const testRegisterMustFail = async ()=> {
  try {
    const response = await axios.post('/register',{
      id: 'anx1',
      password: 'asdasd'
    });
    console.error( 'can register the same id twice'.red.bold );
  } catch ( error ) {
    console.error( 'cannot register the same id twice'.green.bold );
  }
}

const tests = async ()=> {
  await testRegister();
  await testRegisterMustFail();
  await testLogin();
  await testTodoList('[]');
  const todoId = await testTodoCreate();
  await testTodoEdit(todoId);
  await testTodoDelete(todoId);
  await testUnregister();
  await testLoginMustFail();
}

tests();