
/**
 * @jest-environment node
 */

const axios = require('axios');
axios.defaults.baseURL = 'http://127.0.0.1:5000/';

function register ( id, password ){
  return axios.post('/register',{ id, password });
}

beforeAll( async () => {
  const res = await register('event-test-user','dasp98a7sd98as7');
  axios.defaults.headers.common.authorization = res.data.token;
});


function create ( event = {} ){
  return axios.post('/event/', event );
}

function patch ( id, event = {} ){
  return axios.patch(`/event/${id}`, event );
}

function list ( filters = {} ){
  return axios.post(`/event/list`, filters );
}

function get ( id ){
  return axios.get(`/event/${id}`);
}

function remove ( id ){
  return axios.delete(`/event/${id}`);
}

test('simple create event', async ()=>{
  const createRes = await create({ title: 'dentist' });
  expect(createRes.data.title).toMatch('dentist');
});

test('simple get event', async ()=> {
  const createRes = await create({ title: 'dentist' });
  const    getRes = await get(createRes.data.id);
});

test('simple delete event', async ()=>{
  const createRes = await create({ title: 'dentist' });
  const deleteRes = await remove(createRes.data.id);
});

test('simple patch event', async ()=>{
  const createRes = await create({ title: 'dentist' });
  expect(createRes.data.title).toMatch('dentist');
  const patchRes  = await patch(createRes.data.id,{ title: 'barber' });
  expect(patchRes.data.title).toMatch('barber');
  // if ( patchRes.data.title !== 'barber ) throw new Error('title not changed');
});

test('simple list events', async ()=>{
  const createRes = await create({ title: 'alien invasion', location: 'roswell' });
  const listRes = await list({ title: 'alien invasion', location: 'roswell' });
  console.log(listRes.data)
  const allTitles = listRes.data.reduce(
    ( prev, event ) => prev &&
    event.title === 'alien invasion' &&
    event.location === 'roswell'   
    , true
  ) 
  expect(allTitles).toBeTruthy();
});

test('list events: date greater than', async ()=>{
  const listRes = await list({ date: {$gt:0} });
  const allDatesAreBiggerThanZero = listRes.data.reduce(
    ( prev, event ) => prev &&
    event.date > 0  
    , true
  )
  expect(listRes.data.length).toBeGreaterThan(0);
  expect(allDatesAreBiggerThanZero).toBeTruthy();
});