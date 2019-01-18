const Bank = require('./../models/Bank');

module.exports = {
  setBank: (req, res) => {
    const { IFSC, BANKNAME } = req.body;
    Bank.findOne({ IFSC }, (err, bankData) => {
      if(!bankData) {
        const newBank = new Bank({
          IFSC,
          BANKNAME
        })
        return newBank.save()
      }
      return {
        msg: 'Bank information already available'
      }
    })
  },
  getBankSuggestion: (req, res) => {
    // const query= 
  }
};

