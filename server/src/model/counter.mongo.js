const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  value: { type: Number, default: 1000 },
});

const Counter = mongoose.model('Counter', counterSchema);

module.exports = Counter;
