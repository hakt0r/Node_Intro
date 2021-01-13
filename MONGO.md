# MongoDB / mongoose skills

## 1. install, connection (boilerplate)

### 1.0. use a remote mongodb server via ssh

```ShellScript
#                           VVVV username
ssh -L27017:localhost:27017 nisa@sz.hktr.de
```

### 1.1. install mongodb-server or get a db online

  You can use [https://www.mongodb.com/cloud/atlas](Atlas) to get a free
  cloud based mongodb.

### 1.2. install mongoose

```ShellScript
sudo apt install mongodb-server
systemctl status mongodb // check the status of mongodb
systemctl start  mongodb // start mongodb
systemctl enable mongodb // enable mongodb at system start

npm install --save mongoose
yarn add mongoose # < or with yarn
```

### 1.3. require mongoose / connect

Prequisite: you need a MongoDB URL, either for your localhost
or for the mongodb atlas database.

Create a file to manage your database connection like **db.js**:

```JavaScript

const MONGODB_URL = 'mongodb+srv://localhost:27017/dbname';
//                   protocol      host      port  database_name

const mongoose = require('mongoose');

// connect to the database server
mongoose.connect( MONGODB_URL, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// get a reference to the connection we just made
const db = mongoose.connection;

// handle connection events
db.on('open', ()=>{
  console.log('mongo::connected :)')
});

db.on('error', (error)=>{
  console.error('mongo::error :(');
  console.error(error);
  process.exit(1); // stop the backend, with an error
  // 0: success
  // 1: error
});

// export so other files can use
module.exports = db;
```

Or put into a promise :D

```JavaScript
const mongoose = require('mongoose');

function connectToMongoDB(url){
  return new Promise( function( resolve, reject ){
    mongoose.connect( url, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    const db = mongoose.connection;
    db.on('open',       ()=> resolve(db) );
    db.on('error', (error)=> reject(error) );
  });
}

// somewhere in our index js, we could now await
// the db connection to be made :D :)
try {
  const db = await connectToMongoDB(MONGO_URL);
  console.log('mongo::connected :)')
} catch (error) {
  console.error('mongo::error :(');
  console.error(error);
  process.exit(1);
}
```

## 2. modeling data (schema, model)

Create a file **todo.model.js**

```JavaScript
const mongoose   = require('mongoose');
const Schema     = mongoose.Schema;
const model      = mongoose.model;

const todoSchema = new Schema({
  title: String,
  description: String,
  status: Boolean
});

const Todo = model( 'Todo', todoSchema );

module.exports = {
  Todo,
  todoSchema
};
```

## 3. create records
```JavaScript
const { Todo } = require('./todo.model.js');

const todo = new Todo({
  title: 'blaeh',
  description: 'blah',
  status: false
});

await todo.save();
```

## 4. retrieve, list, filter

### 4.1. Find a single document

```JavaScript
const id = 'as7d65as7d65as7d657as65'; // just an example
const todo1 = await Todo.findById(id);
const todo2 = await Todo.findOne({status:false});
```

### 4.2. Find a list of documents

```JavaScript
const todos = await Todo.find({status:false});
```

## 5. update (modify)

```JavaScript

const todo = await Todo.findOne({title:'blaeh'});
// ...
todo.title = 'bleh';
// ...
await todo.save();

// or use updateOne
Todo.updateOne( // changes the first result
  { title:'blaeh' },          // findOne (search condition)
  { $set: { title: 'bleh' } } // changes
);
Todo.updateMany( // changes all documents matching
  { title:'blaeh' },          // findOne (search condition)
  { $set: { title: 'bleh' } } // changes
);
```

## 6. delete
```JavaScript
const id = 'as7d65as7d65as7d657as65';
// for example
Todo.findByIdAndDelete(id);
Todo.findOneAndDelete({_id:id});
// you can not only use the id
// but any condition like looking
// for a specific title
Todo.findOneAndDelete({title:'blaeh'});
```

## 7. advanced models
## 8. advanced model functions

## CRUD