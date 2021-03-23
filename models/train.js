const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trainsSchema = new Schema({
  name: { type: String, required: true },
  country: { type: String, required: true },
  type: { type: String, required: false },
  number: { type: String, required: true },
  depart_city: { type: String, required: true },
  arrive_city: { type: String, required: true }
});

module.exports = mongoose.model('Train', trainsSchema);
