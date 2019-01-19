const mongoose = require('mongoose');

const bankSchema = new mongoose.Schema({
  IFSC: { type: String },
  BANK: { type: String },
  CITY: { type: String },
});

const Bank = mongoose.model('Bank', bankSchema);

module.exports = Bank;
