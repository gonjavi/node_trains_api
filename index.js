require('./config/config');
const mongoose = require('mongoose');
const express = require('express');
let app = express();
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(require('./routes/train'));

mongoose.connect(process.env.URLDB,
  { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
  (err, res) => {
    if (err) throw err;
    console.log('Database online');
  }
);

app.listen(process.env.PORT, () => console.log('Listening to the port', process.env.PORT));