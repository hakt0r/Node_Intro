const express = require('express');
const { checkAuth } = require('../middlewares');

const level = require('level');
const eventDB = level('event');

const router = (module.exports = express.Router());
router.use(checkAuth);

const { v4: uuidv4 } = require('uuid');

const model = [
  'title',
  'participants',
  'type',
  'description',
  'notification',
  'color',
  'date',
  'location',
  'priority',
  'repeat',
  'alarm',
  'owners',
  'public',
];

router.post('/list', async (req, res) => {
  const filter = req.body;
  console.log(filter)
  const list = [];

  eventDB
    .createReadStream()
    .on('data', function (event) {
      const eventObj = JSON.parse(event.value);
      let push = true;
      if (
        eventObj.public ||
        eventObj.owners.includes(req.user.id) ||
        eventObj.participants.includes(req.user.id)
      ) {
        for (const key of model) {
          if (filter[key] && filter[key].$gt !== undefined ) {
            if (filter[key].$gt > eventObj[key]) {
              push = false;
            }
          }
          else if (filter[key] && filter[key] !== eventObj[key]) {
            push = false;
          }
        }
        if (push) {
          list.push(eventObj);
        }
      }
    })
    .on('close', function () {
      res.status(200).send(list);
    });
});

router.get('/:id', async (req, res) => {
  try {
    const eventStr = await eventDB.get(req.params.id);
    const eventObj = JSON.parse(eventStr);
    if (
      eventObj.public ||
      eventObj.owners.includes(req.user.id) ||
      eventObj.participants.includes(req.user.id)
    ) {
      res.status(200).send(eventObj);
    } else {
      res.status(403).send('not allowed');
    }
  } catch (error) {
    console.error(error);
    res.status(404).send('not found');
  }
});

router.post('/', async (req, res) => {
  const eventObj = {
    id: uuidv4(),
    date: Date.now(),
    title: '',
    description: '',
    notification: '',
    public: false,
    type: 'appointment',
    owners: [req.user.id],
    participants: [req.user.id]
  };

  model.forEach(
    (key) =>
      (eventObj[key] =
        req.body[key] === undefined ? eventObj[key] : req.body[key])
  );

  await eventDB.put(eventObj.id, JSON.stringify(eventObj));

  res.status(200).send(eventObj);
});

router.patch('/:id', async (req, res) => {
  try {
    const eventObjDB = JSON.parse(await eventDB.get(req.params.id));

    if (eventObjDB.owners.includes(req.user.id)) {
      model.forEach(
        (key) =>
          (eventObjDB[key] =
            req.body[key] === undefined ? eventObjDB[key] : req.body[key])
      );
      await eventDB.put(req.params.id, JSON.stringify(eventObjDB));

      res.status(201).send(eventObjDB);
    } else {
      res.status(403).send('Auth is not found');
    }
  } catch (error) {
    res.status(404).send('event not found');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const eventObj = JSON.parse(await eventDB.get(req.params.id));

    if (eventObj.owners.includes(req.user.id)) {
      await eventDB.del(req.params.id);
      res.status(204).send();
    } else {
      res.status(404).send('not checked');
    }
  } catch (error) {
    res.status(404).send('please no more errors now Sabi');
  }
});
