const express = require('express');
let app = express();
let Train = require('../models/train');

app.get('/trains', (req, res) => {
  Train.find({})
    .exec((err, trains) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err
        });
      }

      res.json({
        ok: true,
        trains
      });
    });
});

app.get('/train/:id', (req, res) => {
  let id = req.params.id;

  Train.findById(id)
    .exec((err, trainDB) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err
        });
      }

      if (!trainDB) {
        return res.status(400).json({
          ok: false,
          err: {
            message: 'The Train does not exist'
          }
        });
      }

      res.json({
        ok: true,
        train: trainDB
      });
    });

});

app.post('/trains', (req, res) => {
  let body = req.body;

  const train = new Train({
    name: body.name,
    country: body.country,
    number: body.number,
    depart_city: body.depart_city,
    arrive_city: body.arrive_city,
  });

  train.save((err, trainDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err
      });
    }

    if (!trainDB) {
      return res.status(400).json({
        ok: false,
        err
      });
    }

    res.json({
      ok: true,
      train: trainDB
    });
  });
});

app.delete('/train/:id', (req, res) => {
  let id = req.params.id;

  Train.findByIdAndDelete(id, (err, trainDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err
      });
    }

    if (!trainDB) {
      return res.status(400).json({
        ok: false,
        err: {
          message: 'The train does not exist'
        }
      });
    }

    res.json({
      ok: true,
      message: 'The Train was deleted'
    });
  });
});

module.exports = app;