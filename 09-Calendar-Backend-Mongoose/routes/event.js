const express = require('express');
const { checkAuth } = require('../middlewares');
const { Event } = require('../db');
const router = express.Router()
module.exports = router;

router.use(checkAuth);

router.post('/list', async (req, res) => {
  // we can take req.body "unchecked" for once
  // because
  //   1. user is authenticated
  //   2. we do security checks
  //   3. any data he actually gets should be ok
  const filter = req.body;
  // { type: "appointment" }
  // { date: { $gt: 0 }} - date greater than zero
  const list = await Event.find({
    ...filter,
    $or: [
      {public: true},
      {owners: req.user._id },
      {participants: req.user._id }
    ]
  });
  res.status(200).send(list);
});
  
router.get('/:eventId', async (req, res) => {
  const { eventId } = req.params;

  let event;
  try {
    event = await Event.findById(eventId);
  } catch(e) {
    console.error(e);
    return res.status(500).send('erm');
  }

  if ( ! event )
    return res.status(404).send('not found');

  if (
    event.public ||
    event.owners.includes(req.user._id) ||
    event.participants.includes(req.user._id)
  ) {
    res.status(200).send(event);
  } else {
    res.status(403).send('Forbidden');
  }
  
});

router.post('/', async (req, res) => {
  const {
    date, title, description, notification, public,
    type, owners=[], participants=[], alert, color, location,
    priority, repeat
  } = req.body;

  if ( ! Array.isArray(owners) ) owners = []; 
  if ( ! owners.includes(req.user._id) )
    owners.push(req.user._id);

  if ( ! Array.isArray(participants) ) participants = []; 
  if ( ! participants.includes(req.user._id) )
    participants.push(req.user._id);

  const event = new Event({
    date, title, description, notification, public,
    type, owners, participants, alert, color, location,
    priority, repeat
  })

  await event.save();

  res.status(200).send(event);
});

router.patch('/:eventId', async (req, res) => {
  const { eventId } = req.params;
  const event = await Event.findById(eventId);
  if ( ! event ) return res.status(404).send('not found');

  if (
    event.owners.includes(req.user._id)
  ) {
    // OUCH!!!
    // res.status(200).send(event);
  } else {
    // forgot this
    return res.status(403).send('Forbidden');
  }

  const {
    date, title, description, notification, public,
    type, owners=event.owners, participants=event.participants,
    alert, color, location, priority, repeat
  } = req.body;

  if ( ! Array.isArray(owners) ) owners = []; 
  if ( owners.length === 0 ) 
    return res.status(400).send('An event need owners!');

  Object.assign( event, {
    date, title, description, notification, public,
    type, owners, participants, alert, color, location,
    priority, repeat
  });

  try {
    await event.save();
  } catch (e){
    console.error(e);
    return res.status(500).send(e);
  }
  res.status(200).send(event);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await Event.findByIdAndDelete(id);
  res.status(204).send();
});

