const Bank = require('./../models/Bank');

module.exports = {
  setBank: (req, res) => {  
    const { IFSC, BANK, CITY } = req.body;
    Bank.findOne({ IFSC }, (err, bankData) => {
      if(!bankData) {
        const newBank = new Bank({
          IFSC,
          BANK,
          CITY
        })
        return newBank.save()
      }
      return {
        msg: 'Bank information already available'
      }
    })
  }
};

