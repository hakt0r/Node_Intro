
/**
 * @jest-environment node
 */

let backendProcess = null;

beforeAll( async () => {
  // const cp = require('child_process');
  // cp.execSync('rm -rf users event');
  // backendProcess = cp.exec('exec yarn dev');
  // cp.execSync('sleep 1');
});

afterAll( async () => {
  // backendProcess.kill("SIGHUP");
});

const axios = require('axios');
axios.defaults.baseURL = 'http://127.0.0.1:5000/';

function register ( id, password ){
  return axios.post('/register',{ id, password });
}

function login ( id, password ){
  return axios.post('/login',{ id, password });
}

function logout ( token ){
  return axios.post('/logout', null, { headers: { authorization: token } });
}

function unregister ( token ){
  return axios.post('/unregister', null, { headers: { authorization: token } });
}

test( 'simple registration should work', async ()=> {
  await register( 'anx1', 'asdasldkjas' );
});

test( 'registration should return a token', async ()=> {
  const res = await register( 'anx2', 'asdasldkjas' );
  expect(res.data.token).toBeTruthy()
});

test( 'login should work / return a token', async ()=> {
  const res = await login( 'anx2', 'asdasldkjas' );
  expect(res.data.token).toBeTruthy()
});

test( 'logout should work', async ()=> {
  const registerRes = await register( 'anx3', 'asdasldkjas' );
  const loginRes    = await login( 'anx3', 'asdasldkjas' );
  const logoutRes   = await logout( loginRes.data.token );
});

test( 'unregister should work', async ()=> {
  const loginRes      = await register( 'anx4', 'asdasldkjas' );
  const unregisterRes = await unregister( loginRes.data.token );
});