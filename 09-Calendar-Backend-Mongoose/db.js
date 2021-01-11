
/*
  Setting up mongodb
*/

const mongoose = require('mongoose');

// put the connetion url into a cont so we can
// easily change it afterwards
const dbURL = 'mongodb://localhost/test';

// create a conention to the db server
// using our url and some options
mongoose.connect(
  dbURL,
  { // these options are standard
    // just copy them as a starting point
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

// a reference to the db connection in
// order to catch some important events
const db = mongoose.connection;

db.on('error', function(e){
  // we need to know if something goes wrong
  // print errors
  console.error('db.error:', e );
  // quit app without database
  process.exit(1);
});

db.once('open', function(){
  // tell the user if everythin is fine
  console.log('db.ready');
});

// The User Model

// define a schema first
const userSchema = new mongoose.Schema({
  email: {
    required: true, // must exist
    // db would complain if we forgot this field
    unique: true, // there can only be one
    // will throw an error if you try to
    // have multiple users with the same email
    type: String
  },
  password: {
    required: true,
    type: String,
  },
  token: {
    index: true, // build an index over token
    // speed up searches for user
    // with a specific token
    type: String
  }
});

// use schema to create a model
const User = mongoose.model('User', userSchema);

// The Event Model

const { Schema } = mongoose; 

const eventSchema = new mongoose.Schema({
  title: String,
  date: {
    type: Date,
    default: Date.now
  },
  description: String,
  notification: String,
  location: String,
  owners: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  participants: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  type: { type: String, enum:[
    'appointment',
    'reminder',
    'todo'
  ], default: 'appointment' },
  color: {
    type: String,
    enum:['red','green','blue'],
    default: 'green'
  },
  priority: {type: String, enum:[
    'low','average','high'
  ], default:'average' },
  repeat: {
    type: String,
    enum:['none','daily','weekly','monthly','yearly'],
    default: 'none'
  },
  alarm: Boolean,
  public: Boolean
});

const Event = mongoose.model('Event', eventSchema);

module.exports = {
  User,
  Event,
  db
}