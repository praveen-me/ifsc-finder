const mongoose = require('mongoose');

const bankSchema = new mongoose.Schema({
  IFSC: { type: String },
  BANKNAME: { type: String },
});

const Bank = mongoose.model('Bank', bankSchema);

module.exports = Bank;
