const mongoose = require('mongoose');

const bankSchema = new mongoose.Schema({
  ifsc: { type: String },
  bankName: { type: String },
});

const Bank = mongoose.model('Bank', bankSchema);

module.exports = Bank;
