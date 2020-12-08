
fetch('/myPostRoute',{
  method: "POST",
  headers: {
    "authorization" : 'ads6as9d5a86sd34756a4s3d75as43d7a5s4d3',
    "Content-Type"   : 'application/json'
  },
  body: JSON.stringify({
    name : 'anx',
    age  :  36
  })
})
.then(  res => res.json() )
.then( data => console.log(data) );

/*
// Include authentication headers as soon as you get them
Axios.defaults.headers.common.Authentication = 'ads6as9d5a86sd34756a4s3d75as43d7a5s4d3';

// The request will be much shorter
const { data } = await Axios.post('/myPostRoute',{
  name : 'anx',
  age  :  36
});
console.log(data);
*/