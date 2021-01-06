
const cp = require('child_process');
cp.execSync('rm -rf users');

const express = require('express');
const app = express();

const routes = require('./routes');
const { readAuth } = require('./middlewares');

app.use(express.json());
app.use(readAuth);

app.use('/', routes.auth);
app.use('/event', routes.event);

app.listen(5000, '127.0.0.1', () => {
  console.log('backend ready');
});
